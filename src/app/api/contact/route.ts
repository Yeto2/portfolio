import dns from 'node:dns';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Prefer IPv4 — some networks time out on Resend's IPv6 routes.
dns.setDefaultResultOrder('ipv4first');

/** Resend test sender only delivers to the email on your Resend account. */
const RESEND_TEST_RECIPIENT = 'bota.tll2004@gmail.com';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function normalizeFrom(raw: string) {
  const trimmed = raw.trim().replace(/^["']|["']$/g, '');
  if (trimmed.includes('<') && trimmed.includes('>')) return trimmed;
  return `Portfolio Contact <${trimmed}>`;
}

function stripQuotes(v: string) {
  return v.trim().replace(/^["']|["']$/g, '');
}

/** Safe status check — never exposes secrets. */
export async function GET() {
  const hasKey = Boolean(process.env.RESEND_API_KEY?.trim());
  const to = stripQuotes(process.env.CONTACT_TO_EMAIL || RESEND_TEST_RECIPIENT);
  return NextResponse.json({
    configured: hasKey,
    toDomain: to.includes('@') ? to.split('@')[1] : null,
  });
}

async function sendWithResend(opts: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: opts.from,
        to: [opts.to],
        reply_to: opts.replyTo,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
      signal: controller.signal,
    });

    const payload = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
    };

    return { ok: res.ok, status: res.status, payload };
  } finally {
    clearTimeout(timeout);
  }
}

/** Fallback when Resend is unreachable from this network. */
async function sendWithFormSubmit(opts: {
  to: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  subject: string;
}) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(opts.to)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: opts.name,
      email: opts.email,
      budget: opts.budget || 'Not specified',
      message: opts.message,
      _subject: opts.subject,
      _template: 'table',
      _replyto: opts.email,
      _captcha: 'false',
    }),
  });

  const payload = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };

  return { ok: res.ok, payload };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const budget = String(body.budget ?? '').trim();

    if (!name || name.length > 120) {
      return NextResponse.json({ error: 'Please enter a valid name.' }, { status: 400 });
    }
    if (!email || !emailOk(email) || email.length > 200) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }
    if (!message || message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Please enter a project message (at least 10 characters).' },
        { status: 400 },
      );
    }

    const to = stripQuotes(process.env.CONTACT_TO_EMAIL || RESEND_TEST_RECIPIENT);
    const subject = `Store inquiry from ${name}${budget ? ` · ${budget}` : ''}`;
    const text = [
      'New portfolio inquiry',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      budget ? `Budget: ${budget}` : null,
      '',
      'Message:',
      message,
    ]
      .filter(Boolean)
      .join('\n');
    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.55;color:#0f172a">
        <h2 style="margin:0 0 12px">New portfolio inquiry</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${budget ? `<p style="margin:0 0 8px"><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ''}
        <p style="margin:16px 0 8px"><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
      </div>
    `;

    const apiKey = stripQuotes(process.env.RESEND_API_KEY || '');

    // 1) Prefer Resend when configured
    if (apiKey) {
      try {
        const from = normalizeFrom(
          process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        );
        const result = await sendWithResend({
          apiKey,
          from,
          to,
          replyTo: email,
          subject,
          text,
          html,
        });

        if (result.ok) {
          console.info('[contact] Sent via Resend', { id: result.payload.id, to });
          return NextResponse.json({ ok: true, provider: 'resend', id: result.payload.id });
        }

        if (result.status === 403) {
          return NextResponse.json(
            {
              error: `Resend only delivers to ${RESEND_TEST_RECIPIENT} until you verify a domain. Set CONTACT_TO_EMAIL to that address.`,
            },
            { status: 502 },
          );
        }

        console.error('[contact] Resend rejected:', result.status, result.payload);
        // Fall through to FormSubmit for transient/provider issues
      } catch (err) {
        console.error('[contact] Resend unreachable, falling back:', err);
      }
    } else {
      console.warn('[contact] RESEND_API_KEY missing — using FormSubmit fallback');
    }

    // 2) Fallback so the form still works without Resend / when network blocks Resend
    try {
      const fallback = await sendWithFormSubmit({
        to,
        name,
        email,
        budget,
        message,
        subject,
      });

      if (!fallback.ok) {
        console.error('[contact] FormSubmit failed:', fallback.payload);
        return NextResponse.json(
          {
            error:
              fallback.payload.message ||
              'Could not send your message. Activate FormSubmit for this inbox (check email for the activation link) or fix Resend on Vercel.',
          },
          { status: 502 },
        );
      }

      console.info('[contact] Sent via FormSubmit', { to });
      return NextResponse.json({ ok: true, provider: 'formsubmit' });
    } catch (err) {
      console.error('[contact] FormSubmit unreachable:', err);
      return NextResponse.json(
        {
          error:
            'Could not reach any email provider from this server. On Vercel, set RESEND_API_KEY and redeploy. Locally, your network may be blocking outbound email APIs.',
        },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

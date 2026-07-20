import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/** Resend test sender only delivers to the email on your Resend account. */
const RESEND_TEST_RECIPIENT = 'bota.tll2004@gmail.com';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function normalizeFrom(raw: string) {
  const trimmed = raw.trim();
  if (trimmed.includes('<') && trimmed.includes('>')) return trimmed;
  return `Portfolio Contact <${trimmed}>`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error('[contact] Missing RESEND_API_KEY');
      return NextResponse.json(
        {
          error:
            'Contact form is not configured on the server. Add RESEND_API_KEY in Vercel, then redeploy.',
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const budget = String(body.budget ?? '').trim();
    const honey = String(body._gotcha ?? '').trim();

    if (honey) {
      console.warn('[contact] Honeypot triggered — ignored');
      return NextResponse.json(
        { error: 'Could not send your message. Please try again.' },
        { status: 400 },
      );
    }

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

    const to = (process.env.CONTACT_TO_EMAIL || RESEND_TEST_RECIPIENT).trim();
    const from = normalizeFrom(
      process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    );

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Store inquiry from ${name}${budget ? ` · ${budget}` : ''}`,
        text: [
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
          .join('\n'),
        html: `
          <div style="font-family:system-ui,sans-serif;line-height:1.55;color:#0f172a">
            <h2 style="margin:0 0 12px">New portfolio inquiry</h2>
            <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${budget ? `<p style="margin:0 0 8px"><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ''}
            <p style="margin:16px 0 8px"><strong>Message:</strong></p>
            <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    const payload = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!res.ok) {
      console.error('[contact] Resend API error:', res.status, payload);

      if (res.status === 403) {
        return NextResponse.json(
          {
            error: `Resend blocked delivery. Set CONTACT_TO_EMAIL to ${RESEND_TEST_RECIPIENT} in Vercel until you verify a domain.`,
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        {
          error:
            payload.message ||
            'Could not send your message. Please email yessemna1337@gmail.com directly.',
        },
        { status: 502 },
      );
    }

    console.info('[contact] Sent inquiry', { id: payload.id, to });
    return NextResponse.json({ ok: true, id: payload.id });
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

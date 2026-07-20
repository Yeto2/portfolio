import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/** Resend test sender only delivers to the email on your Resend account. */
const RESEND_TEST_RECIPIENT = 'bota.tll2004@gmail.com';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function normalizeFrom(raw: string) {
  const trimmed = raw.trim().replace(/^["']|["']$/g, '');
  if (trimmed.includes('<') && trimmed.includes('>')) return trimmed;
  return `Portfolio Contact <${trimmed}>`;
}

/** Safe status check — never exposes secrets. */
export async function GET() {
  const hasKey = Boolean(process.env.RESEND_API_KEY?.trim());
  const to = (process.env.CONTACT_TO_EMAIL || RESEND_TEST_RECIPIENT).trim();
  return NextResponse.json({
    configured: hasKey,
    toDomain: to.includes('@') ? to.split('@')[1] : null,
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim().replace(/^["']|["']$/g, '');
    if (!apiKey) {
      console.error('[contact] Missing RESEND_API_KEY');
      return NextResponse.json(
        {
          error:
            'Server is missing RESEND_API_KEY. In Vercel: Settings → Environment Variables → add RESEND_API_KEY for Production → Redeploy.',
        },
        { status: 503 },
      );
    }

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

    const to = (process.env.CONTACT_TO_EMAIL || RESEND_TEST_RECIPIENT)
      .trim()
      .replace(/^["']|["']$/g, '');
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
            error: `Resend only delivers to ${RESEND_TEST_RECIPIENT} until you verify a domain. Set CONTACT_TO_EMAIL to that address in Vercel.`,
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        {
          error:
            payload.message ||
            `Resend rejected the email (HTTP ${res.status}). Check your API key and CONTACT_TO_EMAIL.`,
        },
        { status: 502 },
      );
    }

    console.info('[contact] Sent inquiry', { id: payload.id, to });
    return NextResponse.json({ ok: true, id: payload.id });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      {
        error:
          'Could not reach Resend. Check your network / server logs, then try again.',
      },
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

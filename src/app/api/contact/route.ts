import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email is not configured. Missing RESEND_API_KEY.' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const budget = String(body.budget ?? '').trim();
    const honey = String(body.company ?? '').trim();

    if (honey) {
      return NextResponse.json({ ok: true });
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

    const to = process.env.CONTACT_TO_EMAIL || 'yessemna1337@gmail.com';
    const from =
      process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
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
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { error: 'Could not send your message. Please try again or email me directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
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

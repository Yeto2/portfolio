'use client';

import { useState } from 'react';
import { PUBLIC_API_URL } from '@/lib/api';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 422) {
        const body = await res.json();
        setErrors(body.fields ?? {});
        setStatus('error');
        return;
      }
      if (res.status === 429) {
        setErrors({ _: ['Too many messages — please wait a minute and try again.'] });
        setStatus('error');
        return;
      }
      if (!res.ok) throw new Error('request failed');

      form.reset();
      setStatus('success');
    } catch {
      setErrors({ _: ['Could not reach the server. Is the API running?'] });
      setStatus('error');
    }
  }

  const field =
    'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-indigo-400/60 focus:bg-white/10';

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input name="name" placeholder="Your name" className={field} />
          <FieldError msgs={errors.name} />
        </div>
        <div>
          <input name="email" type="email" placeholder="Email" className={field} />
          <FieldError msgs={errors.email} />
        </div>
      </div>
      <div>
        <input name="budget" placeholder="Budget (optional, e.g. $3k–5k)" className={field} />
      </div>
      <div>
        <textarea name="message" rows={5} placeholder="What are you building?" className={field} />
        <FieldError msgs={errors.message} />
      </div>

      <FieldError msgs={errors._} />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'success' && (
        <p className="text-sm text-emerald-400">Thanks — your message was received. I will get back to you shortly.</p>
      )}
    </form>
  );
}

function FieldError({ msgs }: { msgs?: string[] }) {
  if (!msgs?.length) return null;
  return <p className="mt-1 text-xs text-rose-400">{msgs[0]}</p>;
}

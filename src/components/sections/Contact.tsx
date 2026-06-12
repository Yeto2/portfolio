'use client';

import { useState } from 'react';
import { Mail, Github, ExternalLink, Send, CheckCircle } from 'lucide-react';
import type { Profile } from '@/data/content';
import { Section, SectionHeader, GlassCard, Button } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';

const socialIcons = {
  github: Github,
  linkedin: ExternalLink,
  upwork: ExternalLink,
  mail: Mail,
};

export default function Contact({ profile }: { profile: Profile }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;
    const budget = data.get('budget') as string;

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi ${profile.name.split(' ')[0]},\n\n${message}\n\n— ${name}\n${email}${budget ? `\nBudget: ${budget}` : ''}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contact">
      <FadeIn>
        <SectionHeader
          index="05"
          eyebrow="Contact"
          title="Start a conversation"
          description="Share your project and timeline. I respond to every serious inquiry within 24 hours."
        />
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <FadeIn delay={0.08}>
          <div className="space-y-6">
            <GlassCard padding="lg">
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)]">
                  <span className="absolute inset-0 bg-gradient-to-t from-blue-700 to-blue-500" />
                  <span className="relative font-display">{profile.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{profile.name}</p>
                  <p className="text-sm text-slate-500">{profile.role}</p>
                </div>
              </div>
            </GlassCard>

            <div className="grid gap-2 sm:grid-cols-2">
              {profile.social.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    className="glass glass-hover group flex items-center gap-3 rounded-xl p-4"
                    {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon className="h-4 w-4 text-blue-400/80 transition-colors group-hover:text-blue-300" />
                    <span className="text-sm text-slate-400 transition-colors group-hover:text-white">
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </div>

            <Button href={`mailto:${profile.email}`} variant="primary" className="w-full sm:w-auto">
              <Mail className="h-4 w-4" />
              {profile.email}
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <GlassCard padding="lg">
            {sent ? (
              <div className="flex flex-col items-center py-14 text-center">
                <CheckCircle className="h-11 w-11 text-emerald-400/90" strokeWidth={1.5} />
                <p className="mt-5 font-display text-xl text-white">Email client opened</p>
                <p className="mt-2 max-w-xs text-sm text-slate-500">
                  Send the message from your email app and I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" required />
                  <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <Field label="Budget (optional)" name="budget" placeholder="e.g. $3k – $8k" />
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    placeholder="What are you building?"
                    className="field-input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(37,99,235,0.55)] transition-colors hover:bg-blue-500 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Send message
                </button>
                <p className="text-[0.6875rem] text-slate-600">
                  Opens your email client — no data stored on a server.
                </p>
              </form>
            )}
          </GlassCard>
        </FadeIn>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="field-input"
      />
    </div>
  );
}

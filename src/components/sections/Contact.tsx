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
    <Section id="contact" className="border-t border-white/5">
      <FadeIn>
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something great"
          description="Tell me about your project and timeline. I reply to every serious inquiry, usually within 24 hours."
        />
      </FadeIn>

      <div className="grid gap-10 lg:grid-cols-2">
        <FadeIn delay={0.1}>
          <div className="space-y-8">
            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-xl font-bold text-white shadow-lg shadow-blue-600/30">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{profile.name}</p>
                  <p className="text-sm text-slate-400">{profile.role}</p>
                </div>
              </div>
            </GlassCard>

            <div className="grid gap-3 sm:grid-cols-2">
              {profile.social.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    className="glass group flex items-center gap-3 rounded-xl p-4 transition hover:border-blue-500/30 hover:bg-white/[0.04]"
                    {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon className="h-5 w-5 text-blue-400 transition group-hover:text-blue-300" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">{s.label}</span>
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

        <FadeIn delay={0.2}>
          <GlassCard>
            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-400" />
                <p className="mt-4 text-lg font-semibold text-white">Email client opened</p>
                <p className="mt-2 text-sm text-slate-400">Send the message from your email app and I will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" required />
                  <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <Field label="Budget (optional)" name="budget" placeholder="e.g. $3k – $8k" />
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm text-slate-400">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    placeholder="What are you building?"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-500 hover:to-blue-400 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Send message
                </button>
                <p className="text-xs text-slate-600">Opens your email client — no data stored on a server.</p>
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
      <label htmlFor={name} className="mb-1.5 block text-sm text-slate-400">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20"
      />
    </div>
  );
}

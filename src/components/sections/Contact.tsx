'use client';

import { useState } from 'react';
import { Mail, Github, ExternalLink, Send, CheckCircle } from 'lucide-react';
import type { Profile } from '@/data/content';
import { Section, SectionHeader } from '@/components/ui';
import { Logo } from '@/components/ui/Logo';
import { FadeIn } from '@/components/motion/FadeIn';
import { StickyAside } from '@/components/motion/StickyAside';

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

    const subject = encodeURIComponent(`Store project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi ${profile.name.split(' ')[0]},\n\n${message}\n\n— ${name}\n${email}${
        budget ? `\nBudget: ${budget}` : ''
      }`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contact">
      <FadeIn>
        <SectionHeader
          index="08"
          eyebrow="Contact"
          title="Let's build your store."
          description="Share your brand, timeline, and goals. I reply to serious inquiries within 24 hours."
        />
      </FadeIn>

      {/*
        Separate columns (no overflow:hidden parent) so the profile panel
        can stick while the form column scrolls.
      */}
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-6">
        <StickyAside className="hidden lg:block">
          <div className="glow-border relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-blue-500/[0.12] to-[#0a0f1e] p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(96,165,250,0.15),transparent_55%)]" />
            <div className="relative">
              <Logo size="md" />
              <p className="mt-6 font-display text-2xl text-white">{profile.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{profile.role}</p>

              <div className="mt-8 space-y-2">
                {profile.social.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-blue-500/25 hover:bg-blue-500/[0.06]"
                      {...(s.url.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <Icon className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-slate-300 group-hover:text-white">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </StickyAside>

        {/* Mobile profile (non-sticky) */}
        <div className="glow-border relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-blue-500/[0.12] to-[#0a0f1e] p-8 lg:hidden">
          <Logo size="md" />
          <p className="mt-6 font-display text-2xl text-white">{profile.name}</p>
          <p className="mt-2 text-sm text-slate-400">{profile.role}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.social.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.url}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2 text-sm text-slate-300"
                  {...(s.url.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <Icon className="h-4 w-4 text-blue-400" />
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="glow-border rounded-[1.75rem] border border-white/[0.08] bg-[#050816]/80 p-8 sm:p-10">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="mb-4 h-10 w-10 text-blue-400" />
              <p className="font-display text-2xl text-white">Your email client is open</p>
              <p className="mt-2 text-sm text-slate-400">Send the draft when you are ready.</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm text-blue-400 hover:text-blue-300"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs text-slate-500">Name</span>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/45 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs text-slate-500">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/45 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                    placeholder="you@brand.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs text-slate-500">Budget range</span>
                <select
                  name="budget"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/45 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option value="Under $2k">Under $2k</option>
                  <option value="$2k – $5k">$2k – $5k</option>
                  <option value="$5k – $10k">$5k – $10k</option>
                  <option value="$10k+">$10k+</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-slate-500">Project details</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/45 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                  placeholder="Tell me about your brand, catalog, and timeline…"
                />
              </label>
              <button
                type="submit"
                className="btn-shimmer group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(59,130,246,0.65)] transition hover:bg-blue-500 hover:shadow-[0_10px_36px_-8px_rgba(59,130,246,0.85)]"
              >
                Send inquiry
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

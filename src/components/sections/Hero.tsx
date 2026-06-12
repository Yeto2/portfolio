'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Profile } from '@/data/content';
import { Button, ScrollIndicator } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({
  profile,
  services,
}: {
  profile: Profile;
  services: string[];
}) {
  return (
    <header className="relative flex min-h-[100dvh] flex-col px-5 pb-12 pt-28 sm:px-6 lg:pt-32">
      <div className="mx-auto flex w-full max-w-[var(--content-max)] flex-1 flex-col">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Copy */}
          <div>
            <FadeIn>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-1.5 pr-4 backdrop-blur-sm">
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-emerald-400">
                  Available
                </span>
                <span className="text-sm text-slate-400">{profile.availability}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <p className="mb-5 text-sm font-medium tracking-wide text-slate-500">
                {profile.role}
                <span className="mx-2 text-slate-700">·</span>
                {profile.location}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="max-w-[14ch] font-display text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[1.02] text-white">
                Serious products.
                <br />
                <span className="text-gradient">Built to last.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.75] text-slate-400 lg:text-lg">
                {profile.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button href="#projects" variant="primary">
                  View selected work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
                <Button href="#contact" variant="secondary" magnetic={false}>
                  Start a project
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Visual composition */}
          <FadeIn delay={0.2} direction="left" className="relative hidden lg:block">
            <div className="relative aspect-square max-h-[520px] w-full">
              {/* Layered product frame */}
              <div className="glass absolute inset-4 rounded-3xl p-1">
                <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-[#060a14]/90">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-white/10" />
                      <span className="h-2 w-2 rounded-full bg-white/10" />
                      <span className="h-2 w-2 rounded-full bg-white/10" />
                    </div>
                    <div className="mx-auto rounded-md bg-white/[0.04] px-4 py-0.5 font-mono text-[10px] text-slate-600">
                      production.system
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400/80">
                        System status
                      </p>
                      <p className="mt-2 font-display text-3xl text-white">Operational</p>
                      <p className="mt-1 text-sm text-slate-500">3 active case studies · 20+ APIs shipped</p>
                    </div>
                    <div className="space-y-2">
                      {['Real-time infrastructure', 'SaaS foundations', 'AI integrations'].map((line, i) => (
                        <motion.div
                          key={line}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease }}
                          className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
                        >
                          <span className="text-xs text-slate-400">{line}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Accent frame offset */}
              <div
                className="absolute -right-2 -top-2 h-full w-full rounded-3xl border border-blue-500/10"
                aria-hidden
              />
              <div
                className="absolute -bottom-3 -left-3 h-24 w-24 rounded-2xl border border-red-500/10 bg-red-500/[0.03]"
                aria-hidden
              />
            </div>
          </FadeIn>
        </div>

        {/* Metrics strip */}
        <FadeIn delay={0.3} className="mt-16 lg:mt-20">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-4">
            {profile.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`bg-[#060a14]/80 px-5 py-7 backdrop-blur-xl sm:px-8 sm:py-8 ${
                  i < profile.metrics.length - 1 ? 'sm:border-r sm:border-white/[0.05]' : ''
                }`}
              >
                <p className="font-display text-2xl text-gradient-blue sm:text-3xl">{m.value}</p>
                <p className="mt-1.5 text-[0.6875rem] leading-snug tracking-wide text-slate-500">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Specializations */}
        <FadeIn delay={0.38} className="mt-10">
          <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-slate-600">
            Capabilities
          </p>
          <div className="flex flex-wrap gap-2">
            {services.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.03, duration: 0.5, ease }}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-slate-400 transition-colors duration-300 hover:border-blue-500/20 hover:text-slate-200"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </FadeIn>

        {/* Scroll cue */}
        <div className="mt-auto flex justify-center pt-16 lg:pt-20">
          <FadeIn delay={0.5}>
            <ScrollIndicator href="#about" />
          </FadeIn>
        </div>
      </div>
    </header>
  );
}

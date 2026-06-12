'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Profile } from '@/data/content';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';

export default function Hero({
  profile,
  services,
}: {
  profile: Profile;
  services: string[];
}) {
  return (
    <header className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 lg:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Floating glass orbs */}
        <motion.div
          aria-hidden
          className="glass absolute right-0 top-32 hidden h-32 w-32 rounded-3xl lg:block"
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="glass absolute left-8 top-1/2 hidden h-20 w-20 rounded-2xl lg:block"
          animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            {profile.role}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Building{' '}
            <span className="text-gradient">premium digital products</span>{' '}
            that perform at scale.
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 lg:text-xl">
            {profile.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#projects" variant="primary">
              View my work
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#contact" variant="secondary">
              Start a project
            </Button>
          </div>
        </FadeIn>

        {/* Service pills */}
        <FadeIn delay={0.35} className="mt-16">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>Specializing in</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {services.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.04 }}
                className="rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition hover:border-blue-500/30 hover:text-blue-300"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </FadeIn>

        {/* Metrics */}
        <FadeIn delay={0.45} className="mt-20">
          <div className="glass-strong grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
            {profile.metrics.map((m) => (
              <div key={m.label} className="bg-[#0a0f1e]/80 px-6 py-8 text-center backdrop-blur-xl">
                <p className="text-2xl font-bold text-gradient-blue sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs leading-snug text-slate-500">{m.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </header>
  );
}

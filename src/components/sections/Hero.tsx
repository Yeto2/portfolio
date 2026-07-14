'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Profile } from '@/data/content';
import { Button, ScrollIndicator } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';
import { StickyAside } from '@/components/motion/StickyAside';

const ease = [0.16, 1, 0.3, 1] as const;

function StoreVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/[0.07] blur-3xl" aria-hidden />
      <div className="glow-border relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0a0f1e]/90">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="mx-auto rounded-md bg-white/[0.04] px-3 py-0.5 font-mono text-[10px] text-slate-600">
            storefront.preview
          </span>
        </div>

        <div className="flex h-[calc(100%-2.75rem)] flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-2.5 w-16 rounded-full bg-white/10" />
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded-full border border-white/10" />
              <div className="h-6 w-14 rounded-full bg-blue-600/80" />
            </div>
          </div>

          <div className="relative mb-4 flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-500/15 via-[#101827] to-[#050816]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(96,165,250,0.2),transparent_55%)]" />
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="h-2.5 w-2/3 rounded-full bg-white/25" />
              <div className="h-2 w-1/2 rounded-full bg-white/10" />
            </div>
            <motion.div
              className="absolute right-6 top-8 h-20 w-16 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-8 top-16 h-14 w-14 rounded-xl border border-blue-400/20 bg-blue-500/10"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.08, duration: 0.5, ease }}
                className="aspect-square rounded-xl border border-white/[0.06] bg-white/[0.03]"
              >
                <div className="m-2 h-1/2 rounded-lg bg-gradient-to-br from-blue-400/20 to-transparent" />
                <div className="mx-2 mt-2 h-1.5 w-3/4 rounded-full bg-white/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ profile }: { profile: Profile }) {
  const [line1, line2] = profile.headline.split('\n');

  return (
    <header
      className="relative flex min-h-[100dvh] flex-col px-5 pb-12 sm:px-6"
      style={{ paddingTop: 'calc(var(--nav-height, 5.25rem) + 2.5rem)' }}
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max)] flex-1 flex-col">
        {/*
          Split track: left copy defines height; right object sticks while
          scrolling through the copy until the grid row ends.
        */}
        <div className="grid flex-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div className="pb-4">
            <FadeIn>
              <p className="mb-6 font-display text-[clamp(1.75rem,3.5vw,2.35rem)] leading-none tracking-tight text-white/90">
                {profile.name}
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-white">
                {line1}
                <br />
                <span className="text-gradient">{line2}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.75] text-slate-400 lg:text-lg">
                {profile.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button href="#projects" variant="primary">
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
                <Button href="#contact" variant="secondary" magnetic={false}>
                  Let&apos;s Build Your Store
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-2 text-xs text-slate-600">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue-400" />
                Available for premium WooCommerce builds
              </p>
            </FadeIn>
          </div>

          <StickyAside className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
            >
              <StoreVisual />
            </motion.div>
          </StickyAside>
        </div>

        <div className="mt-auto flex justify-center pt-14 lg:pt-10">
          <FadeIn delay={0.35}>
            <ScrollIndicator href="#about" />
          </FadeIn>
        </div>
      </div>
    </header>
  );
}

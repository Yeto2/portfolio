'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Zap,
  CreditCard,
  Package,
} from 'lucide-react';
import type { Profile } from '@/data/content';
import { Button, ScrollIndicator } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';
import { StickyAside } from '@/components/motion/StickyAside';

const ease = [0.16, 1, 0.3, 1] as const;

const journey = [
  { step: '01', label: 'Catalog', desc: 'Clear product pages' },
  { step: '02', label: 'Cart', desc: 'Frictionless add-to-cart' },
  { step: '03', label: 'Checkout', desc: 'Trusted payments' },
  { step: '04', label: 'Orders', desc: 'Confirm & deliver' },
];

/** Brand-agnostic store craft panel — shows what you build, not one client. */
function StoreVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/[0.07] blur-3xl" aria-hidden />

      <div className="glow-border relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0a0f1e]/95">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(59,130,246,0.14),transparent_55%)]" />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-300/90">
                What I build
              </p>
              <h2 className="mt-2 font-display text-[1.35rem] leading-snug text-white sm:text-[1.5rem]">
                Stores that convert
              </h2>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-400/25 bg-blue-500/10 px-2.5 py-1.5 text-[0.6875rem] font-medium text-blue-200">
              <ShoppingBag className="h-3.5 w-3.5" />
              Commerce
            </span>
          </div>

          {/* Generic product snapshot — no client brand */}
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.1] via-[#101827] to-[#050816] p-4">
            <div className="flex gap-4">
              <div className="relative flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0f1e]">
                <Package className="h-7 w-7 text-blue-400/80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.25),transparent_60%)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-500">
                  Product page
                </p>
                <p className="mt-1 text-sm font-semibold text-white">Your hero product</p>
                <p className="mt-1 text-xs text-slate-500">Premium layout · Clear CTA</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="font-display text-lg text-white">$128</p>
                  <span className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-[0.6875rem] font-semibold text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.65)]">
                    Buy now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer journey — readable story */}
          <div className="mt-5 space-y-2">
            {journey.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.4, ease }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
              >
                <span className="font-mono text-[0.625rem] tracking-wider text-blue-400/80">
                  {item.step}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-[0.6875rem] text-slate-500">{item.desc}</p>
                </div>
                {i === 2 ? (
                  <CreditCard className="h-3.5 w-3.5 shrink-0 text-blue-400/70" />
                ) : i === 0 ? (
                  <Zap className="h-3.5 w-3.5 shrink-0 text-blue-400/70" />
                ) : i === 3 ? (
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-blue-400/70" />
                ) : (
                  <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-blue-400/70" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
            {['WooCommerce', 'Next.js', 'Payments', 'Performance'].map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[0.6875rem] text-slate-400"
              >
                {tag}
              </span>
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

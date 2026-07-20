'use client';

import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section, Button } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';

export default function BrandPromo() {
  return (
    <Section id="brand" className="!py-10 sm:!py-14">
      <FadeIn>
        <div className="brand-promo glow-border relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#0a0f1e]/55">
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[80px]" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" />

          <div className="relative grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-12">
            <div className="order-2 lg:order-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cyan-200/90">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Premium service
              </div>

              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.65rem)] leading-[1.08] text-white">
                Your brand deserves a store that{' '}
                <span className="text-gradient">feels premium</span> — and converts.
              </h2>

              <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-slate-400">
                Fullstack development meets WooCommerce expertise. I design and build
                storefronts with Next.js speed, checkout trust, and the polish clients
                expect from a serious e-commerce partner.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  'Custom storefronts — not template reskins',
                  'Performance-first architecture',
                  'Clear communication from brief to launch',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#contact" variant="primary">
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="#projects" variant="secondary" magnetic={false}>
                  View live work
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="brand-promo__frame relative mx-auto max-w-md lg:max-w-none">
                <div className="brand-promo__halo pointer-events-none absolute inset-0" aria-hidden />
                <div className="brand-promo__shine-wrap relative">
                  <Image
                    src="/brand-promo.png"
                    alt="Yassine Essemnaoui — Fullstack Developer and WooCommerce Specialist"
                    width={800}
                    height={800}
                    className="brand-promo__image relative z-[1] h-auto w-full object-contain"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

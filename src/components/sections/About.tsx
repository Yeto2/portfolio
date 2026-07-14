'use client';

import { MapPin } from 'lucide-react';
import type { Profile } from '@/data/content';
import { Section, SectionHeader } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';
import { StickyAside } from '@/components/motion/StickyAside';

export default function About({ profile }: { profile: Profile }) {
  return (
    <Section id="about">
      <FadeIn>
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Stores that feel expensive — and convert like it."
        />
      </FadeIn>

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        {/* Object / quote side — follows scroll while bio scrolls */}
        <StickyAside>
          <blockquote className="neon-rail">
            <p className="font-display text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.25] text-white/95">
              I build storefronts that look premium, load fast, and earn trust at checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue-400" />
                {profile.availability}
              </span>
            </div>
          </blockquote>
        </StickyAside>

        <div className="space-y-5 text-[1.05rem] leading-[1.8] text-slate-400">
          {profile.bio.map((p, i) => (
            <FadeIn key={i} delay={0.05 + i * 0.04}>
              <p>{p}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn delay={0.1} className="mt-14">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-blue-500/15 bg-blue-500/10 sm:grid-cols-4">
          {profile.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-[#050816]/90 px-5 py-6 transition-colors duration-300 hover:bg-blue-500/[0.07]"
            >
              <p className="font-display text-xl text-gradient sm:text-2xl">{m.value}</p>
              <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

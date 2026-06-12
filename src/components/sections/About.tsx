'use client';

import { MapPin, Clock, Layers } from 'lucide-react';
import type { Profile } from '@/data/content';
import { processSteps } from '@/data/content';
import { Section, SectionHeader, GlassCard } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

const meta = [
  { icon: MapPin, label: 'Location', value: (p: Profile) => p.location, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Clock, label: 'Availability', value: (p: Profile) => p.availability, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Layers, label: 'Focus', value: () => 'Full Stack · SaaS · Real-Time · AI', color: 'text-red-400/90', bg: 'bg-red-500/10' },
];

export default function About({ profile }: { profile: Profile }) {
  return (
    <Section id="about" divider={false}>
      <FadeIn>
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Engineering with intent"
          description="Full stack expertise with a product mindset — systems that are fast, secure, and built for teams to extend."
        />
      </FadeIn>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <FadeIn className="lg:col-span-7" delay={0.08}>
          <div className="space-y-6">
            {profile.bio.map((p, i) => (
              <p
                key={i}
                className={`leading-[1.8] text-slate-300 ${
                  i === 0 ? 'text-lg text-slate-200' : 'text-[0.9375rem]'
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="lg:col-span-5" delay={0.14}>
          <GlassCard padding="none" className="divide-y divide-white/[0.06]">
            {meta.map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="flex items-center gap-4 p-5 sm:p-6">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}>
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </div>
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-slate-600">
                    {label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-white">{value(profile)}</p>
                </div>
              </div>
            ))}
          </GlassCard>
        </FadeIn>
      </div>

      <FadeIn className="mt-20 sm:mt-24" delay={0.1}>
        <div className="mb-10 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl text-white">How we work</h3>
          <span className="hidden text-[0.6875rem] uppercase tracking-widest text-slate-600 sm:block">
            Process
          </span>
        </div>
        <StaggerContainer className="grid gap-4 md:grid-cols-3 md:gap-5" stagger={0.1}>
          {processSteps.map((step, i) => (
            <StaggerItem key={step.n}>
              <GlassCard hover className="relative h-full">
                <span className="font-mono text-xs font-semibold text-blue-400/80">{step.n}</span>
                {i < processSteps.length - 1 && (
                  <span
                    className="absolute right-0 top-8 hidden h-px w-8 bg-gradient-to-r from-white/10 to-transparent md:block"
                    aria-hidden
                  />
                )}
                <h4 className="mt-4 font-display text-xl text-white">{step.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>
    </Section>
  );
}

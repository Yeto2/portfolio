'use client';

import { MapPin, Clock, Target } from 'lucide-react';
import type { Profile } from '@/data/content';
import { processSteps } from '@/data/content';
import { Section, SectionHeader, GlassCard } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

export default function About({ profile }: { profile: Profile }) {
  return (
    <Section id="about">
      <FadeIn>
        <SectionHeader
          eyebrow="About"
          title="Engineering with purpose"
          description="I combine full stack expertise with a product-minded approach — shipping systems that are fast, secure, and built to last."
        />
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-5">
        <FadeIn className="lg:col-span-3" delay={0.1}>
          <div className="space-y-5">
            {profile.bio.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-slate-300 lg:text-lg">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="lg:col-span-2" delay={0.2}>
          <GlassCard className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium text-white">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Availability</p>
                <p className="font-medium text-white">{profile.availability}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Focus</p>
                <p className="font-medium text-white">Full Stack · SaaS · Real-Time · AI</p>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* Process timeline */}
      <FadeIn className="mt-20" delay={0.15}>
        <h3 className="mb-8 text-xl font-semibold text-white">How we work together</h3>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step) => (
            <StaggerItem key={step.n}>
              <GlassCard hover className="relative h-full">
                <span className="font-mono text-sm font-bold text-blue-400">{step.n}</span>
                <h4 className="mt-3 text-lg font-semibold text-white">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>
    </Section>
  );
}

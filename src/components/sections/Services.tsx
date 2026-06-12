'use client';

import { Check } from 'lucide-react';
import type { Service } from '@/data/content';
import { Section, SectionHeader, GlassCard } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

export default function Services({ services }: { services: Service[] }) {
  return (
    <Section id="services" className="border-t border-white/5">
      <FadeIn>
        <SectionHeader
          eyebrow="Services"
          title="What I build for clients"
          description="From full stack applications to specialized e-commerce and API integrations — delivered with production quality and clear communication."
        />
      </FadeIn>

      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {services.map((s) => (
          <StaggerItem key={s.slug}>
            <GlassCard hover className="flex h-full flex-col">
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{s.summary}</p>
              <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-xs text-slate-300">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

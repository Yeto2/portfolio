'use client';

import { Check } from 'lucide-react';
import type { Service } from '@/data/content';
import { Section, SectionHeader, GlassCard } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

export default function Services({ services }: { services: Service[] }) {
  return (
    <Section id="services" className="bg-white/[0.006]">
      <FadeIn>
        <SectionHeader
          index="04"
          eyebrow="Services"
          title="What I deliver"
          description="From full stack applications to specialized e-commerce and API work — production quality, clear communication."
        />
      </FadeIn>

      <StaggerContainer
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        stagger={0.05}
      >
        {services.map((s, i) => (
          <StaggerItem key={s.slug}>
            <GlassCard hover className="flex h-full flex-col">
              <span className="font-mono text-[0.625rem] text-slate-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-[0.9375rem] font-semibold leading-snug text-white">
                {s.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-500">{s.summary}</p>
              <ul className="mt-5 space-y-2 border-t border-white/[0.05] pt-4">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-blue-400/80" strokeWidth={2.5} />
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

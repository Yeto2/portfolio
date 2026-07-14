'use client';

import {
  Store,
  Layers,
  Palette,
  Zap,
  LayoutTemplate,
  Smartphone,
  CreditCard,
  Sparkles,
  Wrench,
  ArrowUpRight,
} from 'lucide-react';
import type { Service } from '@/data/content';
import { Section, SectionHeader } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

const icons = {
  store: Store,
  next: Layers,
  palette: Palette,
  zap: Zap,
  layout: LayoutTemplate,
  devices: Smartphone,
  card: CreditCard,
  sparkles: Sparkles,
  wrench: Wrench,
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <Section id="services" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-0 h-64 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />

      <FadeIn>
        <SectionHeader
          index="02"
          eyebrow="Services"
          title="Everything a premium store needs."
          description="From greenfield builds to redesigns — focused on commerce that earns trust."
        />
      </FadeIn>

      <StaggerContainer className="relative z-[1] divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-[#0a0f1e]/40" stagger={0.04}>
        {services.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons] ?? Store;
          return (
            <StaggerItem key={s.title}>
              <div className="row-beam group flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7 sm:py-6">
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-blue-400/70 sm:w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:border-blue-400/40 group-hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.5)]">
                  <Icon className="h-4.5 w-4.5 h-[1.1rem] w-[1.1rem]" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.95rem] font-semibold text-white transition-colors group-hover:text-blue-100">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 group-hover:text-slate-400">
                    {s.summary}
                  </p>
                </div>
                <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-slate-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400 sm:block" />
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

'use client';

import {
  Code2,
  Zap,
  Layers,
  Smartphone,
  Search,
  Target,
  Sparkles,
  MessageSquare,
  Check,
  ArrowRight,
} from 'lucide-react';
import type { WhyItem } from '@/data/content';
import { Section, SectionHeader, Button } from '@/components/ui';
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';
import { StickyAside } from '@/components/motion/StickyAside';

const icons = {
  code: Code2,
  zap: Zap,
  layers: Layers,
  devices: Smartphone,
  search: Search,
  target: Target,
  sparkles: Sparkles,
  message: MessageSquare,
};

export default function WhyMe({ items }: { items: WhyItem[] }) {
  return (
    <Section id="why">
      <SectionHeader
        index="05"
        eyebrow="Why work with me"
        title="Premium delivery. Zero surprises."
        description="The qualities clients look for when investing in a store that represents their brand."
      />

      {/*
        Left scrolls the list; right object sticks until the list is done —
        no empty gap while you read the reasons.
      */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
        <StaggerContainer className="grid gap-2 sm:grid-cols-2" stagger={0.04}>
          {items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Sparkles;
            return (
              <StaggerItem key={item.title}>
                <div className="group relative rounded-2xl border border-transparent bg-transparent p-4 transition-all duration-400 hover:border-blue-500/20 hover:bg-blue-500/[0.04]">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition group-hover:shadow-[0_0_18px_-2px_rgba(59,130,246,0.55)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <Check className="ml-auto h-3.5 w-3.5 text-blue-500/40 opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <p className="pl-11 text-sm leading-relaxed text-slate-500 group-hover:text-slate-400">
                    {item.summary}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <StickyAside>
          <div className="glow-border relative rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-blue-500/[0.14] via-[#0a0f1e] to-[#050816] p-7 sm:p-8">
            <div
              className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl"
              aria-hidden
            />
            <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-300/90">
              The promise
            </p>
            <p className="relative mt-4 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug text-white">
              A store that looks expensive, loads fast, and earns trust at checkout.
            </p>
            <ul className="relative mt-6 space-y-3 border-t border-white/[0.06] pt-6">
              {['Clear scope before build', 'Weekly demos you can feel', 'Launch-ready handover'].map(
                (line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
                    {line}
                  </li>
                ),
              )}
            </ul>
            <div className="relative mt-7">
              <Button href="#contact" variant="primary" className="!w-full !py-3 !text-xs">
                Start a project
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </StickyAside>
      </div>
    </Section>
  );
}

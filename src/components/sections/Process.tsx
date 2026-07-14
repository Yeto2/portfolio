'use client';

import type { ProcessStep } from '@/data/content';
import { Section, SectionHeader } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

export default function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <Section id="process" className="overflow-hidden">
      <FadeIn>
        <SectionHeader
          index="06"
          eyebrow="Process"
          title="From brief to launch — without chaos."
          description="A clear path so you always know what happens next."
        />
      </FadeIn>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent lg:block"
          aria-hidden
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3" stagger={0.06}>
          {steps.map((step) => (
            <StaggerItem key={step.n}>
              <div className="group relative text-left lg:pt-2">
                <div className="mb-4 flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
                  <span className="relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-[#050816] font-mono text-[0.65rem] text-blue-300 shadow-[0_0_20px_-4px_rgba(59,130,246,0.7)] transition group-hover:border-blue-300 group-hover:shadow-[0_0_28px_-2px_rgba(59,130,246,0.9)]">
                    {step.n}
                  </span>
                  <h3 className="font-display text-lg text-white lg:text-base">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500 lg:pr-2">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}

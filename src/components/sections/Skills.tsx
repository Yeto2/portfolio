'use client';

import { Section, SectionHeader } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';

export default function Skills({ skills }: { skills: string[] }) {
  const loop = [...skills, ...skills];

  return (
    <Section id="skills" className="!py-0 pb-[var(--section-py)] overflow-hidden">
      <FadeIn>
        <SectionHeader
          index="03"
          eyebrow="Skills"
          title="The stack behind high-end stores."
        />
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="relative rounded-2xl border border-blue-500/15 bg-gradient-to-b from-blue-500/[0.06] to-transparent py-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050816] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050816] to-transparent sm:w-24" />

          <div className="overflow-hidden">
            <div className="marquee-track gap-3 px-4">
              {loop.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="inline-flex shrink-0 items-center rounded-full border border-white/[0.08] bg-[#0a0f1e]/80 px-4 py-2 text-sm text-slate-300 shadow-[0_0_0_1px_rgba(59,130,246,0.04)] transition-colors hover:border-blue-400/35 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.45)]"
                >
                  <span className="mr-2 h-1 w-1 rounded-full bg-blue-400/80" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

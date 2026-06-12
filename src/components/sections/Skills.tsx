'use client';

import { Layout, Server, ShoppingCart, Sparkles, Terminal } from 'lucide-react';
import type { SkillGroup } from '@/data/content';
import { Section, SectionHeader, GlassCard, Pill } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

const iconMap = {
  layout: Layout,
  server: Server,
  shopping: ShoppingCart,
  sparkles: Sparkles,
  terminal: Terminal,
};

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills">
      <FadeIn>
        <SectionHeader
          index="03"
          eyebrow="Expertise"
          title="Tools & technologies"
          description="A full stack toolkit — premium frontends, production backends, e-commerce platforms, and AI integrations."
          align="center"
        />
      </FadeIn>

      <StaggerContainer
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        stagger={0.07}
      >
        {groups.map((group, i) => {
          const Icon = iconMap[group.icon as keyof typeof iconMap] ?? Terminal;
          return (
            <StaggerItem key={group.category}>
              <GlassCard hover className="group h-full">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-blue-400 transition-colors duration-300 group-hover:border-blue-500/20 group-hover:bg-blue-500/[0.06]">
                    <Icon className="h-[1.125rem] w-[1.125rem]" />
                  </div>
                  <span className="font-mono text-[0.625rem] text-slate-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">{group.category}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

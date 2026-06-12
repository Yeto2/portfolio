'use client';

import {
  Layout,
  Server,
  ShoppingCart,
  Sparkles,
  Terminal,
} from 'lucide-react';
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
    <Section id="skills" className="border-t border-white/5 bg-white/[0.01]">
      <FadeIn>
        <SectionHeader
          eyebrow="Expertise"
          title="Skills & technologies"
          description="A full stack toolkit — from premium frontends to production backends, e-commerce platforms, and AI integrations."
          align="center"
        />
      </FadeIn>

      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {groups.map((group) => {
          const Icon = iconMap[group.icon as keyof typeof iconMap] ?? Terminal;
          return (
            <StaggerItem key={group.category}>
              <GlassCard hover className="h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{group.category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
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

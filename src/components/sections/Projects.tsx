'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, Truck, Shield, Bot } from 'lucide-react';
import type { Project } from '@/data/content';
import { Section, SectionHeader, Pill, Button } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

const iconMap = { truck: Truck, shield: Shield, bot: Bot };

const accents = {
  blue: {
    ring: 'group-hover:border-blue-500/30',
    glow: 'group-hover:shadow-[0_32px_80px_-24px_rgba(37,99,235,0.2)]',
    gradient: 'from-blue-600/25 via-blue-500/8 to-transparent',
    icon: 'from-blue-500 to-blue-700',
    num: 'text-blue-500/20 group-hover:text-blue-500/35',
    line: 'via-blue-500/40',
  },
  violet: {
    ring: 'group-hover:border-violet-500/30',
    glow: 'group-hover:shadow-[0_32px_80px_-24px_rgba(139,92,246,0.2)]',
    gradient: 'from-violet-600/25 via-violet-500/8 to-transparent',
    icon: 'from-violet-500 to-violet-700',
    num: 'text-violet-500/20 group-hover:text-violet-500/35',
    line: 'via-violet-500/40',
  },
  cyan: {
    ring: 'group-hover:border-cyan-500/30',
    glow: 'group-hover:shadow-[0_32px_80px_-24px_rgba(6,182,212,0.2)]',
    gradient: 'from-cyan-600/25 via-cyan-500/8 to-transparent',
    icon: 'from-cyan-500 to-cyan-700',
    num: 'text-cyan-500/20 group-hover:text-cyan-500/35',
    line: 'via-cyan-500/40',
  },
};

function ProjectMockup({ project }: { project: Project }) {
  const accent = accents[project.accent];
  const Icon = iconMap[project.icon as keyof typeof iconMap] ?? Bot;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative"
    >
      <div
        className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${accent.gradient} p-px transition-all duration-500 ${accent.ring} ${accent.glow}`}
      >
        <div className="rounded-[0.95rem] bg-[#050810]/95 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-3">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>
            <span className="mx-auto font-mono text-[10px] text-slate-600">{project.slug}</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent.icon} text-white shadow-lg`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="h-2 w-3/4 max-w-[140px] rounded-full bg-white/10" />
                <div className="mt-2 h-1.5 w-1/2 max-w-[80px] rounded-full bg-white/5" />
              </div>
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400/70" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[72, 58, 91].map((n) => (
                <div key={n} className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
                  <div className="font-mono text-[9px] text-slate-600">{n}%</div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-blue-500/40" style={{ width: `${n}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-3">
              <div className="flex gap-3">
                <div className="h-14 w-14 shrink-0 rounded-md bg-gradient-to-br from-white/[0.06] to-transparent" />
                <div className="flex flex-1 flex-col justify-center gap-2">
                  <div className="h-1.5 w-full rounded-full bg-white/8" />
                  <div className="h-1.5 w-4/5 rounded-full bg-white/5" />
                  <div className="h-1.5 w-3/5 rounded-full bg-white/[0.03]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const accent = accents[project.accent];
  const num = String(index + 1).padStart(2, '0');
  const reversed = index % 2 === 1;

  return (
    <StaggerItem>
      <article className="group relative">
        {/* Large index number */}
        <span
          className={`pointer-events-none absolute -top-6 font-display text-[5rem] leading-none transition-colors duration-500 sm:text-[7rem] ${accent.num} ${
            reversed ? 'right-0' : 'left-0'
          }`}
          aria-hidden
        >
          {num}
        </span>

        <div
          className={`relative grid items-center gap-10 pt-8 lg:grid-cols-2 lg:gap-16 xl:gap-20 ${
            reversed ? 'lg:[direction:rtl]' : ''
          }`}
        >
          <div className={`${reversed ? 'lg:[direction:ltr]' : ''} lg:pt-4`}>
            <ProjectMockup project={project} />
          </div>

          <div className={`space-y-6 ${reversed ? 'lg:[direction:ltr]' : ''}`}>
            <div>
              <p className="eyebrow mb-4">Case study</p>
              <h3 className="font-display text-2xl text-white sm:text-3xl lg:text-[2rem]">
                {project.name}
              </h3>
              <p className="mt-3 text-base text-blue-300/75">{project.tagline}</p>
            </div>

            <p className="text-[0.9375rem] leading-[1.75] text-slate-400">{project.summary}</p>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Pill key={s} mono>
                  {s}
                </Pill>
              ))}
            </div>

            <ul className="space-y-3 border-l border-white/[0.06] pl-4">
              {project.highlights.map((h) => (
                <li key={h} className="text-sm leading-relaxed text-slate-300">
                  {h}
                </li>
              ))}
            </ul>

            <div
              className={`h-px w-16 bg-gradient-to-r from-transparent ${accent.line} to-transparent`}
              aria-hidden
            />

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.liveUrl && (
                <Button href={project.liveUrl} variant="primary" external>
                  Live demo
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              )}
              {project.repoUrl && (
                <Button href={project.repoUrl} variant="secondary" external magnetic={false}>
                  <Github className="h-4 w-4" />
                  Source
                </Button>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="link-underline inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Read case study
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" className="bg-white/[0.008]">
      <FadeIn>
        <SectionHeader
          index="02"
          eyebrow="Selected work"
          title="Products, not repositories"
          description="Three production systems — each engineered end-to-end with real architecture, runnable demos, and the depth to prove it."
        />
      </FadeIn>

      <StaggerContainer className="space-y-28 sm:space-y-36 lg:space-y-44" stagger={0.12}>
        {projects.map((p, i) => (
          <ProjectCaseStudy key={p.slug} project={p} index={i} />
        ))}
      </StaggerContainer>
    </Section>
  );
}

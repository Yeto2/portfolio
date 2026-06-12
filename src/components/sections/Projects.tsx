'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Github, Truck, Shield, Bot } from 'lucide-react';
import type { Project } from '@/data/content';
import { Section, SectionHeader, Pill, Button } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

const iconMap = { truck: Truck, shield: Shield, bot: Bot };

const accentStyles = {
  blue: {
    gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/10',
    dot: 'bg-blue-400',
    bar: 'from-blue-500 to-blue-600',
  },
  violet: {
    gradient: 'from-violet-600/20 via-violet-500/10 to-transparent',
    border: 'border-violet-500/20',
    glow: 'shadow-violet-500/10',
    dot: 'bg-violet-400',
    bar: 'from-violet-500 to-violet-600',
  },
  cyan: {
    gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
    border: 'border-cyan-500/20',
    glow: 'shadow-cyan-500/10',
    dot: 'bg-cyan-400',
    bar: 'from-cyan-500 to-cyan-600',
  },
};

function ProjectMockup({ project }: { project: Project }) {
  const style = accentStyles[project.accent];
  const Icon = iconMap[project.icon as keyof typeof iconMap] ?? Bot;

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${style.border} bg-gradient-to-br ${style.gradient} p-1`}>
      <div className="rounded-xl bg-[#0a0f1e]/90 p-4 backdrop-blur-sm">
        {/* Browser chrome */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-[10px] text-slate-500">
            {project.slug}.demo
          </div>
        </div>
        {/* Mock UI */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${style.bar} text-white shadow-lg`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="h-2.5 w-32 rounded-full bg-white/10" />
              <div className="mt-1.5 h-2 w-20 rounded-full bg-white/5" />
            </div>
            <span className={`h-2 w-2 rounded-full ${style.dot} animate-pulse`} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="h-1.5 w-8 rounded-full bg-white/10" />
                <div className="mt-2 h-4 w-full rounded bg-white/5" />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="flex gap-2">
              <div className="h-16 flex-1 rounded-md bg-gradient-to-br from-white/5 to-white/[0.02]" />
              <div className="space-y-2 flex-1">
                <div className="h-2 w-full rounded-full bg-white/10" />
                <div className="h-2 w-3/4 rounded-full bg-white/5" />
                <div className="h-2 w-1/2 rounded-full bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <StaggerItem>
      <article className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? 'lg:[direction:rtl]' : ''}`}>
        <div className={reversed ? 'lg:[direction:ltr]' : ''}>
          <ProjectMockup project={project} />
        </div>

        <div className={`space-y-6 ${reversed ? 'lg:[direction:ltr]' : ''}`}>
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
              Case Study {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white lg:text-3xl">{project.name}</h3>
            <p className="mt-2 text-blue-300/80">{project.tagline}</p>
          </div>

          <p className="leading-relaxed text-slate-400">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>

          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-slate-300">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="primary" external>
                Live demo
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="secondary" external>
                <Github className="h-4 w-4" />
                Source code
              </Button>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Full case study
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" className="border-t border-white/5">
      <FadeIn>
        <SectionHeader
          eyebrow="Selected Work"
          title="Production-grade case studies"
          description="Three complete systems — each with a typed backend, polished frontend, and architecture you can explore in depth. Not slideware. Runnable demos."
        />
      </FadeIn>

      <StaggerContainer className="space-y-24 lg:space-y-32" stagger={0.15}>
        {projects.map((p, i) => (
          <ProjectCaseStudy key={p.slug} project={p} index={i} />
        ))}
      </StaggerContainer>
    </Section>
  );
}

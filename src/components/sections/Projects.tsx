'use client';

import { ArrowUpRight, ExternalLink, Github, ArrowRight } from 'lucide-react';
import type { Project } from '@/data/content';
import { Section, SectionHeader, Badge, Button } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

const accentGlow: Record<Project['accent'], string> = {
  blue: 'from-blue-500/25 via-blue-600/5 to-transparent',
  sky: 'from-sky-400/25 via-sky-600/5 to-transparent',
  cyan: 'from-cyan-400/25 via-cyan-600/5 to-transparent',
  violet: 'from-violet-400/25 via-violet-600/5 to-transparent',
  indigo: 'from-indigo-400/25 via-indigo-600/5 to-transparent',
};

function FeaturedStore({ project }: { project: Project }) {
  return (
    <article className="glow-border group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0f1e]/70">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentGlow[project.accent]} opacity-80`} />
      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-10">
        <div>
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-blue-300/90">
            Featured store · {project.tagline}
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] leading-none text-white">
            {project.name}
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
            {project.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <Badge key={t} variant="live">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {project.liveUrl ? (
            <Button href={project.liveUrl} variant="primary" external className="!py-2.5 !text-xs">
              Visit live store
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          ) : null}
          <Button
            href={project.caseStudyUrl}
            variant="secondary"
            magnetic={false}
            className="!py-2.5 !text-xs"
          >
            Case study
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}

function SystemRow({ project }: { project: Project }) {
  return (
    <div className="row-beam group flex items-start gap-4 rounded-xl border border-white/[0.06] px-4 py-4 sm:items-center sm:px-5">
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)] sm:mt-0" />
      <a href={project.caseStudyUrl} className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-medium text-white group-hover:text-blue-100">{project.name}</h3>
          <span className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-600">
            {project.tagline}
          </span>
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-slate-500">{project.summary}</p>
      </a>
      <div className="flex items-center gap-2">
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/[0.08] p-2 text-slate-500 transition hover:border-blue-500/30 hover:text-blue-300"
            aria-label={`${project.name} on GitHub`}
          >
            <Github className="h-3.5 w-3.5" />
          </a>
        ) : null}
        <a href={project.caseStudyUrl} aria-label={`Case study: ${project.name}`}>
          <ArrowUpRight className="h-4 w-4 text-slate-700 transition group-hover:text-blue-400" />
        </a>
      </div>
    </div>
  );
}

export default function Projects({
  commerce = [],
  systems = [],
}: {
  commerce?: Project[];
  systems?: Project[];
}) {
  return (
    <Section id="projects">
      <FadeIn>
        <SectionHeader
          index="04"
          eyebrow="Selected work"
          title="One live store. Three systems."
          description="Commerce in production — plus engineering demos that prove depth beyond themes."
        />
      </FadeIn>

      {commerce.length > 0 && (
        <StaggerContainer className="space-y-4" stagger={0.08}>
          {commerce.map((project) => (
            <StaggerItem key={project.slug}>
              <FeaturedStore project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {systems.length > 0 && (
        <>
          <FadeIn delay={0.1} className="mb-4 mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Systems & platforms
            </h3>
          </FadeIn>
          <StaggerContainer className="space-y-2" stagger={0.05}>
            {systems.map((project) => (
              <StaggerItem key={project.slug}>
                <SystemRow project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </>
      )}

      <FadeIn delay={0.12} className="mt-10">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-300"
        >
          Need a store or a platform build?
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </FadeIn>
    </Section>
  );
}

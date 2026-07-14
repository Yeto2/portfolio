import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { profile, projects, getProject } from '@/data/content';
import { GlassCard, Badge, Button } from '@/components/ui';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <NavBar name={profile.name} />
      <main className="px-5 pb-20 pt-[calc(var(--nav-height,5.25rem)+2rem)] sm:px-6">
        <div className="mx-auto max-w-[var(--content-max)]">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>

          <div className="mt-8 max-w-2xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-blue-400/80">
              {project.category === 'commerce' ? 'E-commerce' : 'Systems'} · {project.tagline}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] text-white">
              {project.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400">{project.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Button href={project.liveUrl} variant="primary" external>
                  Live site
                  <ExternalLink className="h-4 w-4" />
                </Button>
              ) : null}
              {project.repoUrl ? (
                <Button href={project.repoUrl} variant="secondary" external magnetic={false}>
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h2 className="font-display text-lg text-white">Problem</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.problem}</p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display text-lg text-white">Solution</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.solution}</p>
            </GlassCard>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h2 className="font-display text-lg text-white">Features</h2>
              <ul className="mt-3 space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="text-sm text-slate-400">
                    <span className="mr-2 text-blue-400/70">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display text-lg text-white">Results</h2>
              <ul className="mt-3 space-y-2">
                {project.results.map((r) => (
                  <li key={r} className="text-sm text-slate-400">
                    <span className="mr-2 text-blue-400/70">·</span>
                    {r}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

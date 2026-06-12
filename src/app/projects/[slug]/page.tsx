import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  CheckCircle,
  AlertTriangle,
  Trophy,
} from 'lucide-react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { profile, projects, getProject } from '@/data/content';
import { GlassCard, Pill, Button, Badge } from '@/components/ui';

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
      <main className="px-6 pb-24 pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          {/* Hero */}
          <header className="mt-8">
            <Badge>{project.demo}</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>
            <p className="mt-3 text-lg text-blue-300/90">{project.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Pill key={s} accent>{s}</Pill>
              ))}
            </div>
            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-6 flex flex-wrap gap-3">
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
              </div>
            )}
          </header>

          <p className="mt-10 text-lg leading-relaxed text-slate-300">{project.summary}</p>

          {/* Features + Results grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <GlassCard>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                Key features
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Trophy className="h-5 w-5 text-emerald-400" />
                Results & impact
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Challenges */}
          <section className="mt-12">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Challenges solved
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {project.challenges.map((c, i) => (
                <GlassCard key={c} hover>
                  <span className="font-mono text-xs font-bold text-red-400/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{c}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <SectionBlock title="Architecture">
            <GlassCard>
              <p className="leading-relaxed text-slate-300">{project.architecture}</p>
            </GlassCard>
          </SectionBlock>

          {/* Highlights */}
          <SectionBlock title="Engineering highlights">
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="glass rounded-xl px-5 py-4 text-sm text-slate-300">
                  {h}
                </li>
              ))}
            </ul>
          </SectionBlock>

          {/* Schema */}
          <SectionBlock title="Database schema">
            <div className="grid gap-4 sm:grid-cols-2">
              {project.schema.map((t) => (
                <GlassCard key={t.name}>
                  <code className="text-sm font-semibold text-blue-300">{t.name}</code>
                  <p className="mt-1 text-xs text-slate-500">{t.purpose}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.columns.map((c) => (
                      <span key={c} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                        {c}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </SectionBlock>

          {/* API */}
          <SectionBlock title="API design">
            <div className="space-y-4">
              {project.apiGroups.map((g) => (
                <GlassCard key={g.group}>
                  <p className="text-sm font-semibold text-white">{g.group}</p>
                  <ul className="mt-3 space-y-2">
                    {g.routes.map((r) => (
                      <li key={`${r.method}${r.path}`} className="flex flex-wrap items-baseline gap-2 text-sm">
                        <MethodBadge method={r.method} />
                        <code className="font-mono text-slate-200">{r.path}</code>
                        <span className="text-slate-500">— {r.desc}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </SectionBlock>

          {/* Realtime */}
          {project.realtime.length > 0 && (
            <SectionBlock title="Real-time events">
              <GlassCard>
                <ul className="space-y-3">
                  {project.realtime.map((e) => (
                    <li key={e.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                          e.direction === 'in'
                            ? 'bg-sky-500/15 text-sky-300'
                            : 'bg-fuchsia-500/15 text-fuchsia-300'
                        }`}
                      >
                        {e.direction === 'in' ? 'client → server' : 'server → client'}
                      </span>
                      <code className="font-mono font-semibold text-blue-300">{e.name}</code>
                      <span className="text-slate-400">{e.desc}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </SectionBlock>
          )}

          {/* Folder structure */}
          <SectionBlock title="Project structure">
            <GlassCard className="overflow-x-auto">
              <pre className="font-mono text-xs leading-relaxed text-slate-400">{project.folders}</pre>
            </GlassCard>
          </SectionBlock>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-500/15 text-emerald-300',
  POST: 'bg-blue-500/15 text-blue-300',
  PATCH: 'bg-amber-500/15 text-amber-300',
  DELETE: 'bg-red-500/15 text-red-300',
  WS: 'bg-fuchsia-500/15 text-fuchsia-300',
};

function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`inline-block w-12 shrink-0 rounded px-1.5 py-0.5 text-center font-mono text-[10px] font-semibold ${
        METHOD_COLORS[method] ?? 'bg-slate-500/15 text-slate-300'
      }`}
    >
      {method}
    </span>
  );
}

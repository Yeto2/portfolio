import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, getProfile } from '@/lib/api';
import { Pill, Card, MethodBadge } from '@/components/ui';
import { Icon, CheckIcon, ChevronIcon, ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from '@/components/icons';
import NavBar from '@/components/NavBar';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, profile] = await Promise.all([getProject(slug), getProfile()]);
  if (!project) notFound();

  return (
    <>
      <NavBar name={profile.name} />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300"
        >
          <ChevronIcon className="h-4 w-4 rotate-180" />
          Back to projects
        </Link>

        <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
          <Icon name={project.icon} className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">{project.name}</h1>
        <p className="mt-2 text-lg text-indigo-300">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>

        {project.demo && (
          <p className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-500/[0.06] px-4 py-2.5 text-sm text-emerald-300/90">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            {project.demo}
          </p>
        )}

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                View live demo
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5"
              >
                <GithubIcon className="h-4 w-4" />
                View source code
              </a>
            )}
          </div>
        )}

        <p className="mt-8 leading-relaxed text-zinc-300">{project.summary}</p>

        {/* Features + highlights */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-white">Key features</h2>
            <ul className="mt-4 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-zinc-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-white">Engineering highlights</h2>
            <ul className="mt-4 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-zinc-300">
                  <ArrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Architecture */}
        <SectionHeading>Architecture</SectionHeading>
        <Card>
          <p className="leading-relaxed text-zinc-300">{project.architecture}</p>
        </Card>

        {/* Database schema */}
        <SectionHeading>Database schema</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.schema.map((t) => (
            <Card key={t.name}>
              <p className="font-mono text-sm font-semibold text-indigo-300">{t.name}</p>
              <p className="mt-1 text-xs text-zinc-400">{t.purpose}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.columns.map((c) => (
                  <span
                    key={c}
                    className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* API design */}
        <SectionHeading>API design</SectionHeading>
        <div className="space-y-5">
          {project.apiGroups.map((g) => (
            <Card key={g.group}>
              <p className="text-sm font-semibold text-white">{g.group}</p>
              <ul className="mt-3 space-y-2">
                {g.routes.map((r) => (
                  <li key={`${r.method}${r.path}`} className="flex items-start gap-3 text-sm">
                    <MethodBadge method={r.method} />
                    <code className="font-mono text-zinc-200">{r.path}</code>
                    <span className="text-zinc-500">— {r.desc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Real-time events (only if present) */}
        {project.realtime.length > 0 && (
          <>
            <SectionHeading>Real-time events</SectionHeading>
            <Card>
              <ul className="space-y-3">
                {project.realtime.map((e) => (
                  <li key={e.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
                        e.direction === 'in'
                          ? 'bg-sky-500/15 text-sky-300'
                          : 'bg-fuchsia-500/15 text-fuchsia-300'
                      }`}
                    >
                      {e.direction === 'in' ? 'client → server' : 'server → client'}
                    </span>
                    <code className="font-mono font-semibold text-indigo-300">{e.name}</code>
                    <code className="font-mono text-xs text-zinc-500">{e.payload}</code>
                    <span className="w-full text-zinc-400 sm:w-auto sm:flex-1">{e.desc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </>
        )}

        {/* Folder structure */}
        <SectionHeading>Folder structure</SectionHeading>
        <Card className="overflow-x-auto">
          <pre className="font-mono text-xs leading-relaxed text-zinc-300">{project.folders}</pre>
        </Card>

        <p className="mt-8 text-sm text-zinc-500">
          Full written system design (extended schema, ETA math, scaling notes):{' '}
          <code className="text-indigo-300">{project.docPath}</code>
        </p>
      </main>
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 mt-12 text-2xl font-bold tracking-tight text-white">{children}</h2>;
}

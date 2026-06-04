import Link from 'next/link';
import { Icon, CheckIcon, ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from './icons';

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-20">
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-400">{eyebrow}</p>
      )}
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
      {children}
    </span>
  );
}

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-500/15 text-emerald-300',
  POST: 'bg-indigo-500/15 text-indigo-300',
  PATCH: 'bg-amber-500/15 text-amber-300',
  DELETE: 'bg-rose-500/15 text-rose-300',
  WS: 'bg-fuchsia-500/15 text-fuchsia-300',
};

export function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`inline-block w-14 shrink-0 rounded px-1.5 py-0.5 text-center font-mono text-[11px] font-semibold ${
        METHOD_COLORS[method] ?? 'bg-zinc-500/15 text-zinc-300'
      }`}
    >
      {method}
    </span>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function ProjectTile({
  project,
}: {
  project: {
    slug: string;
    name: string;
    icon: string;
    tagline: string;
    summary: string;
    demo?: string;
    liveUrl?: string;
    repoUrl?: string;
    stack: string[];
    highlights: string[];
  };
}) {
  return (
    <Card className="card-hover flex flex-col">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
        <Icon name={project.icon} className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
      <p className="mt-1 text-sm text-indigo-300">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{project.summary}</p>

      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-zinc-300">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {project.demo && (
        <p className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-500/[0.06] px-3 py-2 text-xs text-emerald-300/90">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          {project.demo}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              Live demo
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5"
            >
              <GithubIcon className="h-4 w-4" />
              Code
            </a>
          )}
        </div>
      )}

      <Link
        href={`/projects/${project.slug}`}
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
      >
        View architecture
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Card>
  );
}

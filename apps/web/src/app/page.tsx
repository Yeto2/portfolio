import { getProfile, getServices, getProjects } from '@/lib/api';
import { Section, Pill, Card, ProjectTile } from '@/components/ui';
import {
  Icon,
  CheckIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  SocialIcon,
  SparkIcon,
  LayersIcon,
  DatabaseIcon,
  ShieldIcon,
} from '@/components/icons';
import ContactForm from '@/components/ContactForm';
import NavBar from '@/components/NavBar';

export default async function HomePage() {
  const [profile, services, projects] = await Promise.all([
    getProfile(),
    getServices(),
    getProjects(),
  ]);

  return (
    <main>
      <NavBar name={profile.name} />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {profile.availability}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
            I build <span className="text-gradient">production backends</span> that hold up under real traffic.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">{profile.headline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
            >
              View my work
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Start a project
            </a>
          </div>

          {/* Trust signals row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <ShieldIcon className="h-4 w-4 text-indigo-400" /> Secure auth &amp; payments
            </span>
            <span className="inline-flex items-center gap-2">
              <DatabaseIcon className="h-4 w-4 text-indigo-400" /> Solid data modeling
            </span>
            <span className="inline-flex items-center gap-2">
              <LayersIcon className="h-4 w-4 text-indigo-400" /> Built to scale
            </span>
          </div>
        </div>
      </header>

      {/* Metrics band */}
      <div className="border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/10 px-6 sm:grid-cols-4">
          {profile.metrics.map((m) => (
            <div key={m.label} className="px-4 py-8 text-center first:pl-0">
              <p className="text-2xl font-bold text-white sm:text-3xl">{m.value}</p>
              <p className="mt-1 text-xs leading-tight text-zinc-500">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <Section id="about" eyebrow="About" title="What I do">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {profile.bio.map((p, i) => (
              <p key={i} className="leading-relaxed text-zinc-300">
                {p}
              </p>
            ))}
          </div>
          <Card>
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <SparkIcon className="h-4 w-4 text-indigo-400" />
              Skills &amp; tooling
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" eyebrow="Services" title="How I can help">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.slug} className="card-hover">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                <Icon name={s.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-zinc-300">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        eyebrow="Portfolio"
        title="Three production projects — with runnable demos"
      >
        <p className="-mt-6 mb-10 max-w-2xl text-zinc-400">
          Each project below is a complete, runnable system: a typed backend plus a polished
          frontend you can actually click through — not slideware. Open any one for the full
          architecture, schema, and API design.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* How I work */}
      <Section id="process" eyebrow="Process" title="How we'll work together">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { n: '01', t: 'Scope & plan', d: 'We define the system, data model, and milestones up front — you get a clear written plan and honest timeline before any code.' },
            { n: '02', t: 'Build in the open', d: 'Incremental delivery with tests and docs as I go. You always have something runnable and can see progress, not a black box.' },
            { n: '03', t: 'Hand off clean', d: 'Documented, Dockerized, and ready for your team to extend — plus support while you get it into production.' },
          ].map((step) => (
            <Card key={step.n}>
              <p className="font-mono text-sm font-semibold text-indigo-400">{step.n}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Contact" title="Let's build something">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <p className="leading-relaxed text-zinc-300">
              Tell me what you are building and your timeline. I reply to every serious inquiry,
              usually within a day.
            </p>
            <div className="flex flex-wrap gap-3">
              {profile.social.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:border-indigo-400/40 hover:bg-white/5"
                >
                  <SocialIcon label={s.label} className="h-4 w-4 text-indigo-300" />
                  {s.label}
                  <ArrowUpRightIcon className="h-3.5 w-3.5 text-zinc-500 transition group-hover:text-indigo-300" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <CheckIcon className="h-4 w-4 text-emerald-400" />
              {profile.location} · {profile.availability}
            </div>
          </div>
          <Card>
            <ContactForm />
          </Card>
        </div>
      </Section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js + Fastify.
      </footer>
    </main>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/content';
import { Logo } from '@/components/ui/Logo';
import { SectionDivider } from '@/components/ui';

const pageLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#projects', label: 'Work' },
  { href: '/#why', label: 'Why me' },
  { href: '/#process', label: 'Process' },
  { href: '/#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 pb-8 pt-2 sm:px-6">
      <div className="mx-auto max-w-[var(--content-max)]">
        <SectionDivider />

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.1] via-[#0a0f1e] to-[#050816]">
          <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-10 lg:p-10">
            <div>
              <a href="/" className="inline-flex items-center gap-3">
                <Logo size="md" />
                <span>
                  <span className="block font-display text-xl text-white">{profile.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    WooCommerce & Next.js · Premium stores
                  </span>
                </span>
              </a>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                Premium storefronts that feel expensive, load fast, and convert — built for brands
                that care about every detail at checkout.
              </p>
              <a
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_28px_-10px_rgba(59,130,246,0.65)] transition hover:bg-blue-500"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Navigate
              </p>
              <nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5" aria-label="Footer sections">
                {pageLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Connect
              </p>
              <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer social">
                {profile.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    {...(s.url.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] px-7 py-4 text-xs text-slate-600 sm:flex-row sm:px-9 lg:px-10">
            <p>© {year} {profile.name}. All rights reserved.</p>
            <p className="text-slate-700">Available for premium WooCommerce builds</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

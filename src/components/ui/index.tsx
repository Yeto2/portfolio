import type { ReactNode } from 'react';
import { MagneticLink } from '@/components/motion/MagneticLink';

export function GlassCard({
  children,
  className = '',
  hover = false,
  padding = 'default',
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'default' | 'lg' | 'none';
}) {
  const pad = padding === 'lg' ? 'p-8' : padding === 'none' ? '' : 'p-6';
  return (
    <div
      className={`glass rounded-2xl ${pad} ${hover ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  index,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  index?: string;
}) {
  const alignClass = align === 'center' ? 'mx-auto text-center items-center' : '';
  return (
    <div className={`mb-14 max-w-3xl flex flex-col ${alignClass}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 ${align === 'center' ? 'justify-center' : ''}`}>
          {index && <span className="text-slate-600">{index}</span>}
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-[1.0625rem] leading-[1.7] text-slate-400">{description}</p>
      )}
    </div>
  );
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'live' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium ${
        variant === 'live'
          ? 'border border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-400'
          : 'border border-white/10 bg-white/[0.04] text-slate-300'
      }`}
    >
      {variant === 'live' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
      )}
      {children}
    </span>
  );
}

export function Pill({
  children,
  accent,
  mono,
}: {
  children: ReactNode;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide ${
        mono ? 'font-mono' : ''
      } ${
        accent
          ? 'border border-blue-500/25 bg-blue-500/[0.08] text-blue-300'
          : 'border border-white/[0.08] bg-white/[0.03] text-slate-400'
      }`}
    >
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = 'primary',
  external,
  className = '',
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
  className?: string;
  magnetic?: boolean;
}) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400';
  const variants = {
    primary:
      'bg-blue-600 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_8px_32px_-8px_rgba(37,99,235,0.55)] hover:bg-blue-500 active:bg-blue-700',
    secondary:
      'glass text-white hover:border-white/20',
    ghost: 'text-slate-400 hover:bg-white/[0.04] hover:text-white',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (magnetic) {
    return (
      <MagneticLink href={href} className={cls} external={external} strength={0.18}>
        {variant === 'primary' && (
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.06] to-white/[0.12] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
        <span className="relative flex items-center gap-2">{children}</span>
      </MagneticLink>
    );
  }

  const props = external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} className={cls} {...props}>
      {children}
    </a>
  );
}

export function Section({
  id,
  children,
  className = '',
  divider = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 sm:px-6 ${className}`}
      style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
    >
      {divider && (
        <div className="section-divider absolute inset-x-0 top-0 mx-auto max-w-4xl" aria-hidden />
      )}
      <div className="mx-auto max-w-[var(--content-max)]">{children}</div>
    </section>
  );
}

export function SectionDivider() {
  return <div className="section-divider mx-auto max-w-4xl" aria-hidden />;
}

export function ScrollIndicator({ href = '#about' }: { href?: string }) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-3 text-slate-500 transition-colors hover:text-slate-300"
      aria-label="Scroll to content"
    >
      <span className="text-[0.625rem] font-medium uppercase tracking-[0.25em]">Explore</span>
      <span className="relative h-10 w-px overflow-hidden bg-white/10">
        <span className="scroll-line absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600" />
      </span>
    </a>
  );
}

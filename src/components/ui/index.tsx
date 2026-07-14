'use client';

import type { ReactNode } from 'react';
import { MagneticLink } from '@/components/motion/MagneticLink';

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 py-[var(--section-py)] sm:px-6 ${className}`}
    >
      <div className="mx-auto w-full max-w-[var(--content-max)]">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  index,
  className = '',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
  className?: string;
}) {
  return (
    <div className={`mb-8 max-w-2xl lg:mb-10 ${className}`}>
      <div className="mb-3 flex items-center gap-3">
        {index && (
          <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-blue-400/80">
            {index}
          </span>
        )}
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.1] text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-400">{description}</p>
      )}
    </div>
  );
}

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

export function Badge({
  children,
  variant = 'default',
}: {
  children: ReactNode;
  variant?: 'default' | 'live';
}) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[0.6875rem] font-medium ${
        variant === 'live'
          ? 'border-blue-500/25 bg-blue-500/10 text-blue-300'
          : 'border-white/[0.08] bg-white/[0.03] text-slate-400'
      }`}
    >
      {children}
    </span>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  magnetic = true,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
  magnetic?: boolean;
  className?: string;
}) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400';

  const variants = {
    primary:
      'btn-shimmer bg-blue-600 text-white shadow-[0_8px_28px_-8px_rgba(59,130,246,0.65)] hover:bg-blue-500 hover:shadow-[0_10px_36px_-8px_rgba(59,130,246,0.8)]',
    secondary:
      'border border-white/[0.1] bg-white/[0.03] text-white hover:border-blue-500/30 hover:bg-white/[0.05]',
    ghost: 'text-slate-400 hover:text-white',
  };

  const props = {
    href,
    className: `${base} ${variants[variant]} ${className}`,
    ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  };

  if (magnetic && variant !== 'ghost') {
    return (
      <MagneticLink {...props} strength={0.14}>
        {children}
      </MagneticLink>
    );
  }

  return <a {...props}>{children}</a>;
}

export function SectionDivider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />;
}

export function ScrollIndicator({ href = '#about' }: { href?: string }) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-3 text-slate-600 transition-colors hover:text-slate-400"
      aria-label="Scroll to about"
    >
      <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em]">Scroll</span>
      <span className="relative h-10 w-px overflow-hidden bg-white/10">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-breathe bg-gradient-to-b from-blue-400 to-transparent" />
      </span>
    </a>
  );
}

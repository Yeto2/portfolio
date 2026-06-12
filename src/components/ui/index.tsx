import type { ReactNode } from 'react';

export function GlassCard({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${hover ? 'transition-all duration-300 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5' : ''} ${className}`}
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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`mb-12 max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-slate-400">{description}</p>
      )}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
      {children}
    </span>
  );
}

export function Pill({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        accent
          ? 'border border-blue-500/30 bg-blue-500/10 text-blue-300'
          : 'border border-white/10 bg-white/5 text-slate-300'
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
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
  className?: string;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400';
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/30',
    secondary:
      'glass text-white hover:border-white/20 hover:bg-white/5',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  };

  const props = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

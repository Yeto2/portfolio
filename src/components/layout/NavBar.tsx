'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticLink } from '@/components/motion/MagneticLink';
import { Logo } from '@/components/ui/Logo';

const links = [
  { href: '/#about', id: 'about', label: 'About' },
  { href: '/#services', id: 'services', label: 'Services' },
  { href: '/#projects', id: 'projects', label: 'Work' },
  { href: '/#why', id: 'why', label: 'Why me' },
  { href: '/#process', id: 'process', label: 'Process' },
  { href: '/#contact', id: 'contact', label: 'Contact' },
];

export default function NavBar({ name }: { name: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const activeLabel = links.find((l) => l.id === active)?.label ?? '';
  const firstName = name.split(' ')[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.12, 0.35] },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.style.setProperty('--nav-height', `${el.offsetHeight}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scrolled, open]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 px-5 transition-[padding] duration-500 sm:px-6 ${
          scrolled ? 'pt-3' : 'pt-4'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
      >
        <div
          className={`relative mx-auto w-full max-w-[var(--content-max)] transition-all duration-500 ${
            scrolled ? 'pb-0' : 'pb-1'
          }`}
        >
          <div
            className={`relative flex items-center justify-between gap-3 px-3.5 transition-all duration-500 sm:px-4 ${
              scrolled
                ? 'glass-strong rounded-2xl border border-white/[0.1] py-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.65),0_0_0_1px_rgba(59,130,246,0.08)]'
                : 'rounded-2xl border border-transparent bg-transparent py-2.5'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            <a href="/" className="group flex min-w-0 shrink-0 items-center gap-2.5">
              <Logo
                size="sm"
                className="transition-transform duration-300 group-hover:scale-[1.05]"
              />
              <span className="hidden min-w-0 flex-col sm:flex">
                <span className="truncate text-sm font-semibold tracking-tight text-white">
                  {firstName}
                </span>
                <span className="truncate text-[0.625rem] tracking-wide text-slate-500">
                  {scrolled && activeLabel ? activeLabel : 'WooCommerce · Next.js'}
                </span>
              </span>
            </a>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <a
                      href={l.href}
                      className={`relative rounded-lg px-3 py-2 text-[0.8125rem] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                      }`}
                    >
                      <span className="relative z-10">{l.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-blue-500/15 ring-1 ring-blue-400/25"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <MagneticLink
                href="/#contact"
                className="hidden rounded-xl bg-blue-600 px-3.5 py-2 text-[0.8125rem] font-semibold text-white shadow-[0_4px_22px_-6px_rgba(59,130,246,0.6)] transition-colors hover:bg-blue-500 sm:inline-flex"
                strength={0.15}
              >
                Let&apos;s talk
              </MagneticLink>

              <button
                type="button"
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 text-slate-400 transition hover:border-blue-400/30 hover:text-white lg:hidden"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <div
              className="pointer-events-none absolute inset-x-3 bottom-0 h-[2px] overflow-hidden rounded-full bg-white/[0.04] sm:inset-x-4"
              aria-hidden
            >
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300"
                style={{ scaleX: progress }}
              />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-1 px-6 pt-[var(--nav-height,5rem)]">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className={`w-full max-w-xs rounded-2xl py-3.5 text-center text-xl font-medium transition ${
                    active === l.id
                      ? 'bg-blue-500/15 text-white ring-1 ring-blue-400/25'
                      : 'text-white hover:bg-white/[0.04]'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="/#contact"
                className="mt-5 w-full max-w-xs rounded-2xl bg-blue-600 py-4 text-center text-lg font-semibold text-white shadow-[0_12px_40px_-12px_rgba(59,130,246,0.7)]"
                onClick={() => setOpen(false)}
              >
                Let&apos;s talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

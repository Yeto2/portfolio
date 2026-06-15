'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticLink } from '@/components/motion/MagneticLink';
import { Logo } from '@/components/ui/Logo';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar({ name }: { name: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  const activeLabel = links.find((l) => l.href === active)?.label ?? '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: '-32% 0px -55% 0px', threshold: [0, 0.15, 0.4] },
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

    const syncNavHeight = () => {
      document.documentElement.style.setProperty('--nav-height', `${el.offsetHeight}px`);
    };

    syncNavHeight();
    const ro = new ResizeObserver(syncNavHeight);
    ro.observe(el);
    window.addEventListener('resize', syncNavHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncNavHeight);
    };
  }, [scrolled, open]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background] duration-500 ${
          scrolled ? 'py-2.5' : 'py-5'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
      >
        <div
          className={`relative mx-auto max-w-[var(--content-max)] px-5 transition-all duration-500 sm:px-6 ${
            scrolled
              ? 'glass-strong overflow-hidden rounded-2xl border border-white/[0.08] py-2 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.55)]'
              : ''
          }`}
        >
          {scrolled && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          <nav className="flex items-center justify-between gap-4" aria-label="Main">
            <a href="#" className="group flex min-w-0 shrink-0 items-center gap-2.5">
              <Logo
                size="sm"
                className="ring-1 ring-white/[0.06] transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <span className="hidden min-w-0 flex-col sm:flex">
                <span className="truncate text-sm font-medium text-white">{name.split(' ')[0]}</span>
                <AnimatePresence mode="wait">
                  {scrolled && activeLabel ? (
                    <motion.span
                      key={activeLabel}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="truncate text-[0.625rem] font-medium uppercase tracking-[0.14em] text-blue-400/90"
                    >
                      {activeLabel}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="role"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="truncate text-[0.625rem] text-slate-500"
                    >
                      Portfolio
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </a>

            <ul className="hidden items-center gap-0.5 md:flex">
              {links.map((l) => {
                const isActive = active === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`relative rounded-lg px-3.5 py-2 text-[0.8125rem] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                      }`}
                    >
                      <span
                        className={`relative z-10 transition-transform duration-300 ${
                          isActive ? 'translate-y-0' : ''
                        }`}
                      >
                        {l.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li className="ml-2">
                <MagneticLink
                  href="#contact"
                  className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-[0.8125rem] font-semibold text-white shadow-[0_4px_20px_-6px_rgba(37,99,235,0.55)] transition-colors hover:bg-blue-500"
                  strength={0.15}
                >
                  Hire me
                </MagneticLink>
              </li>
            </ul>

            <button
              type="button"
              className={`rounded-xl border p-2.5 transition md:hidden ${
                open
                  ? 'border-white/15 bg-white/[0.06] text-white'
                  : 'border-white/[0.08] text-slate-400 hover:border-white/15 hover:text-white'
              }`}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>

          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-4 bottom-0 h-px overflow-hidden rounded-full bg-white/[0.04] sm:inset-x-5"
                aria-hidden
              >
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400"
                  style={{ scaleX: progress }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#020408]/92 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col items-center justify-center gap-1 px-6 pt-[var(--nav-height,5rem)]"
            >
              {activeLabel && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-blue-400/80"
                >
                  Viewing · {activeLabel}
                </motion.p>
              )}
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className={`w-full max-w-xs rounded-2xl py-4 text-center text-xl font-medium transition hover:bg-white/[0.04] ${
                    active === l.href ? 'bg-white/[0.04] text-blue-300' : 'text-white'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-4 w-full max-w-xs rounded-2xl bg-blue-600 py-4 text-center text-lg font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Hire me
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

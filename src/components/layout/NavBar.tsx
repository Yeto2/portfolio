'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticLink } from '@/components/motion/MagneticLink';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
      >
        <div
          className={`mx-auto max-w-[var(--content-max)] px-5 transition-all duration-500 sm:px-6 ${
            scrolled ? 'glass-strong rounded-2xl py-2.5 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)]' : ''
          }`}
        >
          <nav className="flex items-center justify-between" aria-label="Main">
            <a href="#" className="group flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-xs font-bold text-white shadow-[0_4px_16px_-4px_rgba(37,99,235,0.6)]">
                <span className="absolute inset-0 bg-gradient-to-t from-blue-700 to-blue-500" />
                <span className="relative">{name.charAt(0)}</span>
              </span>
              <span className="hidden text-sm font-medium text-white sm:block">
                {name.split(' ')[0]}
              </span>
            </a>

            <ul className="hidden items-center gap-0.5 md:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative rounded-lg px-3.5 py-2 text-[0.8125rem] transition-colors duration-300 ${
                      active === l.href
                        ? 'text-white'
                        : 'text-slate-500 hover:text-slate-200'
                    }`}
                  >
                    {l.label}
                    {active === l.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
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
              className="rounded-xl border border-white/[0.08] p-2.5 text-slate-400 transition hover:border-white/15 hover:text-white md:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#020408]/90 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col items-center justify-center gap-1 px-6"
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="w-full max-w-xs rounded-2xl py-4 text-center text-xl font-medium text-white transition hover:bg-white/[0.04]"
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

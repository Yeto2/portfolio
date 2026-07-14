'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial } from '@/data/content';
import { Section, SectionHeader } from '@/components/ui';
import { FadeIn } from '@/components/motion/FadeIn';

const AUTO_MS = 5500;

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const hoverRef = useRef(false);
  const t = items[active] ?? items[0];

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % items.length);
    setProgressKey((k) => k + 1);
  }, [items.length]);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, next, items.length, progressKey]);

  return (
    <Section id="testimonials">
      <FadeIn>
        <SectionHeader
          index="07"
          eyebrow="Testimonials"
          title="Trust, in their words."
        />
      </FadeIn>

      <FadeIn delay={0.08}>
        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.08] via-[#0a0f1e] to-[#050816] px-6 py-10 sm:px-12 sm:py-14"
          onMouseEnter={() => {
            hoverRef.current = true;
            setPaused(true);
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
            setPaused(false);
            setProgressKey((k) => k + 1);
          }}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null) && !hoverRef.current) {
              setPaused(false);
              setProgressKey((k) => k + 1);
            }
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />
          <p className="font-display text-6xl leading-none text-blue-400/25 sm:text-7xl">&ldquo;</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mt-2 max-w-3xl font-display text-[clamp(1.35rem,3vw,2rem)] leading-[1.35] text-white">
                {t.quote}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-blue-400/50" />
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-2">
            {items.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goTo(i)}
                  className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                    isActive ? 'w-10 bg-white/15' : 'w-1.5 bg-white/15 hover:bg-white/30'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      key={`${progressKey}-${paused ? 'p' : 'r'}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)]"
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={
                        paused
                          ? { duration: 0 }
                          : { duration: AUTO_MS / 1000, ease: 'linear' }
                      }
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

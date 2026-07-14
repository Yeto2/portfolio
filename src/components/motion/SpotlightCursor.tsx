'use client';

import { useEffect, useRef } from 'react';

/** Soft neon spotlight that follows the pointer across the page. */
export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) {
      el.style.opacity = '0';
      return;
    }

    const onMove = (e: MouseEvent) => {
      el.style.opacity = '1';
      el.style.transform = `translate(${e.clientX - 220}px, ${e.clientY - 220}px)`;
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[440px] w-[440px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.04) 35%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}

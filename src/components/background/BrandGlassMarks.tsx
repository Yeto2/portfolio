'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const marks = [
  { top: '8%', left: '6%', size: 72, opacity: 'opacity-[0.16]', anim: 'animate-glass-float-a', delay: '0s', hide: 'max-md:hidden' },
  { top: '22%', right: '4%', size: 96, opacity: 'opacity-[0.13]', anim: 'animate-glass-float-b', delay: '-4s', hide: '' },
  { top: '48%', left: '2%', size: 112, opacity: 'opacity-[0.11]', anim: 'animate-glass-float-c', delay: '-8s', hide: 'max-sm:hidden' },
  { top: '62%', right: '8%', size: 80, opacity: 'opacity-[0.14]', anim: 'animate-glass-float-d', delay: '-2s', hide: '' },
  { top: '78%', left: '18%', size: 88, opacity: 'opacity-[0.10]', anim: 'animate-glass-float-b', delay: '-11s', hide: 'max-md:hidden' },
  { top: '35%', left: '42%', size: 128, opacity: 'opacity-[0.08]', anim: 'animate-glass-float-a', delay: '-6s', hide: 'max-lg:hidden' },
];

/** Floating transparent favicon marks — ambient brand glow sitewide. */
export function BrandGlassMarks() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {marks.map((m, i) => (
        <div
          key={i}
          className={`brand-glass-mark absolute ${m.anim} ${m.hide} ${reducedMotion ? '!animate-none' : ''}`}
          style={{
            top: m.top,
            left: 'left' in m ? m.left : undefined,
            right: 'right' in m ? m.right : undefined,
            animationDelay: m.delay,
          }}
        >
          <Image
            src="/favicon-mark.png"
            alt=""
            width={m.size}
            height={m.size}
            className={`brand-glass-mark__icon object-contain ${m.opacity}`}
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { BrandGlassMarks } from '@/components/background/BrandGlassMarks';

export function AmbientBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#050816]" />
      <div className="bg-grid absolute inset-0 opacity-90" />

      <div
        className={`absolute -left-[25%] -top-[35%] h-[75vh] w-[75vh] rounded-full bg-blue-600/[0.12] blur-[140px] ${
          reducedMotion ? '' : 'animate-drift'
        }`}
      />
      <div
        className={`absolute -right-[20%] top-[5%] h-[55vh] w-[55vh] rounded-full bg-blue-500/[0.08] blur-[120px] ${
          reducedMotion ? '' : 'animate-drift-reverse'
        }`}
      />
      <div
        className={`absolute bottom-[10%] left-[30%] h-[40vh] w-[50vh] rounded-full bg-blue-400/[0.05] blur-[100px] ${
          reducedMotion ? '' : 'animate-breathe'
        }`}
      />

      <div className="absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-blue-950/25 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,transparent_0%,#050816_78%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]" />

      <BrandGlassMarks />
    </div>
  );
}

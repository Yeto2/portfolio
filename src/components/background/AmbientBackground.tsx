'use client';

import { useEffect, useState } from 'react';

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
      <div className="bg-grid absolute inset-0 opacity-80" />

      {/* Primary mesh */}
      <div
        className={`absolute -left-[20%] -top-[30%] h-[70vh] w-[70vh] rounded-full bg-blue-600/14 blur-[140px] ${reducedMotion ? '' : 'animate-drift'}`}
      />
      <div
        className={`absolute -right-[15%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-indigo-700/10 blur-[120px] ${reducedMotion ? '' : 'animate-drift-reverse'}`}
      />

      {/* Accent — restrained red */}
      <div
        className={`absolute bottom-[15%] left-[35%] h-[40vh] w-[50vh] rounded-full bg-red-600/6 blur-[100px] ${reducedMotion ? '' : 'animate-breathe'}`}
      />

      {/* Horizon glow */}
      <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-blue-950/20 via-transparent to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_0%,#020408_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020408]" />
    </div>
  );
}

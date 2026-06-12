'use client';

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="animate-float absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="animate-float-delayed absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[100px]" />
      <div className="animate-pulse-glow absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-red-500/8 blur-[100px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]" />
    </div>
  );
}

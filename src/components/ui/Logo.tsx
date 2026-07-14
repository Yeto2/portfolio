'use client';

import { useId, type SVGProps } from 'react';

type LogoSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<LogoSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
};

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: LogoSize;
  className?: string;
}

/**
 * Premium Y monogram — glass tile + filled mark that stays crisp in the nav
 * and at favicon sizes.
 */
export function Logo({ size = 'sm', className = '', ...props }: LogoProps) {
  const uid = useId().replace(/:/g, '');
  const tile = `y-tile-${uid}`;
  const rim = `y-rim-${uid}`;
  const mark = `y-mark-${uid}`;
  const sheen = `y-sheen-${uid}`;
  const glow = `y-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
      className={`shrink-0 drop-shadow-[0_8px_20px_-10px_rgba(59,130,246,0.55)] ${sizeMap[size]} ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id={tile} x1="8" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#152038" />
          <stop offset="0.55" stopColor="#0c1224" />
          <stop offset="1" stopColor="#070b16" />
        </linearGradient>
        <linearGradient id={rim} x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93c5fd" stopOpacity="0.75" />
          <stop offset="0.4" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="0.7" stopColor="#1e3a8a" stopOpacity="0.2" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={mark} x1="14" y1="10" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eff6ff" />
          <stop offset="0.35" stopColor="#93c5fd" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id={sheen} x1="20" y1="5" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={glow}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 22) rotate(90) scale(14 12)"
        >
          <stop stopColor="#3b82f6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft outer halo */}
      <rect x="1.5" y="1.5" width="37" height="37" rx="11.5" fill={`url(#${glow})`} opacity="0.55" />

      {/* Tile */}
      <rect x="3" y="3" width="34" height="34" rx="10" fill={`url(#${tile})`} />
      <rect
        x="3.6"
        y="3.6"
        width="32.8"
        height="32.8"
        rx="9.4"
        stroke={`url(#${rim})`}
        strokeWidth="1.2"
      />

      {/* Top glass sheen */}
      <path
        d="M7.5 8.5C9.2 6.4 12.2 5.2 16 5.2h8c3.6 0 6.4 1.1 8.1 3.1-.8 2.4-4.6 4.1-12.1 4.1S8.4 10.8 7.5 8.5Z"
        fill={`url(#${sheen})`}
      />

      {/* Filled Y — thicker geometry for small sizes */}
      <path
        fill={`url(#${mark})`}
        d="M13.05 10.4c-.42-.62.03-1.45.78-1.45h2.02c.3 0 .58.15.74.4L20 15.55l3.41-6.2c.16-.25.44-.4.74-.4h2.02c.75 0 1.2.83.78 1.45L22.15 19.1c-.2.36-.3.77-.3 1.18v7.22c0 .66-.54 1.2-1.2 1.2h-1.3c-.66 0-1.2-.54-1.2-1.2v-7.22c0-.41-.1-.82-.3-1.18L13.05 10.4Z"
      />
    </svg>
  );
}

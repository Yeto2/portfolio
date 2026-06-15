'use client';

import { useId, type SVGProps } from 'react';

type LogoSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<LogoSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
};

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: LogoSize;
  className?: string;
}

/** Minimal Y monogram — site gradient, soft glow, glass tile. */
export function Logo({ size = 'sm', className = '', ...props }: LogoProps) {
  const uid = useId().replace(/:/g, '');
  const tileId = `logo-tile-${uid}`;
  const shineId = `logo-shine-${uid}`;
  const markId = `logo-mark-${uid}`;
  const glowId = `logo-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`shrink-0 ${sizeMap[size]} ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id={tileId} x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#101827" />
          <stop offset="1" stopColor="#070b14" />
        </linearGradient>
        <linearGradient id={shineId} x1="18" y1="3" x2="18" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.09" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={markId} x1="10" y1="9" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e0e7ff" />
          <stop offset="0.35" stopColor="#93c5fd" />
          <stop offset="0.65" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <radialGradient
          id={glowId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(18 20) scale(11)"
        >
          <stop stopColor="#2563eb" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="2" y="2" width="32" height="32" rx="9" fill={`url(#${tileId})`} />
      <rect x="2" y="2" width="32" height="13" rx="9" fill={`url(#${shineId})`} />
      <rect
        x="2.75"
        y="2.75"
        width="30.5"
        height="30.5"
        rx="8.25"
        stroke="white"
        strokeOpacity="0.08"
        strokeWidth="0.75"
      />

      <circle cx="18" cy="20" r="11" fill={`url(#${glowId})`} />

      <path
        d="M11.5 10.75 18 19.25"
        stroke={`url(#${markId})`}
        strokeWidth="2.85"
        strokeLinecap="round"
      />
      <path
        d="M24.5 10.75 18 19.25"
        stroke={`url(#${markId})`}
        strokeWidth="2.85"
        strokeLinecap="round"
      />
      <path
        d="M18 19.25V27.25"
        stroke={`url(#${markId})`}
        strokeWidth="2.85"
        strokeLinecap="round"
      />

      <circle cx="18" cy="19.25" r="1.35" fill="#fca5a5" fillOpacity="0.85" />
    </svg>
  );
}

export function LogoMark({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return <Logo size="sm" className={className} {...props} />;
}

'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';

type LogoSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<LogoSize, string> = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-18 w-18',
};

interface LogoProps extends Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'> {
  size?: LogoSize;
  className?: string;
}

/** Circuit Y brand mark — used in nav, contact, and footer. */
export function Logo({ size = 'sm', className = '', ...props }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={265}
      height={265}
      aria-hidden="true"
      priority
      className={`shrink-0 object-contain drop-shadow-[0_8px_20px_rgba(0,220,255,0.22)] ${sizeMap[size]} ${className}`}
      {...props}
    />
  );
}

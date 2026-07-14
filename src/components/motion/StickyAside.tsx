'use client';

import type { ReactNode } from 'react';

/**
 * Pins a column to the viewport while the sibling column scrolls.
 * Do not wrap this in motion/transform parents — that kills sticky.
 */
export function StickyAside({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`lg:sticky lg:top-[calc(var(--nav-height,5.25rem)+1.25rem)] lg:self-start ${className}`}
    >
      {children}
    </div>
  );
}

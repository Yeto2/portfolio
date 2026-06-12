'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

export function MagneticLink({
  href,
  children,
  className = '',
  strength = 0.22,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setOffset({ x, y });
  }

  function onLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const props = external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.4 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

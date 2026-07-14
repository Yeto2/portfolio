'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Ensures /#section jumps work after App Router navigations
 * (e.g. from /projects/pobmed → /#why).
 */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const id = decodeURIComponent(hash.slice(1));

      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (tries++ < 24) {
          window.setTimeout(attempt, 50);
        }
      };

      requestAnimationFrame(attempt);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  return null;
}

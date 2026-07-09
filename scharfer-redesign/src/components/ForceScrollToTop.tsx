'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ForceScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser's default scroll restoration to avoid jumping to old positions
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Always force scroll to top on any route change or refresh
    // setTimeout ensures it runs after Next.js hydration and rendering
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }, [pathname]);

  return null;
}

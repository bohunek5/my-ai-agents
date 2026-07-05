'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function MobileRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile && !pathname.startsWith('/mobile')) {
      router.replace('/mobile');
    } else if (!isMobile && pathname.startsWith('/mobile')) {
      router.replace('/');
    }
  }, [pathname, router]);

  if (!mounted) {
    return <div style={{ background: '#f8f9fa', minHeight: '100vh' }} />;
  }

  return <>{children}</>;
}

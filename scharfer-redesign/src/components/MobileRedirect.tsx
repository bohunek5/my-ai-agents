'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function MobileRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    const isLegalPage = pathname === '/regulamin' || pathname === '/rodo';
    if (isMobile && !pathname.startsWith('/mobile') && !isLegalPage) {
      router.replace('/mobile');
    } else if (!isMobile && pathname.startsWith('/mobile')) {
      router.replace('/');
    }
  }, [pathname, router]);

  return <>{children}</>;
}

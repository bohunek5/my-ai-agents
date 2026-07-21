'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function MobileRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isBot = /Googlebot|bingbot|yandex|crawler|spider|bot|lighthouse/i.test(ua);
    if (isBot) return;

    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(ua);
    const isLegalPage = pathname === '/regulamin' || pathname === '/rodo';
    if (isMobile && !pathname.startsWith('/mobile') && !isLegalPage) {
      router.replace('/mobile');
    } else if (!isMobile && pathname.startsWith('/mobile')) {
      router.replace('/');
    }
  }, [pathname, router]);

  return <>{children}</>;
}

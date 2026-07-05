import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import '../../mobile.css';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="mobile-view" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </LanguageProvider>
  );
}

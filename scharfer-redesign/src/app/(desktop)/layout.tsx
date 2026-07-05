import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { LanguageProvider } from '@/context/LanguageContext';
import '../style.css';

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="desktop-view" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </LanguageProvider>
  );
}

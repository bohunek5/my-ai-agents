"use client";
'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.scss';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import WeatherWidget from './WeatherWidget';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <img src="/assets/skutery-logo.svg" alt="Jet Ski Rental Maciej Skwarko" className="logo-invert" />
        </div>

        <div className={`${styles.links} ${mobileMenuOpen ? styles.open : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t('about')}</a>
          <a href="#fleet" onClick={() => setMobileMenuOpen(false)}>{t('fleet')}</a>
          <a href="#howItWorks" onClick={() => setMobileMenuOpen(false)}>{t('howItWorks')}</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>{t('gallery')}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</a>
          
          <div className={styles.mobileActions}>
            <WeatherWidget />
            <div className={styles.toggles}>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <a href="#contact" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>{t('bookNow')}</a>
          </div>
        </div>

        <div className={styles.desktopActions}>
          <WeatherWidget />
          <ThemeToggle />
          <LanguageSwitcher />
          <a href="#contact" className="btn-primary">{t('bookNow')}</a>
        </div>

        <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}

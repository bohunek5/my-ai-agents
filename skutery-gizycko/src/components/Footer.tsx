"use client";
import { useTranslations } from 'next-intl';
import styles from './Footer.module.scss';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('Footer');
  const tContact = useTranslations('Contact');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.col}>
            <div className={styles.brand}>
              <img src="/assets/skutery-logo.svg" alt="Jet Ski Rental Maciej Skwarko" className="logo-invert" />
              <p>{t('tagline')}</p>
            </div>
            <div className={styles.socials}>
              <a href="https://www.facebook.com/jetskirental.skutery.gizycko" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaFacebook size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.col}>
            <h3>{t('quickLinks')}</h3>
            <ul className={styles.linksList}>
              <li><a href="#home">{useTranslations('Navigation')('home')}</a></li>
              <li><a href="#about">{useTranslations('Navigation')('about')}</a></li>
              <li><a href="#fleet">{useTranslations('Navigation')('fleet')}</a></li>
              <li><a href="#gallery">{useTranslations('Navigation')('gallery')}</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.col}>
            <h3>{t('contactUs')}</h3>
            <ul className={styles.contactList}>
              <li>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>{tContact('address')}</span>
              </li>
              <li>
                <FaPhoneAlt className={styles.contactIcon} />
                <a href={`tel:${tContact('phone').replace(/\s+/g, '')}`}>{tContact('phone')}</a>
              </li>
              <li>
                <FaEnvelope className={styles.contactIcon} />
                <a href={`mailto:${tContact('email')}`}>{tContact('email')}</a>
              </li>
            </ul>
          </div>

          {/* Preferences Column */}
          <div className={styles.col}>
            <h3>{t('preferences')}</h3>
            <div className={styles.preferences}>
              <div className={styles.prefItem}>
                <span>{t('theme')}</span>
                <ThemeToggle />
              </div>
              <div className={styles.prefItem}>
                <span>{t('language')}</span>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{t('copyright', { year })}</p>
        </div>
      </div>
    </footer>
  );
}

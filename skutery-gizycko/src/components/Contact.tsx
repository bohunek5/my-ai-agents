"use client";
import { useTranslations } from 'next-intl';
import styles from './Contact.module.scss';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.infoSide}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">{t('subtitle')}</span>
          <h2>{t('title')}</h2>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}>
                <MapPin size={24} />
              </div>
              <div>
                <h4>{t('addressTitle')}</h4>
                <p>{t('address')}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}>
                <Phone size={24} />
              </div>
              <div>
                <h4>{t('phoneTitle')}</h4>
                <p><a href={`tel:${t('phone').replace(/\s+/g, '')}`}>{t('phone')}</a></p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}>
                <Mail size={24} />
              </div>
              <div>
                <h4>{t('emailTitle')}</h4>
                <p><a href={`mailto:${t('email')}`}>{t('email')}</a></p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.visualSide}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.mapCard}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4715.390038827928!2d21.751336412154366!3d54.05342898083818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e1be03b2210a45%3A0xc34a6a575b6a71ab!2sPierkunowo%2036%2C%2011-500%20Pierkunowo!5e0!3m2!1spl!2spl!4v1714151234567!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={styles.photoCard}>
            <img src="/images/tu-jestesmy.jpg" alt="Tutaj nas znajdziesz w porcie" />
            <div className={styles.photoLabel}>
              <Navigation size={18} className="text-primary" /> TU JESTEŚMY
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

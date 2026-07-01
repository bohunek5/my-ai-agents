"use client";
import { useTranslations } from 'next-intl';
import styles from './About.module.scss';
import { motion } from 'framer-motion';

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <img src="/assets/IMG-20190819-WA0005.jpg" alt={t('title')} className={styles.image} />
          <div className={styles.decoration}></div>
        </motion.div>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="subtitle">{t('title')}</span>
          <h2>Jet Ski Rental</h2>
          <p className={styles.description}>{t('description')}</p>
        </motion.div>
      </div>
    </section>
  );
}

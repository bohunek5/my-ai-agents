"use client";
import { useTranslations } from 'next-intl';
import styles from './HowItWorks.module.scss';
import { motion } from 'framer-motion';
import { Search, PhoneCall, Smile, ThumbsUp } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');

  const icons = [
    <Search key="1" size={40} />,
    <PhoneCall key="2" size={40} />,
    <Smile key="3" size={40} />,
    <ThumbsUp key="4" size={40} />
  ];

  return (
    <section id="howItWorks" className={`section ${styles.howItWorks}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className="subtitle">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </div>

        <div className={styles.steps}>
          {[1, 2, 3, 4].map((step, index) => (
            <motion.div 
              key={step} 
              className={styles.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className={styles.iconBox}>
                {icons[index]}
              </div>
              <h3>{t(`steps.step${step}.title`)}</h3>
              <p>{t(`steps.step${step}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

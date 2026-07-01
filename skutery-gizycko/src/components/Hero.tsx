"use client";
import { useTranslations } from 'next-intl';
import styles from './Hero.module.scss';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
  const t = useTranslations('Hero');

  // Split title if it contains a space or newline to apply highlight to the last part
  // Or just rely on translations if we had HTML in there. For now, we render it directly.
  const titleText = t('title');

  return (
    <section className={styles.hero} id="home">
      <div className={styles.videoWrapper}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.videoBackground}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.overlay}></div>
      
      <motion.div 
        className={`container ${styles.content}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className={styles.heroTitle} variants={itemVariants}>
          {titleText}
        </motion.h1>
        
        <motion.p className={styles.subtitle} variants={itemVariants}>
          {t('subtitle')}
        </motion.p>
        
        <motion.div className={styles.actionGroup} variants={itemVariants}>
          <a href="#contact" className="btn-primary">{t('cta')}</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

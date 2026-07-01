"use client";
import { useTranslations } from 'next-intl';
import styles from './Gallery.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const images = [
  '/assets/20240630_105901-scaled.jpg',
  '/assets/20240705_150810-scaled.jpg',
  '/assets/20240601_185516-scaled.jpg',
  '/assets/20240528_122529-scaled.jpg',
  '/assets/20200611_213441-scaled.jpg',
  '/assets/20190805_200721-scaled.jpg'
];

export default function Gallery() {
  const t = useTranslations('Gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className={`section ${styles.gallery}`}>
      <div className={`container`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </motion.div>

        <div className={styles.grid}>
          {images.map((src, index) => (
            <motion.div 
              key={index} 
              className={styles.imageItem}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(src)}
            >
              <img src={src} alt={`Gallery Image ${index + 1}`} loading="lazy" />
              <div className={styles.overlay}></div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>
              <X size={32} />
            </button>
            <motion.img 
              src={selectedImage} 
              alt="Enlarged gallery view" 
              className={styles.lightboxImage}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

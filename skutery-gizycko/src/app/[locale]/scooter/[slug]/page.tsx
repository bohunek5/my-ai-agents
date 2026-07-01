import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { scootersData } from '@/data/scooters';
import styles from './page.module.scss';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FaTachometerAlt, FaUsers, FaWeightHanging, FaArrowsAltH, FaArrowLeft } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
  const t = await getTranslations({ locale, namespace: 'Fleet' });
  if (!scootersData[slug]) return { title: 'Not Found' };
  
  return {
    title: `${t(`items.${slug}.name`)} - Jet Ski Rental Maciej Skwarko`,
    description: `Wypożycz ${t(`items.${slug}.name`)} w Giżycku.`
  };
}

export default function ScooterPage({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
  const scooter = scootersData[slug];
  if (!scooter) {
    notFound();
  }

  const t = useTranslations('Fleet');
  const name = t(`items.${slug}.name`);
  const type = t(`items.${slug}.type`);

  return (
    <main className={styles.main}>
      <Navigation />
      
      <div className={styles.heroSection}>
        <div className={styles.heroBg}>
          <img src={scooter.mainImage} alt={name} className={styles.bgImg} />
          <div className={styles.overlay}></div>
        </div>
        
        <div className={`container ${styles.heroContent}`}>
          <Link href="/#fleet" className={styles.backBtn}>
            <FaArrowLeft /> Wróć do floty
          </Link>
          <span className="subtitle">{type}</span>
          <h1>{name}</h1>
        </div>
      </div>

      <div className={`container ${styles.contentSection}`}>
        <div className={styles.grid}>
          {/* Left Column: Details & Specs */}
          <div className={styles.details}>
            <h2>Specyfikacja Techniczna</h2>
            
            <div className={styles.specsGrid}>
              <div className={styles.specCard}>
                <FaTachometerAlt className={styles.icon} />
                <div className={styles.specInfo}>
                  <span className={styles.label}>Prędkość max / Moc</span>
                  <span className={styles.value}>{scooter.maxSpeed} / {scooter.horsepower}</span>
                </div>
              </div>
              <div className={styles.specCard}>
                <FaUsers className={styles.icon} />
                <div className={styles.specInfo}>
                  <span className={styles.label}>Pojemność</span>
                  <span className={styles.value}>{scooter.capacity}</span>
                </div>
              </div>
              <div className={styles.specCard}>
                <FaArrowsAltH className={styles.icon} />
                <div className={styles.specInfo}>
                  <span className={styles.label}>Długość</span>
                  <span className={styles.value}>{scooter.length}</span>
                </div>
              </div>
              <div className={styles.specCard}>
                <FaWeightHanging className={styles.icon} />
                <div className={styles.specInfo}>
                  <span className={styles.label}>Waga</span>
                  <span className={styles.value}>{scooter.weight}</span>
                </div>
              </div>
            </div>

            <div className={styles.description}>
              <h3>Opis sprzętu</h3>
              <p>{scooter.description}</p>
              
              <div className={styles.actions}>
                <a href={`tel:+48507697292`} className="btn-primary">
                  Zadzwoń i zarezerwuj
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Gallery */}
          <div className={styles.gallery}>
            <h2>Galeria zdjęć</h2>
            <div className={styles.imageGrid}>
              {scooter.gallery.map((img, idx) => (
                <div key={idx} className={styles.imgWrapper}>
                  <img src={img} alt={`${name} ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

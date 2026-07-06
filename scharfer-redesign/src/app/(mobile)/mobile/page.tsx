'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { productsData, Product } from '@/data/scharferData';
import InteractiveDiagram from '@/components/InteractiveDiagram';

type Tab = 'home' | 'oferta' | 'info' | 'kontakt';

export default function MobileAppPage() {
  const { lang, setLang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as Tab;
      if (['home', 'oferta', 'info', 'kontakt'].includes(hash)) {
        setActiveTab(hash);
        setTimeout(() => window.scrollTo(0, 0), 10);
      }
    }
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
      window.scrollTo(0, 0);
    }
  };

  // Active product details modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Home story states (which story card is expanded)
  const [activeStory, setActiveStory] = useState<number | null>(null);

  // Oferta states
  const [filterVoltage, setFilterVoltage] = useState<'all' | '12V' | '24V'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Kontakt FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Legal modals states
  const [mobileRegulaminOpen, setMobileRegulaminOpen] = useState(false);
  const [mobileRodoOpen, setMobileRodoOpen] = useState(false);
  const [b2cModalOpen, setB2cModalOpen] = useState(false);

  const flagEmojis: Record<string, string> = { pl: '🇵🇱', en: '🇬🇧', de: '🇩🇪', lt: '🇱🇹' };

  // Filter products
  const filteredProducts = productsData.filter(p => {
    const matchesFilter = filterVoltage === 'all' || p.specs.voltage === filterVoltage;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.index.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ean.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const toggleStory = (idx: number) => {
    setActiveStory(activeStory === idx ? null : idx);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const stories = [
    {
      title: '7 Lat Pełnej Gwarancji',
      icon: '🛡️',
      body: 'Zaufanie to podstawa w branży B2B. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta.',
      img: '/scharfer/assets/sch1.webp',
      type: 'image'
    },
    {
      title: 'Ochrona IP67 do Zadań Specjalnych',
      icon: '💧',
      body: 'Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67. Są całkowicie wodoodporne i pyłoszczelne.',
      img: '/scharfer/assets/sch2.webp',
      type: 'image'
    },
    {
      title: 'Praca pod 100% obciążeniem',
      icon: '⚡',
      body: 'Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem. Kupujesz 150W i otrzymujesz 150W.',
      img: '/scharfer/assets/sch4.webp',
      type: 'image'
    },
    {
      title: 'Zgodność z Normami CE, RoHS',
      icon: '🇪🇺',
      body: 'Zasilacze Scharfer spełniają rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547.',
      img: '/scharfer/assets/ce_rohs.png',
      type: 'contain'
    },
    {
      title: 'Zabezpieczenia OVP, SCP, OTP, OLP',
      icon: '🔌',
      body: 'Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki: przeciążeniowe, przeciwzwarciowe, termiczne i nadnapięciowe.',
      img: '/scharfer/assets/40012.png',
      type: 'image'
    },
    {
      title: 'Masywne Aluminium i Żywica',
      icon: '🌡️',
      body: 'Trwałość zasilacza zależy od odprowadzania ciepła. Zasilacze Scharfer zamknięte są w aluminiowej obudowie-radiatorze, a ich wnętrze jest w 100% zalane żywicą epoksydową przewodzącą ciepło.',
      img: '/scharfer/assets/sch3.webp',
      type: 'image'
    }
  ];

  const faqItems = [
    {
      q: t('faq1Q'),
      a: t('faq1A')
    },
    {
      q: t('faq2Q'),
      a: t('faq2A')
    },
    {
      q: t('faq3Q'),
      a: t('faq3A')
    },
    {
      q: t('faq4Q'),
      a: t('faq4A')
    },
    {
      q: t('faq5Q'),
      a: t('faq5A')
    },
    {
      q: t('faq6Q'),
      a: t('faq6A')
    }
  ];

  return (
    <div style={{ paddingTop: '75px', paddingBottom: '75px', minHeight: '100vh', background: '#f8f9fa' }}>
      
      {/* Mobile Header */}
      <header className="app-header" style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', borderBottom: '1px solid #eee', background: 'white', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000 }}>
        {/* Left: Scharfer logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); handleTabChange('home'); }} style={{ display: 'block' }}>
            <img src="/scharfer/logo_scharfer.png" alt="Scharfer" style={{ height: '34px', width: 'auto', display: 'block' }} />
          </a>
        </div>
        
        {/* Middle: Prescot LED distributor badge */}
        <div style={{ position: 'absolute', left: '55%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '7px', fontWeight: 800, color: '#999', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', lineHeight: 1 }}>Dystrybutor:</span>
          <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '2px' }}>
            <img src="/scharfer/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '12px', display: 'block' }} />
          </a>
        </div>

        {/* Right: Language Dropdown */}
        <div className="header-right" id="lang-wrapper" style={{ position: 'relative' }}>
          {/* Language Switcher */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button 
              className="lang-btn"
              id="lang-btn"
              onClick={() => setLangOpen(!langOpen)}
              style={{
                background: langOpen ? '#f3f4f6' : 'transparent',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{flagEmojis[lang]}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151' }}>{lang.toUpperCase()}</span>
            </button>

            {langOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: 'white',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                zIndex: 100,
                minWidth: '120px',
                border: '1px solid #f3f4f6'
              }}>
                {(['pl', 'en', 'de', 'lt'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '12px 16px',
                      border: 'none',
                      background: lang === l ? '#fef2f2' : 'white',
                      color: lang === l ? '#dc2626' : '#374151',
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontWeight: lang === l ? 600 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{flagEmojis[l]}</span>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mobile-main">
        
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <section className="view-section active">
            {/* Hero Section (exact match with PC) */}
            <div className="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 75px - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
              <div className="hero-bg" style={{ overflow: 'hidden', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#fff' }}>
                <iframe 
                  src="https://www.youtube.com/embed/2Ofm-Rvbz9A?autoplay=1&mute=1&loop=1&playlist=2Ofm-Rvbz9A&controls=0&showinfo=0&autohide=1&start=2" 
                  style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', border: 'none', zIndex: 0 }} 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                />
                <div className="hero-overlay" style={{ background: 'rgba(255, 255, 255, 0.85)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
              </div>
              <div className="hero-container" style={{ maxWidth: '100%', position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div className="hero-content">
                  <h1 className="hero-title" style={{ fontSize: '2.0rem', display: 'block', lineHeight: 1.2, marginBottom: '10px', color: '#111827', fontWeight: 800, textShadow: '0 2px 6px rgba(0,0,0,0.22)' }}>
                    <span style={{ color: '#dc2626' }}>{t('heroWarranty')}</span><br/>
                    {t('heroPower')}<br/>
                    {t('heroReal')}<span style={{ color: '#dc2626' }}>{t('hero100')}</span>{t('heroLoad')}
                  </h1>
                  <p className="hero-subtitle" style={{ fontSize: '0.95rem', padding: '0 10px', marginBottom: '25px', lineHeight: 1.4, color: '#111827', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {t('heroSubtitle')}
                  </p>
                  
                  <div className="hero-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '35px' }}>
                    <button onClick={() => handleTabChange('oferta')} style={{ background: '#dc2626', color: 'white', padding: '12px 10px', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem', border: 'none', flex: 1 }}>
                      {t('exploreOffer')}
                    </button>
                    <button onClick={() => setB2cModalOpen(true)} style={{ background: 'transparent', color: '#111827', padding: '12px 10px', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem', border: '1px solid #111827', flex: 1 }}>
                      {t('b2bCoop')}
                    </button>
                  </div>
                  
                  <div className="hero-trust" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'nowrap', width: '100%', padding: '0 5px', textAlign: 'left' }}>
                    <div className="trust-item" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span className="trust-val" style={{ color: '#dc2626', fontSize: '1.4rem', fontWeight: 900, display: 'block', lineHeight: 1 }}>{t('trust7Years')}</span>
                      <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginTop: '6px', lineHeight: 1.2 }}>{t('trustWarranty')}</span>
                    </div>
                    <div className="trust-item" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span className="trust-val" style={{ color: '#dc2626', fontSize: '1.4rem', fontWeight: 900, display: 'block', lineHeight: 1 }}>{t('trustIP67')}</span>
                      <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginTop: '6px', lineHeight: 1.2 }}>{t('trustTightness')}</span>
                    </div>
                    <div className="trust-item" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span className="trust-val" style={{ color: '#dc2626', fontSize: '1.4rem', fontWeight: 900, display: 'block', lineHeight: 1 }}>{t('trust100')}</span>
                      <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginTop: '6px', lineHeight: 1.2 }}>{t('trustLoad')}</span>
                    </div>
                  </div>
                  
                  {/* Scroll down indicator arrow */}
                  <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', animation: 'bounce 2s infinite' }}>
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes bounce {
                  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                  40% { transform: translateY(-10px); }
                  60% { transform: translateY(-5px); }
                }
              `}} />
            </div>

            {/* Technology Intro Block */}
            <div className="poznaj-hero" style={{ background: 'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)', padding: '3rem 1rem', textAlign: 'center', borderBottom: '1px solid #eee' }}>
              <div className="container">
                <h2 style={{ fontSize: '1.6rem', color: 'var(--c-heading)', marginBottom: '8px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                  {t('techNoComp')}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>
                  {t('techDesc')}
                </p>
              </div>
            </div>

            {/* Interactive Diagram Section (Optimized for Mobile) */}
            <div className="section-padding bg-light" style={{ padding: '2rem 0', background: '#fafafa', borderBottom: '1px solid #eee', overflow: 'hidden' }}>
              <div className="container" style={{ padding: '0 10px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textAlign: 'center', marginBottom: '15px', color: 'var(--c-heading)', fontFamily: 'Outfit, sans-serif' }}>Budowa zasilacza - interaktywny diagram</h3>
                <InteractiveDiagram forceMobile={true} />
              </div>
            </div>

            {/* 6 story detailed rows in single column */}
            <div className="container" style={{ padding: '20px 15px' }}>
              <div className="b2b-story-section-m" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Row 1: Gwarancja */}
                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch1.webp" alt="7 lat gwarancji Scharfer" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>7 Lat Pełnej Gwarancji</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Zaufanie to podstawa w branży B2B. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce.</p>
                  </div>
                </div>



                {/* Row 2: IP67 */}
                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch2.webp" alt="Wodoodporność IP67" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Ochrona IP67 do Zadań Specjalnych</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67. Są całkowicie wodoodporne i pyłoszczelne.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Idealne rozwiązanie do oświetlenia elewacji, podświetlania basenów, banerów reklamowych i architektury ogrodowej. Wyeliminuj ryzyko zwarć w instalacjach outdoorowych.</p>
                  </div>
                </div>

                {/* Row 3: 100% Obciążenia */}
                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch4.webp" alt="100% obciążenia" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Zaprojektowane do Pracy pod 100% Obciążeniem</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Jeśli kupujesz model 150W, otrzymujesz pełne 150W czystej, stabilnej mocy. Oznacza to mniejsze koszty instalacji oraz brak problemów z przegrzewaniem.</p>
                  </div>
                </div>

                {/* Row 4: Zgodność i Bezpieczeństwo */}
                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '30px' }}>
                    <img src="/scharfer/assets/ce_rohs.png" alt="Certyfikaty CE i RoHS" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Zgodność z Normami PN-EN, CE i RoHS</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Bezpieczeństwo przede wszystkim. Zasilacze Scharfer spełniają najbardziej rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Posiadają pełną certyfikację CE oraz RoHS. Wybierając markę Scharfer, chronisz swój biznes oraz inwestycje swoich klientów przed ryzykiem pożaru.</p>
                  </div>
                </div>

                {/* Row 5: Zabezpieczenia */}
                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/40012.png" alt="Zabezpieczenia" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Zabezpieczenia OVP, SCP, OTP, OLP</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki:</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '15px', margin: '0 0 10px 0', fontSize: '0.82rem', color: 'var(--c-text)', lineHeight: 1.4 }}>
                      <li><strong>OVP</strong> – automatyczne odcięcie przy skokach napięcia.</li>
                      <li><strong>SCP</strong> – błyskawiczne zabezpieczenie przeciwzwarciowe.</li>
                      <li><strong>OTP</strong> – ochrona termiczna przed przegrzaniem.</li>
                      <li><strong>OLP</strong> – zabezpieczenie przeciążeniowe przy zbyt wysokim poborze.</li>
                    </ul>
                  </div>
                </div>

                {/* Row 6: Termika */}
                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch3.webp" alt="Aluminiowa obudowa radiator" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Aluminium i Żywica Epoksydowa</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła. Obudowa z aluminium pełni rolę radiatora, a wnętrze jest w 100% zalane żywicą.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy. Każda jednostka przechodzi test Burn-in przed wysyłką.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="section-container" style={{ padding: '30px 15px', background: '#fafafa', borderTop: '1px solid #eee' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '5px', textAlign: 'center', color: '#111827' }}>Gdzie sprawdzają się zasilacze?</h2>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#4b5563', marginBottom: '20px' }}>Zobacz, gdzie nasi partnerzy z powodzeniem stosują technologię Scharfer.</p>
              
              <div className="app-grid-m" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {[
                  { title: 'Domy i Rezydencje', desc: 'Wymagające instalacje domowe i rezydencjonalne potrzebują stabilnego zasilania taśm LED na elewacjach, schodach czy w podbitkach. Zasilacze Scharfer dzięki pełnej hermetyzacji IP67 oraz odporności na mróz i upały gwarantują bezawaryjną pracę na zewnątrz przez cały rok. Szeroki zakres napięcia wejściowego zabezpiecza domowe systemy przed nagłymi wahaniami prądu w sieci.', img: '/scharfer/assets/app_domy_1783188239361.png' },
                  { title: 'Bloki mieszkalne', desc: 'Oświetlenie klatek schodowych, korytarzy i ciągów komunikacyjnych w budynkach wielorodzinnych pracuje w trybie ciągłym i wymaga bezwzględnej niezawodności. Urządzenia Scharfer eliminują ryzyko częstych wymian serwisowych w trudno dostępnych miejscach, co znacząco obniża koszty eksploatacji dla wspólnot mieszkaniowych. Aktywny układ PFC chroni instalację budynku przed szkodliwymi zakłóceniami harmonicznymi generowanymi przez setki punktów świetlnych.', img: '/scharfer/assets/app_bloki_1783188247720.png' },
                  { title: 'Hale i Magazyny', desc: 'Wysokie hale produkcyjne oraz magazyny opierają się na długich liniach świetlnych LED o bardzo dużym poborze mocy. Zasilacze Scharfer o mocach sięgających 400W pozwalają na bezproblemowe zasilanie rozbudowanych systemów liniowych bez spadków napięcia na końcach obwodów. Pełna ochrona przed przeciążeniem i zwarciem zabezpiecza ciągłość pracy obiektów logistycznych i produkcyjnych.', img: '/scharfer/assets/app_hale_v2_1783188623293.png' },
                  { title: 'Obiekty sportowe', desc: 'Korty, orliki i boiska sportowe wymagają mocnych naświetlaczy LED i zasilania odpornego na ekstremalne obciążenia rozruchowe. Hermetyczna konstrukcja chroni podzespoły zasilacza przed wilgocią z murawy, rosą oraz bezpośrednimi opadami atmosferycznymi. Zasilacze Scharfer zapewniają stałe i niemigoczące światło, co przekłada się na bezpieczeństwo oraz wysoki komfort zawodników.', img: '/scharfer/assets/app_sport_v2_1783188631467.png' },
                  { title: 'Ogrody & Parki', desc: 'Oświetlenie ogrodowe i parkowe jest nieustannie narażone na wilgotną glebę, zalewanie przez automatyczne zraszacze oraz bezpośredni kontakt z wodą. Podwójnie uszczelniona obudowa IP67 oraz zalewa żywiczna całkowicie eliminują ryzyko wniknięcia wilgoci do wnętrza elektroniki. Zapewnia to bezpieczną pracę taśm i opraw ogrodowych bez niebezpieczeństwa przebicia prądu do gruntu.', img: '/scharfer/assets/app_ogrod_v2_1783188615253.png' },
                  { title: 'Hotele & Gastro', desc: 'W branży hotelarskiej i gastronomicznej kluczowe jest stworzenie przytulnej atmosfery poprzez płynne ściemnianie taśm LED w pokojach i restauracjach. Specjalna żywica epoksydowa wewnątrz zasilaczy Scharfer skutecznie tłumi drgania cewek, eliminując uciążliwe piszczenie podczas regulacji natężenia światła. Cicha praca urządzeń gwarantuje gościom najwyższy komfort akustyczny w strefach relaksu.', img: '/scharfer/assets/app_hotel_1783188309904.png' },
                  { title: 'Kina & Kultura', desc: 'Sale kinowe i teatralne wymagają bezwzględnej ciszy oraz precyzyjnego sterowania przygaszaniem oświetlenia awaryjnego i dekoracyjnego. Zasilacze Scharfer idealnie współpracują z nowoczesnymi systemami ściemniania, nie wprowadzając szumów ani migotania w pasmach częstotliwości audio-wideo. Masywna obudowa działa jak pasywny radiator, co eliminuje konieczność stosowania głośnych wentylatorów chłodzących.', img: '/scharfer/assets/app_kina_v2_1783188608035.png' },
                  { title: 'Szkoły & Edukacja', desc: 'Bezpieczeństwo dzieci i stabilność oświetlenia w klasach lekcyjnych to absolutny priorytet dla placówek edukacyjnych. Urządzenia Scharfer spełniają rygorystyczne normy PN-EN, posiadając atesty zapobiegające powstawaniu pożarów w wyniku zwarcia (zabezpieczenie SCP). Stabilne, pozbawione tętnień napięcie wyjściowe chroni wzrok uczniów i zapobiega szybkiemu zmęczeniu podczas nauki.', img: '/scharfer/assets/app_szkoly_1783188326372.png' },
                  { title: 'Parkingi Podziemne', desc: 'Parkingi podziemne i zadaszone garaże to miejsca o stałej, wysokiej wilgotności powietrza oraz dużym stężeniu pyłów i spalin. Całkowita szczelność IP67 zasilaczy Scharfer chroni wrażliwe komponenty przed korozyjnym działaniem agresywnego środowiska parkingowego. Niezawodne zasilanie gwarantuje nieprzerwane oświetlenie dróg ewakuacyjnych i miejsc postojowych 24 godziny na dobę.', img: '/scharfer/assets/app_parkingi_v2_1783188598862.png' },
                  { title: 'Garaże & Warsztaty', desc: 'W warsztatach samochodowych i garażach oświetlenie stanowiskowe jest narażone na pył, oleje, wibracje oraz nagłe skoki napięcia wywołane pracą ciężkich maszyn. Aktywne filtry wejściowe oraz zabezpieczenie OVP chronią zasilacze i podłączone paski LED przed uszkodzeniami elektrycznymi. Solidna, metalowa konstrukcja obudowy jest odporna na przypadkowe uderzenia mechaniczne.', img: '/scharfer/assets/app_garaze_1783188344306.png' },
                  { title: 'Wiaty & Stolarka', desc: 'Oświetlenie wiat ogrodowych, zadaszeń i architektury drewnianej wymaga zasilaczy o bardzo niskiej temperaturze pracy obudowy w celach ochrony przeciwpożarowej. Zasilacze Scharfer, dzięki pełnemu zalaniu żywicą i aluminiowemu radiatorowi, efektywnie odprowadzają ciepło na zewnątrz i nie nagrzewają się do niebezpiecznych temperatur. Spełniają one restrykcyjne wymogi montażu bezpośrednio na podłożach palnych.', img: 'wiata_jezioro.png' },
                  { title: 'Infrastruktura & Mosty', desc: 'Iluminacja mostów, wiaduktów i obiektów inżynieryjnych wymaga sprzętu odpornego na nieustanne drgania konstrukcyjne, silny wiatr i zmienne warunki pogodowe. Hermetyczna obudowa Scharfer, w całości wypełniona elastyczną żywicą epoksydową, absorbuje wibracje i uniemożliwia pękanie połączeń lutowanych. Daje to pewność bezawaryjnej pracy oświetlenia w najbardziej ekstremalnych lokalizacjach infrastruktury.', img: '/scharfer/assets/app_mosty_1783188351515.png' }
                ].map((ap, idx) => (
                  <div key={idx} className="app-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                    <img src={ap.img} alt={ap.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                    <div className="app-card-info" style={{ padding: '15px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--c-heading)' }}>{ap.title}</h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{ap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Partnership Section */}
            <div className="section-container" style={{ padding: '30px 15px', borderTop: '1px solid #eee', background: 'white' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '5px', textAlign: 'center' }}>{t('b2bTitle')}</h2>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>Budujemy długofalowe relacje oparte na zaufaniu i zyskach dla obu stron.</p>
              
              <div className="partnership-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', padding: '15px', textAlign: 'center', marginBottom: '20px', border: '1px solid #eee', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                <img src="/scharfer/assets/scharfer_partnership.webp" alt="Współpraca" style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--c-heading)', margin: '0 0 4px 0' }}>Zostań partnerem handlowym</h3>
                <p style={{ fontSize: '0.82rem', color: '#666', margin: 0 }}>Długofalowa współpraca i wysokie marże dla dystrybutorów.</p>
              </div>

              {[
                { title: t('valPrice'), desc: t('valPriceDesc') },
                { title: t('valAvailability'), desc: t('valAvailabilityDesc') },
                { title: t('valSupport'), desc: t('valSupportDesc') },
                { title: t('valPartner'), desc: t('valPartnerDesc') }
              ].map((val, idx) => (
                <div key={idx} className="value-item-m" style={{ display: 'flex', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '8px', border: '1px solid #f1f5f9' }}>
                  <span className="value-bullet" style={{ color: '#dc2626', fontWeight: 'bold' }}>🔴</span>
                  <div className="value-desc">
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px 0', color: 'var(--c-heading)' }}>{val.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#555', margin: 0, lineHeight: 1.3 }}>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="section-container" style={{ padding: '30px 15px', background: '#fafafa', borderTop: '1px solid #eee' }}>
              <h3 className="section-title" style={{ fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', marginBottom: '5px' }}>Często Zadawane Pytania (FAQ)</h3>
              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#666', marginBottom: '15px' }}>Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer</p>
              <div className="faq-list-m" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {faqItems.map((item, idx) => (
                  <div key={idx} className={`faq-item-m ${activeFaq === idx ? 'active' : ''}`} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                    <button 
                      className="faq-head-m" 
                      onClick={() => toggleFaq(idx)}
                      style={{ width: '100%', padding: '12px 15px', background: 'none', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-heading)', cursor: 'pointer' }}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon-m" style={{ fontSize: '1.2rem', color: '#dc2626' }}>{activeFaq === idx ? '−' : '+'}</span>
                    </button>
                    {activeFaq === idx && (
                      <div className="faq-body-m" style={{ padding: '0 15px 12px', fontSize: '0.82rem', color: '#555', lineHeight: 1.4, borderTop: '1px solid #eee', paddingTop: '10px' }}>
                        <p style={{ margin: 0 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <MobileFooter onOpenRegulamin={() => setMobileRegulaminOpen(true)} onOpenRodo={() => setMobileRodoOpen(true)} />
          </section>
        )}

        {/* VIEW: OFERTA */}
        {activeTab === 'oferta' && (
          <section className="view-section active">
            {/* Unified Hero for Oferta */}
            {/* Unified Mobile Hero for Oferta */}
            {/* Unified Mobile Hero for Oferta */}
            <div style={{ position: 'relative', width: '100%', padding: '45px 20px', textAlign: 'center', overflow: 'hidden', borderBottom: '1px solid #eee', backgroundImage: 'url("/scharfer/assets/scharfer_supplies_hero.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.88)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 3 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '10px', lineHeight: 1.2, textShadow: '0 2px 6px rgba(0, 0, 0, 0.22)' }}>Katalog <span style={{ color: '#dc2626' }}>Zasilaczy</span></h1>
                <p style={{ fontSize: '0.95rem', color: '#111827', margin: 0, lineHeight: 1.5, fontWeight: 500, textShadow: '0 1px 4px rgba(0, 0, 0, 0.18)' }}>
                  Przeglądaj pełną ofertę hermetycznych zasilaczy LED Scharfer IP67 (12V i 24V).
                </p>
              </div>
            </div>

            <div className="section-container" style={{ padding: '20px 15px', background: '#fff' }}>
              


              {/* Filters */}
              <div style={{ marginBottom: '20px' }}>
                <input 
                  type="text" 
                  className="mobile-search-bar" 
                  placeholder="Szukaj zasilacza (np. 150W)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['all', '12V', '24V'] as const).map(v => (
                    <button 
                      key={v}
                      onClick={() => setFilterVoltage(v)}
                      style={{ 
                        flex: 1, 
                        padding: '8px', 
                        borderRadius: '6px', 
                        border: '1px solid #ddd', 
                        background: filterVoltage === v ? '#dc2626' : 'white', 
                        color: filterVoltage === v ? 'white' : '#444',
                        fontWeight: 600,
                        fontSize: '0.82rem'
                      }}
                    >
                      {v === 'all' ? 'Wszystkie' : v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products list */}
              <div className="mobile-products-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {filteredProducts.map(p => {
                  const powerMatch = p.name.match(/\d+W/);
                  const powerText = powerMatch ? powerMatch[0] : '';
                  
                  const renderSymbolRed = (name: string) => {
                    const symbolMatch = name.match(/SCH-[\d\-A]+/);
                    const symbol = symbolMatch ? symbolMatch[0] : name.split(' ')[0];
                    return <span style={{ color: '#dc2626' }}>{symbol}</span>;
                  };

                  return (
                    <div key={p.index} style={{ background: 'white', borderRadius: '12px', padding: '20px 15px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                      {/* Sleek horizontal badge row at the top */}
                      <div className="specs-line" style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem', flexWrap: 'nowrap', width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '4px' }}>
                        {powerText && <span style={{ backgroundColor: '#dc2626', color: 'white', border: '1px solid #dc2626', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>{powerText}</span>}
                        <span style={{ backgroundColor: '#1e293b', color: 'white', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>IP67</span>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>SELV</span>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>CE</span>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>RoHS</span>
                        <span style={{ backgroundColor: 'white', border: '1px solid #dc2626', color: '#dc2626', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>7Y</span>
                      </div>
                      
                      {/* Centered Image */}
                      <div onClick={() => setActiveProduct(p)} style={{ cursor: 'zoom-in', textAlign: 'center', padding: '0.5rem 0 1.2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px' }}>
                        <img src={p.img} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>

                      {/* Product Name */}
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--c-heading)', textAlign: 'center' }}>{renderSymbolRed(p.name)}</h3>
                      
                      {/* Modern technology spec card ("ladnie w bloczku") - centered parameters */}
                      <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '0.8rem 1rem', marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', gap: '2px' }}>
                          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Napięcie</span>
                          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{p.specs.voltage} DC</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', gap: '2px' }}>
                          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Prąd wyjściowy</span>
                          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{p.specs.current}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', gap: '2px' }}>
                          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Kod EAN</span>
                          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{p.ean}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
                          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Wymiary</span>
                          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{p.specs.dim}</span>
                        </div>
                      </div>

                      {/* Details & PDF Buttons */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                        <a href={p.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem', fontSize: '0.8rem', fontWeight: 700, borderRadius: '6px', background: '#dc2626', color: 'white', textDecoration: 'none' }}>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '14px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Karta PDF
                        </a>
                        <button onClick={() => setActiveProduct(p)} className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem', fontSize: '0.8rem', fontWeight: 700, border: '1px solid #ddd', borderRadius: '6px', background: 'white', color: '#333', cursor: 'pointer' }}>
                          Szczegóły
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#999' }}>Brak pasujących zasilaczy.</div>
              )}

              <button className="btn-full" onClick={() => handleTabChange('kontakt')} style={{ display: 'block', width: '100%', textAlign: 'center', background: '#dc2626', color: 'white', padding: '15px', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', marginTop: '20px', border: 'none' }}>
                ZAMÓW B2B
              </button>
            </div>
            
            {/* Footer */}
            <MobileFooter onOpenRegulamin={() => setMobileRegulaminOpen(true)} onOpenRodo={() => setMobileRodoOpen(true)} />
          </section>
        )}

        {/* VIEW: DLACZEGO (SCHARFER?) */}
        {activeTab === 'info' && (
          <section className="view-section active">
            {/* Unified Page Hero */}
            <div className="hero-m-unified" style={{ position: 'relative', width: '100%', padding: '45px 20px', textAlign: 'center', overflow: 'hidden', borderBottom: '1px solid #eee', backgroundImage: 'url("/scharfer/assets/scharfer_estate_night.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.88)', zIndex: 1 }} />
              <div className="hero-content" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
                <h1 className="hero-title" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#111827', marginBottom: '12px', lineHeight: 1.2, textShadow: '0 2px 6px rgba(0, 0, 0, 0.22)' }}>
                  {t('techNoComp')}
                </h1>
                <p className="hero-subtitle" style={{ fontSize: '0.85rem', color: '#111827', margin: 0, lineHeight: 1.45, fontWeight: 500, textShadow: '0 1px 4px rgba(0, 0, 0, 0.18)' }}>
                  {t('techDesc')}
                </p>
              </div>
            </div>

            {/* Interactive Diagram Section (Optimized for Mobile) */}
            <div className="section-padding bg-light" style={{ padding: '2rem 0', background: '#fafafa', borderBottom: '1px solid #eee', overflow: 'hidden' }}>
              <div className="container" style={{ padding: '0 10px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textAlign: 'center', marginBottom: '15px', color: 'var(--c-heading)', fontFamily: 'Outfit, sans-serif' }}>Budowa zasilacza - innowacje Scharfer</h3>
                <InteractiveDiagram forceMobile={true} />
              </div>
            </div>

            {/* Trust items */}
            <div className="hero-trust" style={{ display: 'flex', justifyContent: 'space-around', gap: '8px', padding: '20px 15px', background: 'white', borderBottom: '1px solid #eee' }}>
              <div className="trust-item" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="trust-val" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>7</span>
                <span className="trust-lbl" style={{ fontSize: '0.65rem', color: '#aaa', fontWeight: 600 }}>Lat Gwarancji</span>
              </div>
              <div className="trust-item" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="trust-val" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>IP67</span>
                <span className="trust-lbl" style={{ fontSize: '0.65rem', color: '#aaa', fontWeight: 600 }}>Szczelność</span>
              </div>
              <div className="trust-item" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="trust-val" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>100%</span>
                <span className="trust-lbl" style={{ fontSize: '0.65rem', color: '#aaa', fontWeight: 600 }}>Obciążenia</span>
              </div>
            </div>

            {/* 6 story detailed rows */}
            <div className="container" style={{ padding: '20px 15px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', marginBottom: '20px', color: 'var(--c-heading)' }}>Szczegółowe zalety technologii</h2>
              <div className="b2b-story-section-m" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch1.webp" alt="7 lat gwarancji Scharfer" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>7 Lat Pełnej Gwarancji</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Zaufanie to podstawa w branży B2B. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce.</p>
                  </div>
                </div>

                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch2.webp" alt="Wodoodporność IP67" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Ochrona IP67 do Zadań Specjalnych</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67. Są całkowicie wodoodporne i pyłoszczelne.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Idealne rozwiązanie do oświetlenia elewacji, podświetlania basenów, banerów reklamowych i architektury ogrodowej. Wyeliminuj ryzyko zwarć w instalacjach outdoorowych.</p>
                  </div>
                </div>

                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch4.webp" alt="100% obciążenia" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Zaprojektowane do Pracy pod 100% Obciążeniem</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Jeśli kupujesz model 150W, otrzymujesz pełne 150W czystej, stabilnej mocy. Oznacza to mniejsze koszty instalacji oraz brak problemów z przegrzewaniem.</p>
                  </div>
                </div>

                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', padding: '15px' }}>
                    <img src="/scharfer/assets/ce_rohs.png" alt="Certyfikaty CE i RoHS" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Zgodność z Normami PN-EN, CE i RoHS</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Bezpieczeństwo przede wszystkim. Zasilacze Scharfer spełniają najbardziej rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Posiadają pełną certyfikację CE oraz RoHS. Wybierając markę Scharfer, chronisz swój biznes oraz inwestycje swoich klientów przed ryzykiem pożaru.</p>
                  </div>
                </div>

                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/40012.png" alt="Zabezpieczenia" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Zabezpieczenia OVP, SCP, OTP, OLP</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki:</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '15px', margin: '0 0 10px 0', fontSize: '0.82rem', color: 'var(--c-text)', lineHeight: 1.4 }}>
                      <li><strong>OVP</strong> – automatyczne odcięcie przy skokach napięcia.</li>
                      <li><strong>SCP</strong> – błyskawiczne zabezpieczenie przeciwzwarciowe.</li>
                      <li><strong>OTP</strong> – ochrona termiczna przed przegrzaniem.</li>
                      <li><strong>OLP</strong> – zabezpieczenie przeciążeniowe przy zbyt wysokim poborze.</li>
                    </ul>
                  </div>
                </div>

                <div className="b2b-story-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <img src="/scharfer/assets/sch3.webp" alt="Aluminiowa obudowa radiator" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '8px' }}>Aluminium i Żywica Epoksydowa</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '8px' }}>Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła. Obudowa z aluminium pełni rolę radiatora, a wnętrze jest w 100% zalane żywicą.</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy. Każda jednostka przechodzi test Burn-in przed wysyłką.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="section-container" style={{ padding: '30px 15px', background: '#fafafa', borderTop: '1px solid #eee' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '5px', textAlign: 'center', color: '#111827' }}>Gdzie sprawdzają się zasilacze?</h2>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#4b5563', marginBottom: '20px' }}>Zobacz, gdzie nasi partnerzy z powodzeniem stosują technologię Scharfer.</p>
              
              <div className="app-grid-m" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {[
                  { title: 'Domy i Rezydencje', desc: 'Wymagające instalacje domowe i rezydencjonalne potrzebują stabilnego zasilania taśm LED na elewacjach, schodach czy w podbitkach. Zasilacze Scharfer dzięki pełnej hermetyzacji IP67 oraz odporności na mróz i upały gwarantują bezawaryjną pracę na zewnątrz przez cały rok. Szeroki zakres napięcia wejściowego zabezpiecza domowe systemy przed nagłymi wahaniami prądu w sieci.', img: '/scharfer/assets/app_domy_1783188239361.png' },
                  { title: 'Bloki mieszkalne', desc: 'Oświetlenie klatek schodowych, korytarzy i ciągów komunikacyjnych w budynkach wielorodzinnych pracuje w trybie ciągłym i wymaga bezwzględnej niezawodności. Urządzenia Scharfer eliminują ryzyko częstych wymian serwisowych w trudno dostępnych miejscach, co znacząco obniża koszty eksploatacji dla wspólnot mieszkaniowych. Aktywny układ PFC chroni instalację budynku przed szkodliwymi zakłóceniami harmonicznymi generowanymi przez setki punktów świetlnych.', img: '/scharfer/assets/app_bloki_1783188247720.png' },
                  { title: 'Hale i Magazyny', desc: 'Wysokie hale produkcyjne oraz magazyny opierają się na długich liniach świetlnych LED o bardzo dużym poborze mocy. Zasilacze Scharfer o mocach sięgających 400W pozwalają na bezproblemowe zasilanie rozbudowanych systemów liniowych bez spadków napięcia na końcach obwodów. Pełna ochrona przed przeciążeniem i zwarciem zabezpiecza ciągłość pracy obiektów logistycznych i produkcyjnych.', img: '/scharfer/assets/app_hale_v2_1783188623293.png' },
                  { title: 'Obiekty sportowe', desc: 'Korty, orliki i boiska sportowe wymagają mocnych naświetlaczy LED i zasilania odpornego na ekstremalne obciążenia rozruchowe. Hermetyczna konstrukcja chroni podzespoły zasilacza przed wilgocią z murawy, rosą oraz bezpośrednimi opadami atmosferycznymi. Zasilacze Scharfer zapewniaja stałe i niemigoczące światło, co przekłada się na bezpieczeństwo oraz wysoki komfort zawodników.', img: '/scharfer/assets/app_sport_v2_1783188631467.png' },
                  { title: 'Ogrody & Parki', desc: 'Oświetlenie ogrodowe i parkowe jest nieustannie narażone na wilgotną glebę, zalewanie przez automatyczne zraszacze oraz bezpośredni kontakt z wodą. Podwójnie uszczelniona obudowa IP67 oraz zalewa żywiczna całkowicie eliminują ryzyko wniknięcia wilgoci do wnętrza elektroniki. Zapewnia to bezpieczną pracę taśm i opraw ogrodowych bez niebezpieczeństwa przebicia prądu do gruntu.', img: '/scharfer/assets/app_ogrod_v2_1783188615253.png' },
                  { title: 'Hotele & Gastro', desc: 'W branży hotelarskiej i gastronomicznej kluczowe jest stworzenie przytulnej atmosfery poprzez płynne ściemnianie taśm LED w pokojach i restauracjach. Specjalna żywica epoksydowa wewnątrz zasilaczy Scharfer skutecznie tłumi drgania cewek, eliminując uciążliwe piszczenie podczas regulacji natężenia światła. Cicha praca urządzeń gwarantuje gościom najwyższy komfort akustyczny w strefach relaksu.', img: '/scharfer/assets/app_hotel_1783188309904.png' },
                  { title: 'Kina & Kultura', desc: 'Sale kinowe i teatralne wymagają bezwzględnej ciszy oraz precyzyjnego sterowania przygaszaniem oświetlenia awaryjnego i dekoracyjnego. Zasilacze Scharfer idealnie współpracują z nowoczesnymi systemami ściemniania, nie wprowadzając szumów ani migotania w pasmach częstotliwości audio-wideo. Masywna obudowa działa jak pasywny radiator, co eliminuje konieczność stosowania głośnych wentylatorów chłodzących.', img: '/scharfer/assets/app_kina_v2_1783188608035.png' },
                  { title: 'Szkoły & Edukacja', desc: 'Bezpieczeństwo dzieci i stabilność oświetlenia w klasach lekcyjnych to absolutny priorytet dla placówek edukacyjnych. Urządzenia Scharfer spełniają rygorystyczne normy PN-EN, posiadając atesty zapobiegające powstawaniu pożarów w wyniku zwarcia (zabezpieczenie SCP). Stabilne, pozbawione tętnień napięcie wyjściowe chroni wzrok uczniów i zapobiega szybkiemu zmęczeniu podczas nauki.', img: '/scharfer/assets/app_szkoly_1783188326372.png' },
                  { title: 'Parkingi Podziemne', desc: 'Parkingi podziemne i zadaszone garaże to miejsca o stałej, wysokiej wilgotności powietrza oraz dużym stężeniu pyłów i spalin. Całkowita szczelność IP67 zasilaczy Scharfer chroni wrażliwe komponenty przed korozyjnym działaniem agresywnego środowiska parkingowego. Niezawodne zasilanie gwarantuje nieprzerwane oświetlenie dróg ewakuacyjnych i miejsc postojowych 24 godziny na dobę.', img: '/scharfer/assets/app_parkingi_v2_1783188598862.png' },
                  { title: 'Garaże & Warsztaty', desc: 'W warsztatach samochodowych i garażach oświetlenie stanowiskowe jest narażone na pył, oleje, wibracje oraz nagłe skoki napięcia wywołane pracą ciężkich maszyn. Aktywne filtry wejściowe oraz zabezpieczenie OVP chronią zasilacze i podłączone paski LED przed uszkodzeniami elektrycznymi. Solidna, metalowa konstrukcja obudowy jest odporna na przypadkowe uderzenia mechaniczne.', img: '/scharfer/assets/app_garaze_1783188344306.png' },
                  { title: 'Wiaty & Stolarka', desc: 'Oświetlenie wiat ogrodowych, zadaszeń i architektury drewnianej wymaga zasilaczy o bardzo niskiej temperaturze pracy obudowy w celach ochrony przeciwpożarowej. Zasilacze Scharfer, dzięki pełnemu zalaniu żywicą i aluminiowemu radiatorowi, efektywnie odprowadzają ciepło na zewnątrz i nie nagrzewają się do niebezpiecznych temperatur. Spełniają one restrykcyjne wymogi montażu bezpośrednio na podłożach palnych.', img: 'wiata_jezioro.png' },
                  { title: 'Infrastruktura & Mosty', desc: 'Iluminacja mostów, wiaduktów i obiektów inżynieryjnych wymaga sprzętu odpornego na nieustanne drgania konstrukcyjne, silny wiatr i zmienne warunki pogodowe. Hermetyczna obudowa Scharfer, w całości wypełniona elastyczną żywicą epoksydową, absorbuje wibracje i uniemożliwia pękanie połączeń lutowanych. Daje to pewność bezawaryjnej pracy oświetlenia w najbardziej ekstremalnych lokalizacjach infrastruktury.', img: '/scharfer/assets/app_mosty_1783188351515.png' }
                ].map((ap, idx) => (
                  <div key={idx} className="app-card-m" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                    <img src={ap.img} alt={ap.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                    <div className="app-card-info" style={{ padding: '15px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--c-heading)' }}>{ap.title}</h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{ap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="section-container" style={{ padding: '30px 15px', background: '#fafafa', borderTop: '1px solid #eee' }}>
              <h3 className="section-title" style={{ fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', marginBottom: '5px' }}>Często Zadawane Pytania (FAQ)</h3>
              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#666', marginBottom: '15px' }}>Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer</p>
              <div className="faq-list-m" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {faqItems.map((item, idx) => (
                  <div key={idx} className={`faq-item-m ${activeFaq === idx ? 'active' : ''}`} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                    <button 
                      className="faq-head-m" 
                      onClick={() => toggleFaq(idx)}
                      style={{ width: '100%', padding: '12px 15px', background: 'none', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-heading)', cursor: 'pointer' }}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon-m" style={{ fontSize: '1.2rem', color: '#dc2626' }}>{activeFaq === idx ? '−' : '+'}</span>
                    </button>
                    {activeFaq === idx && (
                      <div className="faq-body-m" style={{ padding: '0 15px 12px', fontSize: '0.82rem', color: '#555', lineHeight: 1.4, borderTop: '1px solid #eee', paddingTop: '10px' }}>
                        <p style={{ margin: 0 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <MobileFooter onOpenRegulamin={() => setMobileRegulaminOpen(true)} onOpenRodo={() => setMobileRodoOpen(true)} />
          </section>
        )}

        {/* VIEW: KONTAKT */}
        {activeTab === 'kontakt' && (
          <section className="view-section active">
            {/* Unified Page Hero */}
            <div style={{ position: 'relative', width: '100%', padding: '45px 20px', textAlign: 'center', overflow: 'hidden', borderBottom: '1px solid #eee', backgroundImage: 'url("/scharfer/assets/kontakt_hero.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.88)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 3 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '10px', lineHeight: 1.2, textShadow: '0 2px 6px rgba(0, 0, 0, 0.22)' }}>{t('contactTitle')}</h1>
                <p style={{ fontSize: '0.95rem', color: '#111827', margin: 0, lineHeight: 1.5, fontWeight: 500, textShadow: '0 1px 4px rgba(0, 0, 0, 0.18)' }}>
                  Chcesz zostać naszym dystrybutorem? Masz pytania techniczne? Napisz do nas, a nasz zespół ekspertów odpowie niezwłocznie.
                </p>
              </div>
            </div>

            <div className="section-container" style={{ padding: '25px 15px', background: '#fff' }}>
              <h2 className="section-title" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center', color: 'var(--c-heading)' }}>Oficjalny Dystrybutor</h2>
              
              {/* Prescot Card */}
              <div className="contact-card-m" style={{ background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #eee', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', marginBottom: '25px' }}>
                <span className="contact-badge-label" style={{ display: 'inline-block', fontSize: '8px', background: '#eee', color: '#555', fontWeight: 800, padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Oficjalny Dystrybutor</span>
                <div style={{ margin: '8px 0 12px' }}>
                  <img src="/scharfer/PRESCOT_logo.png" alt="Prescot LED" className="contact-prescot-logo" style={{ height: '24px', display: 'block', margin: '0 auto' }} />
                </div>
                <p className="contact-company-name" style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--c-heading)' }}>PRESCOT SP. Z O.O.</p>
                <p className="contact-company-details" style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 15px 0', lineHeight: 1.4 }}>ul. Wileńska 1, 11-500 Giżycko<br />NIP: 8451939947</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.694662867049!2d21.758713212876618!3d54.03362147230008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e1a49db25492d5%3A0xe97ab425264b3df3!2sWile%C5%84ska%201%2C%2011-500%20Gi%C5%BCycko!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl" width="100%" height="220" style={{ border: 0, borderRadius: '8px', marginBottom: '15px' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="contact-buttons-m" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="tel:+48877776482" className="contact-action-btn" style={{ background: '#f8f9fa', color: 'var(--c-heading)', padding: '10px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', border: '1px solid #ddd' }}>
                    📞 +48 87 777 64 82
                  </a>
                  <a href="mailto:komponenty@prescot.pl" className="contact-action-btn" style={{ background: '#f8f9fa', color: 'var(--c-heading)', padding: '10px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', border: '1px solid #ddd' }}>
                    ✉️ komponenty@prescot.pl
                  </a>
                </div>
              </div>

              {/* B2B Form Card */}
              <div className="form-card" style={{ background: 'white', border: '1px solid #eee', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '30px' }}>
                <h2 className="form-title" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--c-heading)' }}>Kontakt B2B</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert('Formularz został wysłany. Skontaktujemy się z Tobą w ciągu 24h.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-heading)' }}>{t('formName')}</label>
                    <input type="text" id="name" required style={{ padding: '0.8rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.9rem' }} />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-heading)' }}>{t('formEmail')}</label>
                    <input type="email" id="email" required style={{ padding: '0.8rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.9rem' }} />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-heading)' }}>{t('formMsg')}</label>
                    <textarea id="message" rows={5} required style={{ padding: '0.8rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.9rem', resize: 'vertical' }}></textarea>
                  </div>
                  <div className="form-checkbox" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <input type="checkbox" id="gdpr" required style={{ marginTop: '0.2rem' }} />
                    <label htmlFor="gdpr" style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.4 }}>{t('formGdpr')}</label>
                  </div>
                  <button type="submit" className="btn-primary" style={{ padding: '1rem', border: 'none', background: '#dc2626', color: 'white', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
                    {t('formSend')}
                  </button>
                </form>
              </div>

              {/* Google Map */}
              <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <iframe 
                  src="https://maps.google.com/maps?q=Wile%C5%84ska%201,%2011-500%20Gi%C5%BCycko&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="250" 
                  style={{ border: 0, display: 'block' }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Mapa dojazdu do Prescot"
                ></iframe>
              </div>

              {/* FAQ */}
              <h3 className="section-title" style={{ fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', margin: '0 0 5px 0' }}>Często Zadawane Pytania</h3>
              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#666', marginBottom: '15px' }}>Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer</p>
              <div className="faq-list-m" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {faqItems.map((item, idx) => (
                  <div key={idx} className={`faq-item-m ${activeFaq === idx ? 'active' : ''}`} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                    <button 
                      className="faq-head-m" 
                      onClick={() => toggleFaq(idx)}
                      style={{ width: '100%', padding: '12px 15px', background: 'none', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-heading)', cursor: 'pointer' }}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon-m" style={{ fontSize: '1.2rem', color: '#dc2626' }}>{activeFaq === idx ? '−' : '+'}</span>
                    </button>
                    {activeFaq === idx && (
                      <div className="faq-body-m" style={{ padding: '0 15px 12px', fontSize: '0.82rem', color: '#555', lineHeight: 1.4, borderTop: '1px solid #eee', paddingTop: '10px' }}>
                        <p style={{ margin: 0 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <MobileFooter onOpenRegulamin={() => setMobileRegulaminOpen(true)} onOpenRodo={() => setMobileRodoOpen(true)} />
          </section>
        )}

      </main>

      {/* B2C Purchase Modal */}
      {b2cModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '30px 20px', width: '100%', maxWidth: '350px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <img src="/scharfer/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '24px', margin: '0 auto 20px', display: 'block' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#111', marginBottom: '10px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Przejście do sklepu B2C</h3>
            <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '25px', lineHeight: 1.5 }}>
              Zostaniesz przeniesiony na naszą główną stronę <strong>www.prescot.com.pl</strong>, gdzie możesz bezpiecznie kupić zasilacze LED Scharfer w ilości detalicznej.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setB2cModalOpen(false)} style={{ flex: 1, padding: '12px', background: '#f3f4f6', color: '#4b5563', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Anuluj</button>
              <button onClick={() => { setB2cModalOpen(false); window.open("https://www.prescot.com.pl/pl/c/Zasilacze-LED-Scharfer/580", "_blank"); }} style={{ flex: 1, padding: '12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Przejdź</button>
            </div>
          </div>
        </div>
      )}

      {/* App Bottom Navigation */}
      <nav className="app-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 'calc(70px + env(safe-area-inset-bottom))', paddingBottom: 'env(safe-area-inset-bottom)', background: 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 2000 }}>
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '20%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'home' ? '#dc2626' : '#9ca3af' }}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'home' ? '#dc2626' : '#9ca3af' }}>{t('navHome')}</span>
        </div>
        <div className={`nav-item ${activeTab === 'oferta' ? 'active' : ''}`} onClick={() => handleTabChange('oferta')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '20%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'oferta' ? '#dc2626' : '#9ca3af' }}>
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'oferta' ? '#dc2626' : '#9ca3af' }}>{t('navOferta')}</span>
        </div>
        <div className={`nav-item ${activeTab === 'info' ? 'active' : ''}`} onClick={() => handleTabChange('info')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '20%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'info' ? '#dc2626' : '#9ca3af' }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'info' ? '#dc2626' : '#9ca3af' }}>{t('navPoznajShort')}</span>
        </div>
        <div onClick={() => setB2cModalOpen(true)} className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '20%', height: '100%', cursor: 'pointer', textDecoration: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9ca3af' }}>
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: '#9ca3af' }}>{t('navB2C')}</span>
        </div>
        <div className={`nav-item ${activeTab === 'kontakt' ? 'active' : ''}`} onClick={() => handleTabChange('kontakt')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '20%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'kontakt' ? '#dc2626' : '#9ca3af' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'kontakt' ? '#dc2626' : '#9ca3af' }}>{t('navKontakt')}</span>
        </div>
      </nav>

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}

      {/* Mobile Regulamin Modal */}
      {mobileRegulaminOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setMobileRegulaminOpen(false)}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: 'var(--c-heading)' }}>Regulamin Serwisu</h3>
              <span onClick={() => setMobileRegulaminOpen(false)} style={{ fontSize: '1.8rem', cursor: 'pointer', color: '#aaa', lineHeight: 1 }}>&times;</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--c-text)', lineHeight: 1.6 }}>
              <h4 style={{ margin: '10px 0 5px' }}>§ 1. Postanowienia ogólne</h4>
              <p style={{ margin: '0 0 10px' }}>1. Regulamin określa zasady korzystania z witryny <strong>scharfer.com.pl</strong>.</p>
              <p style={{ margin: '0 0 10px' }}>2. Właścicielem serwisu jest <strong>PRESCOT SP. Z O.O.</strong> z siedzibą w Giżycku, ul. Wileńska 1, NIP: 8451939947.</p>
              <p style={{ margin: '0 0 10px' }}>3. Serwis ma charakter katalogu technicznego i informacyjnego B2B.</p>
              <h4 style={{ margin: '10px 0 5px' }}>§ 2. Korzystanie z serwisu</h4>
              <p style={{ margin: '0 0 10px' }}>1. Korzystanie jest bezpłatne.</p>
              <p style={{ margin: '0 0 10px' }}>2. Opisy, diagramy i materiały wideo są własnością Administratora i podlegają ochronie autorskiej.</p>
              <p style={{ margin: '0 0 10px' }}>3. Dane techniczne produktów mają charakter informacyjny i nie stanowią oferty handlowej w rozumieniu Kodeksu Cywilnego.</p>
              <h4 style={{ margin: '10px 0 5px' }}>§ 3. Kontakt</h4>
              <p style={{ margin: '0 0 10px' }}>1. Użytkownik może kontaktować się z dystrybutorem za pośrednictwem poczty e-mail: <strong>komponenty@prescot.pl</strong> lub infolinii: <strong>+48 87 777 64 82</strong>.</p>
            </div>
            <button onClick={() => setMobileRegulaminOpen(false)} className="btn-primary" style={{ width: '100%', padding: '10px', marginTop: '15px', border: 'none', background: '#dc2626', backgroundColor: '#dc2626', color: 'white', borderRadius: '6px', fontWeight: 600 }}>Zamknij</button>
          </div>
        </div>
      )}

      {/* Mobile RODO Modal */}
      {mobileRodoOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setMobileRodoOpen(false)}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: 'var(--c-heading)' }}>Polityka Prywatności i RODO</h3>
              <span onClick={() => setMobileRodoOpen(false)} style={{ fontSize: '1.8rem', cursor: 'pointer', color: '#aaa', lineHeight: 1 }}>&times;</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--c-text)', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 10px' }}>Zgodnie z ogólnym rozporządzeniem o ochronie danych (RODO) z dnia 27 kwietnia 2016 r., informujemy o zasadach przetwarzania danych:</p>
              <h4 style={{ margin: '10px 0 5px' }}>1. Administrator Danych</h4>
              <p style={{ margin: '0 0 10px' }}>Administratorem danych osobowych jest <strong>PRESCOT SP. Z O.O.</strong> z siedzibą w Giżycku, ul. Wileńska 1, NIP: 8451939947, e-mail: <strong>komponenty@prescot.pl</strong>.</p>
              <h4 style={{ margin: '10px 0 5px' }}>2. Cele przetwarzania</h4>
              <p style={{ margin: '0 0 10px' }}>Dane podane w formularzu kontaktowym (imię, adres e-mail) przetwarzane są wyłącznie w celu obsługi zapytania ofertowego lub technicznego (art. 6 ust. 1 lit. f RODO – uzasadniony interes Administratora).</p>
              <h4 style={{ margin: '10px 0 5px' }}>3. Prawa użytkownika</h4>
              <p style={{ margin: '0 0 10px' }}>Użytkownikowi przysługuje prawo dostępu do swoich danych, sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu oraz wniesienia skargi do PUODO.</p>
            </div>
            <button onClick={() => setMobileRodoOpen(false)} className="btn-primary" style={{ width: '100%', padding: '10px', marginTop: '15px', border: 'none', background: '#dc2626', backgroundColor: '#dc2626', color: 'white', borderRadius: '6px', fontWeight: 600 }}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileFooter({ onOpenRegulamin, onOpenRodo }: { onOpenRegulamin: () => void; onOpenRodo: () => void }) {
  return (
    <footer className="app-footer" style={{ textAlign: 'center', padding: '3rem 1.25rem 2rem 1.25rem', marginTop: '2rem', background: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
      
      {/* Brand Column */}
      <div className="footer-logo-m" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
        <img src="/scharfer/logo_scharfer.png" alt="Scharfer" style={{ height: '26px' }} />
        <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: 0, maxWidth: '280px', lineHeight: 1.5 }}>
          Profesjonalne zasilacze LED w klasie IP67 o zadeklarowanej 100% wydajności.
        </p>
      </div>

      {/* Distributor Column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Oficjalny Dystrybutor</span>
        <a href="https://prescot.com.pl" target="_blank" rel="noopener noreferrer">
          <img src="/scharfer/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '15px', display: 'block' }} />
        </a>
        <div style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.5, marginTop: '0.2rem' }}>
          <strong>Prescot Sp. z o.o.</strong><br />
          ul. Wileńska 1, 11-500 Giżycko<br />
          NIP: 8451939947
        </div>
      </div>

      {/* Support & Contact Column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Wsparcie i Kontakt</span>
        <a href="mailto:komponenty@prescot.pl" style={{ color: '#dc2626', fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
          komponenty@prescot.pl
        </a>
        <a href="tel:+48877776482" style={{ color: 'var(--c-heading)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
          tel. +48 87 777 64 82
        </a>
      </div>

      {/* Copyright Line */}
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
          <button onClick={onOpenRegulamin} style={{ color: "#9ca3af", fontSize: "0.78rem", fontWeight: 600, textDecoration: "underline", background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Regulamin</button>
          <button onClick={onOpenRodo} style={{ color: "#9ca3af", fontSize: "0.78rem", fontWeight: 600, textDecoration: "underline", background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>RODO</button>
        </div>
        <span className="footer-copy-m" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>&copy; {new Date().getFullYear()} Scharfer. Wszelkie prawa zastrzeżone.</span>
        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
          Powered by <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 600 }}>PRESCOT LED</a>
        </span>
      </div>

    </footer>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const powerMatch = product.name.match(/\d+W/);
  const powerText = powerMatch ? powerMatch[0] : '';
  
  const renderSymbolRed = (name: string) => {
    const symbolMatch = name.match(/SCH-[\d\-A]+/);
    const symbol = symbolMatch ? symbolMatch[0] : name.split(' ')[0];
    return <span style={{ color: '#dc2626' }}>{symbol}</span>;
  };

  return (
    <div className="product-modal active" id="product-modal" onClick={(e) => { if ((e.target as HTMLElement).id === 'product-modal') onClose(); }} style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto', background: 'white', borderRadius: '16px', padding: '1.5rem', position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '95%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #eee' }}>
        <span className="modal-close" onClick={onClose} style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '2rem', cursor: 'pointer', color: '#aaa', transition: 'color 0.2s', fontWeight: 300, lineHeight: 1 }}>&times;</span>
        
        {/* Expanded image container */}
        <div className="modal-image-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: '12px', padding: '1rem', overflow: 'hidden', minHeight: '180px' }}>
          <img 
            src={product.img} 
            alt={product.name} 
            onClick={() => setIsZoomed(true)}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '180px', 
              objectFit: 'contain', 
              cursor: 'zoom-in', 
              transition: 'transform 0.3s ease',
              position: 'relative',
              zIndex: 10
            }} 
          />
        </div>
        
        <div className="modal-info-col" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--c-heading)', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>{renderSymbolRed(product.name)}</h2>
          
          <table className="modal-specs-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.6rem 0', color: '#6b7280', fontWeight: 500 }}>Napięcie wyjściowe</td><td style={{ padding: '0.6rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.voltage} DC</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.6rem 0', color: '#6b7280', fontWeight: 500 }}>Prąd wyjściowy</td><td style={{ padding: '0.6rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.current}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.6rem 0', color: '#6b7280', fontWeight: 500 }}>Moc znamionowa</td><td style={{ padding: '0.6rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{powerText}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.6rem 0', color: '#6b7280', fontWeight: 500 }}>Kod EAN</td><td style={{ padding: '0.6rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.ean}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.6rem 0', color: '#6b7280', fontWeight: 500 }}>Wymiary</td><td style={{ padding: '0.6rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.dim}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.6rem 0', color: '#6b7280', fontWeight: 500 }}>Klasa szczelności</td><td style={{ padding: '0.6rem 0', fontWeight: 800, color: '#dc2626' }}>IP67 (wodoodporny)</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.6rem 0', color: '#6b7280', fontWeight: 500 }}>Gwarancja</td><td style={{ padding: '0.6rem 0', fontWeight: 800, color: '#dc2626' }}>7 Lat Gwarancji</td></tr>
            </tbody>
          </table>

          <div className="modal-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', padding: '0.9rem', borderRadius: '8px', background: '#dc2626', color: 'white', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(230,0,0,0.1)' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Pobierz PDF karty
            </a>
            <button onClick={onClose} className="btn-secondary" style={{ padding: '0.8rem', borderRadius: '8px', fontWeight: 600, border: '1px solid #ddd', color: '#555', background: 'white' }}>
              Powrót
            </button>
          </div>
        </div>
        
        {isZoomed && (
          <div 
            className="product-lightbox"
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src={product.img} alt={product.name} style={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain' }} />
            <span onClick={() => setIsZoomed(false)} style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', fontSize: '2.5rem', cursor: 'pointer' }}>&times;</span>
          </div>
        )}
      </div>
    </div>
  );
}

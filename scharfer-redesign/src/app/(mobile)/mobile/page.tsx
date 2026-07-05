'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { productsData, Product } from '@/data/scharferData';

type Tab = 'home' | 'oferta' | 'info' | 'kontakt';

export default function MobileAppPage() {
  const { lang, setLang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [langOpen, setLangOpen] = useState(false);

  // Home story states (which story card is expanded)
  const [activeStory, setActiveStory] = useState<number | null>(null);

  // Oferta states
  const [filterVoltage, setFilterVoltage] = useState<'all' | '12V' | '24V'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Kontakt FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const flagEmojis: Record<string, string> = { pl: '🇵🇱', en: '🇬🇧', de: '🇩🇪', lt: '🇱🇹' };

  // Filter products
  const filteredProducts = productsData.filter(p => {
    const matchesFilter = filterVoltage === 'all' || p.specs.voltage === filterVoltage;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.index.toLowerCase().includes(searchQuery.toLowerCase());
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
      img: '/assets/sch1.webp',
      type: 'image'
    },
    {
      title: 'Ochrona IP67 do Zadań Specjalnych',
      icon: '💧',
      body: 'Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67. Są całkowicie wodoodporne i pyłoszczelne.',
      img: '/assets/sch2.webp',
      type: 'image'
    },
    {
      title: 'Praca pod 100% obciążeniem',
      icon: '⚡',
      body: 'Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem. Kupujesz 150W i otrzymujesz 150W.',
      img: '/assets/sch4.webp',
      type: 'image'
    },
    {
      title: 'Zgodność z Normami CE, RoHS',
      icon: '🇪🇺',
      body: 'Zasilacze Scharfer spełniają rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547.',
      img: '/assets/ce_rohs.png',
      type: 'contain'
    },
    {
      title: 'Zabezpieczenia OVP, SCP, OTP, OLP',
      icon: '🔌',
      body: 'Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki: przeciążeniowe, przeciwzwarciowe, termiczne i nadnapięciowe.',
      img: '/assets/40012.png',
      type: 'image'
    },
    {
      title: 'Masywne Aluminium i Żywica',
      icon: '🌡️',
      body: 'Trwałość zasilacza zależy od odprowadzania ciepła. Zasilacze Scharfer zamknięte są w aluminiowej obudowie-radiatorze, a ich wnętrze jest w 100% zalane żywicą epoksydową przewodzącą ciepło.',
      img: '/assets/sch3.webp',
      type: 'image'
    }
  ];

  const faqItems = [
    {
      q: 'Jakie są warunki gwarancji na zasilacze LED Scharfer?',
      a: 'Każdy zasilacz LED marki Scharfer objęty jest pełną, 7-letnią gwarancją producenta. Jesteśmy pewni naszej technologii i stosowanych komponentów, co pozwala nam zapewnić Ci maksymalne bezpieczeństwo inwestycji.'
    },
    {
      q: 'Czy zasilacze posiadają certyfikat IP67?',
      a: 'Tak, zasilacze posiadają klasę szczelności IP67. Oznacza to pełną wodoszczelność i pyłoszczelność, dzięki czemu idealnie nadają się do montażu na elewacjach budynków, reklamach świetlnych oraz w innych trudnych warunkach zewnętrznych.'
    },
    {
      q: 'Jak zostać dystrybutorem zasilaczy Scharfer?',
      a: 'Aby rozpocząć współpracę B2B, wystarczy napisać bezpośrednio na adres komponenty@prescot.pl lub zadzwonić pod numer +48 87 777 64 82. Przedstawimy dedykowane warunki handlowe i rabaty hurtowe.'
    },
    {
      q: 'Czy gwarantujecie pracę pod pełnym obciążeniem?',
      a: 'Tak. Jedną z głównych zalet zasilaczy Scharfer jest gwarancja stabilnej pracy pod 100% zadeklarowanym obciążeniem. Nie musisz stosować zapasów mocy (np. marginesów 20%), co optymalizuje koszty całej instalacji LED.'
    },
    {
      q: 'Gdzie najlepiej stosować zasilacze 12V i 24V Scharfer?',
      a: 'Zasilacze 12V idealnie sprawdzają się do mniejszych instalacji LED, podświetleń meblowych i gablot. Zasilacze 24V rekomendujemy przy dłuższych ciągach oświetleniowych, zapewniając stabilne napięcie na całym odcinku.'
    },
    {
      q: 'Jakie są kluczowe przewagi (Przewaga Scharfer)?',
      a: 'Przewaga Scharfer to przede wszystkim: obudowa w klasie IP67, stabilne napięcie wyjściowe, szeroki zakres wejściowy (100-250V AC), praca przy 100% obciążenia, transformatory zalewane żywicą przewodzącą ciepło, eliminacja piszczenia przy ściemniaczach oraz zaawansowane zabezpieczenia przeciwprzeciążeniowe, przeciwzwarciowe i termiczne.'
    }
  ];

  return (
    <div style={{ paddingBottom: '70px', minHeight: '100vh', background: '#f8f9fa' }}>
      
      {/* Mobile Header */}
      <header className="app-header" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', borderBottom: '1px solid #eee', background: 'white', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} style={{ display: 'block' }}>
            <img src="/logo_scharfer.png" alt="Scharfer" style={{ height: '28px' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
            <span style={{ fontSize: '7px', fontWeight: 700, color: '#999', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Dystrybutor:</span>
            <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer">
              <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '9px', display: 'inline-block', verticalAlign: 'middle' }} />
            </a>
          </div>
        </div>
        <div className="header-right" id="lang-wrapper" style={{ position: 'relative' }}>
          <button className="lang-btn" id="lang-btn" onClick={() => setLangOpen(!langOpen)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', padding: '4px' }}>
            {flagEmojis[lang]}
          </button>
          {langOpen && (
            <div className="lang-dropdown active" id="lang-dropdown" style={{ display: 'flex', position: 'absolute', top: '100%', right: 0, background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', flexDirection: 'column', minWidth: '80px', overflow: 'hidden', border: '1px solid #eee' }}>
              {(['pl', 'en', 'de', 'lt'] as const).map(l => (
                <button key={l} onClick={() => { setLang(l); setLangOpen(false); }} style={{ padding: '10px', background: 'none', border: 'none', fontSize: '0.9rem', textAlign: 'left', borderBottom: l !== 'lt' ? '1px solid #eee' : 'none' }}>
                  {flagEmojis[l]} {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-main" style={{ paddingTop: '70px' }}>
        
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <section className="view-section active">
            <div className="hero">
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '10px', lineHeight: 1.2 }}>
                7 Lat gwarancji. Stabilne Zasilanie. Prawdziwe 100% mocy.
              </h1>
              <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '20px', lineHeight: 1.4 }}>
                Koniec z piszczeniem, awariami i spadkami napięć. Wodoodporne zasilacze LED IP67 stworzone do pracy pod pełnym obciążeniem. 7 lat gwarancji.
              </p>
              
              <div className="hero-video-container" style={{ margin: '0 -15px', position: 'relative', overflow: 'hidden', height: '200px', background: '#000', borderRadius: '8px', marginBottom: '20px' }}>
                <video autoPlay loop muted playsInline className="hero-video-element" poster="/assets/scharfer_city_night.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                  <source src="/scharfer_woda_8sek.mp4" type="video/mp4" />
                </video>
                <div className="hero-video-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.4)' }} />
              </div>

              <div className="hero-trust-m" style={{ display: 'flex', justifyContent: 'space-around', gap: '8px', marginTop: '15px' }}>
                <div className="trust-pill" style={{ flex: 1, textAlign: 'center', background: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <span className="pill-val" style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--c-primary)' }}>7 Lat</span>
                  <span className="pill-lbl" style={{ fontSize: '0.75rem', color: '#666' }}>Gwarancji</span>
                </div>
                <div className="trust-pill" style={{ flex: 1, textAlign: 'center', background: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <span className="pill-val" style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--c-primary)' }}>IP67</span>
                  <span className="pill-lbl" style={{ fontSize: '0.75rem', color: '#666' }}>Szczelność</span>
                </div>
                <div className="trust-pill" style={{ flex: 1, textAlign: 'center', background: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <span className="pill-val" style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--c-primary)' }}>100%</span>
                  <span className="pill-lbl" style={{ fontSize: '0.75rem', color: '#666' }}>Mocy</span>
                </div>
              </div>
            </div>

            {/* Stories */}
            <div className="section-container bg-white" style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', background: 'white', margin: '20px 0', padding: '20px 15px' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '5px', textAlign: 'center' }}>Technologia bez kompromisów</h2>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>Poznaj kluczowe przewagi techniczne zasilaczy Scharfer.</p>
              
              <div className="story-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stories.map((st, idx) => (
                  <div key={idx} className={`story-item ${activeStory === idx ? 'active' : ''}`} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                    <button 
                      className="story-head" 
                      onClick={() => toggleStory(idx)}
                      style={{ width: '100%', padding: '12px 15px', background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: 'var(--c-heading)', cursor: 'pointer' }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{st.icon}</span>
                        <span>{st.title}</span>
                      </span>
                      <span>{activeStory === idx ? '▲' : '▼'}</span>
                    </button>
                    {activeStory === idx && (
                      <div className="story-body" style={{ padding: '15px', background: '#fafafa', borderTop: '1px solid #eee' }}>
                        <p style={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.5, margin: '0 0 12px 0' }}>{st.body}</p>
                        <img 
                          src={st.img} 
                          alt={st.title} 
                          style={{ 
                            width: '100%', 
                            borderRadius: '6px', 
                            height: st.type === 'contain' ? '120px' : 'auto', 
                            objectFit: st.type === 'contain' ? 'contain' : 'cover' 
                          }} 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="section-container" style={{ padding: '10px 15px' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '5px', textAlign: 'center' }}>Gdzie sprawdzają się zasilacze?</h2>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>Zobacz, gdzie nasi partnerzy z powodzeniem stosują technologię Scharfer.</p>
              
              <div className="app-grid-m" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {[
                  { title: 'Domy i Rezydencje', desc: 'Wymagające instalacje domowe i rezydencjonalne potrzebują stabilnego zasilania taśm LED na elewacjach, schodach czy w podbitkach. Zasilacze Scharfer dzięki pełnej hermetyzacji IP67 oraz odporności na mróz i upały gwarantują bezawaryjną pracę na zewnątrz przez cały rok. Szeroki zakres napięcia wejściowego zabezpiecza domowe systemy przed nagłymi wahaniami prądu w sieci.', img: '/assets/app_domy_1783188239361.png' },
                  { title: 'Bloki mieszkalne', desc: 'Oświetlenie klatek schodowych, korytarzy i ciągów komunikacyjnych w budynkach wielorodzinnych pracuje w trybie ciągłym i wymaga bezwzględnej niezawodności. Urządzenia Scharfer eliminują ryzyko częstych wymian serwisowych w trudno dostępnych miejscach, co znacząco obniża koszty eksploatacji dla wspólnot mieszkaniowych. Aktywny układ PFC chroni instalację budynku przed szkodliwymi zakłóceniami harmonicznymi generowanymi przez setki punktów świetlnych.', img: '/assets/app_bloki_1783188247720.png' },
                  { title: 'Hale i Magazyny', desc: 'Wysokie hale produkcyjne oraz magazyny opierają się na długich liniach świetlnych LED o bardzo dużym poborze mocy. Zasilacze Scharfer o mocach sięgających 400W pozwalają na bezproblemowe zasilanie rozbudowanych systemów liniowych bez spadków napięcia na końcach obwodów. Pełna ochrona przed przeciążeniem i zwarciem zabezpiecza ciągłość pracy obiektów logistycznych i produkcyjnych.', img: '/assets/app_hale_v2_1783188623293.png' },
                  { title: 'Obiekty sportowe', desc: 'Korty, orliki i boiska sportowe wymagają mocnych naświetlaczy LED i zasilania odpornego na ekstremalne obciążenia rozruchowe. Hermetyczna konstrukcja chroni podzespoły zasilacza przed wilgocią z murawy, rosą oraz bezpośrednimi opadami atmosferycznymi. Zasilacze Scharfer zapewniają stałe i niemigoczące światło, co przekłada się na bezpieczeństwo oraz wysoki komfort zawodników.', img: '/assets/app_sport_v2_1783188631467.png' },
                  { title: 'Ogrody & Parki', desc: 'Oświetlenie ogrodowe i parkowe jest nieustannie narażone na wilgotną glebę, zalewanie przez automatyczne zraszacze oraz bezpośredni kontakt z wodą. Podwójnie uszczelniona obudowa IP67 oraz zalewa żywiczna całkowicie eliminują ryzyko wniknięcia wilgoci do wnętrza elektroniki. Zapewnia to bezpieczną pracę taśm i opraw ogrodowych bez niebezpieczeństwa przebicia prądu do gruntu.', img: '/assets/app_ogrod_v2_1783188615253.png' },
                  { title: 'Hotele & Gastro', desc: 'W branży hotelarskiej i gastronomicznej kluczowe jest stworzenie przytulnej atmosfery poprzez płynne ściemnianie taśm LED w pokojach i restauracjach. Specjalna żywica epoksydowa wewnątrz zasilaczy Scharfer skutecznie tłumi drgania cewek, eliminując uciążliwe piszczenie podczas regulacji natężenia światła. Cicha praca urządzeń gwarantuje gościom najwyższy komfort akustyczny w strefach relaksu.', img: '/assets/app_hotel_1783188309904.png' },
                  { title: 'Kina & Kultura', desc: 'Sale kinowe i teatralne wymagają bezwzględnej ciszy oraz precyzyjnego sterowania przygaszaniem oświetlenia awaryjnego i dekoracyjnego. Zasilacze Scharfer idealnie współpracują z nowoczesnymi systemami ściemniania, nie wprowadząc szumów ani migotania w pasmach częstotliwości audio-wideo. Masywna obudowa działa jak pasywny radiator, co eliminuje konieczność stosowania głośnych wentylatorów chłodzących.', img: '/assets/app_kina_v2_1783188608035.png' },
                  { title: 'Szkoły & Edukacja', desc: 'Bezpieczeństwo dzieci i stabilność oświetlenia w klasach lekcyjnych to absolutny priorytet dla placówek edukacyjnych. Urządzenia Scharfer spełniają rygorystyczne normy PN-EN, posiadając atesty zapobiegające powstawaniu pożarów w wyniku zwarcia (zabezpieczenie SCP). Stabilne, pozbawione tętnień napięcie wyjściowe chroni wzrok uczniów i zapobiega szybkiemu zmęczeniu podczas nauki.', img: '/assets/app_szkoly_1783188326372.png' },
                  { title: 'Parkingi Podziemne', desc: 'Parkingi podziemne i zadaszone garaże to miejsca o stałej, wysokiej wilgotności powietrza oraz dużym stężeniu pyłów i spalin. Całkowita szczelność IP67 zasilaczy Scharfer chroni wrażliwe komponenty przed korozyjnym działaniem agresywnego środowiska parkingowego. Niezawodne zasilanie gwarantuje nieprzerwane oświetlenie dróg ewakuacyjnych i miejsc postojowych 24 godziny na dobę.', img: '/assets/app_parkingi_v2_1783188598862.png' },
                  { title: 'Garaże & Warsztaty', desc: 'W warsztatach samochodowych i garażach oświetlenie stanowiskowe jest narażone na pył, oleje, wibracje oraz nagłe skoki napięcia wywołane pracą ciężkich maszyn. Aktywne filtry wejściowe oraz zabezpieczenie OVP chronią zasilacze i podłączone paski LED przed uszkodzeniami elektrycznymi. Solidna, metalowa konstrukcja obudowy jest odporna na przypadkowe uderzenia mechaniczne.', img: '/assets/app_garaze_1783188344306.png' },
                  { title: 'Wiaty & Stolarka', desc: 'Oświetlenie wiat ogrodowych, zadaszeń i architektury drewnianej wymaga zasilaczy o bardzo niskiej temperaturze pracy obudowy w celach ochrony przeciwpożarowej. Zasilacze Scharfer, dzięki pełnemu zalaniu żywicą i aluminiowemu radiatorowi, efektywnie odprowadzają ciepło na zewnątrz i nie nagrzewają się do niebezpiecznych temperatur. Spełniają one restrykcyjne wymogi montażu bezpośrednio na podłożach palnych.', img: '/wiata_jezioro.png' },
                  { title: 'Infrastruktura & Mosty', desc: 'Iluminacja mostów, wiaduktów i obiektów inżynieryjnych wymaga sprzętu odpornego na nieustanne drgania konstrukcyjne, silny wiatr i zmienne warunki pogodowe. Hermetyczna obudowa Scharfer, w całości wypełniona elastyczną żywicą epoksydową, absorbuje wibracje i uniemożliwia pękanie połączeń lutowanych. Daje to pewność bezawaryjnej pracy oświetlenia w najbardziej ekstremalnych lokalizacjach infrastruktury.', img: '/assets/app_mosty_1783188351515.png' }
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
            
            {/* Footer */}
            <MobileFooter />
          </section>
        )}

        {/* VIEW: OFERTA */}
        {activeTab === 'oferta' && (
          <section className="view-section active">
            <div className="section-container" style={{ padding: '20px 15px' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px', textAlign: 'center' }}>Katalog Zasilaczy LED</h2>
              
              {/* B2C Retail Callout */}
              <div className="b2c-callout" style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '1px solid #fca5a5', padding: '15px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ flex: 1.5 }}>
                  <h4 style={{ color: '#991b1b', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px 0' }}>Zakup detaliczny B2C</h4>
                  <p style={{ color: '#7f1d1d', fontSize: '0.7rem', margin: 0, lineHeight: 1.3 }}>Kup pojedyncze sztuki zasilaczy w sklepie.</p>
                </div>
                <a href="https://www.prescot.com.pl/pl/c/Zasilacze-LED-Scharfer/580" target="_blank" rel="noopener noreferrer" style={{ background: 'var(--c-primary)', color: 'white', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(220,38,38,0.15)' }}>
                  Sklep B2C
                </a>
              </div>

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
                        background: filterVoltage === v ? 'var(--c-primary)' : 'white', 
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
              <div className="mobile-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {filteredProducts.map(p => {
                  const powerMatch = p.name.match(/\d+W/);
                  const powerText = powerMatch ? powerMatch[0] : '';
                  return (
                    <div key={p.index} style={{ background: 'white', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                      <div className="specs-line" style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.5rem', flexWrap: 'nowrap', width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '2px' }}>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.3rem', fontSize: '0.55rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>{powerText}</span>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.3rem', fontSize: '0.55rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>IP67</span>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.3rem', fontSize: '0.55rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>SELV</span>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.3rem', fontSize: '0.55rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>CE</span>
                        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.3rem', fontSize: '0.55rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>RoHS</span>
                        <span style={{ backgroundColor: 'white', border: '1px solid var(--c-red)', color: 'var(--c-red)', padding: '0.15rem 0.3rem', fontSize: '0.55rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>7Y</span>
                      </div>
                      <img src={p.img} alt={p.name} style={{ maxWidth: '100%', height: '80px', objectFit: 'contain', margin: '4px 0' }} />
                      <h3 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '4px 0 2px 0', color: 'var(--c-heading)' }}>{p.name}</h3>
                      <p style={{ fontSize: '0.72rem', color: '#666', margin: '0 0 10px 0' }}>{p.specs.voltage} DC &middot; {p.specs.current}</p>
                      
                      <a href={p.pdf} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', background: '#f0f0f0', color: '#333', fontSize: '0.72rem', fontWeight: 700, padding: '6px', borderRadius: '4px', textDecoration: 'none', width: '100%' }}>
                        Pobierz PDF
                      </a>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#999' }}>Brak pasujących zasilaczy.</div>
              )}

              <button className="btn-full" onClick={() => setActiveTab('kontakt')} style={{ display: 'block', width: '100%', textAlign: 'center', background: 'var(--c-primary)', color: 'white', padding: '15px', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', marginTop: '20px', border: 'none' }}>
                ZAMÓW B2B
              </button>
            </div>
            
            {/* Footer */}
            <MobileFooter />
          </section>
        )}

        {/* VIEW: DLACZEGO */}
        {activeTab === 'info' && (
          <section className="view-section active">
            <div className="section-container" style={{ padding: '20px 15px' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>Partnerstwo B2B</h2>
              
              <div className="partnership-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', padding: '15px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                <img src="/assets/scharfer_partnership.png" alt="Współpraca" style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--c-heading)', margin: '0 0 4px 0' }}>Zostań partnerem handlowym</h3>
                <p style={{ fontSize: '0.82rem', color: '#666', margin: 0 }}>Długofalowa współpraca i wysokie marże dla dystrybutorów.</p>
              </div>

              {[
                { title: t('valPrice'), desc: t('valPriceDesc') },
                { title: t('valAvailability'), desc: t('valAvailabilityDesc') },
                { title: t('valSupport'), desc: t('valSupportDesc') },
                { title: t('valPartner'), desc: t('valPartnerDesc') }
              ].map((val, idx) => (
                <div key={idx} className="value-item-m" style={{ display: 'flex', gap: '10px', background: 'white', padding: '12px', borderRadius: '8px', marginBottom: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <span className="value-bullet" style={{ color: 'var(--c-primary)', fontWeight: 'bold' }}>🔴</span>
                  <div className="value-desc">
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px 0', color: 'var(--c-heading)' }}>{val.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#555', margin: 0, lineHeight: 1.3 }}>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <MobileFooter />
          </section>
        )}

        {/* VIEW: KONTAKT */}
        {activeTab === 'kontakt' && (
          <section className="view-section active">
            <div className="section-container" style={{ padding: '20px 15px' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>Kontakt & Współpraca</h2>
              
              <div className="contact-card-m" style={{ background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #eee', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                <span className="contact-badge-label" style={{ display: 'inline-block', fontSize: '8px', background: '#eee', color: '#555', fontWeight: 800, padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Oficjalny Dystrybutor</span>
                <div style={{ margin: '8px 0 12px' }}>
                  <img src="/PRESCOT_logo.png" alt="Prescot LED" className="contact-prescot-logo" style={{ height: '24px', display: 'block', margin: '0 auto' }} />
                </div>
                <p className="contact-company-name" style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--c-heading)' }}>PRESCOT SP. Z O.O.</p>
                <p className="contact-company-details" style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 15px 0', lineHeight: 1.4 }}>ul. Wileńska 1, 11-500 Giżycko<br />NIP: 8451939947</p>
                <div className="contact-buttons-m" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="tel:+48877776482" className="contact-action-btn" style={{ background: '#f8f9fa', color: 'var(--c-heading)', padding: '10px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', border: '1px solid #ddd' }}>
                    📞 +48 87 777 64 82
                  </a>
                  <a href="mailto:komponenty@prescot.pl" className="contact-action-btn" style={{ background: '#f8f9fa', color: 'var(--c-heading)', padding: '10px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', border: '1px solid #ddd' }}>
                    ✉️ komponenty@prescot.pl
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <h3 className="section-title" style={{ marginTop: '35px', fontSize: '1.3rem', fontWeight: 800, textAlign: 'center' }}>Często Zadawane Pytania</h3>
              <div className="faq-list-m" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
                {faqItems.map((item, idx) => (
                  <div key={idx} className={`faq-item-m ${activeFaq === idx ? 'active' : ''}`} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                    <button 
                      className="faq-head-m" 
                      onClick={() => toggleFaq(idx)}
                      style={{ width: '100%', padding: '12px 15px', background: 'none', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-heading)', cursor: 'pointer' }}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon-m" style={{ fontSize: '1.2rem', color: 'var(--c-primary)' }}>{activeFaq === idx ? '−' : '+'}</span>
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
            
            {/* Footer */}
            <MobileFooter />
          </section>
        )}

      </main>

      {/* App Bottom Navigation */}
      <nav className="app-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px', background: 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 1000 }}>
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '25%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'home' ? 'var(--c-primary)' : '#9ca3af' }}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'home' ? 'var(--c-primary)' : '#9ca3af' }}>{t('navHome')}</span>
        </div>
        <div className={`nav-item ${activeTab === 'oferta' ? 'active' : ''}`} onClick={() => setActiveTab('oferta')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '25%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'oferta' ? 'var(--c-primary)' : '#9ca3af' }}>
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'oferta' ? 'var(--c-primary)' : '#9ca3af' }}>Zasilacze</span>
        </div>
        <div className={`nav-item ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '25%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'info' ? 'var(--c-primary)' : '#9ca3af' }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'info' ? 'var(--c-primary)' : '#9ca3af' }}>Dlaczego?</span>
        </div>
        <div className={`nav-item ${activeTab === 'kontakt' ? 'active' : ''}`} onClick={() => setActiveTab('kontakt')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '25%', height: '100%', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'kontakt' ? 'var(--c-primary)' : '#9ca3af' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: activeTab === 'kontakt' ? 'var(--c-primary)' : '#9ca3af' }}>{t('navKontakt')}</span>
        </div>
      </nav>

    </div>
  );
}

function MobileFooter() {
  return (
    <footer className="app-footer" style={{ textAlign: 'center', padding: '3rem 1.25rem 2rem 1.25rem', marginTop: '2rem', background: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
      
      {/* Brand Column */}
      <div className="footer-logo-m" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
        <img src="/logo_scharfer.png" alt="Scharfer" style={{ height: '26px' }} />
        <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: 0, maxWidth: '280px', lineHeight: 1.5 }}>
          Profesjonalne zasilacze LED w klasie IP67 o zadeklarowanej 100% wydajności.
        </p>
      </div>

      {/* Distributor Column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Oficjalny Dystrybutor</span>
        <a href="https://prescot.com.pl" target="_blank" rel="noopener noreferrer">
          <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '15px', display: 'block' }} />
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
        <a href="mailto:komponenty@prescot.pl" style={{ color: 'var(--c-red)', fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
          komponenty@prescot.pl
        </a>
        <a href="tel:+48877776482" style={{ color: 'var(--c-heading)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
          tel. +48 87 777 64 82
        </a>
      </div>

      {/* Copyright Line */}
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span className="footer-copy-m" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>&copy; {new Date().getFullYear()} Scharfer. Wszelkie prawa zastrzeżone.</span>
        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
          Powered by <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 600 }}>PRESCOT LED</a>
        </span>
      </div>

    </footer>
  );
}

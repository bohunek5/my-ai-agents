'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import InteractiveDiagram from '@/components/InteractiveDiagram';

export default function PoznajPage() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: 'Jakie są warunki gwarancji na zasilacze LED Scharfer?',
      a: 'Każdy zasilacz LED marki Scharfer objęty jest pełną, 7-letnią gwarancją producenta. Jesteśmy pewni naszej technologii i stosowanych komponentów, co pozwala nam zapewnić Ci maksymalne bezpieczeństwo inwestycji w oświetlenie.'
    },
    {
      q: 'Czy zasilacze posiadają certyfikat IP67?',
      a: 'Tak, zasilacze scharfer posiadają klasę szczelności IP67. Oznacza to pełną wodoszczelność i pyłoszczelność. Dzięki temu idealnie nadają się do montażu w łazienkach, elewacjach budynków, reklamach świetlnych oraz w innych trudnych warunkach zewnętrznych.'
    },
    {
      q: 'Jak zostać dystrybutorem zasilaczy Scharfer?',
      a: 'Aby rozpocząć współpracę B2B, wystarczy wypełnić formularz w sekcji "Kontakt B2B" lub napisać bezpośrednio na adres komponenty@prescot.pl. Nasz przedstawiciel handlowy skontaktuje się z Tobą w ciągu 24 godzin w celu przedstawienia dedykowanych warunków handlowych i rabatów hurtowych.'
    },
    {
      q: 'Czy gwarantujecie pracę pod pełnym obciążeniem?',
      a: 'Tak. Jedną z głównych zalet zasilaczy Scharfer jest gwarancja stabilnej pracy pod 100% zadeklarowanym obciążeniem. Nie musisz stosować dużych zapasów mocy (tzw. marginesów), jak to bywa w przypadku tańszych zamienników, co optymalizuje koszty całej instalacji LED.'
    },
    {
      q: 'Gdzie najlepiej stosować zasilacze 12V i 24V Scharfer?',
      a: 'Zasilacze 12V idealnie sprawdzają się do małych instalacji LED, podświetleń meblowych, gablot, kasetonów i krótkich linii światła, gdzie zasilacz ma pozostać dyskretny (np. modele 20W). Zasilacze 24V rekomendujemy przy dłuższych ciągach oświetleniowych, zapewniając stabilne napięcie na całym odcinku.'
    },
    {
      q: 'Jakie są kluczowe przewagi (Przewaga Scharfer)?',
      a: 'Przewaga Scharfer to przede wszystkim: obudowa w klasie IP67 zapewniająca wodoodporność i pyłoszczelność, stabilne napięcie wyjściowe, szeroki zakres wejściowy (100-250V AC), wysoka wydajność transferu, praca przy 100% obciążenia, test wypalenia przy pełnym obciążeniu oraz zaawansowane zabezpieczenia przed przeciążeniem i zwarciem.'
    }
  ];

  return (
    <div className="view-section active">
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="/scharfer/assets/scharfer_estate_night.png" alt="Scharfer oświetlenie osiedla" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Technologia bez kompromisów</h1>
          <p className="page-hero-subtitle">
            Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B.
          </p>
        </div>
      </div>

      {/* Expanded container (1500px) */}
      <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem var(--spacing-lg) 0 var(--spacing-lg)' }}>
        
        {/* Interactive diagram representing why Scharfer */}
        <div style={{ marginBottom: '4rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '3rem' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
              Budowa i innowacje Scharfer
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0.5rem auto 0' }}>
              Najedź na poszczególne elementy zasilacza, aby poznać jego unikalne parametry techniczne i przewagi.
            </p>
          </div>
          <InteractiveDiagram />
        </div>

        {/* 7 lat, 100%, IP67 trust items */}
        <div className="hero-trust" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '5rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '3rem' }}>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>7</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Lat Gwarancji</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>IP67</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Pełna Szczelność</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>100%</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Praca pod obciążeniem</span>
          </div>
        </div>

        <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', marginBottom: '3rem', fontWeight: 800, textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
          Szczegółowe zalety technologii
        </h2>

        <div className="b2b-story-section" style={{ padding: 0 }}>
          {/* Row 1: Gwarancja */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>7 Lat Pełnej Gwarancji</h2>
              <p>Zaufanie to podstawa w branży B2B. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta.</p>
              <p>Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce. Buduj swoją renomę instalatorską na niezawodności.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/scharfer/assets/sch1.webp" alt="7 lat gwarancji Scharfer" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 2: IP67 */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Ochrona IP67 do Zadań Specjalnych</h2>
              <p>Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67. Są całkowicie wodoodporne i pyłoszczelne.</p>
              <p>Idealne rozwiązanie do oświetlenia elewacji, podświetlania basenów, banerów reklamowych i architektury ogrodowej. Wyeliminuj ryzyko zwarć w instalacjach outdoorowych.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/scharfer/assets/sch2.webp" alt="Wodoodporność IP67" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 3: Konstrukcja Termiczna */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Aluminium i Żywica Epoksydowa</h2>
              <p>Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła. Zasilacze Scharfer zamknięte są w masywnej, aluminiowej obudowie, która pełni rolę radiatora.</p>
              <p>Wnętrze urządzenia jest w 100% zalane specjalistyczną żywicą przewodzącą ciepło. Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy nawet przy maksymalnym obciążeniu. Każda jednostka przechodzi również rygorystyczne testy <strong>Burn-in</strong> przed opuszczeniem fabryki.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/scharfer/assets/sch3.webp" alt="Aluminiowa obudowa i odprowadzanie ciepła" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 4: 100% Obciążenia */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Zaprojektowane do Pracy pod 100% Obciążeniem</h2>
              <p>Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem.</p>
              <p>Jeśli kupujesz model 150W, otrzymujesz pełne 150W czystej, stabilnej mocy. Oznacza to mniejsze koszty instalacji (możesz użyć mniejszego zasilacza) oraz brak problemów z przegrzewaniem.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/scharfer/assets/sch4.webp" alt="100% obciążenia" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 5: Zaawansowane Zabezpieczenia */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Zabezpieczenia OVP, SCP, OTP, OLP</h2>
              <p>Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki, zapobiegający uszkodzeniom w przypadku awarii sieci elektrycznej.</p>
              <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>OVP (Over Voltage Protection)</strong> – automatyczne odcięcie przy skokach napięcia.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>SCP (Short Circuit Protection)</strong> – błyskawiczne zabezpieczenie przeciwzwarciowe.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>OTP (Over Temperature Protection)</strong> – ochrona termiczna przed przegrzaniem.</li>
                <li><strong>OLP (Over Load Protection)</strong> – zabezpieczenie przeciążeniowe przy zbyt wysokim poborze prądu.</li>
              </ul>
            </div>
            <div className="b2b-story-img">
              <img src="/scharfer/assets/40012.png" alt="Zasilacz 12V 400W Scharfer" style={{ borderRadius: '8px' }} />
            </div>
          </div>
          
          {/* Row 6: Zgodność i Bezpieczeństwo */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Zgodność z Normami PN-EN, CE i RoHS</h2>
              <p>Bezpieczeństwo przede wszystkim. Zasilacze Scharfer spełniają najbardziej rygorystyczne europejswie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym <strong>PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547</strong>.</p>
              <p>Posiadają pełną certyfikację CE oraz RoHS. Wybierając markę Scharfer, chronisz swój biznes oraz inwestycje swoich klientów przed ryzykiem pożaru, przebicia prądu i niestabilnego napięcia. Sprzedawaj z czystym sumieniem certyfikowany sprzęt najwyższej klasy.</p>
            </div>
            <div className="b2b-story-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <img src="/scharfer/assets/ce_rohs.png" alt="Certyfikaty CE i RoHS" style={{ width: 'auto', maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', mixBlendMode: 'multiply', boxShadow: 'none', borderRadius: 0 }} />
            </div>
          </div>
        </div>

        {/* Applications Section (4 4 4 Uklad) */}
        <div className="applications-section" style={{ margin: '6rem auto 0 auto', padding: '0', borderTop: '1px solid var(--c-border)', paddingTop: '4rem' }}>
          <div className="section-header text-center" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Gdzie sprawdzają się Zasilacze Scharfer?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--c-text)', maxWidth: '700px', margin: '0.5rem auto 0' }}>
              Niezawodność w każdej inwestycji. Zobacz, gdzie nasi dystrybutorzy z powodzeniem stosują technologię Scharfer.
            </p>
          </div>
          
          <div className="app-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {/* App 1: Domy */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_domy_1783188239361.png" alt="Zasilacz LED zewnętrzny do domu" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Domy i Rezydencje</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Wymagające instalacje domowe i rezydencjonalne potrzebują stabilnego zasilania taśm LED na elewacjach, schodach czy w podbitkach. Zasilacze Scharfer dzięki pełnej hermetyzacji IP67 oraz odporności na mróz i upały gwarantują bezawaryjną pracę na zewnątrz przez cały rok. Szeroki zakres napięcia wejściowego zabezpiecza domowe systemy przed nagłymi wahaniami prądu w sieci.</p>
              </div>
            </div>
            {/* App 2: Bloki mieszkalne */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_bloki_1783188247720.png" alt="Wodoodporny zasilacz do taśm LED" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Bloki mieszkalne</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Oświetlenie klatek schodowych, korytarzy i ciągów komunikacyjnych w budynkach wielorodzinnych pracuje w trybie ciągłym i wymaga bezwzględnej niezawodności. Urządzenia Scharfer eliminują ryzyko częstych wymian serwisowych w trudno dostępnych miejscach, co znacząco obniża koszty eksploatacji dla wspólnot mieszkaniowych. Aktywny układ PFC chroni instalację budynku przed szkodliwymi zakłóceniami harmonicznymi generowanymi przez setki punktów świetlnych.</p>
              </div>
            </div>
            {/* App 3: Hale */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_hale_v2_1783188623293.png" alt="Zasilacze przemysłowe LED 24V" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Hale i Magazyny</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Wysokie hale produkcyjne oraz magazyny opierają się na długich liniach świetlnych LED o bardzo dużym poborze mocy. Zasilacze Scharfer o mocach sięgających 400W pozwalają na bezproblemowe zasilanie rozbudowanych systemów liniowych bez spadków napięcia na końcach obwodów. Pełna ochrona przed przeciążeniem i zwarciem zabezpiecza ciągłość pracy obiektów logistycznych i produkcyjnych.</p>
              </div>
            </div>
            {/* App 4: Obiekty sportowe */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_sport_v2_1783188631467.png" alt="Zasilacze LED 12V i 24V dużej mocy" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Obiekty sportowe</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Korty, orliki i boiska sportowe wymagają mocnych naświetlaczy LED i zasilania odpornego na ekstremalne obciążenia rozruchowe. Hermetyczna konstrukcja chroni podzespoły zasilacza przed wilgocią z murawy, rosą oraz bezpośrednimi opadami atmosferycznymi. Zasilacze Scharfer zapewniają stałe i niemigoczące światło, co przekłada się na bezpieczeństwo oraz wysoki komfort zawodników.</p>
              </div>
            </div>
            
            {/* App 5: Ogrody i parki */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_ogrod_v2_1783188615253.png" alt="Zasilacz LED hermetyczny IP67" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Ogrody & Parki</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Oświetlenie ogrodowe i parkowe jest nieustannie narażone na wilgotną glebę, zalewanie przez automatyczne zraszacze oraz bezpośredni kontakt z wodą. Podwójnie uszczelniona obudowa IP67 oraz zalewa żywiczna całkowicie eliminują ryzyko wniknięcia wilgoci do wnętrza elektroniki. Zayepewnia to bezpieczną pracę taśm i opraw ogrodowych bez niebezpieczeństwa przebicia prądu do gruntu.</p>
              </div>
            </div>
            {/* App 6: Hotele */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_hotel_1783188309904.png" alt="Zasilacze do taśm LED ze ściemniaczem" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Hotele & Gastro</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>W branży hotelarskiej i gastronomicznej kluczowe jest stworzenie przytulnej atmosfery poprzez płynne ściemnianie taśm LED w pokojach i restauracjach. Specjalna żywica epoksydowa wewnątrz zasilaczy Scharfer skutecznie tłumi drgania cewek, eliminując uciążliwe piszczenie podczas regulacji natężenia światła. Cicha praca urządzeń gwarantuje gościom najwyższy komfort akustyczny w strefach relaksu.</p>
              </div>
            </div>
            {/* App 7: Kina */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_kina_v2_1783188608035.png" alt="Zasilacze LED 12V do pasków" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Kina & Kultura</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Sale kinowe i teatralne wymagają bezwzględnej ciszy oraz precyzyjnego sterowania przygaszaniem oświetlenia awaryjnego i dekoracyjnego. Zasilacze Scharfer idealnie współpracują z nowoczesnymi systemami ściemniania, nie wprowadzając szumów ani migotania w pasmach częstotliwości audio-wideo. Masywna obudowa działa jak pasywny radiator, co eliminuje konieczność stosowania głośnych wentylatorów chłodzących.</p>
              </div>
            </div>
            {/* App 8: Szkoły */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_szkoly_1783188326372.png" alt="Zasilacze do opraw LED" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Szkoły & Edukacja</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Bezpieczeństwo dzieci i stabilność oświetlenia w klasach lekcyjnych to absolutny priorytet dla placówek edukacyjnych. Urządzenia Scharfer spełniają rygorystyczne normy PN-EN, posiadając atesty zapobiegające powstawaniu pożarów w wyniku zwarcia (zabezpieczenie SCP). Stabilne, pozbawione tętnień napięcie wyjściowe chroni wzrok uczniów i zapobiega szybkiemu zmęczeniu podczas nauki.</p>
              </div>
            </div>
            
            {/* App 9: Parkingi */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_parkingi_v2_1783188598862.png" alt="Zasilacze LED zewnętrzne" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Parkingi Podziemne</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Parkingi podziemne i zadaszone garaże to miejsca o stałej, wysokiej wilgotności powietrza oraz dużym stężeniu pyłów i spalin. Całkowita szczelność IP67 zasilaczy Scharfer chroni wrażliwe komponenty przed korozyjnym działaniem agresywnego środowiska parkingowego. Niezawodne zasilanie gwarantuje nieprzerwane oświetlenie dróg ewakuacyjnych i miejsc postojowych 24 godziny na dobę.</p>
              </div>
            </div>
            {/* App 10: Garaże */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_garaze_1783188344306.png" alt="Mocne zasilacze do taśm LED 24V" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Garaże & Warsztaty</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>W warsztatach samochodowych i garażach oświetlenie stanowiskowe jest narażone na pył, oleje, wibracje oraz nagłe skoki napięcia wywołane pracą ciężkich maszyn. Aktywne filtry wejściowe oraz zabezpieczenie OVP chronią zasilacze i podłączone paski LED przed uszkodzeniami elektrycznymi. Solidna, metalowa konstrukcja obudowy jest odporna na przypadkowe uderzenia mechaniczne.</p>
              </div>
            </div>
            {/* App 11: Wiaty i Stolarka */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/wiata_jezioro.png" alt="Oświetlenie wiat i drewnianej stolarki" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Wiaty & Stolarka</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Oświetlenie wiat ogrodowych, zadaszeń i architektury drewnianej wymaga zasilaczy o bardzo niskiej temperaturze pracy obudowy w celach ochrony przeciwpożarowej. Zasilacze Scharfer, dzięki pełnemu zalaniu żywicą i aluminiowemu radiatorowi, efektywnie odprowadzają ciepło na zewnątrz i nie nagrzewają się do niebezpiecznych temperatur. Spełniają one restrykcyjne wymogi montażu bezpośrednio na podłożach palnych.</p>
              </div>
            </div>
            {/* App 12: Mosty */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/scharfer/assets/app_mosty_1783188351515.png" alt="Zasilacz LED wodoszczelny" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Infrastruktura & Mosty</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>Iluminacja mostów, wiaduktów i obiektów inżynieryjnych wymaga sprzętu odpornego na nieustanne drgania konstrukcyjne, silny wiatr i zmienne warunki pogodowe. Hermetyczna obudowa Scharfer, w całości wypełniona elastyczną żywicą epoksydową, absorbuje wibracje i uniemożliwia pękanie połączeń lutowanych. Daje to pewność bezawaryjnej pracy oświetlenia w najbardziej ekstremalnych lokalizacjach infrastruktury.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section section-padding bg-light" style={{ marginTop: '6rem', background: '#fafafa', borderRadius: '12px', padding: '3rem 2rem', border: '1px solid var(--c-border)' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--c-heading)', fontWeight: 800 }}>Często zadawane pytania (FAQ)</h2>
            <p className="section-subtitle" style={{ color: '#666' }}>Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer</p>
          </div>
          <div className="faq-accordion" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((item, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`} style={{ background: 'white', border: '1px solid var(--c-border)', borderRadius: '8px', overflow: 'hidden' }}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(idx)}
                  style={{ width: '100%', padding: '1.2rem 1.5rem', background: 'none', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-heading)', cursor: 'pointer' }}
                >
                  {item.q}
                  <span className="faq-icon" style={{ fontSize: '1.3rem', color: 'var(--c-red)' }}>
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="faq-answer" style={{ padding: '0 1.5rem 1.5rem', color: 'var(--c-text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    <p style={{ margin: 0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

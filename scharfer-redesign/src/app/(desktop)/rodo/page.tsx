'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function RodoPage() {
  const { t } = useLanguage();

  return (
    <div className="view-section active">
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="/scharfer/assets/scharfer_supplies_hero.png" alt="Obowiązek informacyjny RODO Scharfer" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Klauzula Informacyjna RODO</h1>
          <p className="page-hero-subtitle">
            Zasady przetwarzania danych osobowych i polityka prywatności serwisu scharfer.com.pl
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem var(--spacing-lg)', color: 'var(--c-text)', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem' }}>Ochrona danych osobowych (RODO)</h2>
        <p>Zgodnie z art. 13 ust. 1 i ust. 2 ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. (RODO) informujemy, iż dbamy o bezpieczeństwo Twoich danych. Poniżej przedstawiamy szczegółowe zasady ich przetwarzania:</p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1rem', marginTop: '2.5rem' }}>1. Administrator Danych Osobowych</h3>
        <p>Administratorem Twoich danych osobowych jest <strong>PRESCOT SP. Z O.O.</strong> z siedzibą w Giżycku (11-500), ul. Wileńska 1, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego, NIP: 8451939947, REGON: 281489066. Kontakt z administratorem jest możliwy drogą mailową pod adresem: <strong>komponenty@prescot.pl</strong>.</p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1rem', marginTop: '2.5rem' }}>2. Cele i Podstawy Prawne Przetwarzania</h3>
        <p>Twoje dane osobowe przetwarzane są w celu:</p>
        <ul>
          <li>Obsługi zapytań przesłanych za pośrednictwem formularza kontaktowego B2B oraz poczty elektronicznej (podstawa prawna: art. 6 ust. 1 lit. f RODO – uzasadniony interes administratora polegający na budowaniu relacji z klientami i partnerami biznesowymi).</li>
          <li>Nawiązania i realizacji ewentualnej współpracy handlowej (podstawa prawna: art. 6 ust. 1 lit. b RODO – działania przed zawarciem umowy).</li>
          <li>Archiwizacji korespondencji do celów dowodowych (podstawa prawna: art. 6 ust. 1 lit. f RODO – uzasadniony interes polegający na obronie i dochodzeniu roszczeń).</li>
        </ul>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1rem', marginTop: '2.5rem' }}>3. Odbiorcy Danych</h3>
        <p>Odbiorcami Twoich danych osobowych mogą być upoważnieni pracownicy Administratora, podmioty świadczące usługi IT (np. hostingodawca, dostawca poczty elektronicznej) oraz podmioty wspierające obsługę prawno-księgową, wyłącznie w zakresie niezbędnym do realizacji celów przetwarzania.</p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1rem', marginTop: '2.5rem' }}>4. Okres Przechowywania Danych</h3>
        <p>Dane osobowe będą przechowywane przez okres niezbędny do udzielenia odpowiedzi na zapytanie i prowadzenia ustaleń handlowych, a po tym czasie – do momentu wygaśnięcia roszczeń wynikających z korespondencji lub do czasu zgłoszenia skutecznego sprzeciwu wobec przetwarzania.</p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1rem', marginTop: '2.5rem' }}>5. Prawa Osób, Których Dane Dotyczą</h3>
        <p>Posiadasz prawo do:</p>
        <ul>
          <li>Dostępu do swoich danych osobowych oraz otrzymania ich kopii.</li>
          <li>Sprostowania (poprawiania) swoich danych.</li>
          <li>Usunięcia danych („prawo do bycia zapomnianym”) lub ograniczenia ich przetwarzania.</li>
          <li>Wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie administratora.</li>
          <li>Wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (UODO) – jeśli uważasz, że Twoje dane są przetwarzane niezgodnie z prawem.</li>
        </ul>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1rem', marginTop: '2.5rem' }}>6. Dobrowolność Podania Danych</h3>
        <p>Podanie danych osobowych jest dobrowolne, jednak niezbędne do wysłania wiadomości za pomocą formularza kontaktowego B2B oraz uzyskania odpowiedzi od Administratora.</p>
      </div>
    </div>
  );
}

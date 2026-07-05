'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function RegulaminPage() {
  const { t } = useLanguage();

  return (
    <div className="view-section active">
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="assets/scharfer_supplies_hero.png" alt="Regulamin Scharfer" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Regulamin Serwisu</h1>
          <p className="page-hero-subtitle">
            Zasady korzystania z serwisu informacyjno-katalogowego scharfer.com.pl
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem var(--spacing-lg)', color: 'var(--c-text)', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem' }}>§ 1. Postanowienia ogólne</h2>
        <p>1. Niniejszy regulamin określa zasady korzystania z witryny internetowej <strong>scharfer.com.pl</strong>.</p>
        <p>2. Właścicielem i administratorem serwisu jest <strong>PRESCOT SP. Z O.O.</strong> z siedzibą w Giżycku (11-500), ul. Wileńska 1, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego, NIP: 8451939947, REGON: 281489066 (zwana dalej „Administratorem”).</p>
        <p>3. Serwis scharfer.com.pl pełni rolę witryny wizerunkowej oraz katalogu produktów marki Scharfer, prezentującego specyfikacje techniczne, karty katalogowe oraz informacje o partnerstwie biznesowym (B2B).</p>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem', marginTop: '3rem' }}>§ 2. Zasady korzystania z serwisu</h2>
        <p>1. Korzystanie z serwisu jest bezpłatne i dostępne dla każdego użytkownika posiadającego połączenie z siecią Internet oraz standardową przeglądarkę internetową.</p>
        <p>2. Zawarte w serwisie materiały, w tym opisy techniczne zasilaczy LED, schematy, zdjęcia oraz interaktywne grafiki stanowią własność Administratora i są chronione prawem autorskim. Kopiowanie lub wykorzystywanie ich bez uprzedniej zgody Administratora jest zabronione.</p>
        <p>3. Dane techniczne produktów mają charakter informacyjny i nie stanowią oferty handlowej w rozumieniu art. 66 Kodeksu Cywilnego. Administrator dokłada wszelkich starań, aby dane te były zgodne ze stanem rzeczywistym.</p>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem', marginTop: '3rem' }}>§ 3. Formularz kontaktowy i ochrona danych</h2>
        <p>1. Użytkownicy mogą przesyłać zapytania ofertowe i techniczne za pomocą formularza kontaktowego B2B dostępnego w serwisie.</p>
        <p>2. Wysłanie formularza wymaga podania prawdziwych danych kontaktowych (imię, adres e-mail) oraz wyrażenia zgody na przetwarzanie danych osobowych w celu udzielenia odpowiedzi na zapytanie.</p>
        <p>3. Szczegółowe zasady przetwarzania danych osobowych oraz prawa użytkowników określa <strong>Polityka Prywatności (RODO)</strong> dostępna w dedykowanej sekcji serwisu.</p>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem', marginTop: '3rem' }}>§ 4. Postanowienia końcowe</h2>
        <p>1. Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszym regulaminie. Zmiany wchodzą w życie z dniem ich opublikowania w serwisie.</p>
        <p>2. W sprawach nieuregulowanych niniejszym regulaminem mają zastosowanie odpowiednie przepisy prawa polskiego, w szczególności Kodeksu Cywilnego oraz Ustawy o prawie autorskim i prawach pokrewnych.</p>
        <p>3. Wszelkie zapytania oraz uwagi dotyczące funkcjonowania serwisu należy kierować na adres e-mail: <strong>komponenty@prescot.pl</strong>.</p>
      </div>
    </div>
  );
}

"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, FileText, MapPin, CreditCard, RefreshCw, AlertCircle, Scale, CheckCircle2 } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function RodoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        title="Regulamin Usług & RODO"
        subtitle="Kompleksowy regulamin świadczenia usług rezerwacji online, czarteru oraz zasady ochrony danych osobowych."
        eyebrow="Dokumenty Prawne Serwisu"
        image="/images/gallery/5S5A7031.webp"
      />
      <div className="container mx-auto px-4 max-w-4xl pt-2 pb-8 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-10">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0">
              <Scale size={36} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Regulamin Świadczenia Usług & Klauzula RODO
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mt-1">
                Wersja 2.1 • Obowiązuje od maja 2026 r. • Zgodność z Przelewy24
              </p>
            </div>
          </div>

          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="p-5 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
                <MapPin size={16} />
                <span>Usługodawca / Baza Czarterowa:</span>
              </div>
              <p className="font-black text-sm text-gray-900 dark:text-white">Mazury Aktywnie</p>
              <p className="text-gray-600 dark:text-gray-300">Port Sztynort, Sztynort 10, 11-600 Węgorzewo</p>
              <p className="text-gray-500 dark:text-gray-400">E-mail: kontakt@mazuryaktywnie.com.pl | Tel: 608 043 958</p>
            </div>

            <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                <CreditCard size={16} />
                <span>Obsługa Płatności Online:</span>
              </div>
              <p className="font-black text-sm text-gray-900 dark:text-white">Przelewy24</p>
              <p className="text-gray-600 dark:text-gray-300">Szybkie przelewy bankowe, BLIK, karty płatnicze Visa/Mastercard</p>
              <p className="text-gray-500 dark:text-gray-400">Szyfrowane połączenie SSL / certyfikacja PCI-DSS</p>
            </div>
          </div>

          {/* Full Legal Text */}
          <div className="space-y-10 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* § 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FileText className="text-blue-600" size={20} />
                <span>§ 1. Postanowienia ogólne</span>
              </h2>
              <p>1. Niniejszy Regulamin określa zasady korzystania z serwisu internetowego <strong>mazuryaktywnie.com.pl</strong>, procedurę dokonywania rezerwacji online oraz warunki świadczenia usług czarteru jachtu motorowego Stillo 31 i wynajmu dodatkowego sprzętu rekreacyjnego.</p>
              <p>2. Serwis internetowy prowadzony jest pod marką handlową <strong>Mazury Aktywnie</strong> z bazą stacjonowania w Port Sztynort, Sztynort 10, 11-600 Węgorzewo (zwany dalej Usługodawcą).</p>
              <p>3. Korzystanie z serwisu oraz składanie rezerwacji wymaga akceptacji postanowień niniejszego Regulaminu oraz Polityki Prywatności.</p>
              <p>4. Wszelkie informacje zawarte na stronie internetowej nie stanowią oferty w rozumieniu art. 66 Kodeksu Cywilnego, lecz zaproszenie do zawarcia umowy w rozumieniu art. 71 Kodeksu Cywilnego.</p>
            </section>

            {/* § 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FileText className="text-blue-600" size={20} />
                <span>§ 2. Definicje</span>
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Serwis</strong> – serwis internetowy dostępny pod adresem internetowym mazuryaktywnie.com.pl.</li>
                <li><strong>Klient / Najemca</strong> – osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba prawna lub jednostka organizacyjna dokonująca rezerwacji.</li>
                <li><strong>Konsument</strong> – Klient będący osobą fizyczną dokonującą z przedsiębiorcą czynności prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową.</li>
                <li><strong>Czarter</strong> – usługa wynajmu jachtu motorowego Stillo 31 bez patentu na oznaczony okres czasu.</li>
                <li><strong>Sprzęt Dodatkowy</strong> – deski SUP, rowery turystyczne oraz rowery elektryczne e-bike udostępniane w ramach oferty.</li>
              </ul>
            </section>

            {/* § 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FileText className="text-blue-600" size={20} />
                <span>§ 3. Składanie Rezerwacji Online</span>
              </h2>
              <p>1. Rezerwacja czarteru oraz sprzętu dodatkowego odbywa się poprzez interaktywny formularz rezerwacyjny na stronie <strong>mazuryaktywnie.com.pl/reservation</strong>.</p>
              <p>2. Klient wybiera interesujący go termin (datę rozpoczęcia i zakończenia), zadeklarowane opcje sprzętowe, uzupełnia dane osobowe oraz kontaktowe (imię, nazwisko, e-mail, telefon).</p>
              <p>3. Do skutecznego złożenia rezerwacji konieczne jest akceptowanie postanowień Regulaminu i Polityki Prywatności oraz dokonanie płatności w bramce online.</p>
            </section>

            {/* § 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <CreditCard className="text-blue-600" size={20} />
                <span>§ 4. Ceny i Metody Płatności (Przelewy24)</span>
              </h2>
              <p>1. Ceny usług podane na stronie internetowej są cenami brutto wyrażonymi w złotych polskich (PLN) i zawierają należny podatek VAT.</p>
              <p>2. Obsługę płatności elektronicznych (szybkie przelewy, BLIK, karty płatnicze) prowadzi operator płatności <strong>Przelewy24</strong>.</p>
              <p>3. Za datę zapłaty uważa się moment pozytywnej autoryzacji transakcji przez operatora Przelewy24.</p>
              <p>4. Przy przekazaniu jachtu pobierana jest kaucja zwrotna na pokrycie ewentualnych szkód lub braków w wyposażeniu, rozliczana bezpośrednio po zakończeniu czarteru.</p>
            </section>

            {/* § 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <RefreshCw className="text-blue-600" size={20} />
                <span>§ 5. Warunki Odstąpienia od Umowy i Anulowania Rezerwacji</span>
              </h2>
              <p>1. Zgodnie z art. 38 ust. 1 pkt 12 ustawy z dnia 30 maja 2014 r. o prawach konsumenta, prawo odstąpienia od umowy zawartej na odległość nie przysługuje konsumentowi w odniesieniu do umów o świadczenie usług zakwaterowania, innych niż do celów mieszkalnych, przewozu rzeczy, najmu samochodów, gastronomii, usług związanych z wypoczynkiem, wydarzeniami rozrywkowymi, sportowymi lub kulturalnymi, jeżeli w umowie oznaczono dzień lub okres świadczenia usługi.</p>
              <p>2. W przypadku konieczności zmiany terminu rezerwacji przez Klienta, Usługodawca dokłada wszelkich starań, aby umożliwić zmianę w miarę dostępności wolnych terminów.</p>
            </section>

            {/* § 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <RefreshCw className="text-blue-600" size={20} />
                <span>§ 6. Procedura Reklamacyjna</span>
              </h2>
              <p>1. Klient ma prawo składać reklamacje dotyczące usług czarteru lub funkcjonowania serwisu internetowego.</p>
              <p>2. Zgłoszenie reklamacyjne należy przesłać drogą elektroniczną na adres e-mail: <strong>kontakt@mazuryaktywnie.com.pl</strong> lub pisemnie na adres bazy w Sztynorcie.</p>
              <p>3. Reklamacja powinna zawierać dane Klienta, numer rezerwacji oraz szczegółowy opis zgłaszanych zastrzeżeń.</p>
              <p>4. Usługodawca rozpatruje reklamację w terminie <strong>14 dni</strong> od dnia jej doręczenia i informuje Klienta o decyzji drogą elektroniczną.</p>
            </section>

            {/* § 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span>§ 7. Ochrona Danych Osobowych (RODO)</span>
              </h2>
              <p>1. Administratorem danych osobowych jest <strong>Mazury Aktywnie</strong> z siedzibą w Port Sztynort, Sztynort 10, 11-600 Węgorzewo.</p>
              <p>2. Dane osobowe (imię, nazwisko, e-mail, telefon) przetwarzane są w celu realizacji rezerwacji (art. 6 ust. 1 lit. b RODO), prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO) oraz wypełnienia obowiązków podatkowych (art. 6 ust. 1 lit. c RODO).</p>
              <p>3. Odbiorcami danych są podmioty techniczne wspierające serwis oraz operator płatności <strong>Przelewy24</strong>.</p>
              <p>4. Klient posiada prawo dostępu do swoich danych, sprostowania, usunięcia, ograniczenia przetwarzania oraz wniesienia skargi do organu nadzorczego (Prezes UODO).</p>
            </section>

            {/* § 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <Scale className="text-blue-600" size={20} />
                <span>§ 8. Postanowienia Końcowe</span>
              </h2>
              <p>1. W sprawach nieuregulowanych niniejszym Regulaminem stosuje się przepisy prawa polskiego, w szczególności Kodeksu Cywilnego oraz Ustawy o prawach konsumenta.</p>
              <p>2. Konsument posiada możliwość skorzystania z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń (np. unijna platforma ODR pod adresem <code>http://ec.europa.eu/consumers/odr</code>).</p>
              <p>3. Regulamin wchodzi w życie z dniem opublikowania na stronie internetowej serwisu.</p>
            </section>

            <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30 flex items-start gap-3">
              <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                  Dedykowany kontakt rezerwacyjny i prawny:
                </h3>
                <p className="text-xs md:text-sm mt-1">
                  W razie pytań dotyczących rezerwacji, Regulaminu lub kwestii RODO skontaktuj się z nami pod adresem: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a> lub telefonicznie: <strong>608 043 958</strong>.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

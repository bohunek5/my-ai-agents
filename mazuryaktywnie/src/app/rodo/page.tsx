"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, FileText, Building, CreditCard, RefreshCw, AlertCircle } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function RodoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        title="Regulamin Usług & RODO"
        subtitle="Regulamin świadczenia usług rezerwacji online oraz klauzula informacyjna RODO."
        eyebrow="Wymogi Prawne & Regulamin"
        image="/images/gallery/5S5A7031.webp"
      />
      <div className="container mx-auto px-4 max-w-4xl pt-2 pb-8 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-10">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
              <ShieldCheck size={36} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Regulamin Serwisu & Klauzula RODO
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mt-1">
                Zgodność z przepisami prawa i operatorem Przelewy24
              </p>
            </div>
          </div>

          {/* Table of Contents / Summary boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-1">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                <Building size={16} />
                <span>Usługodawca / Sprzedawca:</span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">PRESCOT SP. Z O.O.</p>
              <p className="text-gray-500 dark:text-gray-400">ul. Wileńska 1, 11-500 Giżycko</p>
              <p className="text-gray-500 dark:text-gray-400">NIP: 8451939947 | REGON: 281489066</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-1">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                <CreditCard size={16} />
                <span>Operator Płatności Online:</span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">PayPro S.A. (Przelewy24)</p>
              <p className="text-gray-500 dark:text-gray-400">ul. Pastelowa 8, 60-198 Poznań</p>
              <p className="text-gray-500 dark:text-gray-400">KRS: 0000347935 | NIP: 7792369887</p>
            </div>
          </div>

          {/* Body content */}
          <div className="space-y-8 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* §1 Postanowienia ogólne */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                <span>§ 1. Postanowienia ogólne</span>
              </h2>
              <p>1. Niniejszy Regulamin określa zasady korzystania z serwisu internetowego <strong>mazuryaktywnie.com.pl</strong>, składania rezerwacji online na czarter jachtu motorowego Stillo 31 oraz wynajem sprzętu rekreacyjnego (deski SUP, rowery tradycyjne, rowery elektryczne e-bike).</p>
              <p>2. Właścicielem serwisu i Usługodawcą jest spółka <strong>PRESCOT SP. Z O.O.</strong> z siedzibą przy ul. Wileńskiej 1, 11-500 Giżycko, wpisana do Rejestru Przedsiębiorców KRS, NIP: <strong>8451939947</strong>, REGON: <strong>281489066</strong> (zwaną dalej Usługodawcą).</p>
              <p>3. Kontakt z Usługodawcą odbywa się pod adresem e-mail: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 font-bold underline">kontakt@mazuryaktywnie.com.pl</a> lub telefonicznie pod numerem: <strong>608 043 958</strong>.</p>
            </section>

            {/* §2 Warunki Rezerwacji i Usług */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                <span>§ 2. Rezerwacja i Usługi</span>
              </h2>
              <p>1. Serwis umożliwia dokonanie rezerwacji terminu czarteru jachtu Stillo 31 oraz sprzętu towarzyszącego w formie elektronicznej.</p>
              <p>2. W celu złożenia rezerwacji Klient wybiera datę rozpoczęcia i zakończenia czarteru, opcje dodatkowe, podaje dane kontaktowe oraz akceptuje niniejszy Regulamin i Politykę Prywatności.</p>
              <p>3. Umowa o świadczenie usług czarterowych zostaje zawarta z chwilą potwierdzenia rezerwacji oraz zaksięgowania płatności.</p>
            </section>

            {/* §3 Płatności i Przelewy24 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CreditCard className="text-blue-600" size={20} />
                <span>§ 3. Płatności i Operator Płatności</span>
              </h2>
              <p>1. Ceny podane w serwisie są cenami brutto wyrażonymi w złotych polskich (PLN).</p>
              <p>2. Podmiotem świadczącym obsługę płatności online (przelewy internetowe, karty płatnicze, BLIK) jest <strong>PayPro S.A. (Przelewy24)</strong> z siedzibą w Poznaniu przy ul. Pastelowej 8, 60-198 Poznań, wpisana do Rejestru Przedsiębiorców KRS pod numerem 0000347935, NIP: 7792369887.</p>
              <p>3. Dostępne formy płatności obejmują m.in. szybkie przelewy bankowe, płatności mobilne BLIK oraz karty płatnicze Visa / Mastercard.</p>
            </section>

            {/* §4 Reklamacje i Zwroty */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <RefreshCw className="text-blue-600" size={20} />
                <span>§ 4. Procedura Reklamacyjna i Prawo Odstąpienia</span>
              </h2>
              <p>1. Klient ma prawo do złożenia reklamacji dotyczącej funkcjonowania serwisu lub realizacji usług czarterowych.</p>
              <p>2. Reklamacje należy składać w formie pisemnej lub drogą elektroniczną na adres: <strong>kontakt@mazuryaktywnie.com.pl</strong>.</p>
              <p>3. Usługodawca rozpatruje reklamację w terminie <strong>14 dni</strong> od dnia jej otrzymania i powiadamia Klienta o wyniku postępowania drogą mailową.</p>
              <p>4. Prawo odstąpienia od umowy zawartej na odległość przysługuje konsumentowi zgodnie z ustawą o prawach konsumenta, z zastrzeżeniem usług związanych z świadczeniem usług zakwaterowania lub wypoczynku na oznaczony dzień lub okres.</p>
            </section>

            {/* §5 RODO */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span>§ 5. Ochrona Danych Osobowych (RODO)</span>
              </h2>
              <p>1. Administratorem danych osobowych Użytkowników jest spółka <strong>PRESCOT SP. Z O.O.</strong> z siedzibą w Giżycku (11-500), ul. Wileńska 1, NIP: 8451939947.</p>
              <p>2. Dane przetwarzane są w celu realizacji umów rezerwacji (art. 6 ust. 1 lit. b RODO), obsługi zapytań (art. 6 ust. 1 lit. f RODO) oraz rozliczeń podatkowo-księgowych (art. 6 ust. 1 lit. c RODO).</p>
              <p>3. Odbiorcami danych są upoważnieni pracownicy, dostawcy infrastruktury IT oraz operator płatności <strong>PayPro S.A. (Przelewy24)</strong> w zakresie niezbędnym do przetworzenia transakcji.</p>
              <p>4. Każdy Użytkownik posiada prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).</p>
            </section>

            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/25 mt-8 flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm">
                W sprawach związanych z Regulaminem lub RODO prosimy o kontakt pod adresem: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

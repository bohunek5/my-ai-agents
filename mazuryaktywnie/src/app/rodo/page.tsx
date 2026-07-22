"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, FileText, MapPin, CreditCard, RefreshCw, AlertCircle } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function RodoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        title="Regulamin Usług & RODO"
        subtitle="Regulamin rezerwacji online oraz zasady ochrony danych osobowych serwisu Mazury Aktywnie."
        eyebrow="Regulamin i Prywatność"
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
                Mazury Aktywnie • Port Sztynort • Przelewy24
              </p>
            </div>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-1">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                <MapPin size={16} />
                <span>Usługodawca / Serwis:</span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">Mazury Aktywnie</p>
              <p className="text-gray-500 dark:text-gray-400">Port Sztynort, Sztynort 10, 11-600 Węgorzewo</p>
              <p className="text-gray-500 dark:text-gray-400">E-mail: kontakt@mazuryaktywnie.com.pl | Tel: 608 043 958</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-1">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                <CreditCard size={16} />
                <span>Operator Płatności:</span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">Przelewy24</p>
              <p className="text-gray-500 dark:text-gray-400">Szybkie przelewy, BLIK, karty płatnicze</p>
              <p className="text-gray-500 dark:text-gray-400">Bezpieczny szyfrowany protokół SSL</p>
            </div>
          </div>

          {/* Main Terms Sections */}
          <div className="space-y-8 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* §1 Postanowienia ogólne */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                <span>§ 1. Postanowienia ogólne</span>
              </h2>
              <p>1. Niniejszy Regulamin określa zasady rezerwacji online i korzystania z usług serwisu <strong>Mazury Aktywnie</strong> na czarter jachtu motorowego Stillo 31 oraz wynajem desek SUP i rowerów.</p>
              <p>2. Baza czarterowa oraz port stacjonowania mieści się pod adresem: <strong>Port Sztynort, Sztynort 10, 11-600 Węgorzewo</strong>.</p>
              <p>3. Kontakt z serwisem odbywa się pod adresem e-mail: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 font-bold underline">kontakt@mazuryaktywnie.com.pl</a> oraz telefonicznie: <strong>608 043 958</strong>.</p>
            </section>

            {/* §2 Rezerwacja i Wynajem */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                <span>§ 2. Rezerwacje i usługi czarterowe</span>
              </h2>
              <p>1. Klient dokonuje wyboru terminu czarteru oraz opcji dodatkowych w systemie rezerwacyjnym serwisu.</p>
              <p>2. Zawarcie umowy rezerwacyjnej następuje po zatwierdzeniu formularza i zaksięgowaniu wpłaty.</p>
            </section>

            {/* §3 Płatności online */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CreditCard className="text-blue-600" size={20} />
                <span>§ 3. Płatności online – Przelewy24</span>
              </h2>
              <p>1. Wszelkie ceny podane na stronie są cenami brutto w walucie PLN.</p>
              <p>2. Rozliczenia transakcji elektronicznych i kartami płatniczymi przeprowadzane są za pośrednictwem serwisu <strong>Przelewy24</strong>.</p>
            </section>

            {/* §4 Reklamacje */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <RefreshCw className="text-blue-600" size={20} />
                <span>§ 4. Procedura reklamacyjna</span>
              </h2>
              <p>1. Reklamacje należy składać na adres e-mail: <strong>kontakt@mazuryaktywnie.com.pl</strong>.</p>
              <p>2. Rozpatrzenie reklamacji następuje w ciągu <strong>14 dni</strong> od zgłoszenia.</p>
            </section>

            {/* §5 RODO */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span>§ 5. Ochrona Danych Osobowych (RODO)</span>
              </h2>
              <p>1. Administratorem danych jest <strong>Mazury Aktywnie</strong>, Port Sztynort, Sztynort 10, 11-600 Węgorzewo.</p>
              <p>2. Dane zbierane są wyłącznie w celu realizacji rezerwacji czarterowych, obsługi zapytania i rozliczeń.</p>
              <p>3. Każdy użytkownik ma prawo wglądu, sprostowania oraz usunięcia swoich danych osobowych.</p>
            </section>

            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/25 mt-8 flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm">
                Zapytania prawne i rezerwacyjne: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

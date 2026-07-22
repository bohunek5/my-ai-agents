"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, MapPin, Lock, FileText, CheckCircle2 } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function RodoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        title="Klauzula RODO"
        subtitle="Informacja o przetwarzaniu danych osobowych zgodnie z ogólnym rozporządzeniem o ochronie danych (RODO)."
        eyebrow="Ochrona Danych Osobowych"
        image="/images/gallery/5S5A7031.webp"
      />
      <div className="container mx-auto px-4 max-w-4xl pt-2 pb-8 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-10">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0">
              <ShieldCheck size={36} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Klauzula Informacyjna RODO
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mt-1">
                Zgodność z rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679
              </p>
            </div>
          </div>

          {/* Administrator Info Box */}
          <div className="p-5 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 space-y-1.5 text-xs font-semibold">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
              <MapPin size={16} />
              <span>Administrator Danych Osobowych:</span>
            </div>
            <p className="font-black text-sm text-gray-900 dark:text-white">Mazury Aktywnie</p>
            <p className="text-gray-600 dark:text-gray-300">Port Sztynort, Sztynort 10, 11-600 Węgorzewo</p>
            <p className="text-gray-500 dark:text-gray-400">E-mail: kontakt@mazuryaktywnie.com.pl | Tel: 608 043 958</p>
          </div>

          {/* RODO Body Content */}
          <div className="space-y-8 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* 1. Administrator */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span>1. Administrator Danych Osobowych</span>
              </h2>
              <p>Zgodnie z art. 13 ust. 1 i ust. 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO) informujemy, że administratorem Twoich danych osobowych jest <strong>Mazury Aktywnie</strong> z bazą stacjonowania w Port Sztynort, Sztynort 10, 11-600 Węgorzewo.</p>
            </section>

            {/* 2. Cele i Podstawy Prawne */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FileText className="text-blue-600" size={20} />
                <span>2. Cele i podstawy prawne przetwarzania</span>
              </h2>
              <p>Twoje dane osobowe przetwarzane będą w celu:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Realizacji usługi rezerwacji czarteru jachtu oraz sprzętu dodatkowego</strong> – na podstawie art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy).</li>
                <li><strong>Obsługi zapytań i kontaktu</strong> za pośrednictwem formularza – na podstawie art. 6 ust. 1 lit. f RODO (uzasadniony interes administratora).</li>
                <li><strong>Wypełnienia obowiązków prawnych</strong> (np. rozliczenia podatkowe i rachunkowe) – na podstawie art. 6 ust. 1 lit. c RODO.</li>
              </ul>
            </section>

            {/* 3. Odbiorcy Danych */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <Lock className="text-blue-600" size={20} />
                <span>3. Odbiorcy danych osobowych</span>
              </h2>
              <p>Odbiorcami Twoich danych osobowych mogą być podmioty świadczące dla nas usługi hostingowe, dostawcy infrastruktury IT oraz operator płatności <strong>Przelewy24</strong> – wyłącznie w zakresie niezbędnym do sfinalizowania transakcji i rezerwacji.</p>
            </section>

            {/* 4. Okres przechowywania */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FileText className="text-blue-600" size={20} />
                <span>4. Okres przechowywania danych</span>
              </h2>
              <p>Dane przechowywane są przez czas niezbędny do realizacji rezerwacji, a po jej zakończeniu przez okres wymagany przepisami prawa rachunkowo-podatkowego lub do momentu wygaśnięcia roszczeń.</p>
            </section>

            {/* 5. Prawa Osoby */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span>5. Twoje Prawa</span>
              </h2>
              <p>Posiadasz prawo do:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dostępu do treści swoich danych osobowych oraz otrzymania ich kopii.</li>
                <li>Sprostowania (poprawiania) nieprawidłowych danych.</li>
                <li>Usunięcia danych („prawo do bycia zapomnianym”) lub ograniczenia przetwarzania.</li>
                <li>Wniesienia sprzeciwu wobec przetwarzania danych.</li>
                <li>Wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (PUODO).</li>
              </ul>
            </section>

            <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex items-start gap-3">
              <CheckCircle2 size={24} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                  Kontakt w sprawach ochrony danych:
                </h3>
                <p className="text-xs md:text-sm mt-1">
                  Wsparcie ws. RODO i danych osobowych: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a>.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

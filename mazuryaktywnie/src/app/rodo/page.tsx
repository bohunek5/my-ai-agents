"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function RodoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        title={t("RODO", "title")}
        subtitle="Klauzula informacyjna dotycząca przetwarzania danych przy kontakcie i rezerwacji."
        eyebrow="RODO"
        image="/images/gallery/5S5A7031.webp"
      />
      <div className="container mx-auto px-4 max-w-3xl pt-2 pb-8 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                {t("RODO", "title")}
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mt-1">
                Zgodność z RODO / GDPR Compliance
              </p>
            </div>
          </div>

          {/* Body content */}
          <div className="prose dark:prose-invert max-w-none space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Administrator Danych Osobowych</h2>
              <p>Zgodnie z art. 13 ust. 1 i ust. 2 ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. (RODO) informujemy, iż administratorem Twoich danych osobowych jest <strong>Mazury Aktywnie</strong>, z siedzibą: Port Sztynort, Sztynort 10, 11-600 Węgorzewo.</p>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6">2. Cele i podstawy przetwarzania</h2>
              <p>Twoje dane osobowe przetwarzane będą w następujących celach:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Realizacja rezerwacji jachtu oraz dodatkowego sprzętu turystycznego (SUP, rowery) – na podstawie art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy).</li>
                <li>Obsługa zapytań i komunikacja (np. przez formularz kontaktowy) – na podstawie art. 6 ust. 1 lit. a RODO (zgoda) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora).</li>
                <li>Wypełnienie obowiązków prawnych ciążących na administratorze (np. rozliczenia księgowe i podatkowe) – na podstawie art. 6 ust. 1 lit. c RODO.</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6">3. Odbiorcy danych</h2>
              <p>Odbiorcami Twoich danych osobowych mogą być podmioty świadczące dla nas usługi IT, hostingowe, księgowe oraz operatorzy płatności elektronicznych (w przypadku rezerwacji online), wyłącznie na podstawie stosownych umów powierzenia przetwarzania danych.</p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6">4. Okres przechowywania danych</h2>
              <p>Twoje dane będą przechowywane przez okres niezbędny do realizacji rezerwacji, a po tym czasie przez okres wymagany przez przepisy prawa (np. podatkowego) lub do czasu przedawnienia ewentualnych roszczeń. Dane przetwarzane na podstawie zgody będą przechowywane do czasu jej cofnięcia.</p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6">5. Twoje prawa</h2>
              <p>Posiadasz prawo do:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>dostępu do treści swoich danych,</li>
                <li>ich sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
                <li>przenoszenia danych,</li>
                <li>wniesienia sprzeciwu wobec przetwarzania,</li>
                <li>cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem),</li>
                <li>wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych), gdy uznasz, że przetwarzanie narusza przepisy RODO.</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6">6. Wymóg podania danych</h2>
              <p>Podanie danych osobowych jest dobrowolne, jednakże niezbędne do zawarcia umowy rezerwacji lub udzielenia odpowiedzi na zapytanie przesłane przez formularz.</p>
            </div>
            
            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/25 mt-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                Kontakt z administratorem danych:
              </h3>
              <p className="text-xs md:text-sm">
                W sprawach związanych z ochroną danych osobowych możesz skontaktować się drogą elektroniczną pod adresem: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

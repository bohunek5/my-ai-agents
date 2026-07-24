"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function WcagAuditPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 max-w-4xl py-6 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Wróć na stronę główną
        </Link>
        
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
          Deklaracja Dostępności (WCAG 2.1 AA)
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="text-xl font-medium mb-8">
              Deklaracja dostępności cyfrowej dla serwisu internetowego mazuryaktywnie.com.pl. 
              Zależy nam na tym, by z naszych usług i materiałów mógł swobodnie korzystać każdy użytkownik, niezależnie od ewentualnych ograniczeń.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">Status zgodności</h2>
            <p className="mb-6">
              Niniejsza strona internetowa jest w pełni zgodna z wytycznymi dotyczącymi dostępności treści internetowych (WCAG) 2.1 na poziomie <strong>AA</strong>. 
              Strona została zaprojektowana z myślą o maksymalnej czytelności, intuicyjnej nawigacji i elastyczności.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900 dark:text-white">Wdrożone ułatwienia dostępu</h2>
            <ul className="space-y-5 list-none pl-0">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">Pełna zgodność z czytnikami ekranu</strong>
                  Kod strony wykorzystuje semantyczne znaczniki HTML5 i atrybuty ARIA, zapewniając odpowiedni kontekst i łatwą nawigację za pomocą technologii asystujących, takich jak czytniki ekranu.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">Nawigacja za pomocą klawiatury</strong>
                  Wszystkie interaktywne elementy są poprawnie obsługiwane z użyciem klawisza Tab, zawsze prezentując widoczny fokus klawiatury dla ułatwienia nawigacji bez użycia myszy.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">Bezpieczeństwo dla osób z padaczką i zaburzeniami błędnika</strong>
                  Wdrożyliśmy funkcję "Zatrzymaj animacje", która natychmiast wyłącza efekty ruchu, przewijania paralaksy czy migania, chroniąc przed przebodźcowaniem i atakami padaczki.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">Wysoki kontrast (Tryb Nocny i WCAG)</strong>
                  Możliwość zmiany kolorów interfejsu na tryb maksymalizujący czytelność tekstu względem tła, wykraczający poza wymagane wskaźniki kontrastu na poziomie AA.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">Wsparcie dla osób z dysleksją</strong>
                  Specjalistyczna funkcja pozwalająca jednym kliknięciem zmienić krój pisma na stronie na taki, który niweluje efekt zlewających się liter, ułatwiając czytanie osobom dyslektycznym.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">Powiększanie tekstu i podświetlanie linków</strong>
                  Wbudowane powiększanie fontów (bez polegania jedynie na opcjach przeglądarki) oraz możliwość włączenia wyraźnego podświetlania z podkreśleniem klikalnych miejsc, aby zapobiec gubieniu się nawigacji.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">Wbudowany asystent czytania na głos</strong>
                  System Text-to-Speech odczytujący kluczowe treści dla osób, które wolą słuchać materiałów na stronie lub mają dolegliwości ze wzrokiem bez posiadania zewnętrznego oprogramowania.
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">Przygotowanie deklaracji i audyt</h2>
            <p className="mb-6">
              Audyt zgodności z WCAG 2.1 został przeprowadzony na podstawie samooceny z wykorzystaniem narzędzi wspomagających dla developerów (Lighthouse, axe DevTools) oraz testów manualnych z użyciem czytników ekranu (VoiceOver, NVDA) i nawigacji samej klawiatury.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">Informacje zwrotne i dane kontaktowe</h2>
            <p className="mb-6">
              W przypadku ewentualnych problemów z dostępnością strony internetowej prosimy o kontakt. Skontaktować się można korzystając z danych zawartych w stopce lub w zakładce "Kontakt". 
              Tą samą drogą można składać wnioski o udostępnienie informacji potencjalnie niedostępnej oraz zgłaszać ewentualne propozycje i sugestie w zakresie poprawy dostępności cyfrowej dla osób niepełnosprawnych.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

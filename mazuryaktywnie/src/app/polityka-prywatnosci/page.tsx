"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, Lock, Cookie, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";

export default function PolitykaPrywatnosciPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <section className="relative h-[40dvh] md:h-[50dvh] flex flex-col justify-end items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/gallery/5S5A7029.webp" alt="Polityka Prywatności" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg mb-4">
            {t("Privacy", "title")}
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl">
            Informacje o prywatności, ochronie danych osobowych oraz plikach cookies w serwisie mazuryaktywnie.com.pl.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 max-w-3xl py-8 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                {t("Privacy", "title")}
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mt-1">
                Polityka Prywatności i Plików Cookies
              </p>
            </div>
          </div>

          {/* Company & Administrator Info Box */}
          <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
              <MapPin size={16} />
              <span>Administrator Danych Osobowych:</span>
            </div>
            <p className="text-base font-black text-gray-900 dark:text-white">Mazury Aktywnie</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Port Sztynort, Sztynort 10, 11-600 Węgorzewo</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">E-mail: kontakt@mazuryaktywnie.com.pl | Tel: 608 043 958</p>
          </div>

          {/* Body content */}
          <div className="prose dark:prose-invert max-w-none space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="space-y-4">
              <p className="font-semibold text-gray-900 dark:text-white">
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z serwisu internetowego mazuryaktywnie.com.pl oraz składaniem rezerwacji online.
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6">1. Zbieranie i cel przetwarzania danych</h2>
              <p>W ramach korzystania z serwisu zbieramy dane podane dobrowolnie przez Użytkownika w formularzach (rezerwacyjnym oraz kontaktowym). Mogą to być m.in.: imię, nazwisko, adres e-mail oraz numer telefonu.</p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-600" />
                <span>2. Płatności Przelewy24</span>
              </h2>
              <p>W przypadku wybrania płatności elektronicznej online, transakcje są obsługiwane przez bezpieczny system płatności <strong>Przelewy24</strong>.</p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6 flex items-center gap-2">
                <Cookie size={20} className="text-blue-600" />
                <span>3. Pliki cookies (ciasteczka)</span>
              </h2>
              <p>Nasz serwis używa plików cookies. Są to niewielkie pliki tekstowe przechowywane na urządzeniu końcowym Użytkownika. Pozwalają one na identyfikację sesji i poprawne funkcjonowanie systemu rezerwacyjnego.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cookies niezbędne:</strong> Umożliwiające korzystanie z usług w ramach serwisu, m.in. proces rezerwacji oraz wybór motywu.</li>
                <li><strong>Cookies analityczne:</strong> Służące optymalizacji działania serwisu.</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6 flex items-center gap-2">
                <Lock size={20} className="text-blue-600" />
                <span>4. Bezpieczeństwo i protokół SSL</span>
              </h2>
              <p>Stosujemy certyfikowane połączenie szyfrowane protokołem SSL (HTTPS). Dane osobowe podawane w formularzach są traktowane jako poufne i nie są udostępniane osobom nieuprawnionym.</p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6">5. Prawa Użytkownika</h2>
              <p>Każdy Użytkownik posiada prawo wglądu w swoje dane, ich sprostowania, usunięcia oraz ograniczenia przetwarzania. Szczegóły zawarte są w zakładce <a href="/rodo" className="text-blue-600 font-bold underline">Regulamin i RODO</a>.</p>
            </div>

            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/25 mt-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                Kontakt ws. Ochrony Danych:
              </h3>
              <p className="text-xs md:text-sm">
                Wszelkie zapytania dotyczące polityki prywatności prosimy kierować na adres: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

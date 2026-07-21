"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function PolitykaPrywatnosciPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <section className="relative h-[40dvh] md:h-[50dvh] flex flex-col justify-end items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/gallery/5S5A7029.webp" alt="Polityka" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg mb-4">
            {t("Privacy", "title")}
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl">
            Informacje o prywatności, plikach cookies i zasadach działania serwisu rezerwacyjnego.
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
                Polityka prywatności / Privacy Policy
              </p>
            </div>
          </div>

          {/* Body content */}
          <div className="prose dark:prose-invert max-w-none space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="font-semibold text-gray-900 dark:text-white">
              {t("Privacy", "p1")}
            </p>
            <p>
              {t("Privacy", "p2")}
            </p>
            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/25">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                Zarządzanie plikami cookies:
              </h3>
              <p className="text-xs md:text-sm">
                Każda przeglądarka internetowa umożliwia wyłączenie, ograniczenie lub usunięcie plików cookies. Więcej informacji o konfiguracji w popularnych przeglądarkach można znaleźć w ustawieniach pomocy danej aplikacji.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

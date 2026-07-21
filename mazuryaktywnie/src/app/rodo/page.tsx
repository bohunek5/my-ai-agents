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
            <p className="font-semibold text-gray-900 dark:text-white">
              {t("RODO", "p1")}
            </p>
            <p>
              {t("RODO", "p2")}
            </p>
            <p>
              {t("RODO", "p3")}
            </p>
            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/25">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                Kontakt z administratorem danych:
              </h3>
              <p className="text-xs md:text-sm">
                W sprawach związanych z ochroną danych osobowych możesz skontaktować się drogą elektroniczną pod adresem: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-450 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

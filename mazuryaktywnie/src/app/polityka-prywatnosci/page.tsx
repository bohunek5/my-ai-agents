"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, FileText, MapPin, CreditCard, RefreshCw, Scale, CheckCircle2, Lock, Cookie } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function PolitykaPrywatnosciPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        title={t("Privacy", "title")}
        subtitle={t("Privacy", "subtitle")}
        eyebrow={t("Privacy", "eyebrow")}
        image="/images/gallery/5S5A7029.webp"
      />
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-10">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0">
              <Scale size={36} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                {t("Privacy", "title")}
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mt-1">
                Mazury Aktywnie • Port Sztynort • Przelewy24
              </p>
            </div>
          </div>

          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="p-5 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
                <MapPin size={16} />
                <span>Mazury Aktywnie:</span>
              </div>
              <p className="font-black text-sm text-gray-900 dark:text-white">Port Sztynort, Sztynort 10</p>
              <p className="text-gray-600 dark:text-gray-300">11-600 Węgorzewo, Polska</p>
              <p className="text-gray-500 dark:text-gray-400">E-mail: kontakt@mazuryaktywnie.com.pl | Tel: 608 043 958</p>
            </div>

            <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                <CreditCard size={16} />
                <span>Płatności Online:</span>
              </div>
              <p className="font-black text-sm text-gray-900 dark:text-white">Przelewy24</p>
              <p className="text-gray-600 dark:text-gray-300">Szybkie przelewy, BLIK, karty Visa / Mastercard</p>
              <p className="text-gray-500 dark:text-gray-400">Szyfrowany protokół SSL (HTTPS)</p>
            </div>
          </div>

          {/* Full Multilingual Text */}
          <div className="space-y-8 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* § 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FileText className="text-blue-600" size={20} />
                <span>{t("Privacy", "sec1Title")}</span>
              </h2>
              <p>{t("Privacy", "sec1Text")}</p>
            </section>

            {/* § 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <CreditCard className="text-blue-600" size={20} />
                <span>{t("Privacy", "sec2Title")}</span>
              </h2>
              <p>{t("Privacy", "sec2Text")}</p>
            </section>

            {/* § 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <RefreshCw className="text-blue-600" size={20} />
                <span>{t("Privacy", "sec3Title")}</span>
              </h2>
              <p>{t("Privacy", "sec3Text")}</p>
            </section>

            {/* § 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <Cookie className="text-blue-600" size={20} />
                <span>{t("Privacy", "sec4Title")}</span>
              </h2>
              <p>{t("Privacy", "sec4Text")}</p>
            </section>

            <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex items-start gap-3">
              <CheckCircle2 size={24} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                  Kontakt / Support:
                </h3>
                <p className="text-xs md:text-sm mt-1">
                  E-mail: <a href="mailto:kontakt@mazuryaktywnie.com.pl" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">kontakt@mazuryaktywnie.com.pl</a> | Tel: <strong>608 043 958</strong>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, MapPin, Lock, FileText, CheckCircle2 } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function RodoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        title={t("RODO", "title")}
        subtitle={t("RODO", "subtitle")}
        eyebrow={t("RODO", "eyebrow")}
        image="/images/gallery/5S5A7031.webp"
      />
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-10">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0">
              <ShieldCheck size={36} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                {t("RODO", "title")}
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mt-1">
                Mazury Aktywnie • Port Sztynort
              </p>
            </div>
          </div>

          {/* Administrator Info Box */}
          <div className="p-5 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 space-y-1.5 text-xs font-semibold">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
              <MapPin size={16} />
              <span>{t("RODO", "adminTitle")}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">{t("RODO", "adminDesc")}</p>
          </div>

          {/* RODO Body Content */}
          <div className="space-y-8 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span>{t("RODO", "sec1Title")}</span>
              </h2>
              <p>{t("RODO", "sec1Text")}</p>
            </section>

            {/* 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FileText className="text-blue-600" size={20} />
                <span>{t("RODO", "sec2Title")}</span>
              </h2>
              <p>{t("RODO", "sec2Text")}</p>
            </section>

            {/* 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <Lock className="text-blue-600" size={20} />
                <span>{t("RODO", "sec3Title")}</span>
              </h2>
              <p>{t("RODO", "sec3Text")}</p>
            </section>

            {/* 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span>{t("RODO", "sec4Title")}</span>
              </h2>
              <p>{t("RODO", "sec4Text")}</p>
            </section>

            <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex items-start gap-3">
              <CheckCircle2 size={24} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                  Kontakt / RODO:
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

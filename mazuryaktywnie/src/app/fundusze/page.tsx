"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function FunduszePage() {
  const { t } = useLanguage();

  const expenses = [
    t("Fundusze", "expense1"),
    t("Fundusze", "expense2"),
    t("Fundusze", "expense3"),
    t("Fundusze", "expense4"),
    t("Fundusze", "expense5"),
    t("Fundusze", "expense6"),
    t("Fundusze", "expense7"),
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero pageId="fundusze"
        title={t("Fundusze", "title")}
        subtitle=""
        eyebrow="Giżycko"
        image="/images/gallery/5S5A6952.webp"
      />
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-16">

        {/* Content Layout */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("Fundusze", "projectTitle")}
            </h2>
            <p className="text-gray-605 dark:text-gray-300 leading-relaxed">
              {t("Fundusze", "projectDesc")}
            </p>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-700" />

          {/* Expenses */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t("Fundusze", "expensesTitle")}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {expenses.map((expense, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {expense}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-700" />

          {/* Plaque display */}
          <div className="relative w-full h-24 bg-white p-3 rounded-2xl border border-gray-200 shadow-inner flex items-center justify-center">
            <Image 
              src="/images/assets/stopka_loga.webp" 
              alt="Logo Funduszy Europejskich" 
              fill
              className="object-contain p-2"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

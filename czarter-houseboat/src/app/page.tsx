"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Apartments from "@/components/Apartments";
import Footer from "@/components/Footer";
import LuxuryBenefits from "@/components/LuxuryBenefits";
import CharterSection from "@/components/CharterSection";
import { Anchor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <Hero />

      {/* Intro Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <Anchor className="mx-auto h-12 w-12 text-amber-500 mb-6" />
          <h2 className="text-3xl md:text-4xl font-sans text-slate-900 dark:text-white mb-6 transition-colors">
            {t("intro", "title")} <span className="text-amber-500">{t("intro", "titleHighlight")}</span>
          </h2>
          <div className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-colors space-y-4">
            <p>{t("intro", "p1")}</p>
            <p>{t("intro", "p2")}</p>
          </div>
        </div>
      </section>

      <LuxuryBenefits />

      <Apartments />

      <CharterSection />

      <Footer />
    </main>
  );
}

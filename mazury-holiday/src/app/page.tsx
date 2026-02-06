"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Apartments from "@/components/Apartments";
import Footer from "@/components/Footer";
import { Ship, Anchor, Sun } from "lucide-react";
import Image from "next/image";
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
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6 transition-colors">
            {t("intro", "title")} <span className="text-amber-500">{t("intro", "titleHighlight")}</span>
          </h2>
          <div className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-colors space-y-4">
            <p>{t("intro", "p1")}</p>
            <p>{t("intro", "p2")}</p>
          </div>
        </div>
      </section>

      <Apartments />

      {/* Charter Section */}
      <section id="czarter" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-fixed center" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm mb-6 border border-amber-500/30">
                {t("charter", "premiumFleet")}
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                {t("charter", "title")}
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {t("charter", "description")}
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  t("charter", "feature1"),
                  t("charter", "feature2"),
                  t("charter", "feature3")
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-slate-900">
                      <Sun size={14} strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all shadow-lg shadow-amber-500/20"
              >
                {t("charter", "detailsBtn")}
              </a>
            </div>

            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1605281317010-fe5ffe79ba02?q=80&w=2669&auto=format&fit=crop"
                alt="Jacht motorowy na Mazurach"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-2 text-amber-400 mb-2 font-medium">
                  <Ship size={20} />
                  <span>Merry Fisher 895</span>
                </div>
                <p className="text-white text-2xl font-serif">Twoja przygoda na wodzie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

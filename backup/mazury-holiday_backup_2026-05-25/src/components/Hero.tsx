"use client";

import Image from "next/image";
import { Phone, Sun, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TypewriterTitle from "@/components/TypewriterTitle";
import { getAssetPath } from "@/utils/assetPath";

export default function Hero() {
  const { t, language } = useLanguage();

  const phrases = language === 'pl'
    ? ["Wakacje na Mazurach", "Sprawdź naszą ofertę"]
    : [t("hero", "title"), t("hero", "subtitle")];

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 z-0"
      >
        <Image
          src={getAssetPath("/images/hero-mazury-holiday-final.webp")}
          alt="Mazury Landscape"
          fill
          priority
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-slate-900/40" /> {/* Overlay */}
      </div>

      <div className="container relative z-10 px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-sans font-bold mb-4 drop-shadow-lg min-h-[1.2em]">
          <TypewriterTitle phrases={phrases} speed={50} />
        </h1>

        <div className="w-24 h-1 bg-amber-500 mx-auto mb-10 rounded-full shadow-lg" />

        <p className="text-sm md:text-base lg:text-lg font-light tracking-[0.2em] mb-12 text-white/95 max-w-4xl mx-auto uppercase drop-shadow-md leading-relaxed">
          {language === 'pl' ? "SPRAWDŹ JAK MOŻESZ SPĘDZIĆ WYJĄTKOWE I NIEZAPOMNIANE CHWILE" : t("hero", "subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-16">
          <a
            href="https://engine37851.idobooking.com/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[280px] sm:max-w-none sm:w-[260px] px-5 py-2.5 sm:px-8 sm:py-4 bg-amber-500/10 hover:bg-amber-500/20 backdrop-blur-sm border border-amber-500 text-white rounded-full font-medium transition-all flex items-center justify-center gap-3 group text-sm sm:text-base shadow-lg"
          >
            <span className="p-1.5 sm:p-2 bg-amber-500/20 rounded-full group-hover:bg-amber-500 transition-colors">
              <Calendar size={16} className="text-amber-500 group-hover:text-white transition-colors sm:w-5 sm:h-5" />
            </span>
            Rezerwuj Online
          </a>
          <a
            href="tel:730067027"
            className="w-full max-w-[280px] sm:max-w-none sm:w-[260px] px-5 py-2.5 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium transition-all flex items-center justify-center gap-3 group text-sm sm:text-base shadow-lg"
          >
            <span className="p-1.5 sm:p-2 bg-white/20 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-colors">
              <Phone size={16} className="text-white group-hover:text-slate-900 transition-colors sm:w-5 sm:h-5" />
            </span>
            +48 730 067 027
          </a>
        </div>

      </div>

      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <button 
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-3 animate-bounce-slow cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Sun className="w-10 h-10 text-amber-500 animate-spin-slow-pause" />
          <span className="text-white/80 text-xs font-light tracking-[0.2em] uppercase whitespace-nowrap">
            {t("hero", "scrollDown")}
          </span>
        </button>
      </div>
    </section>
  );
}

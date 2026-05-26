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
    : [t("hero", "title") || "Wakacje na Mazurach", t("hero", "subtitle") || "Sprawdź naszą ofertę"];

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 z-0"
      >
        <Image
          src={getAssetPath("/images/wow.webp")}
          alt="Mazury Landscape"
          fill
          priority
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-slate-900/40" /> {/* Overlay */}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center text-white mt-0 md:-mt-12 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-sans font-bold mb-4 [text-shadow:_0_4px_12px_rgba(0,0,0,0.8)] min-h-[120px] sm:min-h-[1.2em] flex items-center justify-center w-full">
          <TypewriterTitle phrases={phrases} speed={50} />
        </h1>

        <div className="w-24 h-1 bg-amber-500 mx-auto mt-2 mb-4 rounded-full shadow-lg" />

        <p className="text-base md:text-lg lg:text-xl font-black tracking-[0.15em] mb-8 text-white uppercase [text-shadow:_0_4px_16px_rgba(0,0,0,1),_0_2px_4px_rgba(0,0,0,1),_0_0_8px_rgba(0,0,0,0.8)] leading-relaxed">
          {language === 'pl' ? "SPRAWDŹ JAK MOŻESZ SPĘDZIĆ WYJĄTKOWE I NIEZAPOMNIANE CHWILE" : (t("hero", "subtitleDesc") || t("hero", "subtitle") || "SPRAWDŹ JAK MOŻESZ SPĘDZIĆ WYJĄTKOWE I NIEZAPOMNIANE CHWILE")}
        </p>

        <div className="flex flex-col items-center gap-4 w-full mb-8">
          <a
            href="https://engine37851.idobooking.com/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[280px] px-5 py-3 bg-amber-500/10 hover:bg-amber-500/20 backdrop-blur-sm border border-amber-500 text-white rounded-full font-bold transition-all flex items-center justify-center gap-3 group text-sm sm:text-base shadow-lg"
          >
            <span className="p-1.5 bg-amber-500/20 rounded-full group-hover:bg-amber-500 transition-colors">
              <Calendar size={16} className="text-amber-500 group-hover:text-white transition-colors" />
            </span>
            {t("hero", "bookOnlineBtn") || "Rezerwuj Online"}
          </a>
          <a
            href="tel:730067027"
            className="w-full max-w-[280px] px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold transition-all flex items-center justify-center gap-3 group text-sm sm:text-base shadow-lg"
          >
            <span className="p-1.5 bg-white/20 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-colors">
              <Phone size={16} className="text-white group-hover:text-slate-900 transition-colors" />
            </span>
            +48 730 067 027
          </a>
        </div>

        {/* Scroll Down Button - stacked right under the buttons */}
        <div className="z-30 pointer-events-auto flex w-full justify-center mt-4">
          <button 
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex flex-col items-center justify-center gap-2 animate-bounce-slow cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Sun className="w-10 h-10 text-amber-500 animate-spin-slow-pause drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
            <span className="text-white/90 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap [text-shadow:_0_2px_8px_rgba(0,0,0,0.8),_0_1px_2px_rgba(0,0,0,0.8)] text-center">
              {t("hero", "scrollDown") || "Przewiń w dół"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

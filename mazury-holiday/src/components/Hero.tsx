"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/apartments_2.jpg"
          alt="Mazury Landscape"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-slate-900/40" /> {/* Overlay */}
      </div>

      <div className="container relative z-10 px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in-up">
          {t("hero", "title")}
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide mb-10 text-white/90 max-w-3xl mx-auto uppercase">
          {t("hero", "subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#apartamenty"
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
          >
            {t("hero", "apartmentsBtn")}
            <ArrowRight size={18} />
          </Link>
          <Link
            href="#czarter"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium transition-all flex items-center justify-center"
          >
            {t("hero", "charterBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}


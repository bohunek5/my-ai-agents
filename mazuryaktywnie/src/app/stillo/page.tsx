"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { Ship, Shield, Wind, Flame, Sun, Layers, Maximize, ArrowRight } from "lucide-react";
import { Caveat, Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import SubpageHero from "@/components/SubpageHero";

const handwriting = Caveat({ 
  weight: '700', 
  subsets: ['latin-ext'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: '900',
  subsets: ['latin-ext'],
  display: 'swap',
});

export default function StilloPage() {
  const { t } = useLanguage();

  const advantages = [
    { icon: <Wind size={32} />, title: "Ster Strumieniowy", desc: "Podwójny system ułatwiający precyzyjne manewry w najciaśniejszych portach. Nawet niedoświadczony sternik poczuje się pewnie." },
    { icon: <Sun size={32} />, title: "Solarna Niezależność", desc: "Wydajne panele słoneczne na dachu pozwalają na długie dni poza portem bez utraty zasilania urządzeń pokładowych." },
    { icon: <Maximize size={32} />, title: "Przestronny Pokład", desc: "Ogromny pokład słoneczny idealny do opalania oraz platforma kąpielowa z drabinką dla miłośników wody." },
    { icon: <Shield size={32} />, title: "Pełne Bezpieczeństwo", desc: "Zaawansowana elektronika nawigacyjna Raymarine, głębokościomierz i kompletne wyposażenie ratunkowe." },
    { icon: <Layers size={32} />, title: "Premium Wykończenie", desc: "Wnętrze zaprojektowane z użyciem materiałów najwyższej jakości – drewniane detale, miękkie obicia i świetne nagłośnienie." }
  ];

  const gallery = [
    { src: "/images/gallery/5S5A6951.webp", alt: "Stillo 31 na wodzie", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/gallery/5S5A6954.webp", alt: "Wnętrze salonu", span: "md:col-span-1" },
    { src: "/images/gallery/5S5A6955.webp", alt: "Stanowisko sternika", span: "md:col-span-1" },
    { src: "/images/gallery/5S5A6957.webp", alt: "Pokład słoneczny", span: "md:col-span-1" },
    { src: "/images/gallery/5S5A6968.webp", alt: "Stillo 31 w porcie", span: "md:col-span-1" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-20">
      
      <SubpageHero pageId="stillo"
        title="STILLO 31"
        subtitle="Luksus na wodzie."
        eyebrow={<><Ship size={14} /> Jacht Flagowy</>}
        image="/images/gallery/5S5A6952.webp"
      />

      {/* Intro Description */}
      <section className="py-20 md:py-32 container mx-auto px-4 max-w-4xl text-center relative z-20">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
          Pływający Apartament <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Najwyższej Klasy</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          Stillo 31 to nie jest zwykła łódź. To najwyższej klasy jacht motorowy zaprojektowany dla gości, którzy nie godzą się na kompromisy. Zapewnia absolutny prestiż, nieograniczoną swobodę oraz komfort, którego spodziewasz się po ekskluzywnym hotelu – a wszystko to w samym sercu dzikich, zachwycających Mazur.
        </p>
      </section>

      {/* Tech Specs */}
      <section className="py-16 bg-slate-100 dark:bg-slate-800/30 border-y border-gray-200 dark:border-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">9.60<span className="text-2xl text-slate-500">m</span></span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold">Długość Całkowita</span>
            </div>
            <div className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">3.25<span className="text-2xl text-slate-500">m</span></span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold">Szerokość</span>
            </div>
            <div className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">0.50<span className="text-2xl text-slate-500">m</span></span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold">Zanurzenie</span>
            </div>
            <div className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">8<span className="text-2xl text-slate-500"></span></span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold">Ilość Miejsc</span>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 md:py-32 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Dlaczego Stillo?</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-xl">Technologia w służbie Twojego idealnego wypoczynku.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((adv, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800/40 backdrop-blur-md border border-gray-200 dark:border-slate-700/50 hover:border-blue-500/50 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 group shadow-xl hover:shadow-2xl hover:shadow-blue-900/20">
              <div className="text-blue-500 mb-6 group-hover:scale-110 group-hover:text-blue-400 transition-transform origin-left">
                {adv.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{adv.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-slate-100 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Galeria Wnętrz</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-xl">Zajrzyj do środka pływającego apartamentu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[350px]">
            {gallery.map((img, idx) => (
              <div key={idx} className={`relative rounded-3xl overflow-hidden group shadow-lg ${img.span || ''}`}>
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white text-xl font-bold tracking-wide">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4 max-w-5xl text-center">
        <div className="bg-gradient-to-br from-blue-900 to-slate-800 p-12 md:p-20 rounded-[3rem] border border-blue-700/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/images/gallery/5S5A6951.webp')] opacity-10 bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Gotowy na Rejs?</h2>
            <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Zarezerwuj swój termin na pokładzie Stillo 31 i przeżyj mazurską przygodę w standardzie Premium.
            </p>
            <Link 
              href="/reservation" 
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-blue-900 hover:bg-blue-50 hover:scale-105 transition-all rounded-full font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            >
              Sprawdź Dostępność <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

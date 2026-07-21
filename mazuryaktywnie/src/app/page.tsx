"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { Bike, CalendarCheck, Ship, Waves, ArrowRight, Compass, Sun, Droplets, Star, Anchor, ThumbsUp, Heart } from "lucide-react";
import FAQ from "@/components/FAQ";
import { Caveat, Montserrat } from "next/font/google";

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

export default function HomePage() {
  const { t } = useLanguage();
  const [heroSlogan, setHeroSlogan] = React.useState("Rozpocznij swoją przygodę na Mazurach");
  const [heroImage, setHeroImage] = React.useState("/images/gallery/5S5A6951.webp");
  const [heroTitle, setHeroTitle] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cms_glowna");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.subtitle) setHeroSlogan(parsed.subtitle);
          if (parsed.image) setHeroImage(parsed.image);
          if (parsed.title) setHeroTitle(parsed.title);
        } catch(e) {
          setHeroSlogan(saved);
        }
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Universal Splash Screen */}
      <section className="relative h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage || "/images/gallery/5S5A6951.webp"}
            alt="Stillo 31 na Mazurach"
            fill
            quality={100}
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] animate-slowpan"
          />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 dark:from-slate-950/70 to-transparent" />
        </div>

        {/* Main Welcome Text */}
        <div className="flex-grow flex flex-col items-center justify-start w-full px-2 sm:px-4 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
          <div className="flex flex-col items-center">
            <h2 className={`${handwriting.className} text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] text-white text-center drop-shadow-[0_4px_6px_rgba(0,0,0,1)] max-w-5xl leading-relaxed flex flex-wrap justify-center gap-x-2 sm:gap-x-3 md:gap-x-4`}>
              {heroSlogan.split(" ").map((word, wordIdx, arr) => {
                const prevCharsCount = arr.slice(0, wordIdx).join("").length + wordIdx;
                return (
                  <span key={wordIdx} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIdx) => (
                      <span 
                        key={charIdx} 
                        className="inline-block opacity-0 animate-letter-appear"
                        style={{ animationDelay: `${(prevCharsCount + charIdx) * 0.05}s` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                );
              })}
            </h2>
            <div className={`mt-2 md:mt-8 ${montserrat.className} text-[13vw] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] leading-none text-white tracking-[0.1em] sm:tracking-[0.2em] font-black drop-shadow-[0_8px_16px_rgba(0,0,0,1)] uppercase flex flex-nowrap whitespace-nowrap justify-center`}>
              {(heroTitle || "STILLO 31").split("").map((char, i) => (
                <span key={`t-${i}`} className="inline-block opacity-0 animate-letter-appear" style={{ animationDelay: `${2 + (i * 0.15)}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div 
          className="relative z-20 flex flex-col items-center cursor-pointer pb-52 md:pb-32 lg:pb-40"
          onClick={() => {
            const el = document.getElementById('main-hero');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
        >
          <p className="text-sm md:text-xl lg:text-2xl font-black uppercase tracking-[0.3em] text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
            Przewiń w dół
          </p>
          <div className="animate-swing origin-top">
            <Anchor size={80} className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,1)]" />
          </div>
        </div>
      </section>

      {/* Intro Block (was Hero) */}
      <section id="main-hero" className="relative py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <p className="mb-4 inline-flex rounded-full bg-blue-600 px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white shadow-sm">
              Houseboat bez patentu
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900 dark:text-white">
              {t("HomePage", "title")}
            </h1>
            <p className="text-lg md:text-2xl font-medium mb-10 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t("HomePage", "subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl shadow-lg shadow-blue-900/30 transition-transform hover:-translate-y-1"
              >
                <CalendarCheck size={20} />
                {t("HomePage", "bookNow")}
              </Link>
              <Link
                href="/oferta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 font-black rounded-xl transition-transform hover:-translate-y-1 shadow-sm"
              >
                <Ship size={18} />
                {t("HomePage", "heroCta")}
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto text-sm md:text-base font-semibold">
              {[
                { icon: <Ship size={18} />, label: "Stillo 31 (8 os.)", href: "/stillo" },
                { icon: <Waves size={18} />, label: "deski SUP", href: "/oferta#sup" },
                { icon: <Bike size={18} />, label: "Rowery i e-bike", href: "/oferta#ebike" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3 text-slate-800 dark:text-white shadow-sm transition-colors hover:-translate-y-1 hover:shadow-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 group">
                  <span className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section - Parallax & Features */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              {t("Discover", "title")}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">
              {t("Discover", "subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Compass className="w-8 h-8" />, title: t("Discover", "f1Title"), desc: t("Discover", "f1Desc"), img: "/images/gallery/5S5A7012.webp" },
              { icon: <Droplets className="w-8 h-8" />, title: t("Discover", "f2Title"), desc: t("Discover", "f2Desc"), img: "/images/gallery/5S5A7032.webp" },
              { icon: <Sun className="w-8 h-8" />, title: t("Discover", "f3Title"), desc: t("Discover", "f3Desc"), img: "/images/gallery/5S5A6968.webp" }
            ].map((feature, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={feature.img} 
                    alt={feature.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="mb-2 p-2 bg-blue-600/90 rounded-xl inline-block backdrop-blur-md shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oferta Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              {t("Offer", "title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("Offer", "lead")}
            </p>
          </div>

          {/* Main Boat Highlight Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 group">
            <div className="relative h-72 lg:h-auto min-h-[300px] overflow-hidden">
              <Image 
                src="/images/gallery/5S5A6954.webp" 
                alt="Jacht motorowy Stillo 31 na wodzie" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                  <Ship size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stillo 31 - Pływający Apartament</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("Offer", "comfortDesc")}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  href="/stillo" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>{t("Stillo", "title")}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Addons Section */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                {t("Offer", "addonsTitle")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t("Offer", "addonsLead")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* SUP */}
              <Link href="/oferta#sup" className="block bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/40 dark:border-white/10 flex flex-col h-full group hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src="/images/gallery/sup_boards_optimized.webp" 
                    alt="Deska SUP" 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t("Offer", "supTitle")}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("Offer", "supDesc")}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Traditional Bikes */}
              <Link href="/oferta#rowery" className="block bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/40 dark:border-white/10 flex flex-col h-full group hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image 
                    src="/images/gallery/trad_bikes.webp" 
                    alt="Rowery turystyczne na pokładzie" 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t("Offer", "bikesTitle")}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("Offer", "bikesDesc")}
                    </p>
                  </div>
                </div>
              </Link>

              {/* E-Bikes */}
              <Link href="/oferta#ebike" className="block bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/40 dark:border-white/10 flex flex-col h-full group hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src="/images/gallery/ebikes_optimized.webp" 
                    alt="Rowery elektryczne" 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t("Offer", "ebikesTitle")}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("Offer", "ebikesDesc")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Why Us Section */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                {t("WhyUs", "title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t("WhyUs", "subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <Anchor size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("WhyUs", "f1Title")}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t("WhyUs", "f1Desc")}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("WhyUs", "f2Title")}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t("WhyUs", "f2Desc")}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <ThumbsUp size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("WhyUs", "f3Title")}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t("WhyUs", "f3Desc")}</p>
              </div>
            </div>
          </div>


          {/* FAQ Section */}
          <FAQ />

          {/* CTA Block */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-black">{t("Offer", "ready")}</h2>
              <div className="pt-2">
                <Link 
                  href="/reservation" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-black rounded-xl shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <span>{t("Offer", "ctaBtn")}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

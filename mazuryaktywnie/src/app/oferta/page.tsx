"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { Ship, ArrowRight, MapPin, Compass, Navigation } from "lucide-react";
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

export default function OfertaPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-20">
      
      <SubpageHero pageId="oferta"
        title="OFERTA"
        subtitle="Wynajem Stillo 31, deski SUP, e-bike"
        image="/images/gallery/5S5A6957.webp"
      />

      <div className="container mx-auto px-4 max-w-6xl pt-10">

        {/* Jacht Stillo 31 */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 group">
          <div className="relative h-80 lg:h-auto min-h-[400px] overflow-hidden">
            <Image 
              src="/images/gallery/5S5A6951.webp" 
              alt="Jacht motorowy Stillo 31 na wodzie" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-800/40 lg:hidden" />
          </div>
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 w-fit">
              <Ship size={20} />
              <span className="font-bold tracking-widest text-xs uppercase">Jacht Flagowy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">Stillo 31 <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Pływający Apartament</span></h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
              Poczuj się jak w pięciogwiazdkowym hotelu, mając wokół siebie bezkres mazurskich jezior. Nasz flagowy jacht Stillo 31 to jednostka stworzona dla najbardziej wymagających. Niezależnie od pogody, ogrzewanie i przestronny salon zapewnią maksymalny komfort.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/stillo" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1"
              >
                <span>Pełna Specyfikacja</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* SUP */}
        <div id="sup" className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 group scroll-mt-24">
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">{t("Offer", "supTitle")}</h2>
            <p className="text-blue-400 text-xl font-bold">{t("Offer", "supDesc")}</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
              Zabierz deskę SUP na pokład i obudź w sobie odkrywcę. To doskonały trening równowagi i najcichszy sposób na zbliżenie się do mazurskiej natury. 
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-gray-200 dark:border-white/5 mt-4">
              <h4 className="text-slate-900 dark:text-white font-bold flex items-center gap-2 mb-3"><MapPin className="text-blue-500"/> Gdzie warto popłynąć?</h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-2 text-sm leading-relaxed">
                <li>• <strong>Płytkie zatoki jeziora Dobskiego</strong> – ostoja ptactwa, gdzie jachtem nie wpłyniesz.</li>
                <li>• <strong>Rezerwat Krutynia</strong> – idealne, spokojne nurty doskonałe dla SUP.</li>
                <li>• <strong>Poranne mgły na Śniardwach</strong> – wschód słońca z pokładu deski to przeżycie jedyne w swoim rodzaju.</li>
              </ul>
            </div>
          </div>
          <div className="relative h-80 lg:h-auto overflow-hidden order-1 lg:order-2">
            <Image 
              src="/images/gallery/sup_boards_optimized.webp" 
              alt="Deska SUP" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>

        {/* E-Bikes */}
        <div id="ebike" className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 group scroll-mt-24">
          <div className="relative h-80 lg:h-auto overflow-hidden">
            <Image 
              src="/images/gallery/ebikes_optimized.webp" 
              alt="Rowery elektryczne" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">{t("Offer", "ebikesTitle")}</h2>
            <p className="text-blue-400 text-xl font-bold">{t("Offer", "ebikesDesc")}</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
              Maksymalny komfort zwiedzania lądu. Nasze potężne rowery elektryczne pozwalają pokonywać dziesiątki kilometrów bez kropli potu. Cumujesz w porcie, zdejmujesz e-bike'a z pokładu i ruszasz przed siebie.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-gray-200 dark:border-white/5 mt-4">
              <h4 className="text-slate-900 dark:text-white font-bold flex items-center gap-2 mb-3"><Compass className="text-blue-500"/> Trasy E-Bike</h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-2 text-sm leading-relaxed">
                <li>• <strong>Mazurska Pętla Rowerowa</strong> – bez wysiłku przejedź najpiękniejsze fragmenty nowej trasy.</li>
                <li>• <strong>Wycieczka do Wilczego Szańca</strong> – z portu w Giżycku czy Kętrzynie szybko i wygodnie dotrzesz do historycznych bunkrów.</li>
                <li>• <strong>Wyprawy po lokalne smaki</strong> – odwiedź oddalone agroturystyki po świeże sery i ryby.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Traditional Bikes */}
        <div id="rowery" className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 group scroll-mt-24">
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">{t("Offer", "bikesTitle")}</h2>
            <p className="text-blue-400 text-xl font-bold">{t("Offer", "bikesDesc")}</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
              Dla miłośników klasycznej aktywności fizycznej. Niezawodne rowery turystyczne, wyposażone w koszyki i wygodne siodełka. Idealne na poranne po zakupy do wiejskiego sklepu lub rekreacyjną przejażdżkę po lesie.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-gray-200 dark:border-white/5 mt-4">
              <h4 className="text-slate-900 dark:text-white font-bold flex items-center gap-2 mb-3"><Navigation className="text-blue-500"/> Okoliczne wycieczki</h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-2 text-sm leading-relaxed">
                <li>• <strong>Ścieżki Puszczy Piskiej</strong> – kilometry szutrowych, zacienionych dróg.</li>
                <li>• <strong>Wzdłuż Kanału Łuczańskiego</strong> – klimatyczny przejazd przez serce Giżycka.</li>
                <li>• <strong>Szybkie zakupy</strong> – zamontowany koszyk ułatwi transport świeżych bułek na poranne śniadanie na jachcie.</li>
              </ul>
            </div>
          </div>
          <div className="relative h-80 lg:h-auto overflow-hidden order-1 lg:order-2">
            <Image 
              src="/images/gallery/trad_bikes.webp" 
              alt="Rowery turystyczne" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>

        {/* CTA Block */}
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-12 md:p-20 rounded-[3rem] border border-blue-700/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/images/gallery/5S5A6952.webp')] opacity-10 bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Skomponuj Swój Idealny Urlop</h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto font-light">
              Zarezerwuj Stillo 31 i dobierz dodatki, które zamienią zwykły rejs w niesamowitą przygodę. Sprzęt czeka na Ciebie na pokładzie!
            </p>
            <Link 
              href="/reservation" 
              className="inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 hover:bg-blue-50 transition-all rounded-full font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              <span>{t("Offer", "ctaBtn")}</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

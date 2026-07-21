"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

type GalleryCategory = "all" | "yacht" | "interior" | "activities";

type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

export default function GaleriaPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images: GalleryImage[] = [
    // Yacht (Outer)
    { src: "/images/gallery/5S5A6951.webp", alt: "Jacht motorowy Stillo 31 płynący po jeziorze", category: "yacht" },
    { src: "/images/gallery/5S5A6952.webp", alt: "Zbliżenie na kokpit i dziób Stillo 31", category: "yacht" },
    { src: "/images/gallery/5S5A6957.webp", alt: "Jacht Stillo 31 od tyłu na otwartej wodzie", category: "yacht" },
    { src: "/images/gallery/5S5A6968.webp", alt: "Jacht zacumowany w malowniczym mazurskim porcie", category: "yacht" },
    { src: "/images/gallery/5S5A7012.webp", alt: "Sylwetka Stillo 31 płynącego o zachodzie słońca", category: "yacht" },
    { src: "/images/gallery/DSC04334-1024x576.webp", alt: "Jacht motorowy Stillo 31 z boku przy pomoście", category: "yacht" },
    { src: "/images/gallery/DSC04336-1024x683.webp", alt: "Dziób jachtu Stillo 31 w pełnym słońcu", category: "yacht" },
    { src: "/images/gallery/DSC04344-1024x576.webp", alt: "Widok na rufę jachtu Stillo 31", category: "yacht" },

    // Interior
    { src: "/images/gallery/DSC04352-1024x576.webp", alt: "Wnętrze kabiny dziobowej jachtu", category: "interior" },
    { src: "/images/gallery/DSC04354-1024x576.webp", alt: "Wygodne spanie w kabinie rufowej", category: "interior" },
    { src: "/images/gallery/DSC04356-1024x576.webp", alt: "Druga kabina rufowa na jachcie", category: "interior" },
    { src: "/images/gallery/DSC04366-1024x576.webp", alt: "Aneks kuchenny z lodówką i zlewem", category: "interior" },
    { src: "/images/gallery/DSC04369-1024x576.webp", alt: "Zlew kuchenny i kuchenka gazowa w galerze", category: "interior" },
    { src: "/images/gallery/DSC04370-1024x576.webp", alt: "Panel elektryczny i wskaźniki poziomu płynów", category: "interior" },

    // Activities / Accessories
    { src: "/images/gallery/sup_boards_optimized.webp", alt: "Dwie deski SUP na wodzie przy jachcie", category: "activities" },
    { src: "/images/gallery/trad_bikes.webp", alt: "Rowery turystyczne zaparkowane na leśnej ścieżce", category: "activities" },
    { src: "/images/gallery/ebikes_optimized.webp", alt: "Rowery elektryczne", category: "activities" },
    { src: "/images/gallery/DSC04393-1024x576.webp", alt: "Krajobraz Mazur - natura", category: "activities" },
    { src: "/images/gallery/DSC04397-1024x576.webp", alt: "Piękne widoki mazurskich jezior", category: "activities" },
  ];

  const filteredImages = images.filter(
    (img) => selectedCategory === "all" || img.category === selectedCategory
  );

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
    }
  }, [lightboxIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
    }
  }, [lightboxIndex, filteredImages.length]);

  // Handle keyboard events in Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleCloseLightbox, handlePrev, handleNext]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero
        pageId="galeria"
        title={t("Gallery", "title")}
        subtitle="Zobacz Stillo 31, jasne wnętrza oraz sprzęt do aktywnego wypoczynku na Mazurach."
        eyebrow="Galeria"
        image="/images/gallery/5S5A7012.webp"
      />
      <div className="container mx-auto px-4 max-w-6xl pt-2 pb-8 md:py-16">

        {/* Virtual Tour Section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Maximize2 size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Wirtualny spacer 3D po jachcie Stillo 31</span>
            </h2>
            <div className="relative w-full rounded-2xl overflow-hidden bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center aspect-video lg:aspect-[21/9] border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 transition-colors">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 z-10 p-4 text-center">
                <Maximize2 size={48} className="mb-4 opacity-50 text-blue-500" />
                <p className="font-bold text-lg text-gray-700 dark:text-gray-300">Miejsce na Twój wirtualny spacer</p>
                <p className="text-sm mt-2 max-w-md">Prześlij link do spaceru (np. Matterport, Kuula), a zostanie on automatycznie osadzony w tym miejscu, pozwalając klientom "chodzić" po jachcie.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Filtry galerii">
          {(["all", "yacht", "interior", "activities"] as GalleryCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              }`}
            >
              {t("Gallery", cat)}
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => handleOpenLightbox(idx)}
              className="relative h-64 rounded-2xl overflow-hidden shadow-md group hover:shadow-xl hover:-translate-y-0.5 cursor-pointer transition-all duration-300 bg-gray-200 dark:bg-gray-800 border border-gray-100 dark:border-gray-800"
              role="button"
              tabIndex={0}
              aria-label={`Powiększ zdjęcie: ${img.alt}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenLightbox(idx);
                }
              }}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white font-bold text-xs truncate w-full">{img.alt}</span>
              </div>
              <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        {lightboxIndex !== null && (
          <div 
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Podgląd zdjęcia w pełnym rozmiarze"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center text-white p-2">
              <span className="text-sm font-semibold">
                {lightboxIndex + 1} / {filteredImages.length}
              </span>
              <button 
                onClick={handleCloseLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer text-white"
                aria-label={t("Gallery", "close")}
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image Area */}
            <div className="flex-grow flex items-center justify-center relative">
              {/* Prev Button */}
              <button 
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer text-white"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft size={28} />
              </button>

              <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center p-4">
                <Image 
                  src={filteredImages[lightboxIndex].src} 
                  alt={filteredImages[lightboxIndex].alt} 
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                  priority
                />
              </div>

              {/* Next Button */}
              <button 
                onClick={handleNext}
                className="absolute right-2 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer text-white"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center text-white pb-6 px-4">
              <p className="text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                {filteredImages[lightboxIndex].alt}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

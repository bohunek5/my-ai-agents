"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Play, Sparkles } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

type GalleryCategory = "all" | "yacht" | "interior" | "activities";

type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

const DEFAULT_IMAGES: GalleryImage[] = [
  // Jacht (Z zewnątrz)
  { src: "/images/gallery/5S5A6951.webp", alt: "Luksusowy jacht motorowy Stillo 31 na otwartej wodzie", category: "yacht" },
  { src: "/images/gallery/5S5A6952.webp", alt: "Stanowisko sternika i nowoczesny kokpit Stillo 31", category: "yacht" },
  { src: "/images/gallery/5S5A6957.webp", alt: "Pokład słoneczny i platforma kąpielowa z rufy", category: "yacht" },
  { src: "/images/gallery/5S5A6968.webp", alt: "Jacht Stillo 31 zacumowany w Porcie Sztynort", category: "yacht" },
  { src: "/images/gallery/5S5A7012.webp", alt: "Sylwetka Stillo 31 o zachodzie słońca na Mazurach", category: "yacht" },
  { src: "/images/gallery/5S5A7029.webp", alt: "Widok na mazurskie jeziora z pokładu jachtu", category: "yacht" },
  { src: "/images/gallery/5S5A7031.webp", alt: "Stillo 31 płynący przy brzegu Szlaku Wielkich Jezior", category: "yacht" },
  { src: "/images/gallery/DSC04334-1024x576.webp", alt: "Jacht Stillo 31 przy pomoście w porcie", category: "yacht" },
  { src: "/images/gallery/DSC04336-1024x683.webp", alt: "Nowoczesny dziób i kadłub Stillo 31 w słońcu", category: "yacht" },
  { src: "/images/gallery/DSC04344-1024x576.webp", alt: "Rufa jachtu z drabiną kąpielową", category: "yacht" },

  // Wnętrze (Messa, Kabiny, Łazienka, Kuchnia)
  { src: "/images/gallery/5S5A6954.webp", alt: "Przestronny salon i messa Stillo 31 z przeszkleniami", category: "interior" },
  { src: "/images/gallery/5S5A7032.webp", alt: "Jasne wnętrze jachtu z miękkimi obiciami kanap", category: "interior" },
  { src: "/images/gallery/DSC04352-1024x576.webp", alt: "Zamykana luksusowa kabina dziobowa sypialna", category: "interior" },
  { src: "/images/gallery/DSC04354-1024x576.webp", alt: "Wygodne podwójne łóżko w kabinie rufowej", category: "interior" },
  { src: "/images/gallery/DSC04356-1024x576.webp", alt: "Druga prywatna kabina sypialna na jachcie", category: "interior" },
  { src: "/images/gallery/DSC04366-1024x576.webp", alt: "W pełni wyposażony aneks kuchenny (galera) z lodówką", category: "interior" },
  { src: "/images/gallery/DSC04369-1024x576.webp", alt: "Zlew kuchenny ze stali nierdzewnej i płyta gazowa", category: "interior" },
  { src: "/images/gallery/DSC04370-1024x576.webp", alt: "Nowoczesny panel sterowania instalacją elektryczną", category: "interior" },
  { src: "/images/gallery/DSC04378-1024x576.webp", alt: "Łazienka z prysznicem, ciepłą wodą i stacjonarnym WC", category: "interior" },
  { src: "/images/gallery/DSC04382-1024x576.webp", alt: "Rozkładany stół w salonie dla całej 8-osobowej załogi", category: "interior" },

  // Aktywności & Sprzęt (SUP, Rowery, Przyroda)
  { src: "/images/gallery/sup_boards_optimized.webp", alt: "Deski SUP do pływania po cichych mazurskich zatoczkach", category: "activities" },
  { src: "/images/gallery/ebikes_optimized.webp", alt: "Nowoczesne rowery elektryczne e-bike gotowe na wycieczkę", category: "activities" },
  { src: "/images/gallery/trad_bikes.webp", alt: "Rowery tradycyjne na leśnym szlaku wokół jezior", category: "activities" },
  { src: "/images/gallery/DSC04393-1024x576.webp", alt: "Dzika natura Mazur - malownicza cicha zatoka", category: "activities" },
  { src: "/images/gallery/DSC04397-1024x576.webp", alt: "Krystalicznie czysta woda i krajobraz Szlaku Jezior", category: "activities" }
];

export default function GaleriaPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [allImages, setAllImages] = useState<GalleryImage[]>(DEFAULT_IMAGES);
  const [virtualTourUrl, setVirtualTourUrl] = useState<string>("");

  // Synchronize with LocalStorage / CMS dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Custom gallery images from CMS
      const savedGallery = localStorage.getItem("cms_gallery");
      if (savedGallery) {
        try {
          const parsed: string[] = JSON.parse(savedGallery);
          const customImages: GalleryImage[] = parsed.map((src, i) => ({
            src,
            alt: `Zdjęcie z galerii ${i + 1}`,
            category: "yacht"
          }));
          
          // Merge avoiding duplicates
          const combined = [...DEFAULT_IMAGES];
          customImages.forEach(img => {
            if (!combined.some(item => item.src === img.src)) {
              combined.push(img);
            }
          });
          setAllImages(combined);
        } catch (e) {
          console.error("Error parsing cms_gallery", e);
        }
      }

      // 2. Virtual tour URL from CMS
      const savedTour = localStorage.getItem("virtual_tour_url");
      if (savedTour) {
        setVirtualTourUrl(savedTour);
      }
    }
  }, []);

  const filteredImages = allImages.filter(
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

  // Handle keyboard navigation
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
      <div className="container mx-auto px-4 max-w-7xl pt-2 pb-8 md:py-16">

        {/* Virtual 3D Tour Section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                  <Sparkles size={14} />
                  Spacer 360°
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Wirtualny spacer 3D po jachcie Stillo 31
                </h2>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                Obracaj się w promieniu 360 stopni i zwiedzaj kabiny, salon oraz pokład bez wychodzenia z domu.
              </p>
            </div>

            {virtualTourUrl ? (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-[21/9] border border-gray-200 dark:border-gray-700">
                <iframe 
                  src={virtualTourUrl} 
                  title="Wirtualny spacer 3D Stillo 31"
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : (
              <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-center aspect-video lg:aspect-[21/9] border border-gray-200 dark:border-gray-700 p-6 text-center group">
                <div className="absolute inset-0 bg-[url('/images/gallery/5S5A6954.webp')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col items-center max-w-xl space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600/80 backdrop-blur-md flex items-center justify-center text-white shadow-xl shadow-blue-500/30 animate-pulse">
                    <Play size={28} className="ml-1" />
                  </div>
                  <h3 className="text-2xl font-black">Interaktywne wnętrze Stillo 31</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Obejdź przestronny salon, 3 kabiny sypialne, łazienkę oraz pokład słoneczny. Wprowadź link do wirtualnego spaceru (np. Matterport / Kuula) w panelu admina, aby od razu wyświetlić interaktywną prezentację!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Filtry galerii">
          {(["all", "yacht", "interior", "activities"] as GalleryCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              }`}
            >
              {t("Gallery", cat)} ({allImages.filter(i => cat === "all" || i.category === cat).length})
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => handleOpenLightbox(idx)}
              className="relative h-64 rounded-3xl overflow-hidden shadow-md group hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all duration-300 bg-gray-200 dark:bg-gray-800 border border-gray-100 dark:border-gray-800"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="text-white font-bold text-xs leading-snug w-full">{img.alt}</span>
              </div>
              <div className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Maximize2 size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        {lightboxIndex !== null && (
          <div 
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Podgląd zdjęcia w pełnym rozmiarze"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center text-white p-4 max-w-7xl mx-auto w-full">
              <span className="text-xs font-bold tracking-widest uppercase bg-white/10 px-4 py-2 rounded-full">
                {lightboxIndex + 1} / {filteredImages.length}
              </span>
              <button 
                onClick={handleCloseLightbox}
                className="p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer text-white"
                aria-label={t("Gallery", "close")}
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image Area */}
            <div className="flex-grow flex items-center justify-center relative">
              <button 
                onClick={handlePrev}
                className="absolute left-2 md:left-8 z-10 p-4 rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer text-white"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft size={32} />
              </button>

              <div className="relative max-w-6xl max-h-[80vh] w-full h-full flex items-center justify-center p-2">
                <Image 
                  src={filteredImages[lightboxIndex].src} 
                  alt={filteredImages[lightboxIndex].alt} 
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>

              <button 
                onClick={handleNext}
                className="absolute right-2 md:right-8 z-10 p-4 rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer text-white"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center text-white pb-6 px-4">
              <p className="text-sm md:text-base font-semibold max-w-2xl mx-auto leading-relaxed bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                {filteredImages[lightboxIndex].alt}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

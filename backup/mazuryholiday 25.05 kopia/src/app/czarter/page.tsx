"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Anchor, LifeBuoy, MapPin, Wifi, ShieldCheck, Navigation, Star, Shield, Ship } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";
import ICalCalendar from "@/components/ICalCalendar";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { getAssetPath } from "@/utils/assetPath";

export default function CharterPage() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [galleryExpanded, setGalleryExpanded] = useState(false);
    const { t, language } = useLanguage();

    const galleryImages = [
        getAssetPath("/images/czarter/gallery/stillo_1.webp"),
        getAssetPath("/images/czarter/gallery/stillo_2.webp"),
        getAssetPath("/images/czarter/gallery/stillo_3.webp"),
        getAssetPath("/images/czarter/gallery/stillo_4.webp"),
        getAssetPath("/images/czarter/gallery/stillo_5.webp"),
        getAssetPath("/images/czarter/gallery/stillo_6.webp"),
        getAssetPath("/images/czarter/gallery/stillo_7.webp"),
        getAssetPath("/images/czarter/gallery/stillo_8.webp"),
        getAssetPath("/images/czarter/gallery/stillo_9.webp"),
        getAssetPath("/images/czarter/gallery/stillo_10.webp"),
        getAssetPath("/images/czarter/gallery/stillo_11.webp"),
        getAssetPath("/images/czarter/gallery/stillo_12.webp"),
        getAssetPath("/images/czarter/gallery/stillo_13.webp"),
        getAssetPath("/images/czarter/gallery/stillo_14.webp"),
        getAssetPath("/images/czarter/gallery/stillo_15.webp"),
        getAssetPath("/images/czarter/gallery/stillo_16.webp"),
        getAssetPath("/images/czarter/gallery/stillo_17.webp"),
        getAssetPath("/images/czarter/gallery/stillo_18.webp"),
        getAssetPath("/images/czarter/gallery/stillo_19.webp"),
        getAssetPath("/images/czarter/gallery/stillo_20.webp"),
        getAssetPath("/images/czarter/gallery/stillo_21.webp")
    ];

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const specs = [
        { label: t("charterPage", "specs.length"), value: "9.10 m" },
        { label: t("charterPage", "specs.width"), value: "3.25 m" },
        { label: t("charterPage", "specs.draft"), value: "0.50 m" },
        { label: t("charterPage", "specs.engine"), value: "Craftsman 52KM Diesel" },
        { label: t("charterPage", "specs.cabins"), value: "3" }, // simplified value to avoid complex translation or keep as "3 zamykane" if only PL matters for value format? Let's assume numeric is fine or keep PL. "3 zamykane" -> "3 lockable"? 
        // I will keep values as is for now or use simplified. "3 zamykane" is specific. 
        // Let's use value from translations if possible? No, values are hardcoded. 
        // I will keep "3 zamykane" string but maybe I should translate "zamykane"?
        // For now I will leave "3 zamykane" as "3" + t("charterPage", "specs.cabins") context? No.
        // Let's just use "3" to be safe. "3 zamykane" -> "3".
        { label: t("charterPage", "specs.crew"), value: "max 8" }
    ];

    // Safely access current language translations, falling back to English then Polish
    const getCurrentTranslations = () => {
        // @ts-expect-error - we know charterPage might not exist on all languages types yet
        return translations[language]?.charterPage || translations['en']?.charterPage || translations['pl'].charterPage;
    };

    const currentTrans = getCurrentTranslations();
    const equipment = currentTrans.equipmentList || [];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 pb-24 lg:pb-0">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 z-10" />
                <Image
                    src={getAssetPath("/images/czarter/gallery/stillo_1.webp")}
                    alt={t("charterPage", "heroTitle")}
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                <div className="relative z-20 text-center text-white p-4">
                    <div className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg mb-4">Port Stranda Giżycko, jezioro Kisajno</div>
                    <h1 className="text-4xl md:text-7xl font-sans mb-2">{t("charterPage", "heroTitle")}</h1>
                    <p className="text-xl md:text-3xl font-light">{t("charterPage", "heroSubtitle")}</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">

                    {/* Left Column: Description & Gallery (Span 2) */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl md:text-4xl font-sans mb-8 text-slate-900 dark:text-white">{t("charterPage", "mainTitle")}</h2>

                        <div className="prose prose-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t("charterPage", "desc1") }} />
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t("charterPage", "desc2") }} />
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t("charterPage", "desc3") }} />
                            <p dangerouslySetInnerHTML={{ __html: t("charterPage", "desc4") }} />
                        </div>

                        {/* Amenities Grid (Clean Cards) */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-sans mb-8 text-slate-900 dark:text-white">{t("charterPage", "vipAmenitiesTitle")}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                                    <div className="flex justify-center mb-2">
                                        <Ship className="w-8 h-8 text-slate-700 dark:text-slate-300 opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("charterPage", "navAndDriveTitle")}</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {t("charterPage", "navAndDriveDesc")}
                                    </p>
                                </div>

                                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                                    <div className="flex justify-center mb-2">
                                        <Star className="w-8 h-8 text-slate-700 dark:text-slate-300 opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("charterPage", "vipStandardTitle")}</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {t("charterPage", "vipStandardDesc")}
                                    </p>
                                </div>

                                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                                    <div className="flex justify-center mb-2">
                                        <Shield className="w-8 h-8 text-slate-700 dark:text-slate-300 opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("charterPage", "safetyTitle")}</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {t("charterPage", "safetyDesc")}
                                    </p>
                                </div>

                                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                                    <div className="flex justify-center mb-2">
                                        <Wifi className="w-8 h-8 text-slate-700 dark:text-slate-300 opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">Media</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Wydajne ogrzewanie oraz WiFi bez limitu zapewniające stałą łączność ze światem.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        {galleryImages.length > 0 && (
                            <div>
                                <h3 className="2xl font-sans mb-8 text-slate-900 dark:text-white">{t("charterPage", "galleryTitle")}</h3>

                                {/* First 3 images - always visible */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    {galleryImages.slice(0, 3).map((src, idx) => (
                                        <div
                                            key={idx}
                                            className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                                            onClick={() => openLightbox(idx)}
                                        >
                                            <Image
                                                src={src}
                                                alt={`Jacht Stillo 30 - zdjęcie ${idx + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                priority={idx === 0}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                        </div>
                                    ))}
                                </div>

                                {/* Remaining images - collapsible */}
                                {galleryImages.length > 3 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => setGalleryExpanded(!galleryExpanded)}
                                            className="w-full mb-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                                        >
                                            {galleryExpanded ? `▲ ${t("charterPage", "collapseGallery")}` : `▼ ${t("charterPage", "expandGallery")}`}
                                        </button>

                                        {galleryExpanded && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                                                {galleryImages.slice(3).map((src, idx) => (
                                                    <div
                                                        key={idx + 3}
                                                        className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                                                        onClick={() => openLightbox(idx + 3)}
                                                    >
                                                        <Image
                                                            src={src}
                                                            alt={`Jacht Stillo 30 - zdjęcie ${idx + 4}`}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sticky Specifications Block (Span 1) */}
                    <div className="lg:col-span-1 h-full relative">
                        <div className="sticky top-32 space-y-8">
                            {/* Main CTA Card */}
                            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden transform transition-all hover:scale-[1.02]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-bl-full -mr-10 -mt-10" />
                                <h3 className="text-2xl font-sans mb-2 relative z-10">{t("charterPage", "bookTermTitle")}</h3>
                                <p className="text-slate-300 mb-8 relative z-10 text-sm">
                                    {t("charterPage", "bookTermDesc")}
                                </p>
                                <div className="flex gap-2">
                                    <a
                                        href="https://engine37851.idobooking.com/index.php?ob[31]=&showOtherOffers=true&currency=0&language=0&from_own_button=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all mb-8 whitespace-nowrap uppercase tracking-wider shadow-lg hover:shadow-green-600/25 active:scale-95"
                                    >
                                        {t("charterPage", "bookBtn")}
                                    </a>
                                    <a
                                        href="tel:+48730067027"
                                        className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-all mb-8 shadow-lg active:scale-95"
                                        title={t("details", "callBtn")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </a>
                                </div>
                                <div className="mt-6">
                                    <ICalCalendar
                                        icalUrl="https://client37851.idosell.com/panel/offer/icalexport/itemid/31/key/da39a3ee5e6b4b0d3255bfef95601890afd80709"
                                        apartmentId="Stillo 30 VIP"
                                    />
                                </div>
                            </div>

                            {/* Technical Specs & Equipment */}
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                                    <Anchor className="text-amber-500" size={20} />
                                    {t("charterPage", "techSpecsTitle")}
                                </h4>
                                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
                                    {specs.map((spec, idx) => (
                                        <li key={idx} className="flex justify-between items-center">
                                            <span>{spec.label}</span>
                                            <span className="font-semibold text-slate-900 dark:text-white">{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                                    <LifeBuoy className="text-amber-500" size={20} />
                                    {t("charterPage", "equipmentTitle")}
                                </h4>
                                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                    {equipment.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-amber-500 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Floating Booking Button */}
            <div className="fixed bottom-0 left-0 right-0 p-3 pb-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[100] lg:hidden flex gap-4 border-t border-slate-200 dark:border-slate-800">
                <a
                    href="https://engine37851.idobooking.com/index.php?ob[31]=&showOtherOffers=true&currency=0&language=0&from_own_button=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider active:scale-95"
                >
                    {t("charterPage", "bookBtn")}
                </a>
            </div>

            {lightboxOpen && (
                <ImageLightbox
                    images={galleryImages}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                    altPrefix="Jacht Stillo 30"
                />
            )}

            <Footer />
        </main>
    );
}

"use client";

import Navbar from "@/components/Navbar";
import { getAssetPath } from "@/utils/assetPath";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import ICalCalendar from "@/components/ICalCalendar";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

export interface ApartmentTemplateData {
    id?: string;
    title: string;
    subtitle?: string;
    description: string;
    amenities: {
        living?: string[];
        kitchen?: string[];
        bedroom?: string[];
        bathroom?: string[];
        terrace?: string[];
        general?: string[];
    };
    mainImage: string;
    gallery: string[];
    idoBookingId?: string;
    icalUrl?: string;
    customBookingUrl?: string;
}

interface ApartmentDetailTemplateProps {
    data: ApartmentTemplateData;
    backUrl?: string;
    breadcrumbPath?: { name: string; url: string }[];
}

export default function ApartmentDetailTemplate({ data, backUrl, breadcrumbPath }: ApartmentDetailTemplateProps) {
    const { t } = useLanguage();
    const router = useRouter();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [galleryExpanded, setGalleryExpanded] = useState(false);




    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Apartament nie odnaleziony.</p>
            </div>
        );
    }

    const apartment = {
        title: data.title,
        description: data.description,
        mainImage: data.mainImage,
        gallery: data.gallery
    };

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 pb-24 lg:pb-0">
            <Navbar />

            {/* Hero / Header Image */}
            <section className="relative h-[60vh] w-full">
                <Image
                    src={apartment.mainImage}
                    alt={apartment.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        {data.subtitle && (
                            <div className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg mb-4">{data.subtitle}</div>
                        )}
                        <h1 className="text-5xl md:text-7xl font-sans mb-2">{apartment.title}</h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <button
                    onClick={() => backUrl ? router.push(backUrl) : router.back()}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>{t("details", "backToList") || "Powrót"}</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-sans mb-6 text-slate-900 dark:text-white">{t("details", "about")}</h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                                {apartment.description}
                            </p>
                        </div>

                        {/* Gallery */}
                        {apartment.gallery.length > 0 && (
                            <div>
                                <h2 className="text-3xl font-sans mb-6 text-slate-900 dark:text-white text-center md:text-left">{t("details", "gallery") || "Galeria"}</h2>

                                {/* First 3 images - always visible */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    {apartment.gallery.slice(0, 3).map((img: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                                            onClick={() => {
                                                setLightboxIndex(idx);
                                                setLightboxOpen(true);
                                            }}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${apartment.title} view ${idx + 1}`}
                                                fill
                                                quality={95}
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="eager"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Remaining images - collapsible */}
                                {apartment.gallery.length > 3 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => setGalleryExpanded(!galleryExpanded)}
                                            className="w-full mb-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                                        >
                                            {galleryExpanded ? `▲ ${t("details", "collapseGallery") || "Zwiń galerię"}` : `▼ ${t("details", "seeMorePhotos") || "Zobacz więcej zdjęć"}`}
                                        </button>

                                        {galleryExpanded && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                                                {apartment.gallery.slice(3).map((img: string, idx: number) => (
                                                    <div
                                                        key={idx + 3}
                                                        className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                                                        onClick={() => {
                                                            setLightboxIndex(idx + 3);
                                                            setLightboxOpen(true);
                                                        }}
                                                    >
                                                        <Image
                                                            src={img}
                                                            alt={`${apartment.title} view ${idx + 4}`}
                                                            fill
                                                            quality={95}
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            loading="lazy"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Amenities */}
                        <div className="space-y-12">
                            <h3 className="text-3xl font-sans mb-12 text-center text-slate-900 dark:text-white">{t("details", "amenities") || "Udogodnienia w apartamencie"}</h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Living Room */}
                                {data.amenities.living && data.amenities.living.length > 0 && (
                                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative w-8 h-8 mx-auto mb-2">
                                            <Image src={getAssetPath("/images/icons/SOFA.svg")} alt={t("details", "items.roomSalon") || "Salon"} fill className="object-contain dark:invert opacity-80" />
                                        </div>
                                        <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("details", "items.roomSalon") || "Salon"}</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {data.amenities.living.map((item: string) => t("amenityNames", item) || item).join(", ")}
                                        </p>
                                    </div>
                                )}

                                {/* Kitchen */}
                                {data.amenities.kitchen && data.amenities.kitchen.length > 0 && (
                                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative w-8 h-8 mx-auto mb-2">
                                            <Image src={getAssetPath("/images/icons/KITCHEN.svg")} alt={t("details", "items.roomKitchen") || "Kuchnia"} fill className="object-contain dark:invert opacity-80" />
                                        </div>
                                        <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("details", "items.roomKitchen") || "Kuchnia"}</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {data.amenities.kitchen.map((item: string) => t("amenityNames", item) || item).join(", ")}
                                        </p>
                                    </div>
                                )}

                                {/* Bedroom */}
                                {data.amenities.bedroom && data.amenities.bedroom.length > 0 && (
                                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative w-8 h-8 mx-auto mb-2">
                                            <Image src={getAssetPath("/images/icons/BED.svg")} alt={t("details", "items.roomBedroom") || "Sypialnia"} fill className="object-contain dark:invert opacity-80" />
                                        </div>
                                        <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("details", "items.roomBedroom") || "Sypialnia"}</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {data.amenities.bedroom.map((item: string) => t("amenityNames", item) || item).join(", ")}
                                        </p>
                                    </div>
                                )}

                                {/* Bathroom */}
                                {data.amenities.bathroom && data.amenities.bathroom.length > 0 && (
                                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative w-8 h-8 mx-auto mb-2">
                                            <Image src={getAssetPath("/images/icons/SHOWER.svg")} alt={t("details", "items.roomBathroom") || "Łazienka"} fill className="object-contain dark:invert opacity-80" />
                                        </div>
                                        <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("details", "items.roomBathroom") || "Łazienka"}</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {data.amenities.bathroom.map((item: string) => t("amenityNames", item) || item).join(", ")}
                                        </p>
                                    </div>
                                )}

                                {/* Terrace & General Combined */}
                                {( (data.amenities.terrace && data.amenities.terrace.length > 0) || (data.amenities.general && data.amenities.general.length > 0) ) && (
                                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-4 lg:col-span-4">
                                        <div className="relative w-8 h-8 mx-auto mb-2 flex justify-center gap-2">
                                            <Image src={getAssetPath("/images/icons/TERRACE.svg")} alt={t("details", "items.terraceAndOther") || "Taras i Pozostałe"} width={32} height={32} className="object-contain dark:invert opacity-80" />
                                        </div>
                                        <h4 className="text-base font-sans mb-1 text-slate-900 dark:text-white">{t("details", "items.terraceAndOther") || "Taras i Pozostałe"}</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {[...(data.amenities.terrace || []), ...(data.amenities.general || [])].map((item: string) => t("amenityNames", item) || item).join(", ")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />

                            <div className="mb-8">
                                <h3 className="text-2xl font-sans mb-2 relative z-10">{t("apartments", "bookingTitle") || "Zarezerwuj pobyt"}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    {t("apartments", "bookingDesc") || "Wybierz daty i sprawdź dostępność."}
                                </p>
                            </div>

                            <a
                                href={data.customBookingUrl || `https://engine37851.idobooking.com/index.php?ob[${data.idoBookingId || '1'}]=&showOtherOffers=true&currency=0&language=0&from_own_button=1`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full px-6 py-4 bg-[#00c853] hover:bg-[#00e676] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2"
                            >
                                {(t("apartments", "bookBtn") as string) || "ZAREZERWUJ GO"}
                            </a>

                            {/* Contact Box */}
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">
                                    {t("details", "needHelp") || "Potrzebujesz pomocy?"}
                                </p>
                                <a
                                    href="tel:+48730067027"
                                    className="flex items-center justify-center gap-3 px-6 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-medium rounded-xl transition-colors"
                                >
                                    +48 730 067 027
                                </a>
                            </div>

                            {data.icalUrl && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-sans mb-4 text-slate-900 dark:text-white">{t("details", "availability") || "Dostępność"}</h3>
                                    <ICalCalendar
                                        icalUrl={data.icalUrl}
                                        apartmentId={data.id || "1"}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* Mobile Floating Booking Button */}
            <div className="fixed bottom-0 left-0 right-0 p-3 pb-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[100] lg:hidden flex gap-4 border-t border-slate-200 dark:border-slate-800">
                <a
                    href={data.customBookingUrl || `https://engine37851.idobooking.com/index.php?ob[${data.idoBookingId || '1'}]=&showOtherOffers=true&currency=0&language=0&from_own_button=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center bg-[#00c853] hover:bg-[#00e676] text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg text-sm uppercase tracking-wider active:scale-95"
                >
                    {(t("apartments", "bookBtn") as string) || "ZAREZERWUJ GO"}
                </a>

            </div>

            {lightboxOpen && (
                <ImageLightbox
                    images={apartment.gallery}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                    altPrefix={apartment.title}
                />
            )}

            <Footer />
        </main>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Trees, Wifi, Wind, Car, Tv, MapPin, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { strandaApartments } from "@/data/stranda-apartments";
import { fuledaApartments } from "@/data/fuleda-data";
import { kisajnoData } from "@/data/kisajno-data";
import { skorupkiData } from "@/data/skorupki-data";
import { getAssetPath } from "@/utils/assetPath";

const lowestStrandaPrice = Math.min(...Object.values(strandaApartments).map((apartment) => apartment.price));
const lowestFuledaPrice = Math.min(...Object.values(fuledaApartments).map((apartment) => apartment.price));

export default function Apartments() {
    const { t } = useLanguage();



        const mainApartments = [
        {
            id: 1,
            title: t("apartments", "items.stranda.title") || "Apartamenty Stranda Residence",
            location: t("apartments", "items.stranda.location") || "Giżycko, jezioro Kisajno",
            image: getAssetPath("/images/stranda/stranda_main.webp"),
            link: "/apartamenty/stranda",
            icons: [
                <div key="wifi" title="WiFi" className="flex items-center justify-center"><Wifi size={18} /></div>,
                <div key="wind" title="Klimatyzacja" className="flex items-center justify-center"><Wind size={18} /></div>,
                <div key="waves" title="Jezioro" className="flex items-center justify-center"><Waves size={18} /></div>,
                <div key="car" title="Parking" className="flex items-center justify-center"><Car size={18} /></div>
            ]
        },
        {
            id: 2,
            title: t("apartments", "items.kisajno.title") || "Apartamenty Kisajno",
            location: t("apartments", "items.kisajno.location") || "Giżycko, jezioro Kisajno",
            image: getAssetPath("/images/kisajno/kisajno_1.webp"),
            link: "/apartamenty/kisajno",
            icons: [
                <div key="wifi" title="WiFi" className="flex items-center justify-center"><Wifi size={18} /></div>,
                <div key="waves" title="Jezioro" className="flex items-center justify-center"><Waves size={18} /></div>,
                <div key="tv" title="Smart TV" className="flex items-center justify-center"><Tv size={18} /></div>,
                <div key="car" title="Parking" className="flex items-center justify-center"><Car size={18} /></div>
            ]
        },
        {
            id: 3,
            title: t("apartments", "items.mikolajki.title") || "Apartament Mikołajki",
            location: t("apartments", "items.mikolajki.location") || "Mikołajki, jezioro Mikołajskie",
            image: getAssetPath("/images/mikolajki/mikolajki_1.webp"),
            link: "/apartamenty/mikolajki",
            icons: [
                <div key="wifi" title="WiFi" className="flex items-center justify-center"><Wifi size={18} /></div>,
                <div key="tv" title="Smart TV" className="flex items-center justify-center"><Tv size={18} /></div>,
                <div key="waves" title="Jezioro" className="flex items-center justify-center"><Waves size={18} /></div>,
                <div key="car" title="Parking" className="flex items-center justify-center"><Car size={18} /></div>
            ]
        },
        {
            id: 4,
            title: t("apartments", "items.fuleda.title") || "Apartamenty Fuleda",
            location: t("apartments", "items.fuleda.location") || "Fuleda, jezioro Dobskie",
            image: getAssetPath("/images/fuleda/pietro/Fuleda_pietro.webp"),
            link: "/apartamenty/fuleda",
            icons: [
                <div key="wifi" title="WiFi" className="flex items-center justify-center"><Wifi size={18} /></div>,
                <div key="trees" title="Las" className="flex items-center justify-center"><Trees size={18} /></div>,
                <div key="location" title="Lokalizacja" className="flex items-center justify-center"><MapPin size={18} /></div>,
                <div key="car" title="Parking" className="flex items-center justify-center"><Car size={18} /></div>
            ]
        }
    ];

    const additionalOffers = [
        {
            id: 5,
            title: t("apartments", "items.domkiSkorupki.title"),
            location: t("apartments", "items.domkiSkorupki.location"),
            description: t("apartments", "items.domkiSkorupki.description"),
            image: getAssetPath("/images/skorupki/skorupki_1.webp"),
            people: skorupkiData.guests,
            link: "/domki",
            icons: [
                <div key="wifi" title="WiFi" className="flex items-center justify-center"><Wifi size={18} /></div>,
                <div key="trees" title="Las" className="flex items-center justify-center"><Trees size={18} /></div>,
                <div key="car" title="Parking" className="flex items-center justify-center"><Car size={18} /></div>
            ]
        },
        {
            id: 6,
            title: t("apartments", "items.pokojeFuleda.title"),
            location: t("apartments", "items.pokojeFuleda.location"),
            description: t("apartments", "items.pokojeFuleda.description"),
            image: getAssetPath("/images/pokoje_fuleda/fuleda_pokoje_miniaturka.webp"),
            people: "4",
            link: "/pokoje/fuleda",
            icons: [
                <div key="wifi" title="WiFi" className="flex items-center justify-center"><Wifi size={18} /></div>,
                <div key="trees" title="Las" className="flex items-center justify-center"><Trees size={18} /></div>,
                <div key="car" title="Parking" className="flex items-center justify-center"><Car size={18} /></div>
            ]
        }
    ];

    return (
        <>
            {/* Section 1: Nasze Apartamenty (Overlay Style) */}
            <section id="apartamenty" className="pt-24 pb-12 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-sans text-slate-900 dark:text-white mb-4">
                            {t("apartments", "title")}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t("apartments", "description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mainApartments.map((apt) => (
                            <Link
                                key={apt.id}
                                href={apt.link}
                                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={apt.image}
                                    alt={apt.title}
                                    fill
                                    quality={95}
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                    {apt.location}
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full transform group-hover:translate-y-[-10px] transition-transform duration-300">
                                    <h1 className="text-2xl font-sans font-bold text-white mb-3 decoration-amber-500 group-hover:text-amber-400">
                                        {apt.title}
                                    </h1>
                                    <div className="flex gap-4 text-white/80 mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                                        {apt.icons.map((icon, index) => (
                                            <div key={index} className="bg-white/10 p-2 px-3 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                                {icon}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <span className="inline-block text-amber-500 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">
                                            {t("apartments", "details")} &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: Nasze domki i pokoje (Detailed Card Style) */}
            <section id="domki-pokoje" className="pt-12 pb-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-sans text-slate-900 dark:text-white mb-4">
                            {t("cottagesAndRooms", "title")}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t("cottagesAndRooms", "description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {additionalOffers.map((apt) => (
                            <Link
                                key={apt.id}
                                href={apt.link}
                                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={apt.image}
                                    alt={apt.title}
                                    fill
                                    quality={95}
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                    {apt.location}
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full transform group-hover:translate-y-[-10px] transition-transform duration-300">
                                    <h1 className="text-2xl font-sans font-bold text-white mb-3 decoration-amber-500 group-hover:text-amber-400">
                                        {apt.title}
                                    </h1>
                                    <div className="flex gap-4 text-white/80 mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                                        {apt.icons.map((icon, index) => (
                                            <div key={index} className="bg-white/10 p-2 px-3 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                                {icon}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <span className="inline-block text-amber-500 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">
                                            {t("apartments", "details")} &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}

"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { strandaApartments } from "@/data/stranda-apartments";
import { fuledaApartments } from "@/data/fuleda-data";
import { kisajnoData } from "@/data/kisajno-data";
import { mikolajkiData } from "@/data/mikolajki-data";

import { getAssetPath } from "@/utils/assetPath";
import { Users, Trees, Wifi, Wind, Car, Tv, Waves } from "lucide-react";

const lowestStrandaPrice = Math.min(...Object.values(strandaApartments).map((apartment) => apartment.price));
const lowestFuledaPrice = Math.min(...Object.values(fuledaApartments).map((apartment) => apartment.price));

export default function ApartmentsHub() {
    const { t } = useLanguage();

    const apartments = [
        {
            id: "stranda",
            title: t("apartments", "items.stranda.title"),
            image: getAssetPath("/images/stranda/C304/C304_1.webp"),
            link: "/apartamenty/stranda",
            location: t("apartments", "items.stranda.location"),
            price: `${lowestStrandaPrice} zł`,
            icons: [<Wifi key="wifi" size={18} />, <Wind key="wind" size={18} />, <Waves key="waves" size={18} />, <Car key="car" size={18} />]
        },
        {
            id: "kisajno",
            title: t("apartments", "items.kisajno.title"),
            image: getAssetPath("/images/kisajno/kisajno_1.webp"),
            link: "/apartamenty/kisajno",
            location: t("apartments", "items.kisajno.location"),
            price: `${kisajnoData.price} zł`,
            icons: [<Wifi key="wifi" size={18} />, <Waves key="waves" size={18} />, <Tv key="tv" size={18} />, <Car key="car" size={18} />]
        },
        {
            id: "mikolajki",
            title: t("apartments", "items.mikolajki.title"),
            image: getAssetPath("/images/mikolajki/hero.webp"),
            link: "/apartamenty/mikolajki",
            location: t("apartments", "items.mikolajki.location"),
            price: `${mikolajkiData.price} zł`,
            icons: [<Wifi key="wifi" size={18} />, <Tv key="tv" size={18} />, <Waves key="waves" size={18} />, <Car key="car" size={18} />]
        },
        {
            id: "fuleda",
            title: t("apartments", "items.fuleda.title"),
            image: getAssetPath("/images/fuleda/pietro/Fuleda_pietro.webp"),
            link: "/apartamenty/fuleda",
            location: t("apartments", "items.fuleda.location"),
            price: `${lowestFuledaPrice} zł`,
            icons: [<Wifi key="wifi" size={18} />, <Trees key="trees" size={18} />, <Waves key="waves" size={18} />, <Car key="car" size={18} />]
        },
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src={getAssetPath("/images/apartments_2.webp")}
                        alt="Apartamenty"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="relative z-20 text-center text-white p-4">
                    <div className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg mb-4">Mazury, Kraina Wielkich Jezior</div>
                    <h1 className="text-4xl md:text-7xl font-sans mb-2">{t("apartments", "title")}</h1>
                    <p className="text-xl md:text-3xl font-light">{t("apartments", "description")}</p>
                </div>
            </section>

            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {apartments.map((apt, index) => (
                        <motion.div
                            key={apt.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Link
                                href={apt.link}
                                className="group relative block h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={getAssetPath(apt.image)}
                                    alt={apt.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                    {apt.location}
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full transform group-hover:translate-y-[-10px] transition-transform duration-300">

                                    <h1 className="text-2xl font-sans font-bold text-amber-400 mb-4 group-hover:text-amber-300 transition-colors">
                                        {apt.title}
                                    </h1>
                                    <div className="flex gap-4 text-white/80 mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                                        {apt.icons.map((icon, index) => (
                                            <div key={index} className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20">
                                                {icon}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between w-full mt-auto">
                                        <span className="inline-block text-amber-500 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">
                                            {t("apartments", "details")} &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
            <Footer />
        </main>
    );
}

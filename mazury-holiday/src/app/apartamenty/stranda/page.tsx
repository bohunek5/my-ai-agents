"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";


// Define the type for an apartment unit
type Unit = {
    id: string;
    image: string;
};

// Update buildings data structure to include images
const buildings: Record<"A" | "B" | "C", Unit[]> = {
    A: [
        { id: "A103", image: "/images/apartments/A104k.jpg" }, // Clean high-res image
        { id: "A104", image: "/images/apartments/A104k.jpg" },
        { id: "A105", image: "/images/apartments/A104k.jpg" },
        { id: "A204", image: "/images/apartments/A104k.jpg" },
        { id: "A205", image: "/images/apartments/A104k.jpg" },
        { id: "A302", image: "/images/apartments/A104k.jpg" },
        { id: "A305", image: "/images/apartments/A104k.jpg" },
        { id: "A306", image: "/images/apartments/A104k.jpg" },
        { id: "A402", image: "/images/apartments/A104k.jpg" },
        { id: "A403", image: "/images/apartments/A104k.jpg" },
    ],
    B: [
        { id: "B102", image: "/images/apartments/A104k.jpg" },
        { id: "B106", image: "/images/apartments/A104k.jpg" },
        { id: "B201", image: "/images/apartments/A104k.jpg" },
        { id: "B202", image: "/images/apartments/A104k.jpg" },
        { id: "B304", image: "/images/apartments/A104k.jpg" },
        { id: "B305", image: "/images/apartments/A104k.jpg" },
        { id: "B401", image: "/images/apartments/A104k.jpg" },
        { id: "B402", image: "/images/apartments/A104k.jpg" },
        { id: "B404", image: "/images/apartments/A104k.jpg" },
    ],
    C: [
        { id: "C301", image: "/images/apartments/A104k.jpg" },
        { id: "C304", image: "/images/apartments/A104k.jpg" },
        { id: "C403", image: "/images/apartments/A104k.jpg" },
        { id: "C404", image: "/images/apartments/A104k.jpg" },
    ],
};

export default function StrandaPage() {
    const { t } = useLanguage();
    const [activeBuilding, setActiveBuilding] = useState<"A" | "B" | "C">("A");

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[url('/images/apartments_1.jpg')]"
                />
                <div className="relative z-20 text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-playfair mb-4">Stranda Residence</h1>
                    <p className="text-xl md:text-2xl font-light">{t("stranda", "subtitle")}</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {t("stranda", "description")}
                    </p>
                </div>

                {/* Building Tabs */}
                <div className="flex justify-center mb-12 space-x-4">
                    {(Object.keys(buildings) as Array<keyof typeof buildings>).map((building) => (
                        <button
                            key={building}
                            onClick={() => setActiveBuilding(building)}
                            className={clsx(
                                "px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 border-2",
                                activeBuilding === building
                                    ? "bg-amber-500 border-amber-500 text-white shadow-lg scale-105"
                                    : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-amber-400 hover:text-amber-500"
                            )}
                        >
                            {t("stranda", "building")} {building}
                        </button>
                    ))}
                </div>

                {/* Units Grid */}
                <motion.div
                    key={activeBuilding}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {buildings[activeBuilding].map((unit) => (
                        <Link href={`/apartamenty/stranda/${unit.id}`} key={unit.id} className="block group">
                            <div
                                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={unit.image}
                                        alt={`Apartament ${unit.id}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <div className="absolute bottom-3 left-4 text-white">
                                        <span className="text-xs uppercase tracking-widest opacity-80">{t("stranda", "apartment")}</span>
                                        <h3 className="text-xl font-bold font-playfair">{unit.id}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}

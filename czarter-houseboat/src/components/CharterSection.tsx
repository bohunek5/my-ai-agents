"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAssetPath } from "@/utils/assetPath";
import Image from "next/image";
import { Anchor, Navigation, Wifi, ShieldCheck, Ship } from "lucide-react";
import Link from "next/link";

export default function CharterSection() {
    const { t } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);

    // Parallax configuration
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section id="czarter" ref={ref} className="relative py-24 bg-slate-900 text-white overflow-hidden min-h-[800px]" >
            {/* Background Image Container with Parallax */}
            < motion.div
                style={{ y }}
                className="absolute -inset-[20%] z-0 opacity-20"
            >
                <Image
                    src={getAssetPath("/images/czarter/main.webp")}
                    alt="Charter background"
                    fill
                    className="object-cover"
                    quality={50}
                    priority={false}
                    sizes="100vw"
                />
            </motion.div >

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm mb-6 border border-amber-500/30">
                            {t("charter", "premiumFleet")}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6">
                            {t("charter", "title")}
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            {t("charter", "description")}
                        </p>

                        <ul className="space-y-6 mb-10 text-slate-300">
                            <li className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                                    <ShieldCheck size={24} className="text-amber-500" />
                                </div>
                                <span className="text-lg">{t("charter", "feature1") || "Bez patentu"}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                                    <Ship size={24} className="text-amber-500" />
                                </div>
                                <span className="text-lg">{t("charter", "thrusters") || "Stery strumieniowe (Dziób i Rufa)"}</span>
                            </li>
                             <li className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                                    <Wifi size={24} className="text-amber-500" />
                                </div>
                                <span className="text-lg">{t("charter", "heating") || "Ogrzewanie, WiFi bez limitu"}</span>
                            </li>
                        </ul>

                        <Link
                            href="/czarter"
                            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all shadow-lg shadow-amber-500/20"
                        >
                            {t("charter", "detailsBtn") || "SPRAWDŹ SZCZEGÓŁY"}
                        </Link>
                    </div>

                    <Link href="/czarter" className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group block">
                        <Image
                            src={getAssetPath("/images/czarter/main.webp")}
                            alt="Jacht motorowy Stillo 30"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                        <div className="absolute bottom-8 left-8">
                            <div className="flex items-center gap-2 text-amber-400 mb-2 font-medium">
                                <span className="text-2xl">⚓</span>
                                <span>{t("charter", "modelVip") || "Stillo 30 VIP"}</span>
                            </div>
                            <p className="text-white text-2xl font-sans">{t("charter", "boatType") || "Luksusowy Houseboat bez patentu"}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section >
    );
}

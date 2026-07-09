"use client";

import { useRef } from "react";
import { getAssetPath } from "@/utils/assetPath";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { Sparkles, Sun, BedDouble, Wifi, Gift, RefreshCw } from "lucide-react";

export default function LuxuryBenefits() {
    const { t } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);

    // Parallax configuration
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Move background slightly slower than scroll (parallax effect)
    // We map the scroll progress (0 to 1) to a translateY value
    // This replaces bg-fixed which causes jank on mobile
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={ref} className="relative py-32 overflow-hidden bg-slate-900 text-white min-h-[800px]">
            {/* Background Image Container with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute -inset-[20%] z-0"
            >
                <Image
                    src={getAssetPath("/images/DJI_0017_optimized.webp")}
                    alt="Luxury background"
                    fill
                    className="object-cover"
                    priority
                    quality={75}
                    sizes="100vw"
                />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900/90 z-0 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-amber-400 font-bold tracking-widest mb-4 uppercase">{t("luxuryBenefits", "tag")}</p>
                    <h2 className="text-4xl md:text-5xl font-sans mb-6">
                        {t("luxuryBenefits", "title")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Benefit 1 - Quality */}
                    <div className="bg-slate-900/90 md:bg-white/5 md:backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 text-amber-400">
                            <Sparkles size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-amber-400">{t("luxuryBenefits", "quality.title")}</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {t("luxuryBenefits", "quality.desc")}
                        </p>
                    </div>

                    {/* Benefit 2 - Views */}
                    <div className="bg-slate-900/90 md:bg-white/5 md:backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 text-amber-400">
                            <Sun size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-amber-400">{t("luxuryBenefits", "views.title")}</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {t("luxuryBenefits", "views.desc")}
                        </p>
                    </div>

                    {/* Benefit 3 - Comfort */}
                    <div className="bg-slate-900/90 md:bg-white/5 md:backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 text-amber-400">
                            <BedDouble size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-amber-400">{t("luxuryBenefits", "comfort.title")}</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {t("luxuryBenefits", "comfort.desc")}
                        </p>
                    </div>

                    {/* Benefit 4 - WiFi */}
                    <div className="bg-slate-900/90 md:bg-white/5 md:backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 text-amber-400">
                            <Wifi size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-amber-400">{t("luxuryBenefits", "wifi.title")}</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {t("luxuryBenefits", "wifi.desc")}
                        </p>
                    </div>

                    {/* Benefit 5 - Gifts */}
                    <div className="bg-slate-900/90 md:bg-white/5 md:backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 text-amber-400">
                            <Gift size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-amber-400">{t("luxuryBenefits", "gifts.title")}</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {t("luxuryBenefits", "gifts.desc")}
                        </p>
                    </div>

                    {/* Benefit 6 - Flexible */}
                    <div className="bg-slate-900/90 md:bg-white/5 md:backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 text-amber-400">
                            <RefreshCw size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-amber-400">{t("luxuryBenefits", "flexible.title")}</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {t("luxuryBenefits", "flexible.desc")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

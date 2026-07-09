"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { getAssetPath } from "@/utils/assetPath";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Home, Bed, Anchor } from "lucide-react";

export default function CategoryLinks() {
    const { t } = useLanguage();

    const categories = [
        {
            id: "apartments",
            title: t("categories", "apartments"),
            href: "/apartamenty",
            image: getAssetPath("/images/stranda/A103_images/A103 salonn.webp"),
            icon: <Building2 className="w-6 h-6" />,
        },
        {
            id: "cottages",
            title: t("categories", "cottages"),
            href: "/domki",
            image: getAssetPath("/images/skorupki/skorupki_1.webp"),
            icon: <Home className="w-6 h-6" />,
        },
        {
            id: "rooms",
            title: t("categories", "rooms"),
            href: "/pokoje",
            image: getAssetPath("/images/hero_bg.webp"),
            icon: <Bed className="w-6 h-6" />,
        },

        {
            id: "charter",
            title: t("categories", "charter"),
            href: "/czarter",
            image: getAssetPath("/images/czarter/main.webp"),
            icon: <Anchor className="w-6 h-6" />,
        },
    ];

    return (
        <section className="py-12 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={cat.href} className="group relative block h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                {/* Background Image with Overlay */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={cat.image}
                                        alt={cat.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-white text-center">
                                    <div className="mb-4 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-[360deg]">
                                        <div className="group-hover:text-white transition-colors duration-300">
                                            {cat.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-sans font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-amber-400">
                                        {cat.title}
                                    </h3>
                                    <div className="mt-3 w-12 h-1 bg-amber-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

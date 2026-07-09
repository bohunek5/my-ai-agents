"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { Trees, Waves, Wifi, Car } from "lucide-react";

import { getAssetPath } from "@/utils/assetPath";

export default function RoomsPage() {

    const { language, t } = useLanguage();

    const getForLang = (lang: string) => {
        // @ts-expect-error - key access
        return translations[lang]?.roomsPage || translations['en'].roomsPage || translations['pl'].roomsPage;
    }

    const trans = getForLang(language);

    // Fallback for items if missing in current lang
    const fuledaTrans = trans.items?.fuleda || translations['en'].roomsPage.items.fuleda;

    const rooms = [
        {
            id: "fuleda",
            title: fuledaTrans.title,
            description: fuledaTrans.description,
            image: getAssetPath("/images/pokoje_fuleda/fuleda_pokoje_miniaturka.webp"),
            link: "/pokoje/fuleda",
            location: "Fuleda, Jezioro Dobskie",
            icons: [
                <div key="wifi" title="WiFi" className="flex items-center justify-center"><Wifi size={18} /></div>,
                <div key="trees" title="Las" className="flex items-center justify-center"><Trees size={18} /></div>,
                <div key="waves" title="Jezioro" className="flex items-center justify-center"><Waves size={18} /></div>,
                <div key="car" title="Parking" className="flex items-center justify-center"><Car size={18} /></div>
            ],
            price: "od 375 zł/doba",
            features: fuledaTrans.features,
            priceLabel: fuledaTrans.priceLabel,
            detailsBtn: fuledaTrans.detailsBtn,
            bookBtn: fuledaTrans.bookBtn
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <Image
                    src={getAssetPath("/images/pokoje_fuleda/fuleda_pokoje_hero.webp")}
                    alt={trans.heroTitle}
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                <div className="relative z-20 text-center text-white p-4">
                    <div className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg mb-4">Fuleda, Jezioro Dobskie</div>
                    <h1 className="text-4xl md:text-7xl font-sans mb-2">{trans.heroTitle}</h1>
                    <p className="text-xl md:text-3xl font-light">{trans.heroSubtitle}</p>
                </div>
            </section>

            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="group relative block h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src={room.image}
                                    alt={room.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                
                                {/* Clickable area for the whole card */}
                                <Link href={room.link} className="absolute inset-0 z-10" />

                                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg z-20 pointer-events-none">
                                    {room.location}
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full transform group-hover:translate-y-[-10px] transition-transform duration-300 z-20 pointer-events-none">
                                    <h1 className="text-2xl font-sans font-bold text-amber-400 mb-4 group-hover:text-amber-300 transition-colors">
                                        {room.title}
                                    </h1>
                                    <div className="flex gap-4 text-white/80 mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                                        {room.icons.map((icon, index) => (
                                            <div key={index} className="bg-white/10 p-2 px-3 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                                {icon}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between w-full mt-auto pointer-events-auto">
                                        <span className="inline-block text-amber-500 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors pointer-events-none">
                                            {room.detailsBtn} &rarr;
                                        </span>
                                        <a 
                                            href="https://engine37851.idobooking.com/index.php?ob[28]=&showOtherOffers=true&currency=0&language=0&from_own_button=1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#00c853] hover:bg-[#00e676] text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg transition-colors relative z-30 pointer-events-auto uppercase tracking-wider active:scale-95"
                                        >
                                            {(t("apartments", "bookBtn") as string) || "ZAREZERWUJ GO"}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <p className="text-slate-600 dark:text-slate-400">
                        {trans.ctaText}{" "}
                        <Link href="/apartamenty/fuleda" className="text-amber-500 hover:text-amber-600 font-semibold">
                            {trans.ctaLink}
                        </Link>
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

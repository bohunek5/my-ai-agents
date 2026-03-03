"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    Sparkles, Home, Briefcase,
    CheckCircle2, Droplets, Trees, Waves,
    Building2, Ship, Warehouse, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

function OfertaContent() {
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const cat = searchParams.get("cat");
        if (cat) setActiveCategory(cat);
    }, [searchParams]);

    const categories = [
        { id: "all", label: "Wszystkie", icon: Sparkles },
        { id: "residential", label: "Dla Domu", icon: Home },
        { id: "business", label: "Dla Biznesu", icon: Briefcase },
        { id: "hotels", label: "Hotele", icon: Building2 },
        { id: "yachts", label: "Jachty", icon: Ship },
        { id: "industrial", label: "Hale", icon: Warehouse },
        { id: "special", label: "Specjalne", icon: Waves }
    ];

    const services = [
        // RESIDENTIAL
        {
            id: "dom",
            cat: "residential",
            title: "Sprzątanie Rezydencji",
            desc: "Kompleksowe czyszczenie powierzchni mieszkalnych z dbałością o każdy detal i luksusowe materiały.",
            icon: Home,
            features: ["Odkurzanie i mycie podłóg", "Dezynfekcja kuchni i łazienki", "Pielęgnacja antyków", "Prasowanie pościeli"],
            price: "od 200 zł",
            popular: true
        },
        {
            id: "okna",
            cat: "residential",
            title: "Krystaliczne Okna",
            desc: "Mycie witryn i okien bez smug, przy użyciu wody demineralizowanej dla dłuższego efektu.",
            icon: Droplets,
            features: ["Mycie ram i uszczelek", "Czyszczenie parapetów", "Polerowanie szyb", "Dostęp do trudnych miejsc"],
            price: "od 80 zł",
            popular: false
        },
        {
            id: "tapicerka",
            cat: "residential",
            title: "Pranie Tapicerki",
            desc: "Ekstrakcyjne pranie narożników, foteli i dywanów przy użyciu bezpiecznej chemii.",
            icon: Waves,
            features: ["Usuwanie plam i zapachów", "Zabijanie roztoczy", "Odświeżanie koloru", "Szybki czas schnięcia"],
            price: "od 120 zł",
            popular: false
        },

        // BUSINESS
        {
            id: "biuro",
            cat: "business",
            title: "Obsługa Korporacyjna",
            desc: "Regularny serwis porządkowy dla biur, który zwiększa efektywność Twojego zespołu.",
            icon: Briefcase,
            features: ["Opróżnianie koszy", "Czyszczenie sprzętu IT", "Utrzymanie części wspólnych", "Serwis kawowy"],
            price: "Wycena indywidualna",
            popular: true
        },

        // HOTELS
        {
            id: "hotel-maintenance",
            cat: "hotels",
            title: "Serwis Pokojowy",
            desc: "Profesjonalne przygotowanie pokoi hotelowych zgodnie z najwyższymi standardami 5*.",
            icon: Building2,
            features: ["Ścielenie łóżek", "Uzupełnianie mini-barów", "Serwis łazienkowy", "Detailing mebli"],
            price: "Umowa serwisowa",
            popular: true
        },

        // YACHTS
        {
            id: "yacht-inside",
            cat: "yachts",
            title: "Wnętrza Jachtów",
            desc: "Specjalistyczne sprzątanie kabin i mesy przy użyciu preparatów przeznaczonych do warunków morskich.",
            icon: Ship,
            features: ["Czyszczenie drewna mahoniowego", "Pielęgnacja skór", "Usuwanie soli", "Zabezpieczenie przed pleśnią"],
            price: "od 450 zł",
            popular: true
        },
        {
            id: "yacht-deck",
            cat: "yachts",
            title: "Czyszczenie Pokładu",
            desc: "Mycie pokładów z teaku, polerowanie gelcoatu i okuć ze stali nierdzewnej.",
            icon: Waves,
            features: ["Zabezpieczenie drewna", "Polerowanie chromów", "Mycie burt", "Przygotowanie do sezonu"],
            price: "+300 zł",
            popular: false
        },

        // INDUSTRIAL
        {
            id: "industrial-hall",
            cat: "industrial",
            title: "Hale Magazynowe",
            desc: "Maszynowe mycie dużych powierzchni płaskich oraz odpylanie wysokich konstrukcji.",
            icon: Warehouse,
            features: ["Zamiatanie mechaniczne", "Mycie podłóg epoksydowych", "Czyszczenie regałów", "Oznakowanie poziome"],
            price: "od 3 zł / m2",
            popular: true
        },
        {
            id: "hall-security",
            cat: "industrial",
            title: "Odpylanie Wysokie",
            desc: "Specjalistyczne prace wysokościowe przy użyciu podnośników koszowych.",
            icon: ShieldCheck,
            features: ["Czyszczenie konstrukcji dachu", "Mycie lamp", "Przegląd wentylacji", "Prace na wysokości"],
            price: "Wycena projektowa",
            popular: false
        },

        // SPECIAL
        {
            id: "deep",
            cat: "special",
            title: "Głęboka Odnowa",
            desc: "Zaawansowane sprzątanie po remontach lub sezonowe odświeżenie domu.",
            icon: Sparkles,
            features: ["Usuwanie pyłu pobudowlanego", "Czyszczenie wewnątrz szafek", "Odtłuszczanie", "Mycie kaloryferów"],
            price: "+200 zł",
            popular: true
        },
        {
            id: "ogrod",
            cat: "special",
            title: "Pielęgnacja Terenu",
            desc: "Zadbamy nie tylko o wnętrze, ale i o otoczenie Twojego domu lub biura.",
            icon: Trees,
            features: ["Koszenie trawnika", "Grabienie liści", "Mycie tarasu", "Odśnieżanie"],
            price: "od 150 zł",
            popular: false
        }
    ];

    const filteredServices = activeCategory === "all"
        ? services
        : services.filter(s => s.cat === activeCategory);

    return (
        <>
            <main className="px-4">
                <div className="max-w-7xl mx-auto text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-none">Katalog <br /><span className="text-teal-600">Usług.</span></h1>
                        <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium">Poznaj nasz szeroki wachlarz świadczeń, od codziennej pielęgnacji apartamentów po specjalistyczne czyszczenie jachtów i hal przemysłowych.</p>
                    </motion.div>
                </div>

                {/* Simplified Bubble Navigation */}
                <div className="sticky top-24 z-50 max-w-7xl mx-auto mb-20 px-4">
                    <div className="flex justify-center flex-wrap gap-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-2 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl w-fit mx-auto animate-shine">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`relative flex items-center gap-2 rounded-full px-6 py-3 font-black transition-all text-[10px] md:text-xs uppercase tracking-widest overflow-hidden group ${activeCategory === cat.id ? "text-white" : "text-slate-500 hover:text-teal-600"}`}
                            >
                                {activeCategory === cat.id && (
                                    <motion.div
                                        layoutId="activeBubble"
                                        className="absolute inset-0 bg-teal-600 shadow-xl shadow-teal-500/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <cat.icon size={16} className={`relative z-10 transition-transform group-hover:scale-110 ${activeCategory === cat.id ? "text-teal-200" : "text-teal-600"}`} />
                                <span className="relative z-10">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((u, i) => (
                            <motion.div
                                key={u.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <Card className="p-10 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[3rem] relative h-full flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    {u.popular && (
                                        <Badge className="absolute top-8 right-8 bg-amber-500 text-white border-0 font-black px-4 py-1.5 uppercase text-[10px] tracking-widest rounded-full shadow-lg shadow-amber-500/20">Polecane</Badge>
                                    )}
                                    <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-teal-500/5">
                                        <u.icon size={32} />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">{u.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed flex-grow text-lg">{u.desc}</p>
                                    <div className="space-y-4 mb-10">
                                        {u.features.map((f, fi) => (
                                            <div key={fi} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 font-black">
                                                <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 size={12} className="text-teal-600" />
                                                </div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Inwestycja</span>
                                            <span className="text-2xl font-black text-slate-900 dark:text-teal-400 leading-none">{u.price}</span>
                                        </div>
                                        <Link href="/#booking">
                                            <Button className="rounded-full bg-slate-900 dark:bg-white dark:text-black hover:scale-105 transition-all px-8 h-12 font-black shadow-xl">
                                                Rezerwuj
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}

export default function OfertaPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pt-32 pb-20">
            <Suspense fallback={<div className="flex items-center justify-center h-screen"><Sparkles className="animate-spin text-teal-600" /></div>}>
                <OfertaContent />
            </Suspense>
        </div>
    );
}


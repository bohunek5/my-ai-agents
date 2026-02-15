"use client";

import React, { useState } from "react";
import {
    Sparkles, Home, Briefcase,
    CheckCircle2, Droplets, Trees, Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function OfertaPage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", label: "Wszystkie" },
        { id: "residential", label: "Dla Domu" },
        { id: "business", label: "Dla Biznesu" },
        { id: "special", label: "Specjalistyczne" }
    ];

    const services = [
        {
            id: "dom",
            cat: "residential",
            title: "Sprzątanie Rezydencji",
            desc: "Kompleksowe czyszczenie powierzchni mieszkalnych z dbałością o każdy detal i luksusowe materiały.",
            icon: Home,
            features: ["Odkurzanie i mycie podłóg", "Dezynfekcja kuchni i łazienki", "Pielęgnacja antyków i drewna", "Prasowanie i wymiana pościeli"],
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
            id: "biuro",
            cat: "business",
            title: "Czysty Biznes",
            desc: "Regularny serwis porządkowy dla biur, który zwiększa efektywność i komfort pracy Twojego zespołu.",
            icon: Briefcase,
            features: ["Opróżnianie koszy i segregacja", "Czyszczenie sprzętu IT", "Utrzymanie części wspólnych", "Serwis kawowy i cateringowy"],
            price: "Wycena indywidualna",
            popular: false
        },
        {
            id: "deep",
            cat: "special",
            title: "Głęboka Odnowa",
            desc: "Zaawansowane sprzątanie po remontach, przeprowadzkach lub sezonowe odświeżenie domu.",
            icon: Sparkles,
            features: ["Usuwanie pyłu pobudowlanego", "Czyszczenie szafek wewnątrz", "Odtłuszczanie okapów", "Mycie kaloryferów"],
            price: "+200 zł",
            popular: true
        },
        {
            id: "ogrod",
            cat: "special",
            title: "Pielęgnacja Terenu",
            desc: "Zadbamy nie tylko o wnętrze, ale i o otoczenie Twojego domu lub biura.",
            icon: Trees,
            features: ["Koszenie trawnika", "Grabienie liści", "Mycie tarasu i podjazdu", "Odśnieżanie zimą"],
            price: "od 150 zł",
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
        }
    ];

    const filteredServices = activeCategory === "all"
        ? services
        : services.filter(s => s.cat === activeCategory);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pt-32 pb-20">
            <main className="px-4">
                <div className="max-w-7xl mx-auto text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-none">Katalog <br /><span className="text-teal-600">Usług.</span></h1>
                        <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Poznaj nasz szeroki wachlarz świadczeń, od codziennej pielęgnacji po zadania specjalne.</p>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="max-w-7xl mx-auto mb-20 flex justify-center flex-wrap gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`rounded-full px-8 py-3 font-black transition-all text-sm uppercase tracking-widest ${activeCategory === cat.id ? "bg-teal-600 text-white shadow-2xl shadow-teal-500/40" : "bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-teal-500"}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredServices.map((u, i) => (
                        <motion.div
                            key={u.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-10 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[3rem] relative h-full flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                {u.popular && (
                                    <Badge className="absolute top-8 right-8 bg-amber-500 text-white border-0 font-black px-4 py-1.5 uppercase text-[10px] tracking-widest rounded-full shadow-lg shadow-amber-500/20">Polecane</Badge>
                                )}
                                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
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
                </div>
            </main>
        </div>
    );
}

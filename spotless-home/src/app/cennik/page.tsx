"use client";

import React from "react";
import {
    Check, Sparkles, Building2,
    Home, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function CennikPage() {
    const plans = [
        {
            name: "Standard",
            price: "199",
            desc: "Idealne dla małych mieszkań i regularnego odświeżania.",
            icon: Home,
            features: [
                "Odkurzanie i mycie podłóg",
                "Czyszczenie łazienki i WC",
                "Dezynfekcja kuchni",
                "Ścieranie kurzy z mebli",
                "Wyrzucanie śmieci"
            ],
            popular: false
        },
        {
            name: "Premium",
            price: "349",
            desc: "Dla wymagających domów i większych rodzin.",
            icon: Sparkles,
            features: [
                "Wszystko z pakietu Standard",
                "Mycie okien i ram",
                "Czyszczenie piekarnika",
                "Pielęgnacja detali i biżuterii",
                "Prasowanie (do 5 szt.)"
            ],
            popular: true
        },
        {
            name: "Biznes",
            price: "Wycena",
            desc: "Rozwiązania skrojone pod potrzeby Twojego biura.",
            icon: Building2,
            features: [
                "Regularny serwis dzienny/nocny",
                "Utrzymanie części wspólnych",
                "Serwis sanitarny i kawowy",
                "Opieka nad roślinami",
                "Faktura VAT 23%"
            ],
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pt-32 pb-20">
            <main className="px-4">
                <div className="max-w-7xl mx-auto text-center mb-24 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-none">Ceny i <br /><span className="text-teal-600">Pakiety.</span></h1>
                        <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">Przejrzyste zasady, żadnych ukrytych kosztów. Wybierz rozwiązanie odpowiednie dla Twoich potrzeb.</p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                    {plans.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={`p-12 rounded-[4rem] border-slate-100 dark:border-slate-800 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white dark:bg-slate-900 ${p.popular ? 'ring-8 ring-teal-500/10' : ''}`}>
                                {p.popular && (
                                    <div className="absolute top-0 right-0 bg-teal-500 text-white px-8 py-3 rounded-bl-[2.5rem] font-black text-[12px] uppercase tracking-widest shadow-xl">Najczęściej Wybierany</div>
                                )}

                                <div className="mb-10">
                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 ${p.popular ? 'bg-teal-500 text-white' : 'bg-teal-50 dark:bg-teal-900/40 text-teal-600'}`}>
                                        <p.icon size={32} />
                                    </div>
                                    <h3 className="text-3xl font-black mb-4 tracking-tight leading-none">{p.name}</h3>
                                    <p className="text-lg font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                                </div>

                                <div className="mb-12">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl font-black tracking-tighter">{p.price}</span>
                                        <span className="text-2xl font-black opacity-40 text-slate-500 uppercase tracking-widest">{p.price === 'Wycena' ? '' : 'zł'}</span>
                                    </div>
                                </div>

                                <ul className="space-y-5 mb-12 flex-grow">
                                    {p.features.map((f, fi) => (
                                        <li key={fi} className="flex items-center gap-4 text-base font-black text-slate-700 dark:text-slate-300">
                                            <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center shrink-0">
                                                <Check size={14} className="text-teal-600" />
                                            </div>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/#booking" className="w-full">
                                    <Button className={`w-full h-16 rounded-full font-black text-xl transition-all shadow-xl ${p.popular ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-500/20' : 'bg-slate-900 dark:bg-white dark:text-black hover:scale-105'}`}>
                                        Wybierz Pakiet <ArrowRight className="ml-2 w-6 h-6" />
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto bg-slate-100 dark:bg-slate-900/50 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-16 relative z-10">
                        <div className="max-w-xl text-center lg:text-left">
                            <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Potrzebujesz <span className="text-teal-600">czegoś więcej?</span></h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xl font-bold leading-relaxed">Możesz dowolnie personalizować każdą usługę, dodając opcje specjalne do swojej rezerwacji.</p>
                        </div>
                        <Badge className="px-8 py-3 rounded-full font-black bg-teal-600 text-white border-0 text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20">Konfiguracja Szyta na Miarę</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 font-black">
                        {[
                            { n: "Piekarnik", p: "+80 zł" },
                            { n: "Lodówka", p: "+60 zł" },
                            { n: "Wnętrza Szafek", p: "+100 zł" },
                            { n: "Prasowanie", p: "+50 zł/h" },
                            { n: "Mycie Okien", p: "+150 zł" },
                            { n: "Sierść Zwierząt", p: "+50 zł" },
                            { n: "Balkon/Taras", p: "+120 zł" },
                            { n: "Kwiaty", p: "+30 zł" }
                        ].map((ex, i) => (
                            <div key={i} className="flex justify-between items-center p-6 bg-white dark:bg-slate-900 rounded-3xl group hover:scale-105 transition-all duration-300 shadow-sm border border-slate-50 dark:border-slate-800">
                                <span className="text-lg text-slate-800 dark:text-slate-200">{ex.n}</span>
                                <span className="text-teal-600 text-lg uppercase tracking-wider">{ex.p}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

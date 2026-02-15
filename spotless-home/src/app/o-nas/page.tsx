"use client";

import Image from "next/image";
import {
    Sparkles, ShieldCheck,
    Leaf, Award
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function ONasPage() {
    const stats = [
        { label: "Lat Doświadczenia", val: "8+" },
        { label: "Pracowników", val: "180+" },
        { label: "Zadowolonych Klientów", val: "12,000+" },
        { label: "Miejscowości na Mazurach", val: "15" }
    ];

    const values = [
        { title: "Najwyższa Jakość", icon: Award, desc: "Nie uznajemy kompromisów. Każda usługa musi być wykonana perfekcyjnie." },
        { title: "Pełne Zaufanie", icon: ShieldCheck, desc: "Nasi pracownicy przechodzą rygorystyczną weryfikację i szkolenia." },
        { title: "Zrównoważony Rozwój", icon: Leaf, desc: "Dbamy o środowisko, używając biodegradowalnych środków czystości." }
    ];

    const faqs = [
        { q: "Jak weryfikujecie swoich pracowników?", a: "Każdy kandydat przechodzi 3-etapowy proces rekrutacji: weryfikację dokumentów (w tym zaświadczenie o niekaralności), test umiejętności praktycznych oraz rozmowę z psychologiem." },
        { q: "Skąd pomysł na CzystyDom?", a: "Firma powstała z potrzeby stworzenia usługi premium, która łączy tradycyjną rzetelność z nowoczesną technologią rezerwacji i płatności online." },
        { q: "Czy szkolenie pracowników jest stałym elementem?", a: "Tak, nasi specjaliści co kwartał przechodzą szkolenia z zakresu nowych technik sprzątania oraz obsługi luksusowych materiałów wykończeniowych." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pt-32 pb-20">
            <main className="px-4">
                {/* Story Section */}
                <section className="max-w-7xl mx-auto mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge className="mb-6 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-2 border-0 uppercase tracking-widest text-[10px] font-black shadow-lg shadow-teal-500/20">Nasza Historia</Badge>
                            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.9] mb-8">
                                Więcej niż <br /><span className="text-teal-600">Sprzątanie.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-10">
                                Zaczęliśmy w 2018 roku jako mały zespół pasjonatów z jedną wizją: odmienić sposób, w jaki ludzie myślą o usługach domowych. Dziś CzystyDom to lider nowoczesnego sprzątania na Mazurach.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="rounded-full px-10 h-16 font-black text-lg bg-slate-900 dark:bg-white dark:text-black hover:scale-105 transition-all">Dołącz do nas</Button>
                                <Button variant="outline" className="rounded-full px-10 h-16 font-black text-lg border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">Poznaj zespół</Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-[4rem] overflow-hidden shadow-2xl relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800"
                                    alt="Usługi Sprzątające"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/60 to-transparent mix-blend-multiply opacity-40"></div>
                            </div>
                            {/* Decorative badge */}
                            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 hidden md:block">
                                <p className="text-4xl font-black text-teal-600">12K+</p>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Projektów</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-32">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none font-black">
                            <p className="text-5xl text-slate-900 dark:text-white mb-2 tracking-tighter">{s.val}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
                        </div>
                    ))}
                </section>

                {/* Values */}
                <section className="max-w-7xl mx-auto mb-32">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">Nasze Wartości</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-bold">Fundamenty, na których budujemy zaufanie tysięcy klientów.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {values.map((v, i) => (
                            <Card key={i} className="p-12 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[3.5rem] hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl">
                                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <v.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">{v.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed text-lg">{v.desc}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* About FAQ */}
                <section className="max-w-4xl mx-auto mb-20">
                    <div className="flex flex-col items-center gap-6 mb-16">
                        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center text-teal-600 mb-2">
                            <Sparkles size={32} />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight text-center">Transparentność <br />i Wiedza.</h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-6">
                        {faqs.map((f, i) => (
                            <AccordionItem key={i} value={`about-faq-${i}`} className="border-b-0">
                                <AccordionTrigger className="text-xl font-black text-slate-900 dark:text-slate-100 py-8 px-10 bg-white dark:bg-slate-900 rounded-[2rem] hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left border border-slate-100 dark:border-slate-800 shadow-sm [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-transparent">
                                    {f.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-500 dark:text-slate-400 font-bold px-10 pt-4 pb-10 leading-relaxed text-lg bg-white dark:bg-slate-900 rounded-b-[2rem] border border-t-0 border-slate-100 dark:border-slate-800">
                                    {f.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            </main>
        </div>
    );
}

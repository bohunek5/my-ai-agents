"use client";

import React, { useState } from "react";
import {
    MapPin, Phone, Mail, Send,
    HelpCircle, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function KontaktPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const faqs = [
        { q: "Jak szybko otrzymam odpowiedź?", a: "Odpowiadamy na wszystkie wiadomości w ciągu maksymalnie 2 godzin w godzinach pracy biura (8:00 - 18:00)." },
        { q: "Czy mogę zarezerwować termin przez telefon?", a: "Oczywiście! Nasza infolinia jest dostępna od poniedziałku do piątku w godzinach 9:00 - 17:00." },
        { q: "Czy obsługujecie klientów poza Warszawą?", a: "Obecnie działamy głównie w aglomeracji warszawskiej, krakowskiej i trójmiejskiej. Zapytaj o dojazd w inne miejsca!" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pt-32 pb-20">
            <main className="px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-8"
                        >
                            Skontaktuj <br /><span className="text-teal-600">się z Nami.</span>
                        </motion.h1>
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-bold leading-relaxed">Jesteśmy tutaj, aby odpowiedzieć na Twoje pytania i pomóc w doborze idealnej usługi.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                        <div className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="p-10 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[3rem] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                    <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-600 group-hover:text-white transition-all">
                                        <Phone size={32} />
                                    </div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Zadzwoń</h4>
                                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">+48 500 600 700</p>
                                </Card>
                                <Card className="p-10 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[3rem] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Mail size={32} />
                                    </div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Napisz</h4>
                                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">biuro@spotless.pl</p>
                                </Card>
                            </div>

                            <Card className="p-10 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[3.5rem] flex items-center gap-10 hover:shadow-2xl transition-all duration-300">
                                <div className="w-20 h-20 bg-slate-900 dark:bg-slate-800 text-white rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-xl shadow-slate-900/20">
                                    <MapPin size={40} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Nasza Siedziba</h4>
                                    <p className="text-2xl font-black text-slate-900 dark:text-slate-100 leading-none">Warszawa, ul. Marszałkowska 10</p>
                                </div>
                            </Card>

                            <Card className="h-[400px] overflow-hidden rounded-[4rem] border-0 relative group shadow-2xl">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39023.23841195221!2d20.975416629988224!3d52.22920257922247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc66a237f397%3A0xf69389178bb3b242!2zV2Fyc3phd2E!5e0!3m2!1spl!2spl!4v1620000000000!5m2!1spl!2spl"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Spotless Map"
                                    className="grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                ></iframe>
                            </Card>
                        </div>

                        <Card className="p-12 md:p-16 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
                            {!submitted ? (
                                <form className="space-y-10" onSubmit={handleSubmit}>
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Formularz <br />Kontaktu</h2>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">Uzupełnij pola poniżej, a my zajmiemy się resztą.</p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">Imię i Nazwisko</label>
                                            <Input placeholder="Jan Kowalski" className="h-16 rounded-[1.5rem] border-slate-100 dark:border-slate-800 dark:bg-slate-950 px-8 font-black text-lg focus:ring-4 focus:ring-teal-500/10 transition-all" required />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">Twój Adres E-mail</label>
                                            <Input placeholder="jan@kowalski.pl" className="h-16 rounded-[1.5rem] border-slate-100 dark:border-slate-800 dark:bg-slate-950 px-8 font-black text-lg focus:ring-4 focus:ring-teal-500/10 transition-all" required />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">Wiadomość</label>
                                            <textarea
                                                className="w-full min-h-[180px] p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 dark:bg-slate-950 px-8 font-black text-lg focus:ring-4 focus:ring-teal-500/10 focus:outline-none transition-all dark:text-white placeholder:text-slate-500"
                                                placeholder="W czym możemy Ci pomóc?"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full h-20 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-black text-xl shadow-2xl shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-95 border-0">
                                        Wyślij Wiadomość <Send className="ml-3 w-6 h-6" />
                                    </Button>
                                </form>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                                    <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-teal-500/40 animate-bounce">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-none">Wiadomość <br />Wysłana!</h2>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-sm mx-auto">Dziękujemy. Nasz zespół skontaktuje się z Tobą w ciągu 2 godzin.</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="rounded-full px-10 h-14 font-black text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                                        onClick={() => setSubmitted(false)}
                                    >
                                        Wyślij kolejną
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="flex flex-col items-center gap-6 mb-16">
                            <div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 text-white rounded-[1.2rem] flex items-center justify-center shadow-xl">
                                <HelpCircle size={32} />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight text-center leading-none">Częste <br />Pytania.</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-6">
                            {faqs.map((f, i) => (
                                <AccordionItem key={i} value={`faq-${i}`} className="border-b-0">
                                    <AccordionTrigger className="text-xl font-black text-slate-900 dark:text-slate-100 py-8 px-10 bg-white dark:bg-slate-900 rounded-[2rem] hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left border border-slate-100 dark:border-slate-800 shadow-sm [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-transparent">
                                        {f.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-500 dark:text-slate-400 font-bold px-10 pt-4 pb-10 leading-relaxed text-lg bg-white dark:bg-slate-900 rounded-b-[2rem] border border-t-0 border-slate-100 dark:border-slate-800">
                                        {f.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </main>
        </div>
    );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, HelpCircle, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAssetPath } from "@/utils/assetPath";

const faqs = [
    {
        question: "W jakich godzinach odbywa się zameldowanie i wymeldowanie?",
        answer: "Zameldowanie możliwe jest od godziny 16:00, natomiast wymeldowanie prosimy sfinalizować do godziny 10:00. Pozwala nam to na przygotowanie obiektu w najwyższym standardzie dla kolejnych gości."
    },
    {
        question: "Czy akceptujecie Państwo zwierzęta?",
        answer: "Tak, jesteśmy obiektem przyjaznym zwierzętom! Prosimy jedynie o wcześniejszą informację przy rezerwacji. Obowiązuje jednorazowa opłata za sprzątanie po pupilu."
    },
    {
        question: "Czy na terenie obiektu dostępny jest parking?",
        answer: "Tak, dla każdego domku i apartamentu przewidziane jest bezpłatne miejsce parkingowe na terenie ogrodzonej posesji."
    },
    {
        question: "Jak daleko jest do najbliższego jeziora?",
        answer: "Nasze obiekty są położone w bezpośrednim sąsiedztwie jezior. Domek nr 10 posiada własny pomost, a pozostałe domki znajdują się zaledwie 50-100 metrów od linii brzegowej."
    },
    {
        question: "Czy domki są ogrzewane?",
        answer: "Tak, wszystkie nasze domki są całoroczne i posiadają wydajne ogrzewanie (elektryczne lub kominkowe w zależności od modelu), co zapewnia komfort nawet w chłodniejsze dni."
    },
    {
        question: "Czy w domkach jest dostęp do Wi-Fi?",
        answer: "Tak, oferujemy bezpłatny, szerokopasmowy dostęp do internetu Wi-Fi we wszystkich naszych obiektach."
    }
];

export default function FAQPage() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section - Matched with Contact style */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getAssetPath('/images/apartments_2.webp')}')` }}
                />
                <div className="relative z-20 text-center text-white p-4">
                    <div className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg mb-4 animate-fade-in">Mazury Holiday</div>
                    <h1 className="text-4xl md:text-7xl font-sans mb-4 animate-fade-in-up">FAQ</h1>
                    <p className="text-xl md:text-3xl font-light animate-fade-in-up delay-100">Najczęściej zadawane pytania</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10"></div>
            </section>

            <section className="py-24 px-4 relative z-20 -mt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none p-8 md:p-12 border border-white dark:border-slate-800">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <HelpCircle className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-sans font-bold text-slate-900 dark:text-white">Centrum pomocy</h2>
                                <p className="text-slate-500 dark:text-slate-400">Znajdź odpowiedzi na swoje pytania</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div 
                                    key={index}
                                    className={`group rounded-2xl border transition-all duration-500 ${
                                        openIndex === index 
                                        ? "border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/5 shadow-md" 
                                        : "border-slate-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-800 bg-white dark:bg-slate-900 shadow-sm"
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full px-6 py-6 flex items-center justify-between text-left"
                                    >
                                        <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${openIndex === index ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-amber-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>
                                    <div 
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                            openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="px-6 pb-8 pt-0 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                            <div className="h-px w-full bg-gradient-to-r from-amber-500/20 via-slate-200 dark:via-slate-800 to-transparent mb-6"></div>
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Premium Contact Section */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-sans font-bold mb-4">Potrzebujesz więcej informacji?</h3>
                                <p className="text-slate-400 mb-8 text-lg">Zadzwoń do nas, chętnie odpowiemy na każde pytanie i pomożemy w rezerwacji.</p>
                                <a 
                                    href="tel:+48730067027" 
                                    className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-amber-500/20 group"
                                >
                                    <Phone size={20} />
                                    <span>+48 730 067 027</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-xl border border-slate-100 dark:border-slate-800">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-sans font-bold mb-4 text-slate-900 dark:text-white">Napisz do nas</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">Wolisz kontakt mailowy? Skorzystaj z naszego formularza kontaktowego.</p>
                                <a 
                                    href="/kontakt" 
                                    className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold transition-all shadow-xl group"
                                >
                                    <MessageSquare size={20} />
                                    <span>Przejdź do kontaktu</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

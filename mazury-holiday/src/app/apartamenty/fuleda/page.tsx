"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FuledaPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[url('/images/hero_bg.jpg')]"
                />
                <div className="relative z-20 text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-playfair mb-4">Apartamenty i Pokoje Fuleda</h1>
                    <p className="text-xl md:text-2xl font-light">Cisza, spokój, natura</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
                <div className="prose dark:prose-invert max-w-none text-center">
                    <h2 className="text-3xl font-playfair mb-6 text-slate-900 dark:text-white">Ucieczka od cywilizacji</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                        Fuleda to miejsce wyjątkowe na mapie Mazur. Położone na półwyspie, z dala od miejskiego zgiełku,
                        oferuje prawdziwy kontakt z naturą. Nasze apartamenty i pokoje w Fuledzie to oaza spokoju,
                        gdzie budzi Cię śpiew ptaków i szum jeziora.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-4 text-emerald-600">Lokalizacja</h3>
                            <p>Fuleda 5<br />11-500 Fuleda</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-4 text-emerald-600">Atrakcje</h3>
                            <ul className="text-left list-disc list-inside space-y-2">
                                <li>Prywatna plaża</li>
                                <li>Ognisko i grill</li>
                                <li>Historyczna osada</li>
                                <li>Las i ścieżki rowerowe</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

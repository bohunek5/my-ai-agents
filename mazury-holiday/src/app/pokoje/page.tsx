"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RoomsPage() {
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
                    <h1 className="text-4xl md:text-6xl font-playfair mb-4">Pokoje Fuleda</h1>
                    <p className="text-xl md:text-2xl font-light">Komfortowe pokoje w sercu Mazur</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
                <div className="prose dark:prose-invert max-w-none text-center">
                    <h2 className="text-3xl font-playfair mb-6 text-slate-900 dark:text-white">Wypoczynek blisko natury</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
                        Nasze pokoje w Fuledzie to doskonała alternatywa dla osób szukających kameralnej atmosfery.
                        Każdy pokój wyposażony jest w wygodne łóżka, łazienkę oraz dostęp do wspólnej kuchni i ogrodu.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-4 text-emerald-600">Standard</h3>
                            <ul className="text-left list-disc list-inside space-y-2">
                                <li>Pokoje 2, 3 i 4-osobowe</li>
                                <li>Prywatna łazienka</li>
                                <li>Widok na ogród lub jezioro</li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-4 text-emerald-600">Okolica</h3>
                            <p>Pokoje znajdują się w tym samym kompleksie co Apartamenty Fuleda, oferując dostęp do tych samych atrakcji: plaży, ogniska i lasu.</p>
                        </div>
                    </div>

                    <Link href="/apartamenty/fuleda" className="inline-block px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors">
                        Zobacz Apartamenty Fuleda
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

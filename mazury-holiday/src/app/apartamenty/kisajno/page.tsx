"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KisajnoPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[url('/images/apartments_2.jpg')]"
                />
                <div className="relative z-20 text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-playfair mb-4">Apartamenty Kisajno</h1>
                    <p className="text-xl md:text-2xl font-light">Port Neptun, Giżycko</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
                <div className="prose dark:prose-invert max-w-none text-center">
                    <h2 className="text-3xl font-playfair mb-6 text-slate-900 dark:text-white">Wypoczynek w Porcie Neptun</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                        Nasze apartamenty w lokalizacji Kisajno to idealna propozycja dla osób ceniących bliskość wody i żeglarskiego klimatu.
                        Położone w malowniczym Porcie Neptun, oferują bezpośredni dostęp do jeziora Kisajno oraz łatwą komunikację z centrum Giżycka.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-4 text-amber-500">Lokalizacja</h3>
                            <p>Port Neptun<br />Giżycko, Mazury</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-4 text-amber-500">Udogodnienia</h3>
                            <ul className="text-left list-disc list-inside space-y-2">
                                <li>Widok na port</li>
                                <li>Bliskość tawerny</li>
                                <li>Parking</li>
                                <li>WiFi</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Ship, Anchor, Wifi, Monitor, Coffee } from "lucide-react";

export default function CharterPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[url('/images/hero_bg.jpg')]"
                />
                <div className="relative z-20 text-center text-white p-4">
                    <h1 className="text-5xl md:text-7xl font-playfair mb-4">Stillo 30 VIP</h1>
                    <p className="text-xl md:text-3xl font-light text-amber-400">Luksusowy Houseboat bez patentu</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-slate-900 dark:text-white">Twój pływający apartament</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                            Stillo 30 to jednostka stworzona dla osób ceniących komfort i niezależność.
                            Ten luksusowy houseboat oferuje przestrzeń i wygodę apartamentu na wodzie.
                            Dzięki silnikowi 52KM i dwóm sterom strumieniowym, manewrowanie jest dziecinnie proste –
                            nawet bez wcześniejszego doświadczenia.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-200">
                                <Ship className="w-6 h-6 text-amber-500" />
                                <span>Bez patentu</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-200">
                                <Anchor className="w-6 h-6 text-amber-500" />
                                <span>Stery strumieniowe</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-200">
                                <Wifi className="w-6 h-6 text-amber-500" />
                                <span>WiFi bez limitu</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-200">
                                <Monitor className="w-6 h-6 text-amber-500" />
                                <span>Netflix & HBO</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-200">
                                <Coffee className="w-6 h-6 text-amber-500" />
                                <span>Ekspres Nespresso</span>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Card */}
                    <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-3xl shadow-xl">
                        <h3 className="text-2xl font-playfair mb-6 text-slate-900 dark:text-white border-b pb-4 border-slate-200 dark:border-slate-800">Specyfikacja Techniczna</h3>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                            <li className="flex justify-between">
                                <span>Długość:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">9.10 m</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Szerokość:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">3.25 m</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Zanurzenie:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">0.50 m</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Silnik:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">Craftsman 52KM Diesel</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Kabiny:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">3 zamykane</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Załoga:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">max 8 osób</span>
                            </li>
                        </ul>

                        <button className="w-full mt-10 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1">
                            SPRAWDŹ DOSTĘPNOŚĆ (KALENDARZ)
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

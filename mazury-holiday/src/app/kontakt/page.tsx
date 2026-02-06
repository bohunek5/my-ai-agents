"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

const locations = [
    {
        title: "Apartamenty Stranda Residence & Czarter",
        address: "Pierkunowo 36, 11-500 Giżycko",
        mapQuery: "Stranda+Residence+Pierkunowo+36",
    },
    {
        title: "Apartamenty Kisajno",
        address: "Port Neptun, Giżycko",
        mapQuery: "Port+Neptun+Gizycko",
    },
    {
        title: "Apartamenty i Pokoje Fuleda",
        address: "Fuleda 5, 11-500 Fuleda",
        mapQuery: "Fuleda+5+11-500",
    },
    {
        title: "Domki Skorupki",
        address: "Skorupki, Mazury",
        mapQuery: "Skorupki+Mazury",
    },
];

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-slate-100 dark:bg-slate-900 py-20 pt-32">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-playfair mb-6 text-slate-900 dark:text-white">Kontakt</h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
                        <a href="tel:+48730067027" className="flex items-center space-x-3 text-xl text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">
                            <Phone className="w-6 h-6" />
                            <span>+48 730 067 027 (Rezerwacje)</span>
                        </a>
                        <a href="tel:+48607241090" className="flex items-center space-x-3 text-xl text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">
                            <Phone className="w-6 h-6" />
                            <span>+48 607 241 090 (Biuro)</span>
                        </a>
                        <a href="mailto:rezerwacje@mazury.holiday" className="flex items-center space-x-3 text-xl text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">
                            <Mail className="w-6 h-6" />
                            <span>rezerwacje@mazury.holiday</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Maps Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {locations.map((loc, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="p-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-bold font-playfair text-slate-900 dark:text-white mb-2">{loc.title}</h3>
                                <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400">
                                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-amber-500" />
                                    <span>{loc.address}</span>
                                </div>
                            </div>
                            <div className="h-80 w-full relative bg-slate-200">
                                {/* Fallback to simple embed link without API key requirement for reliability */}
                                <iframe
                                    width="100%"
                                    height="100%"
                                    title={`Mapa lokalizacji: ${loc.title}`}
                                    id={`map-canvas-${index}`}
                                    src={`https://maps.google.com/maps?q=${loc.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    frameBorder="0"
                                    scrolling="no"
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

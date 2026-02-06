"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ApartmentDetailClient({ id }: { id: string }) {
    const { t } = useLanguage();

    // Mock data - in real app would fetch based on id
    // This generic content is currently set for "Building C" style as requested, but using translations
    const apartment = {
        id: id,
        title: `Apartament ${id}`,
        building: id.charAt(0),
        description: `
          ${t("details", "descriptionPart1")} ${id.charAt(0)} ${t("details", "descriptionPart2")} 
          ${t("details", "descriptionPart3")}
      `,
        amenities: [
            t("details", "items.view"),
            t("details", "items.ac"),
            t("details", "items.terrace"),
            t("details", "items.kitchen"),
            t("details", "items.tv"),
            t("details", "items.wifi"),
            t("details", "items.parking"),
            t("details", "items.sauna")
        ],
        mainImage: "/images/apartments/A104k.jpg" // Using the clean image
    };

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero / Header Image */}
            <section className="relative h-[60vh] w-full">
                <Image
                    src={apartment.mainImage}
                    alt={apartment.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <span className="block text-amber-400 font-bold tracking-widest mb-2 uppercase">Stranda Residence</span>
                        <h1 className="text-5xl md:text-7xl font-playfair mb-4">{apartment.title}</h1>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-3xl font-playfair mb-6 text-slate-900 dark:text-white">{t("details", "about")}</h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                                {apartment.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-playfair mb-6 text-slate-900 dark:text-white">{t("details", "amenities")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {apartment.amenities.map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Booking */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 sticky top-32 shadow-xl">
                            <h3 className="text-2xl font-playfair mb-6 text-slate-900 dark:text-white">{t("details", "booking")}</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">
                                {t("details", "checkAvailability")}
                            </p>
                            <a
                                href="tel:+48607241090"
                                className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors mb-4"
                            >
                                {t("details", "callBtn")}: +48 607 241 090
                            </a>
                            <p className="text-xs text-center text-slate-500">
                                {t("details", "lowPrice")}
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

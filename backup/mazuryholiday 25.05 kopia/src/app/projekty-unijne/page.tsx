"use client";

import React from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAssetPath } from "@/utils/assetPath";

export default function EUProjectsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">

                {/* EU Banner Image */}
                <div className="w-full mb-12 rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-white">
                    <Image
                        src={getAssetPath("/dofinansowanie.webp")}
                        alt="Sfinansowano w ramach reakcji Unii na pandemię COVID19"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>

                {/* Main Text Content */}
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-8">

                    {/* Tagline */}
                    <div className="text-center md:text-left border-b border-gray-100 pb-6">
                        <h2 className="text-xl md:text-2xl font-semibold text-blue-900 italic">
                            „Sfinansowano w ramach reakcji Unii na pandemię COVID19”
                        </h2>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                        <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-4">
                            <div className="font-bold text-gray-900">Beneficjent:</div>
                            <div>Radosław Narwojsz &quot;RAD&#96;LIGHT&quot;</div>
                        </div>

                        <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-4">
                            <div className="font-bold text-gray-900">Tytuł projektu:</div>
                            <div>„Zabezpieczenie ciągłości działalności gospodarczej firmy RAD&#96;LIGHT w okresie epidemii”</div>
                        </div>

                        <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-4">
                            <div className="font-bold text-gray-900">Opis projektu:</div>
                            <div>
                                Przedmiotem projektu są działania zabezpieczające ciągłość działalności gospodarczej firmy RAD&#96;LIGHT w okresie epidemii poprzez wprowadzenie zmian wpływających na budowanie odporności firmy na przyszłe kryzysy.
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">Wartość projektu</p>
                                <p className="text-3xl font-bold text-blue-900">615 000,00 zł</p>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">Wkład Funduszy Europejskich</p>
                                <p className="text-3xl font-bold text-blue-900">429 500,00 zł</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}


"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";
import { getAssetPath } from "@/utils/assetPath";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RegulaminPage() {
    const { t } = useLanguage();
    const sections = t("termsPage", "sections");
    const hasSections = Array.isArray(sections);

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getAssetPath('/images/mazury_hero.webp')}')` }}
                />
                <div className="relative z-20 text-center text-white p-4 mt-16">
                    <h1 className="text-4xl md:text-6xl font-sans mb-4">{t("termsPage", "title")}</h1>
                </div>
            </section>

            <section className="pt-16 pb-20 px-4">
                <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-2xl flex items-center justify-center shrink-0">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white">
                            {t("termsPage", "title")}
                        </h1>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-6">
                        <p className="font-medium">
                            {t("termsPage", "intro")}
                        </p>

                        {hasSections && sections.map((section: any, idx: number) => (
                            <div key={idx}>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                                    {section.title}
                                </h3>
                                {section.list && (
                                    <ul className="list-decimal pl-6 space-y-2">
                                        {section.list.map((item: string, itemIdx: number) => (
                                            <li key={itemIdx}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

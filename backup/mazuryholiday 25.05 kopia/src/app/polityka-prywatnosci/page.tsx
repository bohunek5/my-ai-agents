"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAssetPath } from "@/utils/assetPath";

export default function PrivacyPolicyPage() {
    const { t } = useLanguage();
    const sections = t("privacyPolicy", "sections");
    const hasSections = Array.isArray(sections);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getAssetPath('/images/mazury_hero.webp')}')` }}
                />
                <div className="relative z-20 text-center text-white p-4 mt-16">
                    <h1 className="text-4xl md:text-6xl font-sans mb-4">{t("privacyPolicy", "title")}</h1>
                </div>
            </section>

            <div className="pt-16 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-amber-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <span className="text-sm font-medium uppercase tracking-widest text-amber-500">
                        {t("nav", "back")}
                    </span>
                </div>

                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light border-l-4 border-amber-500 pl-6 my-8 italic">
                    {t("privacyPolicy", "intro")}
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-700 dark:hover:prose-a:text-amber-300 prose-strong:text-slate-800 dark:prose-strong:text-white">
                    <p className="mb-8">{t("privacyPolicy", "content")}</p>

                    {hasSections && sections.map((section: any, idx: number) => (
                        <div key={idx} className="mb-8">
                            {section.title && <h2 className="mb-4">{section.title}</h2>}
                            {section.content && (
                                <p
                                    className="mb-4"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            )}
                            {section.list && (
                                <ul className="list-disc pl-6 space-y-2">
                                    {section.list.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    {t("privacyPolicy", "usefulLinks") && (
                        <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800">
                            <h2 className="mb-6">{t("privacyPolicy", "usefulLinks")}</h2>
                            {t("privacyPolicy", "linksDescription") && (
                                <p className="mb-6">{t("privacyPolicy", "linksDescription")}</p>
                            )}
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 p-0 mb-8">
                                <li className="m-0">
                                    <a
                                        href="https://www.google.com/analytics/learn/privacy.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/50 no-underline transition-all"
                                    >
                                        <span className="font-medium">Google Analytics</span>
                                        <ExternalLink className="w-4 h-4 text-amber-500" />
                                    </a>
                                </li>
                                <li className="m-0">
                                    <a
                                        href="https://www.facebook.com/about/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/50 no-underline transition-all"
                                    >
                                        <span className="font-medium">Facebook</span>
                                        <ExternalLink className="w-4 h-4 text-amber-500" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}

                    {t("privacyPolicy", "manageCookies") && (
                        <div className="mt-8">
                            <p className="mb-6">{t("privacyPolicy", "manageCookies")}</p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 not-prose">
                                {['Chrome', 'Safari', 'Firefox', 'Opera'].map(browser => (
                                    <div key={browser} className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all group cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <ExternalLink className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{browser}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {t("privacyPolicy", "mobileDevices") && (
                        <div className="mt-8">
                            <p className="font-bold text-slate-800 dark:text-slate-200 mb-4">{t("privacyPolicy", "mobileDevices")}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                                {['Android', 'Safari (iOS)'].map(system => (
                                    <div key={system} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/50 transition-all group cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ExternalLink className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{system}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

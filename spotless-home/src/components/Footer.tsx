"use client";

import React from "react";
import Link from "next/link";
import { Waves, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900/50 py-24 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                                <Waves className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">CzystyDom.</span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-relaxed">
                            Twój dom zasługuje na najlepszą opiekę. Łączymy nowoczesną technologię z pasją do porządku. Każdy pokój, każdy detal, każda rezerwacja.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, href: "#", label: "Instagram" },
                                { icon: Facebook, href: "#", label: "Facebook" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:shadow-xl transition-all"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h4 className="font-black text-slate-900 dark:text-slate-200 uppercase text-[10px] tracking-widest bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-full inline-block">Usługi</h4>
                        <ul className="space-y-4">
                            {["Sprzątanie Domów", "Pranie Tapicerki", "Mycie Okien", "Sprzątanie Biur"].map((link) => (
                                <li key={link}>
                                    <Link href="/oferta" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-bold transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="font-black text-slate-900 dark:text-slate-200 uppercase text-[10px] tracking-widest bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full inline-block">Szybkie Linki</h4>
                        <ul className="space-y-4">
                            {["O Nas", "Cennik", "Kontakt", "Kariera"].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-bold transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="font-black text-slate-900 dark:text-slate-200 uppercase text-[10px] tracking-widest bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full inline-block">Kontakt</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                                    <Phone size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">+48 500 600 700</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Mail size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">kontakt@czystydom.com.pl</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Giżycko, ul. Jeziorna 15</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <p>© 2026 CzystyDom Serwis Sprzątający Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-teal-600 transition-colors">Polityka Prywatności</Link>
                        <Link href="#" className="hover:text-teal-600 transition-colors">Regulamin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

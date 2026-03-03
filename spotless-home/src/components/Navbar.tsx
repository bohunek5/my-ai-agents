"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck, ChevronDown, Menu, X, Sparkles,
    Phone, Info, CreditCard
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on path change
    useEffect(() => {
        if (isMenuOpen) setIsMenuOpen(false);
    }, [pathname, isMenuOpen]);

    const navLinks = [
        { name: "Oferta", href: "/oferta", icon: Sparkles },
        { name: "Cennik", href: "/cennik", icon: CreditCard },
        { name: "O Nas", href: "/o-nas", icon: Info },
        { name: "Kontakt", href: "/kontakt", icon: Phone },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3 shadow-lg shadow-slate-200/20 dark:shadow-none" : "bg-transparent py-6"}`}>
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                        <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200 dark:shadow-teal-900/20 group-hover:rotate-12 transition-transform">
                            <ShieldCheck className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">Spotless.</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full font-black text-[13px] uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${pathname === link.href ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' : 'bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600'}`}
                            >
                                <link.icon size={16} className={pathname === link.href ? 'text-teal-200' : 'text-teal-600'} />
                                {link.name}
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                        <ModeToggle />
                        <button
                            className="rounded-full px-8 py-3 font-black shadow-xl shadow-teal-500/20 bg-teal-600 hover:bg-teal-700 text-white transition-all hover:scale-110 active:scale-95 text-sm animate-bubble-pulse uppercase tracking-widest"
                            onClick={() => {
                                if (pathname === '/') {
                                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    window.location.href = '/#booking';
                                }
                            }}
                        >
                            Zarezerwuj
                        </button>

                    </div>

                    <div className="flex items-center gap-4 lg:hidden">
                        <ModeToggle />
                        <button
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMenuOpen ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-black' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800'}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Modern Full-Screen Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-white dark:bg-slate-950 px-6 pt-32 pb-10 flex flex-col lg:hidden"
                    >
                        {/* Background elements for mobile menu */}
                        <div className="absolute top-20 right-[-10%] w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-20 left-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Nawigacja</p>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center justify-between group py-4 border-b border-slate-100 dark:border-slate-900"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all group-active:scale-90 ${pathname === link.href ? 'bg-teal-600 text-white shadow-teal-500/20' : 'bg-slate-50 dark:bg-slate-900 text-teal-600 shadow-slate-200/50 dark:shadow-none'}`}>
                                            <link.icon size={28} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-2xl font-black transition-colors ${pathname === link.href ? 'text-teal-600' : 'text-slate-900 dark:text-white'}`}>{link.name}</span>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Przejdź do sekcji</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                        <ChevronDown className="text-slate-400 -rotate-90 w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] flex items-center gap-4 border border-slate-100 dark:border-slate-800 shadow-inner">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500 relative flex-shrink-0 bubble-pulse">
                                    <Image
                                        src="https://i.pravatar.cc/150?img=32"
                                        alt="Support"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Potrzebujesz pomocy?</p>
                                    <p className="font-black text-slate-900 dark:text-white">+48 500 600 700</p>
                                </div>
                            </div>

                            <Button
                                className="w-full h-16 rounded-[2rem] font-black text-xl bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-2xl shadow-teal-500/20 active:scale-95 transition-all"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    const bookingEl = document.getElementById('booking');
                                    if (pathname === '/') {
                                        bookingEl?.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        window.location.href = '/#booking';
                                    }
                                }}
                            >
                                Zarezerwuj Teraz
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};



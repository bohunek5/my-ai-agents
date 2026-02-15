"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Waves, ChevronDown, Menu, X,
    Home, Building2, Sparkles,
    Phone, Info, CreditCard
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOfferOpen, setIsOfferOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on path change - side effect is fine here as it's triggered by manual action (pathname change)
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const navLinks = [
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
                            <Waves className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">CzystyDom.</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <div
                            className="relative"
                            onMouseEnter={() => setIsOfferOpen(true)}
                            onMouseLeave={() => setIsOfferOpen(false)}
                        >
                            <button className={`flex items-center gap-1.5 text-sm font-bold transition-colors py-2 ${pathname === '/oferta' ? 'text-teal-600' : 'text-slate-600 dark:text-slate-400 hover:text-teal-600'}`}>
                                Oferta <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOfferOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isOfferOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-72 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-3 overflow-hidden mt-1"
                                    >
                                        <Link href="/oferta" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 shrink-0">
                                                <Sparkles size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-teal-600 transition-colors">Wszystkie Usługi</p>
                                                <p className="text-xs text-slate-500 mt-0.5">Kompleksowe rozwiązanie dla każdego</p>
                                            </div>
                                        </Link>
                                        <Link href="/oferta" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                                                <Home size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors">Dla Twojego Domu</p>
                                                <p className="text-xs text-slate-500 mt-0.5">Sprzątanie, prasowanie, mycie okien</p>
                                            </div>
                                        </Link>
                                        <Link href="/oferta" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 shrink-0">
                                                <Building2 size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-purple-600 transition-colors">Dla Biznesu</p>
                                                <p className="text-xs text-slate-500 mt-0.5">Profesjonalna obsługa Twojej firmy</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold transition-colors ${pathname === link.href ? 'text-teal-600' : 'text-slate-600 dark:text-slate-400 hover:text-teal-600'}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                        <ModeToggle />
                        <button
                            className="rounded-full px-7 py-3 font-bold shadow-xl shadow-teal-100 dark:shadow-none bg-teal-600 hover:bg-teal-700 text-white transition-all hover:scale-105 active:scale-95 text-sm"
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

                    <div className="flex items-center gap-4 md:hidden">
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
                        className="fixed inset-0 z-[90] bg-white dark:bg-slate-950 px-6 pt-32 pb-10 flex flex-col md:hidden"
                    >
                        {/* Background elements for mobile menu */}
                        <div className="absolute top-20 right-[-10%] w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-20 left-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex-grow space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Menu Nawigacyjne</p>

                            <Link
                                href="/oferta"
                                className="flex items-center justify-between group py-4 border-b border-slate-100 dark:border-slate-900"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600">
                                        <Sparkles size={24} />
                                    </div>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white transition-transform group-active:translate-x-2">Oferta</span>
                                </div>
                                <ChevronDown className="text-slate-300 -rotate-90" />
                            </Link>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center justify-between group py-4 border-b border-slate-100 dark:border-slate-900"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                            <link.icon size={24} />
                                        </div>
                                        <span className="text-3xl font-black text-slate-900 dark:text-white transition-transform group-active:translate-x-2">{link.name}</span>
                                    </div>
                                    <ChevronDown className="text-slate-300 -rotate-90" />
                                </Link>
                            ))}
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500 relative flex-shrink-0">
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
                                className="w-full h-16 rounded-[1.5rem] font-black text-xl bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-2xl shadow-teal-500/20"
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

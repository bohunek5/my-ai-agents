"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useLanguage();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const navLinks = [
        { name: t("nav", "about"), href: "/#about" },
        { name: t("nav", "apartments"), href: "/apartamenty" },
        { name: t("nav", "rooms"), href: "/pokoje" },
        { name: t("nav", "cottages"), href: "/domki" },
        { name: t("nav", "charter"), href: "/czarter" },
        { name: t("nav", "port"), href: "/#port" },
        { name: t("nav", "attractions"), href: "/#attractions" },
        { name: t("nav", "cooperation"), href: "/#cooperation" },
        { name: t("nav", "contact"), href: "/kontakt" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const buttonClass = cn(
        "transition-all duration-300 px-4 py-2 rounded-full border text-sm font-medium uppercase tracking-wide",
        isScrolled || !isHomePage
            ? "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
            : "border-white/50 text-white hover:border-white hover:bg-white/10"
    );

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled || !isHomePage
                    ? "bg-slate-900/80 backdrop-blur-md shadow-lg py-4 dark:bg-slate-950/80 dark:border-b dark:border-slate-800"
                    : "bg-transparent py-8"
            )}
        >
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo - Increased size by another 30% */}
                <Link href="/" className="relative h-20 w-80 md:h-24 md:w-96 flex items-center">
                    <Image
                        src="/images/logo-poziom.svg"
                        alt="Mazury.Holiday"
                        fill
                        className="object-contain object-left filter brightness-0 invert"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden xl:flex items-center gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={buttonClass}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    <LanguageSwitcher className={isScrolled || !isHomePage ? "text-slate-200" : "text-white"} />

                    <div className={cn("h-6 w-px", isScrolled || !isHomePage ? "bg-slate-700" : "bg-white/20")} />

                    <ThemeToggle className={isScrolled || !isHomePage ? "text-slate-200 hover:bg-slate-800" : "text-white hover:bg-white/10"} />

                    <a
                        href="tel:+48607241090"
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full transition-all shadow-lg shadow-amber-500/20 font-medium ml-4"
                    >
                        <Phone size={20} />
                        <span className="hidden xl:inline text-lg">+48 607 241 090</span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <ThemeToggle className={isScrolled || !isHomePage ? "text-slate-200" : "text-white hover:bg-white/10"} />
                    <button
                        className={isScrolled || !isHomePage ? "text-slate-200 hover:text-amber-500" : "text-white hover:text-amber-400"}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-8 flex flex-col gap-6 shadow-2xl lg:hidden max-h-[calc(100vh-100px)] overflow-y-auto">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                        <span className="text-slate-400 text-sm font-medium">Język</span>
                        <LanguageSwitcher className="text-white" />
                    </div>

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/80 hover:text-amber-400 text-xl font-medium py-3 border-b border-slate-800/50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="tel:+48607241090"
                        className="mt-6 flex items-center justify-center gap-2 bg-amber-500 text-white py-4 rounded-full font-bold text-lg shadow-amber-500/20 shadow-lg"
                    >
                        <Phone size={20} />
                        Rezerwuj: +48 607 241 090
                    </a>
                </div>
            )}
        </nav>
    );
}


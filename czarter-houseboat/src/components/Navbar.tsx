"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MobileChatTrigger } from "@/components/MobileChatTrigger";
import logoPoziom from "@/assets/images/logo-poziom.svg";
import Lottie from "lottie-react";
import euFlagData from "../../eu-flag.json";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useLanguage();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const navLinks = [
        { name: t("nav", "apartments"), href: "/apartamenty" },
        { name: t("nav", "cottages"), href: "/domki" },
        { name: t("nav", "rooms"), href: "/pokoje" },
        { name: t("nav", "charter"), href: "/czarter" },
        { name: t("nav", "attractions"), href: "/atrakcje" },
        { name: t("nav", "cooperation"), href: "/wspolpraca" },
        { name: t("nav", "contact"), href: "/kontakt" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const buttonClass = cn(
        "transition-all duration-300 px-4 py-2 rounded-full border text-sm font-medium uppercase tracking-wide",
        isScrolled || !isHomePage
            ? "border-amber-500 text-slate-900 dark:text-white hover:bg-amber-500 hover:text-white"
            : "border-white/50 text-white hover:border-white hover:bg-white/10"
    );

    const textColorClass = isScrolled || !isHomePage ? "text-slate-900 dark:text-white" : "text-white";
    const dividerColorClass = isScrolled || !isHomePage ? "bg-slate-900 dark:bg-white/20" : "bg-white/20";
    const mobileMenuBgClass = "bg-white dark:bg-slate-950";
    const mobileLinkClass = "text-slate-900 dark:text-slate-200 hover:text-amber-500";

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[9999] transition-[background-color,padding,border-color,box-shadow] duration-300 ease-in-out",
                isScrolled || !isHomePage
                    ? "bg-white dark:bg-slate-900/95 shadow-lg py-4 border-b border-slate-200 dark:border-slate-800"
                    : "bg-transparent py-8"
            )}
        >
            <div className="max-w-[1920px] w-full mx-auto px-4 md:px-12 flex justify-between xl:justify-between items-center relative">
                {/* Logo */}
                <Link href="/" className="relative h-12 w-36 md:h-[115px] md:w-[460px] flex items-center z-50 shrink-0">
                    <Image
                        src={logoPoziom}
                        alt="Mazury.Holiday"
                        fill
                        className="object-contain object-left transition-all duration-300 dark:brightness-0 dark:invert"
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

                {/* Desktop & Mobile Actions (Right) */}
                <div className="flex items-center gap-4 z-50 shrink-0">
                    {/* Desktop Controls */}
                    <div className="hidden xl:flex items-center gap-4">
                        {/* EU Flag */}
                        <Link href="/projekty-unijne">
                            <div className="w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                                <Lottie animationData={euFlagData} loop={true} style={{ pointerEvents: "none" }} />
                            </div>
                        </Link>

                        <div className={cn("h-6 w-px xl:block hidden", dividerColorClass)} />

                        <LanguageSwitcher className={textColorClass} />
                        <div className={cn("h-6 w-px", dividerColorClass)} />
                        <ThemeToggle className={cn(textColorClass, "hover:bg-white/10")} />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="xl:hidden flex items-center gap-2 sm:gap-3">
                        <MobileChatTrigger />
                        
                        <ThemeToggle className={cn(
                            isMobileMenuOpen ? "text-slate-900 dark:text-white" : textColorClass,
                            "hover:bg-white/10"
                        )} />

                        <button
                            className={cn(
                                "transition-colors duration-300 ml-1",
                                isMobileMenuOpen
                                    ? "text-slate-900 dark:text-white hover:text-amber-500"
                                    : cn(textColorClass, "hover:text-amber-400")
                            )}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X size={32} className="text-amber-500" />
                            ) : (
                                <Menu size={32} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "fixed inset-0 z-[9998] flex flex-col items-center justify-start pt-24 gap-2 lg:hidden overflow-y-auto",
                            mobileMenuBgClass
                        )}
                    >
                        {/* Background Pattern or Gradient could be added here for 'rich aesthetics' */}
                        <div className="absolute inset-0 bg-transparent opacity-5 pointer-events-none" />

                        <div className="flex flex-col items-center w-full px-6 gap-0">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.1 }}
                                    className="w-full"
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "block text-xl md:text-2xl font-medium py-0.5 w-full text-center transition-colors",
                                            mobileLinkClass
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center gap-4 mt-0 mb-8 w-full"
                        >
                            <div className={cn("w-16 h-px", "bg-slate-200 dark:bg-slate-800")} />
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{t("nav", "language")}</span>
                                    <LanguageSwitcher className="text-slate-900 dark:text-white" dropUp={true} />
                                </div>
                                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                                <Link
                                    href="/projekty-unijne"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 text-slate-700 dark:text-slate-300 hover:bg-blue-100 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <Lottie animationData={euFlagData} loop={true} style={{ pointerEvents: "none" }} />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider">{t("nav", "euProjects")}</span>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}


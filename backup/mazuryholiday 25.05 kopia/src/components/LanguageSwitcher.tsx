"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

const languages: { code: Language; name: string; flag: React.ReactNode }[] = [
    {
        code: "pl",
        name: "Polski",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="16" height="10" fill="#fff" />
                <rect width="16" height="5" y="5" fill="#dc143c" />
            </svg>
        )
    },
    {
        code: "en",
        name: "English",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <clipPath id="s">
                    <path d="M0,0 v30 h50 v-30 z" />
                </clipPath>
                <path d="M0,0 v30 h50 v-30 z" fill="#012169" />
                <path d="M0,0 L50,30 M50,0 L0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 L50,30 M50,0 L0,30" stroke="#C8102E" strokeWidth="4" />
                <path d="M25,0 v30 M0,15 h50" stroke="#fff" strokeWidth="10" />
                <path d="M25,0 v30 M0,15 h50" stroke="#C8102E" strokeWidth="6" />
            </svg>
        )
    },
    {
        code: "de",
        name: "Deutsch",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="5" height="3" y="0" fill="#000" />
                <rect width="5" height="2" y="1" fill="#D00" />
                <rect width="5" height="1" y="2" fill="#FFCE00" />
            </svg>
        )
    },
    {
        code: "lt",
        name: "Lietuvių",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="5" height="1" fill="#FDB913" />
                <rect width="5" height="1" y="1" fill="#006A44" />
                <rect width="5" height="1" y="2" fill="#C1272D" />
            </svg>
        )
    },
    {
        code: "cs",
        name: "Čeština",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="3" height="2" fill="#fff" />
                <rect width="3" height="1" y="1" fill="#D7141A" />
                <path d="M0,0 L1.5,1 L0,2 Z" fill="#11457E" />
            </svg>
        )
    },
    {
        code: "es",
        name: "Español",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="3" height="2" fill="#C60B1E" />
                <rect width="3" height="1" y="0.5" fill="#FFC400" />
            </svg>
        )
    },
    {
        code: "it",
        name: "Italiano",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="1" height="2" fill="#009246" />
                <rect width="1" height="2" x="1" fill="#fff" />
                <rect width="1" height="2" x="2" fill="#ce2b37" />
            </svg>
        )
    },
    {
        code: "fr",
        name: "Français",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="1" height="2" fill="#0055A4" />
                <rect width="1" height="2" x="1" fill="#fff" />
                <rect width="1" height="2" x="2" fill="#EF4135" />
            </svg>
        )
    },
    {
        code: "dk",
        name: "Dansk",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 28" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="37" height="28" fill="#C8102E" />
                <rect width="4" height="28" x="12" fill="#fff" />
                <rect width="37" height="4" y="12" fill="#fff" />
            </svg>
        )
    },
    {
        code: "se",
        name: "Svenska",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="16" height="10" fill="#006aa7" />
                <rect width="2" height="10" x="5" fill="#fecc00" />
                <rect width="16" height="2" y="4" fill="#fecc00" />
            </svg>
        )
    },
    {
        code: "no",
        name: "Norsk",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="22" height="16" fill="#ba0c2f" />
                <path d="M0,8h22M8,0v16" stroke="#fff" strokeWidth="4" />
                <path d="M0,8h22M8,0v16" stroke="#00205b" strokeWidth="2" />
            </svg>
        )
    },
    {
        code: "fi",
        name: "Suomi",
        flag: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 11" className="w-5 h-auto rounded-sm shadow-sm border border-slate-200/20">
                <rect width="18" height="11" fill="#fff" />
                <rect width="18" height="3" y="4" fill="#003580" />
                <rect width="3" height="11" x="5" fill="#003580" />
            </svg>
        )
    },
];

interface LanguageSwitcherProps {
    className?: string;
    dropUp?: boolean;
}

export function LanguageSwitcher({ className, dropUp = false }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const { language, setLanguage } = useLanguage();
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const selectedLang = languages.find(l => l.code === language) || languages[0];

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 p-2 rounded-full hover:bg-white/10 transition-colors text-sm font-medium"
            >
                <span className="text-lg leading-none">{selectedLang.flag}</span>
                <span className="hidden sm:inline-block uppercase text-xs tracking-wider opacity-90">
                    {selectedLang.name}
                </span>
                <ChevronDown className={cn("h-3 w-3 text-current transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className={cn(
                    "absolute right-0 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200",
                    dropUp ? "bottom-full mb-2" : "top-full mt-2"
                )}>
                    <div className="grid grid-cols-1 gap-0.5 max-h-[300px] overflow-y-auto">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
                                    language === lang.code
                                        ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                <span className="text-lg leading-none">{lang.flag}</span>
                                <span className="flex-1">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

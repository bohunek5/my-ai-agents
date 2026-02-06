"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

const languages: { code: Language; name: string; flag: string }[] = [
    { code: "pl", name: "Polska", flag: "🇵🇱" },
    { code: "de", name: "Niemiecka", flag: "🇩🇪" },
    { code: "en", name: "Angielska", flag: "🇬🇧" },
    { code: "lt", name: "Litewska", flag: "🇱🇹" },
    { code: "cs", name: "Czechy", flag: "🇨🇿" },
    { code: "fr", name: "Francja", flag: "🇫🇷" },
    { code: "dk", name: "Duńska", flag: "🇩🇰" },
    { code: "se", name: "Szwecja", flag: "🇸🇪" },
    { code: "no", name: "Norwegia", flag: "🇳🇴" },
    { code: "fi", name: "Finlandia", flag: "🇫🇮" },
    { code: "es", name: "Hiszpania", flag: "🇪🇸" },
    { code: "it", name: "Włochy", flag: "🇮🇹" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
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
                    {selectedLang.code}
                </span>
                <ChevronDown className={cn("h-3 w-3 text-current transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
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

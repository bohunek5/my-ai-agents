"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (section: keyof typeof translations.pl, key: string) => any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("pl");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const savedLang = localStorage.getItem("mazury_lang") as Language;
            if (savedLang && Object.keys(translations).includes(savedLang)) {
                setLanguage(savedLang);
            }
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("mazury_lang", lang);
    };

    const t = (section: keyof typeof translations.pl, key: string): any => {
        const getVal = (lang: Language, sec: keyof typeof translations.pl, k: string) => {
            const keys = k.split('.');
            let result: unknown = (translations[lang] as typeof translations.pl)[sec];
            for (const k of keys) {
                if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
                    result = (result as Record<string, unknown>)[k];
                } else {
                    return undefined;
                }
            }
            return result;
        };

        const value = getVal(language, section, key);
        if (value !== undefined) return value;

        const fallbackEn = getVal("en", section, key);
        if (fallbackEn !== undefined) return fallbackEn;

        const fallbackPl = getVal("pl", section, key);
        return (fallbackPl !== undefined ? fallbackPl : key);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

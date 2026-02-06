"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (section: keyof typeof translations.pl, key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("pl");

    const t = (section: keyof typeof translations.pl, key: string): string => {
        const getVal = (lang: Language, sec: keyof typeof translations.pl, k: string) => {
            const keys = k.split('.');
            // Force cast to PL structure since we ensure fallback at runtime
            let result: unknown = (translations[lang] as typeof translations.pl)[sec];
            for (const k of keys) {
                if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
                    result = (result as Record<string, unknown>)[k];
                } else {
                    return undefined;
                }
            }
            return result as string;
        };

        const value = getVal(language, section, key);
        if (value && typeof value === 'string') return value;

        const fallback = getVal("en", section, key); // Fallback to English
        return (typeof fallback === 'string' ? fallback : key);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

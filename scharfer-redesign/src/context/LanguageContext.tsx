'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/data/scharferData';

type Lang = 'pl' | 'en' | 'de' | 'lt';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pl');

  useEffect(() => {
    const saved = localStorage.getItem('scharfer_lang') as Lang;
    if (saved && ['pl', 'en', 'de', 'lt'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('scharfer_lang', newLang);
  };

  const t = (key: string): string => {
    const dict = translations[lang] || translations['pl'];
    return (dict as any)[key] || (translations['pl'] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

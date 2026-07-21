"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

const flags = {
  pl: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className="w-4 h-3 sm:w-5 sm:h-3.5 md:w-6 md:h-4 shadow-sm rounded-[2px] sm:rounded-sm">
      <rect width="16" height="10" fill="#fff"/>
      <rect width="16" height="5" y="5" fill="#dc143c"/>
    </svg>
  ),
  en: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-4 h-3 sm:w-5 sm:h-3.5 md:w-6 md:h-4 shadow-sm rounded-[2px] sm:rounded-sm">
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  ),
  de: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-4 h-3 sm:w-5 sm:h-3.5 md:w-6 md:h-4 shadow-sm rounded-[2px] sm:rounded-sm">
      <rect width="5" height="3" fill="#000"/>
      <rect width="5" height="2" y="1" fill="#d00"/>
      <rect width="5" height="1" y="2" fill="#fc0"/>
    </svg>
  )
};

const languages: { code: Language; name: string }[] = [
  { code: "pl", name: "PL" },
  { code: "en", name: "EN" },
  { code: "de", name: "DE" }
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 sm:px-2 sm:py-1.5 md:px-3 md:py-2 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 rounded-full sm:rounded-xl transition-all cursor-pointer shadow-sm bg-blue-100 dark:bg-blue-900/50 ring-2 ring-blue-500/50 hover:scale-105 active:scale-95"
        aria-label="Wybierz język"
      >
        <span className="block">{flags[activeLang.code]}</span>
        <span className="font-bold text-xs sm:text-sm leading-none">{activeLang.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col z-50 min-w-[80px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`px-3 py-2.5 flex items-center gap-2 transition-all cursor-pointer text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                language === lang.code ? "bg-gray-50 dark:bg-gray-700 font-bold" : ""
              }`}
            >
              <span className="block w-5">{flags[lang.code]}</span>
              <span className="text-xs sm:text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


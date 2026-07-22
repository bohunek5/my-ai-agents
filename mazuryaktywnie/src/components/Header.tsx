"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Eye, Menu, X, Volume2, VolumeX, FileText, Accessibility, Type, Link2, MonitorPlay, TypeOutline } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import WeatherWidget from "./WeatherWidget";
import HeaderBackground from "./HeaderBackground";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin-ext'] });

const AnimatedLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-yellow-500 drop-shadow-md transition-colors duration-300">
    <g className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: "50px 50px" }}>
      {/* Outer ring with empty space */}
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* 4 slim long rays */}
      {[0, 90, 180, 270].map((angle) => (
        <line 
          key={`long-${angle}`}
          x1="50" y1="0" x2="50" y2="8" 
          transform={`rotate(${angle} 50 50)`}
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
      ))}
      {/* 4 slim short rays */}
      {[45, 135, 225, 315].map((angle) => (
        <line 
          key={`short-${angle}`}
          x1="50" y1="2" x2="50" y2="6"
          transform={`rotate(${angle} 50 50)`}
          stroke="currentColor" 
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      ))}
    </g>
    {/* Larger sun */}
    <circle cx="50" cy="50" r="30" fill="currentColor" />
    {/* Thicker and slightly smaller M, centered and smaller */}
    <path 
      d="M34 58 C34 40, 43 38, 50 38 C57 38, 66 40, 66 58" 
      stroke="white" 
      strokeWidth="9" 
      strokeLinecap="round" 
      fill="none" 
      className="dark:stroke-slate-900" 
    />
    <path 
      d="M50 58 V38" 
      stroke="white" 
      strokeWidth="9" 
      strokeLinecap="round" 
      className="dark:stroke-slate-900" 
    />
  </svg>
);

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [contrastMode, setContrastMode] = useState(false);
  const [wcagModalOpen, setWcagModalOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [noAnimations, setNoAnimations] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const loadWcagState = (key: string, className: string, setter: (v: boolean) => void) => {
        const val = localStorage.getItem(key) === "true";
        setter(val);
        if (val) document.documentElement.classList.add(className);
        else document.documentElement.classList.remove(className);
      };

      loadWcagState("wcag_contrast", "high-contrast", setContrastMode);
      loadWcagState("wcag_large_text", "wcag-large-text", setLargeText);
      loadWcagState("wcag_dyslexia", "wcag-dyslexia", setDyslexia);
      loadWcagState("wcag_highlight", "wcag-highlight-links", setHighlightLinks);
      loadWcagState("wcag_no_anim", "wcag-no-animations", setNoAnimations);
    }
  }, []);

  const toggleFeature = (key: string, className: string, currentValue: boolean, setter: (v: boolean) => void) => {
    const nextMode = !currentValue;
    setter(nextMode);
    localStorage.setItem(key, String(nextMode));
    if (nextMode) document.documentElement.classList.add(className);
    else document.documentElement.classList.remove(className);
  };

  const toggleContrast = () => toggleFeature("wcag_contrast", "high-contrast", contrastMode, setContrastMode);
  const toggleLargeText = () => toggleFeature("wcag_large_text", "wcag-large-text", largeText, setLargeText);
  const toggleDyslexia = () => toggleFeature("wcag_dyslexia", "wcag-dyslexia", dyslexia, setDyslexia);
  const toggleHighlight = () => toggleFeature("wcag_highlight", "wcag-highlight-links", highlightLinks, setHighlightLinks);
  const toggleAnimations = () => toggleFeature("wcag_no_anim", "wcag-no-animations", noAnimations, setNoAnimations);

  const handleReadPage = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    const content = document.getElementById("main-content")?.innerText || document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "pl-PL";
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const navItems = [
    { href: "/", labelKey: "home" },
    { href: "/oferta", labelKey: "offer" },
    { href: "/stillo", labelKey: "stillo31" },
    { href: "/galeria", labelKey: "gallery" },
    { href: "/reservation", labelKey: "reservation" },
    { href: "/kontakt", labelKey: "contact" }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Skip Link for WCAG Accessibility */}
      <a href="#main-content" className="skip-link">
        {t("Navigation", "skipToContent")}
      </a>

      <header className="relative w-full sticky top-0 z-50 shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors">
        <HeaderBackground />
        <div className="container relative z-10 mx-auto px-4 h-16 md:h-28 flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center focus-visible:ring-2 group relative w-12 h-12 sm:w-[150px] md:w-[190px] sm:h-16"
            aria-label="Mazury Aktywnie - Strona Główna"
          >
            {/* Sun */}
            <div className="absolute left-0 sm:left-[50px] md:left-[70px] group-hover:sm:-left-6 transition-all duration-500 sm:delay-300 group-hover:sm:delay-0 ease-in-out z-10 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
              <AnimatedLogo />
            </div>
            
            {/* Text */}
            <div className={`hidden sm:flex items-center sm:pl-[44px] md:pl-[64px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-0 group-hover:delay-400 whitespace-nowrap absolute sm:-left-6 inset-y-0 ${montserrat.className}`}>
              <div className="text-lg md:text-xl font-black tracking-tight flex items-center gap-1.5 pl-1">
                <span className="text-slate-900 dark:text-white drop-shadow-sm">MAZURY</span>
                <span className="text-yellow-500 dark:text-yellow-400 drop-shadow-sm">AKTYWNIE</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-3 font-bold text-sm text-gray-700 dark:text-gray-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-2 px-3 lg:px-4 rounded-xl shadow-sm ${
                  isActive(item.href)
                    ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow"
                }`}
              >
                {t("Navigation", item.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex flex-1 xl:flex-none justify-end items-center gap-1.5 sm:gap-3 pl-4 sm:pl-0">
            <WeatherWidget />
            <LanguageSwitcher />

            {/* Dark Mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-full sm:rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                aria-label={t("Navigation", "themeToggle")}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* WCAG Toggle Button */}
            <button
              onClick={() => setWcagModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-full sm:rounded-xl font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer transition-all bg-yellow-400 hover:bg-yellow-500 text-slate-900 shadow-sm sm:shadow-md hover:scale-105"
              aria-label={t("Navigation", "accessibility")}
            >
              <Accessibility className="w-5 h-5 sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]" />
              <span className="hidden sm:inline">{t("Navigation", "accessibility")}</span>
            </button>

            {/* Hamburger Menu removed - using BottomNav on mobile */}
          </div>
        </div>
      </header>

      {wcagModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wcag-title"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl max-w-sm w-full relative border border-gray-200 dark:border-white/10">
            <button 
              onClick={() => setWcagModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>
            <h2 id="wcag-title" className="text-xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <Accessibility className="text-yellow-500" />
              Narzędzia Dostępności
            </h2>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={toggleContrast}
                  className={`w-full py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all text-xs text-center ${contrastMode ? 'bg-yellow-400 text-slate-900 shadow-lg scale-[1.02]' : 'bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                  <Eye size={20} />
                  {contrastMode ? "Zwykły kontrast" : "Wysoki kontrast"}
                </button>
                <button
                  onClick={toggleLargeText}
                  className={`w-full py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all text-xs text-center ${largeText ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                  <Type size={20} />
                  {largeText ? "Mniejszy tekst" : "Większy tekst"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={toggleDyslexia}
                  className={`w-full py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all text-xs text-center ${dyslexia ? 'bg-purple-600 text-white shadow-lg scale-[1.02]' : 'bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                  <TypeOutline size={20} />
                  {dyslexia ? "Zwykła czcionka" : "Dla dyslektyków"}
                </button>
                <button
                  onClick={toggleHighlight}
                  className={`w-full py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all text-xs text-center ${highlightLinks ? 'bg-green-600 text-white shadow-lg scale-[1.02]' : 'bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                  <Link2 size={20} />
                  {highlightLinks ? "Ukryj linki" : "Podświetl linki"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={toggleAnimations}
                  className={`w-full py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all text-xs text-center ${noAnimations ? 'bg-orange-600 text-white shadow-lg scale-[1.02]' : 'bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                  <MonitorPlay size={20} />
                  {noAnimations ? "Włącz animacje" : "Zatrzymaj animacje"}
                </button>
                <button
                  onClick={handleReadPage}
                  className={`w-full py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all text-xs text-center ${isReading ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg scale-[1.02]' : 'bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                  {isReading ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  {isReading ? "Zatrzymaj audio" : "Czytaj na głos"}
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 mt-2">
                <Link
                  href="/audyt-wcag" 
                  onClick={() => setWcagModalOpen(false)}
                  className="w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <FileText size={16} />
                  Deklaracja dostępności WCAG 2.1
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

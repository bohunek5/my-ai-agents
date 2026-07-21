"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [accepted, setAccepted] = useState(true); // default to true to avoid flashing on SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookies_accepted") === "true";
      setAccepted(consent);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies_accepted", "true");
    setAccepted(true);
  };

  if (!mounted || accepted) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-gray-900 border-t border-gray-250 dark:border-gray-800 shadow-2xl p-4 md:p-6 transition-colors"
      role="region"
      aria-label="Informacja o ciasteczkach (Cookies)"
    >
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 dark:text-gray-300 text-center md:text-left leading-relaxed">
          <p>
            {t("Cookies", "bannerText")}{" "}
            <Link 
              href="/polityka-prywatnosci" 
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {t("Cookies", "policyLink")}
            </Link>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md transition-colors cursor-pointer"
          >
            {t("Cookies", "accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

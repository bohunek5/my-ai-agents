"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const CookieConsent = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: true,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("cookieConsent", "true");
        localStorage.setItem("cookiePreferences", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
        setIsVisible(false);
    };

    const handleDeclineAll = () => {
        localStorage.setItem("cookieConsent", "false");
        localStorage.setItem("cookiePreferences", JSON.stringify({ necessary: true, analytics: false, marketing: false }));
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem("cookieConsent", "custom");
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-lg z-50 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95"
                >
                    {!showSettings ? (
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400 shrink-0">
                                <Cookie className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                    {t("cookieConsent", "title")}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                    {t("cookieConsent", "description")} <Link href="/polityka-prywatnosci" className="text-amber-600 hover:underline font-medium">{t("cookieConsent", "privacyLink")}</Link>.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                                    >
                                        {t("cookieConsent", "acceptAll")}
                                    </button>
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
                                    >
                                        {t("cookieConsent", "customize")}
                                    </button>
                                    <button
                                        onClick={handleDeclineAll}
                                        className="px-4 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-medium transition-colors"
                                    >
                                        {t("cookieConsent", "decline")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t("cookieConsent", "settingsTitle")}</h3>
                                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600" aria-label={t("cookieConsent", "back")}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white text-sm">{t("cookieConsent", "necessary")}</p>
                                        <p className="text-xs text-slate-500">{t("cookieConsent", "necessaryDesc")}</p>
                                    </div>
                                    <input type="checkbox" checked disabled className="accent-amber-500 w-5 h-5" aria-label={t("cookieConsent", "necessary")} />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white text-sm">{t("cookieConsent", "analytics")}</p>
                                        <p className="text-xs text-slate-500">{t("cookieConsent", "analyticsDesc")}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                        className="accent-amber-500 w-5 h-5 cursor-pointer"
                                        aria-label={t("cookieConsent", "analytics")}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white text-sm">{t("cookieConsent", "marketing")}</p>
                                        <p className="text-xs text-slate-500">{t("cookieConsent", "marketingDesc")}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                        className="accent-amber-500 w-5 h-5 cursor-pointer"
                                        aria-label={t("cookieConsent", "marketing")}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSavePreferences}
                                    className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                                >
                                    {t("cookieConsent", "save")}
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
                                >
                                    {t("cookieConsent", "acceptAll")}
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

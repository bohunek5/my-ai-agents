"use client";

import { useState, useEffect } from "react";

import { getAssetPath } from "@/utils/assetPath";

interface BannerData {
    content: {
        headline: string;
        subheadline: string;
        ctaText: string;
        headlineColor: string;
        subheadlineColor: string;
        ctaBgColor: string;
        ctaTextColor: string;
        productName?: string;
    };
    colors: {
        accent: string;
        background: string;
    };
}

export function SkorupkiPopupClient() {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState<BannerData | null>(null);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem("seen-skorupki-popup", "true");
    };

    useEffect(() => {
        // Opóźnienie startu
        const timer = setTimeout(() => {
            // Sprawdzenie sesji (zakomentować dla testów ciągłych)
            // if (!sessionStorage.getItem("seen-skorupki-popup")) {
            setIsVisible(true);
            // }
        }, 1500);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };

        if (isVisible) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        console.log("Fetching popup data...");
        fetch(getAssetPath("/skorupki-popup.json"))
            .then((res) => {
                if (!res.ok) throw new Error("JSON not found");
                return res.json();
            })
            .then((json) => setData(json))
            .catch((err) => console.error("Popup error:", err));

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isVisible]);

    if (!isVisible || !data) return null;

    const { content } = data;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-500 animate-in fade-in">
            {/* Overlay click */}
            <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-5 duration-500 border border-white/10 group">

                {/* Tło: Obrazek (zastepczy, bo w JSON brak) + Gradient */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={getAssetPath("/images/apartments_2.webp")}
                        alt="Background"
                        className="w-full h-full object-cover transition-transform duration-[2s] scale-105 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                </div>

                {/* Przycisk zamknięcia */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 backdrop-blur-md border border-white/10"
                    aria-label="Zamknij"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                {/* Treść */}
                <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 flex flex-col items-center text-center text-white space-y-6">

                    {/* Badge / Product Name */}
                    {/* Logo MH */}
                    <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-100 mb-8">
                        <img
                            src={getAssetPath("/images/logo-poziom.svg")}
                            alt="Mazury Holiday"
                            className="h-16 md:h-20 w-auto object-contain drop-shadow-xl mx-auto"
                        />
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-5xl font-sans font-medium leading-tight drop-shadow-2xl animate-in fade-in zoom-in-50 duration-700 delay-200">
                        {content.headline || "Dzień Kobiet: Promocja w Stranda Residence 🌷"}
                    </h2>

                    {/* Subheadline */}
                    <p className="text-base md:text-lg text-slate-200 font-light max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        {content.subheadline || "Świętuj 8 Marca w wyjątkowym stylu. Skorzystaj z oferty specjalnej na luksusowe apartamenty nad jeziorem Kisajno."}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <button
                            onClick={() => {
                                handleClose();
                                window.location.href = "/apartamenty/stranda";
                            }}
                            className="group relative px-8 py-3.5 rounded-full font-bold text-sm md:text-base transition-all hover:shadow-[0_0_20px_rgba(0,113,227,0.5)] hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
                            style={{
                                backgroundColor: "#F59E0B",
                                color: "#0f172a"
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {content.ctaText || "Zobacz Promocję (Stranda)"}
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </span>
                            {/* Efekt połysku */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

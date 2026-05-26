"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

import { getAssetPath } from "@/utils/assetPath";

const locations = [
    {
        title: "Apartamenty Stranda Residence & Czarter",
        address: "Pierkunowo 36, 11-500 Giżycko",
        mapQuery: "Apartamenty+Stranda+Residence+Gizycko",
    },
    {
        title: "Apartamenty Kisajno",
        address: "Aleja Wojska Polskiego 35, 11-500 Giżycko (Port Neptun)",
        mapQuery: "Port+Neptun+Gizycko+Aleja+Wojska+Polskiego+35",
    },
    {
        title: "Apartamenty i Pokoje Fuleda",
        address: "Fuleda 5, 11-500 Fuleda",
        mapQuery: "Apartamenty+Fuleda",
    },
    {
        title: "Domki Skorupki",
        address: "Skorupki 213",
        mapQuery: "Domki+Skorupki+213",
    },
    {
        title: "Apartament Mikołajki",
        address: "Mikołajki",
        mapQuery: "Mikolajki",
    },
];

export default function ContactPage() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                setStatus("error");
                console.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getAssetPath('/images/hero-mazury-holiday-final.webp')}')` }}
                />
                <div className="relative z-20 text-center text-white p-4">
                    <h1 className="text-4xl md:text-7xl font-sans mb-4">{t("nav", "contact")}</h1>
                    <p className="text-xl md:text-3xl font-light">Skontaktuj się z nami</p>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="bg-slate-100 dark:bg-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                        <a href="tel:+48730067027" className="flex items-center space-x-3 text-2xl font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap">
                            <Phone className="w-8 h-8 text-amber-500" />
                            <span>730 067 027</span>
                        </a>
                        <a href="mailto:rezerwacje@mazury.holiday" className="flex items-center space-x-3 text-2xl font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">
                            <Mail className="w-8 h-8 text-amber-500" />
                            <span>rezerwacje@mazury.holiday</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Maps Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {locations.map((loc, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="p-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white mb-2">{loc.title}</h3>
                                <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400">
                                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-amber-500" />
                                    <span>{loc.address}</span>
                                </div>
                            </div>
                            <div className="h-80 w-full relative bg-slate-200">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    title={`${t("contactExtra", "mapLabel")} ${loc.title}`}
                                    src={`https://maps.google.com/maps?q=${loc.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    frameBorder="0"
                                    scrolling="no"
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-800"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white mb-4">
                                {t("contactForm", "title")}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                {t("contactForm", "subtitle")}
                            </p>
                        </div>

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t("contactForm", "success")}
                                </h3>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 text-amber-500 font-bold hover:underline"
                                >
                                    Wyślij kolejną wiadomość
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                            {t("contactForm", "name")}
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                            {t("contactForm", "email")}
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="jan@kowalski.pl"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                            {t("contactForm", "phone")}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="+48 ..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                            {t("contactForm", "subject")}
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="subject"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                        {t("contactForm", "message")}
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        name="message"
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900 dark:text-white resize-none"
                                        placeholder="..."
                                    ></textarea>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <input
                                        type="checkbox"
                                        required
                                        id="rodo"
                                        name="rodo"
                                        className="mt-1 w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500 dark:border-slate-600 dark:bg-slate-700"
                                    />
                                    <label htmlFor="rodo" className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed cursor-pointer">
                                        Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z ustawą o ochronie danych osobowych w związku z wysłaniem zapytania przez formularz kontaktowy. Podanie danych jest dobrowolne, ale niezbędne do przetworzenia zapytania. Administratorem danych osobowych jest RAD'LIGHT, Myśliwska 3, 11-500 Giżycko.
                                    </label>
                                </div>

                                <button
                                    disabled={status === "sending"}
                                    type="submit"
                                    className="w-full py-5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 text-white rounded-2xl font-bold text-lg shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3"
                                >
                                    {status === "sending" ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            {t("contactForm", "sending")}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t("contactForm", "send")}
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

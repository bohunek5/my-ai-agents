"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, CheckCircle, ShieldCheck } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function KontaktPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || !consent) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
    setConsent(false);
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero pageId="kontakt"
        title={t("Contact", "title")}
        subtitle="Zadzwoń, napisz albo zapytaj o termin czarteru Stillo 31 i dostępność dodatkowego sprzętu."
        eyebrow="Porozmawiajmy"
        image="/images/gallery/5S5A6968.webp"
      />
      <div className="container mx-auto px-4 max-w-6xl pt-2 pb-8 md:py-16">

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Info Card - Mazury Aktywnie Sztynort */}
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 flex flex-col justify-between transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("Contact", "detailsTitle")}
              </h2>
              
              <div className="space-y-4">
                {/* Phone */}
                <a 
                  href="tel:608043958" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 dark:bg-gray-900/40 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200 transition-colors group"
                >
                  <div className="p-3 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-xl group-hover:scale-105 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {t("Contact", "phone")}
                    </span>
                    <span className="text-lg font-bold">608 043 958</span>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:kontakt@mazuryaktywnie.com.pl" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 dark:bg-gray-900/40 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200 transition-colors group"
                >
                  <div className="p-3 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-xl group-hover:scale-105 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {t("Contact", "email")}
                    </span>
                    <span className="text-base md:text-lg font-bold break-all">kontakt@mazuryaktywnie.com.pl</span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200">
                  <div className="p-3 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-xl shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Adres / Port stacjonowania
                    </span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">Mazury Aktywnie</span>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Port Sztynort, Sztynort 10, 11-600 Węgorzewo</p>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              Biuro czynne w sezonie czarterowym (maj - wrzesień) przez 7 dni w tygodniu w godzinach 8:00 - 20:00.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-3xl rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgb(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 transition-all">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Contact", "formTitle")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              {t("Contact", "formDesc")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="contact-name">
                  {t("Contact", "nameLabel")}
                </label>
                <input 
                  type="text" 
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                  placeholder="np. Jan Kowalski"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="contact-email">
                  {t("Contact", "emailLabel")}
                </label>
                <input 
                  type="email" 
                  id="contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                  placeholder="np. jan.kowalski@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="contact-message">
                  {t("Contact", "messageLabel")}
                </label>
                <textarea 
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold resize-none transition-all outline-none"
                  placeholder="Wpisz treść wiadomości..."
                />
              </div>

              {/* RODO consent */}
              <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <input 
                  type="checkbox" 
                  id="contact-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="contact-consent" className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer select-none">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <Link href="/rodo" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Regulaminem Świadczenia Usług</Link> oraz <Link href="/polityka-prywatnosci" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Polityką Prywatności (RODO)</Link> w celu obsługi zapytania.
                </label>
              </div>

              {/* Feedback messages */}
              {status === "success" && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-sm font-bold flex items-center gap-3">
                  <CheckCircle size={20} />
                  <span>{t("Contact", "sendSuccess")}</span>
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/50 text-sm font-bold">
                  {t("Contact", "validationError")}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all cursor-pointer flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Send size={18} />
                <span className="text-lg">{t("Contact", "sendBtn")}</span>
              </button>

            </form>
          </div>

        </div>

        {/* Embedded Map */}
        <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10">
          <iframe 
            src="https://maps.google.com/maps?q=Port%20Sztynort%2C%20Sztynort%2010%2C%2011-600%20W%C4%99gorzewo&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="350" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa lokalizacji portu w Sztynorcie na Mazurach"
            className="w-full dark:opacity-85"
          />
        </div>

      </div>
    </div>
  );
}

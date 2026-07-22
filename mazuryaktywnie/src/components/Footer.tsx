"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { Bike, FileText, Mail, MapPin, Phone, Ship, Waves } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin-ext'] });

const SunLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-yellow-500 drop-shadow-md transition-colors duration-300">
    <g className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: "50px 50px" }}>
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" fill="none" />
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
    <circle cx="50" cy="50" r="30" fill="currentColor" />
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

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors border-t border-gray-200 dark:border-white/10">
      {/* EU BANNER ABOVE FOOTER CONTENT */}
      <div className="container mx-auto px-4 pt-8">
        <Link href="/fundusze" className="block w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 transition-all rounded-[2.5rem] p-6 sm:p-8 shadow-xl group border border-blue-500/30">
          <div className="flex flex-col items-center justify-center gap-6">
             <div className="relative h-20 sm:h-24 w-full max-w-2xl rounded-2xl bg-white p-4 shadow-sm group-hover:scale-[1.02] transition-transform">
               <Image 
                  src="/images/assets/stopka_loga.webp" 
                  alt="Logotypy Unii Europejskiej" 
                  fill
                  className="object-contain p-2"
                />
             </div>
             <div className="text-center max-w-3xl">
                <p className="text-sm sm:text-base font-medium text-white/90">
                  {t("Footer", "euBanner")}
                </p>
                <span className="text-sm text-blue-200 group-hover:text-white font-bold uppercase tracking-widest mt-3 inline-block transition-colors">
                  {t("Footer", "euButton")}
                </span>
             </div>
          </div>
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-10 py-14">
          <div className="space-y-6">
            <Link 
              href="/" 
              className="flex items-center focus-visible:ring-2 group relative w-12 h-12 sm:w-[150px] md:w-[190px] sm:h-16"
              aria-label="Mazury Aktywnie - Strona Główna"
            >
              <div className="absolute left-0 sm:left-[50px] md:left-[70px] group-hover:sm:-left-6 transition-all duration-500 sm:delay-300 group-hover:sm:delay-0 ease-in-out z-10 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                <SunLogo />
              </div>
              <div className={`hidden sm:flex items-center sm:pl-[44px] md:pl-[64px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-0 group-hover:delay-400 whitespace-nowrap absolute sm:-left-6 inset-y-0 ${montserrat.className}`}>
                <div className="text-lg md:text-xl font-black tracking-tight flex items-center gap-1.5 pl-1">
                  <span className="text-slate-900 dark:text-white drop-shadow-sm">MAZURY</span>
                  <span className="text-yellow-500 drop-shadow-sm">AKTYWNIE</span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {t("Footer", "desc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
              {[
                { icon: <Ship size={18} />, label: "Stillo 31", href: "/stillo" },
                { icon: <Waves size={18} />, label: "SUP", href: "/oferta#sup" },
                { icon: <Bike size={18} />, label: "Rowery", href: "/oferta#rowery" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-3 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="text-blue-600 dark:text-blue-400">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-[0.18em] text-xs">
              {t("Footer", "contactTitle")}
            </h3>
            <div className="space-y-3 text-sm">
              <a 
                href="tel:608043958" 
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                aria-label="Zadzwoń pod numer: 608 043 958"
              >
                <Phone size={17} className="text-blue-600 dark:text-blue-400" />
                <span>608 043 958</span>
              </a>
              <a 
                href="mailto:kontakt@mazuryaktywnie.com.pl" 
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                aria-label="Wyślij e-mail na adres: kontakt@mazuryaktywnie.com.pl"
              >
                <Mail size={17} className="text-blue-600 dark:text-blue-400" />
                <span>kontakt@mazuryaktywnie.com.pl</span>
              </a>
              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                <MapPin size={17} className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>Port Sztynort, Sztynort 10<br/>11-600 Węgorzewo</span>
              </div>
            </div>
            <Link
              href="/reservation"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
            >
              {t("Footer", "bookOnline")}
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-[0.18em] text-xs">
              {t("Footer", "legalTitle")}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { href: "/polityka-prywatnosci", label: t("Footer", "termsAndPrivacy"), icon: <FileText size={15} /> },
                { href: "/rodo", label: t("Footer", "rodoClause"), icon: <FileText size={15} /> },
                { href: "/fundusze", label: t("Footer", "euFunds"), icon: <FileText size={15} /> },
                { href: "/audyt-wcag", label: t("Footer", "wcag"), icon: <FileText size={15} /> },
                { href: "/admin", label: t("Footer", "adminCms"), icon: <FileText size={15} /> },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                  <span className="text-blue-600/50 dark:text-blue-400/50">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 py-6 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            <strong>Mazury Aktywnie</strong> • Port Sztynort, Sztynort 10, 11-600 Węgorzewo
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Mazury Aktywnie. Wszelkie prawa zastrzeżone. Płatności online obsługuje Przelewy24. Zgodność z WCAG 2.1 AA.
          </p>
        </div>
      </div>
    </footer>
  );
}


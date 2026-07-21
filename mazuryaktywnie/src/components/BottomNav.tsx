"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, Info, CalendarCheck, Ship, Image as ImageIcon, Phone, Shield } from "lucide-react";

export default function BottomNav() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const allLinks = [
    { href: "/", label: "Start", icon: <Home size={22} /> },
    { href: "/oferta", label: "Oferta", icon: <Info size={22} /> },
    { href: "/reservation", label: "Rezerwacja", icon: <CalendarCheck size={22} /> },
    { href: "/stillo", label: t("Navigation", "stillo31"), icon: <Ship size={22} /> },
    { href: "/galeria", label: t("Navigation", "gallery"), icon: <ImageIcon size={22} /> },
    { href: "/kontakt", label: t("Navigation", "contact"), icon: <Phone size={22} /> },
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 z-40 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      {/* Hide scrollbar with custom classes: no-scrollbar is usually a custom utility, but standard tailwind doesn't have it out of the box, we can use [&::-webkit-scrollbar]:hidden */}
      <div className="flex items-center h-20 px-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {allLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="flex flex-col items-center justify-center min-w-[72px] sm:min-w-[80px] h-full active:scale-95 transition-transform snap-center shrink-0"
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive(link.href) ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 -translate-y-1" : "text-slate-500 dark:text-slate-400 bg-transparent"}`}>
              {link.icon}
            </div>
            <span className={`text-[9px] sm:text-[10px] mt-1 transition-all ${isActive(link.href) ? "font-bold text-blue-700 dark:text-blue-400" : "font-medium text-slate-500"}`}>
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

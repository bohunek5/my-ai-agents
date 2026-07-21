"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { language } = useLanguage();
  const t = translations[language].FAQ;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 relative transition-colors overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50 dark:bg-slate-950 -z-20" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-400/10 dark:bg-cyan-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <p className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-1.5 text-sm font-bold text-blue-700 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800/50">
            Często zadawane pytania
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
        </div>
        
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${
                  isOpen 
                    ? 'bg-white/90 dark:bg-slate-900/90 border-blue-300 dark:border-blue-700 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl' 
                    : 'bg-white/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-900/60 hover:border-blue-200 dark:hover:border-blue-800 backdrop-blur-sm'
                }`}
              >
                {/* Subtle highlight gradient when open */}
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-cyan-400 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-6 sm:px-8 sm:py-7 flex items-center justify-between gap-6 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-300'}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30'}`}>
                    <ChevronDown size={20} className="transition-transform duration-500" />
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 pt-0 sm:px-8 text-slate-600 dark:text-slate-300/90 text-base md:text-lg">
                      <p className="leading-relaxed relative pl-4 border-l-2 border-slate-200 dark:border-slate-700/50">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

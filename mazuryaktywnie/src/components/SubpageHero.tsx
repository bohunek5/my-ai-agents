"use client";

import React from "react";

import Image from "next/image";
import { Caveat, Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const handwriting = Caveat({ 
  weight: '700', 
  subsets: ['latin-ext'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: '900',
  subsets: ['latin-ext'],
  display: 'swap',
});

type SubpageHeroProps = {
  title: React.ReactNode;
  subtitle?: string;
  eyebrow?: React.ReactNode;
  image: string;
  align?: "center" | "left";
  pageId?: string;
};

export default function SubpageHero({
  title: initialTitle,
  subtitle: initialSubtitle,
  eyebrow,
  image: initialImage,
  align = "center",
  pageId,
}: SubpageHeroProps) {
  const [subtitle, setSubtitle] = React.useState(initialSubtitle);
  const [title, setTitle] = React.useState(initialTitle);
  const [image, setImage] = React.useState(initialImage);

  React.useEffect(() => {
    if (pageId && typeof window !== "undefined") {
      const saved = localStorage.getItem(`cms_${pageId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.subtitle) setSubtitle(parsed.subtitle);
          if (parsed.title) setTitle(parsed.title);
          if (parsed.image) setImage(parsed.image);
        } catch (e) {
          // Fallback if someone had just a string saved
          setSubtitle(saved);
        }
      }
    }
  }, [pageId]);

  return (
    <section className="relative min-h-[80dvh] md:min-h-[100dvh] flex flex-col justify-end items-center overflow-hidden pt-32 md:pt-0">
      <div className="absolute inset-0 z-0">
        <Image
          src={image || "/images/gallery/5S5A6952.webp"}
          alt={typeof title === 'string' ? title : "Mazury Aktywnie"}
          fill
          className="object-cover object-[center_30%] md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-900/40 to-transparent" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-20 md:pb-48 flex flex-col items-start">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur-md rounded-full text-blue-300 font-bold tracking-widest text-xs uppercase mb-6 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            {eyebrow}
          </div>
        )}
        
        <h1 className={`${montserrat.className} text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-black text-white uppercase tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4 md:mb-6 flex flex-row flex-wrap gap-x-3 md:gap-x-8`}>
          {typeof title === 'string' ? (() => {
            let globalCharIndex = 0;
            return title.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="flex flex-wrap">
                {word.split('').map((char, cIdx) => {
                  const delay = globalCharIndex * 0.15;
                  globalCharIndex++;
                  return (
                    <motion.span
                      key={cIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay }}
                      className={char === ' ' ? 'w-3 md:w-6 lg:w-8' : ''}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ));
          })() : (
            title
          )}
        </h1>

        {subtitle && (
          <p className={`${montserrat.className} text-lg md:text-2xl text-white font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-4xl leading-relaxed`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

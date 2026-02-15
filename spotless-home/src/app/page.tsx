"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Sparkles, Star,
  Calendar,
  Users,
  Droplets, Heart, Zap,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWizard } from "@/components/BookingWizard";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const visualizations = [
    { title: "Minimalistyczny Salon", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", desc: "Perfekcja w każdym detalu." },
    { title: "Nowoczesna Kuchnia", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", desc: "Higiena na najwyższym poziomie." },
    { title: "Luksusowa Łazienka", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800", desc: "Twoja oaza spokoju." },
    { title: "Przestrzeń Biurowa", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", desc: "Produktywność w czystym otoczeniu." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-[101]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 py-1.5 px-6 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold border-teal-100 dark:border-teal-900/50 inline-flex items-center gap-2">
                <Star className="w-4 h-4 fill-teal-700 dark:fill-teal-400" /> Najlepszy serwis sprzątający na Mazurach
              </Badge>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.95] mb-8">
                Czysty Dom w <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">3 Kliknięcia.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                Rewolucjonizujemy rynek sprzątania. Wybierz profesjonalizm, na który zasłużysz. Szybka rezerwacja, nieskazitelne efekty.
              </p>
            </motion.div>
          </div>

          <motion.div
            id="booking"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="bg-slate-900 dark:bg-black p-6 md:p-10 flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
                      <Image
                        src={`https://i.pravatar.cc/150?img=${i + 40}`}
                        alt="Cleaner"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-black text-lg">Gwarantowana Dostępność</p>
                  <p className="text-slate-400 text-sm font-medium">Nasze ekipy są gotowe do działania 24/7</p>
                </div>
              </div>
              <div className="flex gap-12 lg:gap-20">
                <div className="text-center md:text-left group cursor-default">
                  <p className="text-3xl lg:text-4xl font-black text-white group-hover:text-teal-400 transition-colors">4.98/5</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Ocena Klientów</p>
                </div>
                <div className="text-center md:text-left group cursor-default">
                  <p className="text-3xl lg:text-4xl font-black text-white group-hover:text-teal-400 transition-colors">100%</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Bezpieczeństwa</p>
                </div>
              </div>
            </div>

            <BookingWizard />
          </motion.div>
        </div>

        {/* Floating elements for life */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-teal-500/10 dark:text-teal-400/5"
        >
          <Droplets size={200} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-10 text-blue-500/10 dark:text-blue-400/5"
        >
          <Zap size={180} />
        </motion.div>
      </section>

      {/* Visualizations Section */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-2 border-0">Standard Premium</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Zasmakuj najwyższej <br /><span className="text-teal-600">jakości czystości.</span></h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-sm">Dbamy o każdą powierzchnię, używając specjalistycznych środków i nowoczesnego sprzętu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visualizations.map((v, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-default"
              >
                <Image
                  src={v.img}
                  alt={v.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-black text-white mb-2">{v.title}</h3>
                  <p className="text-slate-300 font-medium">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900 dark:bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {[
            { label: "Domów Miesięcznie", val: "2,500+", icon: Heart },
            { label: "Wykwalifikowanych Osób", val: "180+", icon: Users },
            { label: "Zaoszczędzonych Godzin", val: "45,000", icon: Zap },
            { label: "Eko-Środków (kg)", val: "600", icon: Leaf }
          ].map((stat, i) => (
            <motion.div key={i} {...fadeIn} className="text-center group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-500 mx-auto mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                <stat.icon size={32} />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.val}</p>
              <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">Jak to działa?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">System CzystyDom został zaprojektowany tak, aby zminimalizować Twój wysiłek. Zobacz 3 kroki do idealnego domu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Szybka Rezerwacja", desc: "Wymierasz termin, zakres i dodatki. Płatność online w sekundy.", icon: Calendar, color: "teal" },
              { step: "02", title: "Dopasowanie Specjalisty", desc: "Nasz algorytm wybiera najlepszego pracownika w Twojej okolicy.", icon: Users, color: "blue" },
              { step: "03", title: "Ciesz się Efektem", desc: "Relaksujesz się, gdy my sprawiamy, że Twój dom lśni jak nowy.", icon: Sparkles, color: "purple" }
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="relative group pt-12"
              >
                <div className="text-[12rem] font-black text-slate-200 dark:text-slate-900/50 absolute top-0 left-0 leading-none select-none -z-10 group-hover:text-teal-500/10 transition-colors duration-500">{item.step}</div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none hover:shadow-2xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-8">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white text-center mb-24 tracking-tight leading-tight">Dołącz do <span className="text-teal-600">tysięcy rodzin</span>,<br /> które nam zaufały.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Anna Kowalska", loc: "Warszawa", text: "Nigdy nie sądziłam, że sprzątanie może być tak łatwe do zamówienia. Efekt przeszedł moje oczekiwania!" },
              { name: "Marek Nowak", loc: "Kraków", text: "Profesjonalizm w każdym calu. Specjalistka przyjechała punktualnie i była niesamowicie dokładna." },
              { name: "Julia Wiśniewska", loc: "Gdańsk", text: "Spotless to teraz mój stały partner. Dom lśni, a ja mam czas dla dzieci. Polecam każdemu!" }
            ].map((testimonial, id) => (
              <motion.div
                key={id}
                {...fadeIn}
                transition={{ delay: id * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} className="fill-teal-500 text-teal-500" />)}
                </div>
                <p className="text-lg text-slate-700 dark:text-slate-300 font-bold italic leading-relaxed mb-10">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="w-14 h-14 rounded-full border-2 border-teal-500 shadow-lg relative overflow-hidden flex-shrink-0">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${id + 50}`}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-black">{testimonial.name}</p>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{testimonial.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeIn}
            className="bg-teal-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-teal-500/40"
          >
            <div className="relative z-10 max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tight">Gotowy na Idealną <br />Czystość?</h2>
              <p className="text-xl md:text-2xl text-teal-50 font-bold mb-14 opacity-90 max-w-2xl mx-auto">Dołącz do 12,000+ zadowolonych rodzin i odzyskaj swój czas wolny już dziś.</p>
              <Button
                size="lg"
                className="rounded-full px-16 h-20 text-xl font-black bg-white text-teal-600 hover:bg-teal-50 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Zarezerwuj Termin
              </Button>
            </div>

            {/* Visual background details for CTA */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[-20%] left-[-10%] text-white/10 rotate-12"><Sparkles size={400} /></div>
              <div className="absolute bottom-[-20%] right-[-10%] text-white/10 -rotate-12"><Heart size={500} /></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

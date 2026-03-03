"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Sparkles, Star,
  Calendar,
  Users,
  Droplets, Heart, Zap,
  Leaf, Home, Briefcase, Building2, Waves,
  Ship, Warehouse, ShieldCheck, ClipboardCheck
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { BookingWizard } from "@/components/BookingWizard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function LandingPage() {

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const niches = [
    { id: "residential", label: "Dla Domu", icon: Home, bg: "bg-teal-500", shadow: "shadow-teal-500/20", letter: "D" },
    { id: "business", label: "Dla Biznesu", icon: Briefcase, bg: "bg-blue-600", shadow: "shadow-blue-600/20", letter: "B" },
    { id: "hotels", label: "Dla Hoteli", icon: Building2, bg: "bg-purple-600", shadow: "shadow-purple-600/20", letter: "H" },
    { id: "yachts", label: "Jachty", icon: Ship, bg: "bg-sky-500", shadow: "shadow-sky-500/20", letter: "J" },
    { id: "industrial", label: "Hale", icon: Warehouse, bg: "bg-indigo-600", shadow: "shadow-indigo-600/20", letter: "L" },
    { id: "special", label: "Specjalistyczne", icon: Waves, bg: "bg-emerald-600", shadow: "shadow-emerald-600/20", letter: "S" }
  ];


  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const visualizations = [
    { title: "Minimalistyczny Salon", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", desc: "Perfekcja w każdym detalu." },
    { title: "Luksusowe Jachty", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800", desc: "Nieskazitelna czystość na wodzie." },
    { title: "Nowoczesne Biura", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", desc: "Produktywność w czystym otoczeniu." },
    { title: "Hale Przemysłowe", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", desc: "Zarządzanie czystością na dużą skalę." },
    { title: "Sektor Hotelowy", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", desc: "Zgodność ze standardami 5*." },
    { title: "Prywatne Apartamenty", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800", desc: "Twoja oaza spokoju i świeżości." }
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
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-teal-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-float-delayed" />
          <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge variant="secondary" className="mb-8 py-3 px-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl text-slate-800 dark:text-slate-200 font-black border-slate-200 dark:border-slate-800 shadow-2xl inline-flex items-center gap-3 group cursor-default hover:scale-105 transition-transform text-xs md:text-sm">
                PROFESJONALNY SERWIS PORZĄDKOWY
              </Badge>
              <h1 className="text-5xl md:text-[8rem] font-[1000] text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-12 relative py-12 px-4 overflow-visible uppercase">
                Standard <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-600 px-4">
                  Perfekcji.
                  <Sparkles className="absolute -top-8 md:-top-16 -right-6 md:-right-12 w-10 md:w-16 h-10 md:h-16 text-teal-400 animate-sparkle" />
                  <Sparkles className="absolute -bottom-6 md:-bottom-10 -left-8 md:-left-16 w-6 md:w-10 h-6 md:h-10 text-blue-400 animate-sparkle [animation-delay:0.7s]" />
                </span>
              </h1>



              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold leading-tight max-w-2xl mx-auto mb-16 tracking-tight px-4 flex flex-col items-center">
                <span>Usługi Sprzątające dla Domu i Biznesu.</span>
                <span className="opacity-70 text-base md:text-lg">Przejrzysty model współpracy i gwarancja terminowości.</span>
              </p>


              {/* Niche Quick Links - Improved Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24 relative z-20 px-4">
                {niches.map((niche, i) => (
                  <Link key={i} href={`/oferta?cat=${niche.id}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + (i * 0.1), type: "spring" }}
                      className="relative group cursor-pointer"
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10rem] font-black text-slate-200 dark:text-slate-900/10 select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 group-hover:-top-20 hidden md:block">
                        {niche.letter}
                      </div>
                      <div className={`flex items-center gap-4 px-8 py-5 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 hover:scale-105 active:scale-95 transition-all duration-300 relative z-10 animate-shine h-full`}>
                        <div className={`w-12 h-12 rounded-2xl ${niche.bg} flex items-center justify-center text-white shadow-xl ${niche.shadow} group-hover:rotate-12 transition-transform shrink-0`}>
                          <niche.icon size={24} />
                        </div>
                        <div className="flex flex-col items-start leading-none text-left">
                          <span className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Kategoria</span>
                          <span className="font-black text-base tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors whitespace-nowrap">{niche.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}

              </div>


            </motion.div>
          </div>

          <motion.div
            id="booking"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[4rem] shadow-[0_64px_128px_-16px_rgba(20,184,166,0.15)] dark:shadow-none border border-white dark:border-slate-800 p-2 md:p-4 overflow-hidden group relative"
          >
            {/* Extreme Clean Shine over the whole container */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 via-transparent to-purple-500/5 pointer-events-none" />

            <div className="bg-slate-950 dark:bg-black rounded-[3.2rem] p-8 md:p-14 flex flex-col lg:flex-row justify-between items-center gap-10 relative overflow-hidden animate-shine">

              {/* Background glow for the bar */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/10 blur-[100px] pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 w-full lg:w-auto">
                <div className="flex -space-x-5">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-16 h-16 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl relative transition-transform hover:-translate-y-2 cursor-pointer">
                      <Image
                        src={`https://i.pravatar.cc/150?img=${i + 20}`}
                        alt="Specialist"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center md:text-left">
                  <p className="text-white font-black text-2xl tracking-tighter leading-none mb-1">Zespół SPOTLESS</p>
                  <p className="text-teal-500 text-sm font-black uppercase tracking-widest">Profesjonalizm zweryfikowany przez standardy ISO</p>
                </div>
              </div>

              <div className="flex gap-10 lg:gap-16 relative z-10">
                <div className="text-center group cursor-default">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <p className="text-4xl lg:text-5xl font-black text-white group-hover:text-teal-400 transition-colors">4.99</p>
                    <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Średnia Ocena</p>
                </div>
                <div className="text-center group cursor-default">
                  <p className="text-4xl lg:text-5xl font-black text-white group-hover:text-teal-400 transition-colors">15k+</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Realizacji</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-8 md:px-12 md:py-12">
              <BookingWizard />
            </div>
          </motion.div>
        </div>

        {/* Floating elements with improved motion */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[10%] text-teal-500/20 dark:text-teal-400/10 pointer-events-none"
        >
          <Droplets size={160} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 60, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] right-[15%] text-blue-500/20 dark:text-blue-400/10 pointer-events-none"
        >
          <Sparkles size={140} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">Proces Obsługi</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">System SPOTLESS został zaprojektowany tak, aby zapewnić pełną transparentność i najwyższą efektywność działań.</p>
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

      {/* Technology Section */}
      <section className="py-32 bg-slate-900 dark:bg-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <Badge className="mb-6 bg-teal-500 text-white rounded-full px-6 py-2 border-0">Technologia 2026</Badge>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                Utrzymanie Czystości <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Obiektowej.</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                Wdrażamy zaawansowane procesy utrzymania czystości, wykorzystując profesjonalne zaplecze techniczne oraz środki zgodne z europejskimi normami bezpieczeństwa.
              </p>

              <div className="space-y-8">
                {[
                  { title: "Odpylanie Przemysłowe", desc: "Praca na profesjonalnych jednostkach ssących wysokiej mocy.", icon: ShieldCheck },
                  { title: "Raportowanie i Kontrola", desc: "Dokumentacja powykonawcza zgodna z wewnętrznymi procedurami QA.", icon: ClipboardCheck },
                  { title: "Chemia Obiektowa", desc: "Zastosowanie preparatów dedykowanych do konkretnych powierzchni.", icon: Leaf }
                ].map((tech, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                      <tech.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{tech.title}</h4>
                      <p className="text-slate-500 font-medium">{tech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-teal-500/20 blur-[120px] rounded-full animate-pulse" />
              <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                  alt="Tech"
                  width={800}
                  height={1000}
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10">
                  <p className="text-teal-400 font-black text-xs uppercase tracking-widest mb-2">Status Systemu</p>
                  <div className="flex justify-between items-end">
                    <p className="text-white text-2xl font-black">Realizacja Standardu: 100%</p>
                    <div className="flex gap-2">
                      <div className="w-2 h-8 bg-teal-500 rounded-full animate-bounce" />
                      <div className="w-2 h-12 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-6 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div >
      </section >

      <section id="testimonials" className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white text-center mb-24 tracking-tight leading-tight">Dołącz do <span className="text-teal-600">tysięcy rodzin</span>,<br /> które nam zaufały.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Anna Kowalska", loc: "Inwestor", text: "Profesjonalne podejście do zarządzania czystością w pakiecie najmu krótkoterminowego. Niezawodny partner biznesowy." },
              { name: "Marek Nowak", loc: "Właściciel Firmy", text: "Standardy SPOTLESS całkowicie zmieniły atmosferę w naszym biurze. Czystość i profesjonalizm na każdym kroku." },
              { name: "Julia Wiśniewska", loc: "Prywatny Apartament", text: "Bezpieczeństwo, zaufanie i perfekcja. Najlepszy serwis, z jakiego miałam okazję korzystać." }
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
    </div >
  );
}

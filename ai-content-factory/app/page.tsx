"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image"; // Removed unused import
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, FileText, Video, UploadCloud,
  Sparkles, CheckCircle2, Copy, Share2,
  Linkedin, Twitter, Mail, FileEdit,
  Zap, Clock, ArrowRight
} from "lucide-react";
import clsx from "clsx";

// --- Mock Content Generation ---
const MOCK_RESULTS = {
  blog: {
    title: "Skalowanie Biznesu: 5 Kluczowych Lekcji z 2026",
    content: "W dzisiejszym dynamicznym świecie, skalowanie to nie tylko wzrost przychodów, ale optymalizacja procesów...",
    tags: ["#BusinessGrowth", "#AI", "#Strategy"]
  },
  linkedin: "🚀 Czy Twój biznes jest gotowy na AI?\n\nWłaśnie przeanalizowałem najnowsze trendy i wnioski są jasne: automatyzacja to klucz. \n\n👉 3 rzeczy, które musisz wdrożyć dzisiaj:\n1. Content Factory\n2. Automatyzacja leadów\n3. Personalizacja masowa\n\n#AI #Automation #Business2026",
  twitter: [
    "AI nie zabierze Ci pracy. Zabierze ją ktoś, kto używa AI lepiej od Ciebie. 🤖💡 #FutureOfWork",
    "Automatyzacja to nowa supermoc. Jeśli nadal robisz wszystko ręcznie, tracisz czas. ⏳ #Productivity",
    "Skalowanie bez chaosu? To możliwe tylko z odpowiednimi systemami. 📈 #BusinessTips"
  ],
  newsletter: "Temat: Jak zautomatyzować 80% swojej pracy?\n\nCześć!\nDziś krótko o tym, jak odzyskać czas. Narzędzia takie jak nasza Fabryka Treści zmieniają zasady gry..."
};

type ContentType = 'audio' | 'video' | 'text';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultReady, setResultReady] = useState(false);
  const [inputType, setInputType] = useState<ContentType>('audio');
  const [dragActive, setDragActive] = useState(false);

  // Simulation of AI processing
  const handleProcess = () => {
    setIsProcessing(true);
    setProgress(0);
    setResultReady(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResultReady(true);
          return 100;
        }
        return prev + Math.random() * 5; // Random progress jumps
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white font-sans selection:bg-purple-500/30">

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">

        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg glow-box">
              <Sparkles size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Content<span className="text-purple-400">Factory</span>.ai</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
            <span className="hover:text-white cursor-pointer transition-colors">Features</span>
            <span className="hover:text-white cursor-pointer transition-colors">Login</span>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-white transition-all border border-white/10">
              Get Started
            </button>
          </div>
        </header>

        {/* Hero & Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Value Prop */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
                Zamień Głos w <br />
                <span className="animated-gradient-text">Złoto.</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                Nagraj 3 minuty "głosówki". My zrobimy z tego posty na LinkedIn, artykuł na bloga i newsletter. Zero pisania.
              </p>

              <div className="flex gap-4 mb-12">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 size={16} className="text-green-500" /> 10x Szybsze Tworzenie
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 size={16} className="text-green-500" /> SEO Optimized
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleProcess} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] transition-all flex items-center gap-3">
                  <Zap className={isProcessing ? "animate-spin" : ""} />
                  {isProcessing ? "Przetwarzanie..." : "Generuj Kontent"}
                </button>
                <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-4 rounded-xl font-medium transition-all">
                  Zobacz Demo
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Input Interface */}
          <div className="relative">
            {/* Decor elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Tabs */}
              <div className="flex gap-2 mb-8 bg-black/20 p-1 rounded-xl w-fit">
                {(['audio', 'video', 'text'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setInputType(type)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                      inputType === type ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    {type === 'audio' && <Mic size={16} />}
                    {type === 'video' && <Video size={16} />}
                    {type === 'text' && <FileText size={16} />}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div
                className={clsx(
                  "border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center transition-all cursor-pointer relative",
                  dragActive ? "border-purple-500 bg-purple-500/10" : "border-gray-700 hover:border-gray-500 hover:bg-white/5"
                )}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
              >
                {isProcessing ? (
                  <div className="flex flex-col items-center w-full px-12">
                    <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin mb-6"></div>
                    <div className="text-xl font-medium mb-2">Analiza Treści...</div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full loader-bar"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-500 flex justify-between w-full">
                      <span>Wykrywanie tematów</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6">
                      <UploadCloud size={32} className="text-purple-400" />
                    </div>
                    <p className="text-lg font-medium mb-2">Upuść plik tutaj</p>
                    <p className="text-sm text-gray-500">MP3, MP4, WAV (max 500MB)</p>
                    <button className="mt-6 text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-1">
                      lub wybierz plik <ArrowRight size={14} />
                    </button>
                  </>
                )}
              </div>

            </motion.div>
          </div>

        </div>

        {/* Results Section - Shows up after processing */}
        <AnimatePresence>
          {resultReady && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Card 1: Blog */}
              <div className="glass-panel p-6 rounded-2xl hover:glow-box transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400"><FileEdit size={20} /></div>
                  <span className="text-xs font-mono text-gray-500 bg-black/40 px-2 py-1 rounded">BLOG POST</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{MOCK_RESULTS.blog.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4">{MOCK_RESULTS.blog.content}</p>
                <div className="flex gap-2">
                  {MOCK_RESULTS.blog.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded-full text-gray-300">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Card 2: LinkedIn */}
              <div className="glass-panel p-6 rounded-2xl hover:glow-box transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400"><Linkedin size={20} /></div>
                  <span className="text-xs font-mono text-gray-500 bg-black/40 px-2 py-1 rounded">LINKEDIN</span>
                </div>
                <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed mb-4">{MOCK_RESULTS.linkedin}</p>
                <div className="flex justify-end gap-2 text-gray-500">
                  <Copy size={16} className="hover:text-white" />
                  <Share2 size={16} className="hover:text-white" />
                </div>
              </div>

              {/* Card 3: Tweets & Newsletter */}
              <div className="grid grid-rows-2 gap-6">
                <div className="glass-panel p-5 rounded-2xl hover:glow-box transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <Twitter size={16} className="text-sky-400" />
                    <span className="font-bold text-sm">Thread Ideas</span>
                  </div>
                  <ul className="space-y-3">
                    {MOCK_RESULTS.twitter.map((tweet, i) => (
                      <li key={i} className="text-xs text-gray-400 border-l-2 border-gray-700 pl-3 hover:border-sky-500 transition-colors">
                        {tweet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel p-5 rounded-2xl hover:glow-box transition-all cursor-pointer bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex flex-col justify-center items-center text-center">
                  <Mail size={32} className="text-pink-400 mb-2" />
                  <div className="font-bold">Newsletter Ready</div>
                  <p className="text-xs text-gray-400 mt-1">Szkic maila do subskrybentów został wygenerowany.</p>
                  <button className="mt-3 text-xs bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Wyślij Test
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

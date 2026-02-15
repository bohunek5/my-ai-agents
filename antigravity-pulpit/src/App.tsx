import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Palmtree,
  Helicopter,
  Car,
  ParkingCircle,
  GraduationCap,
  Cpu,
  Activity,
  Settings,
  Terminal as TerminalIcon,
  Power,
  ChevronRight,
  User,
  Clock,
  ExternalLink,
  Github,
  Send,
  X,
  Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GITHUB_BASE = "https://github.com/bohunek5/my-ai-agents/tree/main";

const projects = [
  {
    id: 'mazury',
    title: 'Mazury Holiday',
    status: 'Aktywne - Live',
    icon: <Palmtree className="text-cyan-400" />,
    color: 'from-cyan-500/20 to-blue-500/20',
    link: 'http://localhost:3000',
    github: `${GITHUB_BASE}/mazury-holiday`
  },
  {
    id: 'spotless',
    title: 'Spotless Home',
    status: 'Aktywne - Dev',
    icon: <Sparkles className="text-yellow-400" />,
    color: 'from-yellow-500/20 to-amber-500/20',
    link: 'http://localhost:3002',
    github: `${GITHUB_BASE}/spotless-home`
  },
  {
    id: 'helipad',
    title: 'Helipad App',
    status: 'W budowie',
    icon: <Helicopter className="text-purple-400" />,
    color: 'from-purple-500/20 to-pink-500/20',
    link: '#',
    github: `${GITHUB_BASE}/helipadapp`
  },
  {
    id: 'garage',
    title: 'Garage App',
    status: 'Konserwacja',
    icon: <Car className="text-emerald-400" />,
    color: 'from-emerald-500/20 to-teal-500/20',
    link: '#',
    github: `${GITHUB_BASE}/garaz-app`
  },
  {
    id: 'parking',
    title: 'Parking App',
    status: 'Aktywne',
    icon: <ParkingCircle className="text-orange-400" />,
    color: 'from-orange-500/20 to-red-500/20',
    link: '#',
    github: `${GITHUB_BASE}/parking-app`
  },
  {
    id: 'navis',
    title: 'Szkolenia Navis',
    status: 'Archiwalne',
    icon: <GraduationCap className="text-blue-400" />,
    color: 'from-blue-500/20 to-indigo-500/20',
    link: '#',
    github: `${GITHUB_BASE}/szkolenianavis-app`
  }
];

const initialAgents = [
  { name: 'Analityk', status: 'online', wave: true },
  { name: 'Architekt', status: 'online', wave: true },
  { name: 'Promotor', status: 'idle', wave: false },
  { name: 'Pisarz', status: 'online', wave: true },
  { name: 'Mistrz Stitch', status: 'processing', wave: true },
];

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'system', text: 'Stacja ANTIGRAVITY OS v2.0 gotowa...', timestamp: new Date() },
    { type: 'agent', text: 'Witaj Karol! Asystent Antigravity melduje się na stanowisku. Jak mogę Ci dzisiaj pomóc w zarządzaniu Twoim imperium?', timestamp: new Date() }
  ]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const newLogs = [...terminalLogs, { type: 'user', text: terminalInput, timestamp: new Date() }];
    setTerminalLogs(newLogs);
    setTerminalInput('');

    // Simulate agent reaction
    setTimeout(() => {
      setTerminalLogs(prev => [...prev, {
        type: 'agent',
        text: 'Zrozumiałem. Przekazuję wiadomość do głównego modułu AI. Możesz śledzić postępy w naszym głównym czacie!',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 w-full h-full text-white font-sans selection:bg-purple-500/30 flex overflow-hidden">
      <div className="nebula-bg" />

      {/* Sidebar - AI Core Status */}
      <aside className="w-72 glass border-r border-white/5 p-6 flex flex-col hidden lg:flex shrink-0">
        <div className="flex items-center gap-3 mb-10 px-2 text-radiant-violet">
          <Cpu size={24} />
          <h2 className="font-orbitron font-bold tracking-widest text-sm text-[11px]">STATUS RDZENIA AI</h2>
        </div>

        <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {initialAgents.map((agent) => (
            <div key={agent.name} className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">{agent.name}</span>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full shadow-lg",
                  agent.status === 'online' ? "bg-green-500 shadow-green-500/50" :
                    agent.status === 'processing' ? "bg-amber-500 animate-pulse" : "bg-slate-600"
                )} />
              </div>
              {agent.wave && (
                <div className="h-3 flex items-center gap-1 px-2 opacity-30">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [3, 10, 3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-0.5 bg-radiant-violet rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-4 rounded-xl shrink-0">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-radiant-violet to-neon-teal flex items-center justify-center p-[1px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User size={14} className="text-neon-teal" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Antigravity</span>
              <span className="text-[9px] text-slate-500 uppercase tracking-tighter">Asystent Systemowy</span>
            </div>
          </div>
          <button
            onClick={() => setIsTerminalOpen(true)}
            className="w-full mt-4 py-2 bg-radiant-violet/10 hover:bg-radiant-violet/20 border border-radiant-violet/20 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Rozmawiaj z Agentem
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col p-8 md:p-12 overflow-y-auto relative custom-scrollbar">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-orbitron font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-500">
              ANTIGRAVITY OS <span className="text-radiant-violet">v2.0</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-[0.3em] uppercase text-[10px] mt-2 ml-1">
              Centralny Interfejs Dowodzenia / Karol Bohdanowicz
            </p>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-2xl font-orbitron font-medium tracking-wider uppercase">
                {time.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                {time.toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div className="h-12 w-[1px] bg-white/10 hidden sm:block" />
            <div className="p-3 bg-white/5 rounded-full border border-white/10 text-radiant-violet shadow-[0_0_15px_rgba(173,43,238,0.2)]">
              <Activity size={24} />
            </div>
          </div>
        </header>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative block h-full">
                <div className={cn(
                  "p-8 rounded-3xl glass-card relative overflow-hidden h-full min-h-[260px] flex flex-col transition-all duration-500",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 group-hover:before:opacity-100 before:transition-opacity duration-500",
                  project.color
                )}>
                  {/* Glass Reflection */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                  <div className="flex justify-between items-start mb-6 z-10">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-2xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      {project.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {project.status}
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-slate-500 hover:text-white"
                        title="Zobacz na GitHub"
                      >
                        <Github size={14} />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-white mb-2 group-hover:text-amber-400 transition-colors z-10">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-500 mb-6 flex-grow pr-4 z-10">
                    Bezpieczny portal zarządzania dla ekosystemu {project.id}.
                  </p>

                  <div className="mt-auto flex items-center justify-between z-10">
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                      v2.0.4 - STABILNA
                    </span>
                    <a
                      href={project.link}
                      target={project.link === '#' ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-radiant-violet/20 border border-white/10 hover:border-radiant-violet/30 rounded-xl text-xs font-bold text-white transition-all transform hover:scale-105"
                    >
                      OTWÓRZ <ExternalLink size={14} className="text-radiant-violet" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 shrink-0">
          <div className="flex items-center gap-6 text-slate-400">
            <button className="flex items-center gap-2 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group">
              <Settings size={14} className="group-hover:rotate-45 transition-transform" /> Ustawienia
            </button>
            <button
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              className={cn(
                "flex items-center gap-2 transition-colors text-xs font-bold uppercase tracking-widest group",
                isTerminalOpen ? "text-neon-teal" : "text-slate-400 hover:text-white"
              )}
            >
              <TerminalIcon size={14} /> Konsola
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 glass rounded-full flex items-center gap-2 border border-white/5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Bezpośrednie Połączenie Aktywne</span>
            </div>
            <button className="p-2 text-slate-500 hover:text-red-500 transition-colors">
              <Power size={18} />
            </button>
          </div>
        </footer>

        {/* Terminal Window */}
        <AnimatePresence>
          {isTerminalOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed bottom-24 right-8 w-[450px] h-[550px] glass-card rounded-2xl flex flex-col shadow-2xl border-white/10 overflow-hidden z-50"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Terminal Agenta v1.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsTerminalOpen(false)} className="text-slate-500 hover:text-white p-1">
                    <Minimize2 size={14} />
                  </button>
                  <button onClick={() => setIsTerminalOpen(false)} className="text-slate-500 hover:text-red-400 p-1">
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar font-mono">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={cn(
                    "flex flex-col gap-1 max-w-[85%]",
                    log.type === 'user' ? "ml-auto items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "px-3 py-2 rounded-xl text-xs",
                      log.type === 'system' ? "bg-white/5 text-slate-500" :
                        log.type === 'agent' ? "bg-radiant-violet/20 border border-radiant-violet/30 text-white" :
                          "bg-neon-teal/20 border border-neon-teal/30 text-neon-teal"
                    )}>
                      {log.text}
                    </div>
                    <span className="text-[9px] text-slate-600 px-1">
                      {log.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              <form onSubmit={handleTerminalSubmit} className="p-4 border-t border-white/10 bg-black/20">
                <div className="relative">
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Wpisz polecenie lub wiadomość do Karola..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-radiant-violet/50 pr-12"
                  />
                  <button type="submit" className="absolute right-2 top-1.5 p-1.5 text-radiant-violet hover:text-neon-teal transition-colors">
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[9px] text-slate-600 mt-2 text-center uppercase tracking-widest font-bold">
                  Połączenie: <span className="text-green-500">Aktywne z głównym asystentem</span>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

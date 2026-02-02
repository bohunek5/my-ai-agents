import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Theme Toggle Logic
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-300">
            {/* Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap bg-tech-navy/95 backdrop-blur-md px-4 md:px-10 py-4 shadow-xl border-b border-white/5 transition-all duration-300">
                <Link to="/" className="flex items-center gap-3 group z-50">
                    <div className="size-10 flex items-center justify-center bg-primary rounded-xl shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-all duration-300 group-hover:scale-105">
                        <span className="material-symbols-outlined text-white text-2xl">local_parking</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-xl font-black tracking-tight leading-none group-hover:text-primary transition-colors duration-300">BEZPIECZNY</span>
                        <span className="text-slate-400 text-xs font-bold tracking-[0.2em] leading-none group-hover:text-white transition-colors duration-300">PARKING 24/7</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                    <nav className="flex items-center gap-9">
                        <Link to="/" className="text-slate-300 hover:text-white hover:scale-105 text-sm font-bold transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full">O nas</Link>
                        <Link to="/oferta" className="text-slate-300 hover:text-white hover:scale-105 text-sm font-bold transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full">Oferta</Link>
                        <Link to="/cennik" className="text-slate-300 hover:text-white hover:scale-105 text-sm font-bold transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full">Cennik</Link>
                        <Link to="/lokalizacja" className="text-slate-300 hover:text-white hover:scale-105 text-sm font-bold transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full">Lokalizacja</Link>
                        <Link to="/kontakt" className="text-slate-300 hover:text-white hover:scale-105 text-sm font-bold transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full">Kontakt</Link>
                    </nav>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <Link to="/panel" className="relative group overflow-hidden flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 border border-primary/50 bg-primary/10 text-white text-sm font-bold transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_rgba(0,86,179,0.5)]">
                        <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                            Panel Klienta <span className="material-symbols-outlined text-sm">login</span>
                        </span>
                        <div className="absolute inset-0 bg-primary/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-4 md:hidden z-50">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-0 top-0 left-0 w-full h-screen bg-tech-navy pt-24 px-6 md:hidden z-40 flex flex-col gap-6"
                        >
                            <nav className="flex flex-col gap-2">
                                <Link to="/" className="text-white text-xl font-bold py-4 border-b border-white/10 flex items-center justify-between group">
                                    O nas <span className="material-symbols-outlined text-white/50 group-hover:text-primary">arrow_forward_ios</span>
                                </Link>
                                <Link to="/oferta" className="text-white text-xl font-bold py-4 border-b border-white/10 flex items-center justify-between group">
                                    Oferta <span className="material-symbols-outlined text-white/50 group-hover:text-primary">arrow_forward_ios</span>
                                </Link>
                                <Link to="/cennik" className="text-white text-xl font-bold py-4 border-b border-white/10 flex items-center justify-between group">
                                    Cennik <span className="material-symbols-outlined text-white/50 group-hover:text-primary">arrow_forward_ios</span>
                                </Link>
                                <Link to="/lokalizacja" className="text-white text-xl font-bold py-4 border-b border-white/10 flex items-center justify-between group">
                                    Lokalizacja <span className="material-symbols-outlined text-white/50 group-hover:text-primary">arrow_forward_ios</span>
                                </Link>
                                <Link to="/kontakt" className="text-white text-xl font-bold py-4 border-b border-white/10 flex items-center justify-between group">
                                    Kontakt <span className="material-symbols-outlined text-white/50 group-hover:text-primary">arrow_forward_ios</span>
                                </Link>
                            </nav>

                            <Link to="/panel" className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-4 active:scale-95 transition-transform">
                                Panel Klienta <span className="material-symbols-outlined">login</span>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Main Content */}
            <main className="flex-1 pt-[88px]">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="w-full bg-tech-navy text-slate-400 py-16 px-10 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                    <div className="flex flex-col items-start gap-4 max-w-sm">
                        <div className="flex items-center gap-3 group">
                            <div className="size-8 flex items-center justify-center bg-primary rounded-lg shadow-lg shadow-primary/20 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                                <span className="material-symbols-outlined text-white text-lg group-hover:text-primary transition-colors">local_parking</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-lg font-black tracking-tight leading-none">BEZPIECZNY</span>
                                <span className="text-slate-500 text-[10px] font-bold tracking-[0.2em] leading-none">PARKING 24/7</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-500">
                            Bezpieczny i wygodny parking w Giżycku. Zapraszamy 24h na dobę.
                        </p>
                        <p className="text-xs text-slate-600 mt-4">© 2026 Bezpieczny Parking 24/7. Wszelkie prawa zastrzeżone.</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs">Menu</h4>
                        <div className="flex flex-col gap-3 text-sm">
                            <Link to="/cennik" className="hover:text-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>Cennik usług</Link>
                            <Link to="/lokalizacja" className="hover:text-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>Jak dojechać</Link>
                            <a className="hover:text-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2" href="#">Regulamin</a>
                            <a className="hover:text-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2" href="#">Polityka Prywatności</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs">Kontakt</h4>
                        <div className="flex gap-4">
                            <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:-translate-y-1 transition-all duration-300 group">
                                <span className="material-symbols-outlined text-xl">thumb_up</span>
                                <span className="font-bold text-sm">Facebook</span>
                            </a>

                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-start gap-3 text-slate-400">
                                <span className="material-symbols-outlined text-lg mt-0.5">location_on</span>
                                <span className="text-sm">ul. Sybiraków 28<br />11-500 Giżycko</span>
                            </div>
                            <a href="tel:+48607241090" className="text-white font-bold hover:text-primary transition-colors">607 241 090</a>
                            <a href="mailto:biuro@radlight.pl" className="text-slate-400 hover:text-white transition-colors">biuro@radlight.pl</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

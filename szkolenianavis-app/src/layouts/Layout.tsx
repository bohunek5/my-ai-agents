import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpeg';

export default function Layout() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark'); // Default to dark for premium feel
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Dark Mode Logic
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        if (isMenuOpen) setIsMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]); // safer dependency

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const navLinks = [
        { name: 'O Nas', path: '/about' },
        { name: 'Szkolenia', path: '/courses' },
        { name: 'Rejsy', path: '/cruises' },
        { name: 'Nurkowanie', path: '/diving' },
        { name: 'Kontakt', path: '/contact' },
    ];

    return (
        <div className="min-h-screen bg-navis-light dark:bg-navis-navy text-navis-navy dark:text-white transition-colors duration-500 font-sans flex flex-col">
            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B1C3E]/90 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-[#0B1C3E] py-4'}`}>
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={logo} alt="Navis Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-navis-gold object-cover group-hover:scale-110 transition-transform duration-300 shadow-md" />
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black tracking-widest text-white leading-none">NAVIS</span>
                            <span className="text-[0.6rem] md:text-xs font-bold text-navis-gold tracking-[0.3em] uppercase">Yachting School</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-bold tracking-wide uppercase transition-all relative group ${location.pathname === link.path ? 'text-navis-gold' : 'text-gray-300 hover:text-white'}`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.span layoutId="underline" className="absolute -bottom-2 left-0 w-full h-0.5 bg-navis-gold" />
                                )}
                            </Link>
                        ))}

                        {/* Theme Toggle (iOS style) */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <span className="material-symbols-outlined text-[20px] text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-spin-pause">light_mode</span>
                            ) : (
                                <span className="material-symbols-outlined text-[20px] text-white hover:text-navis-gold transition-colors">dark_mode</span>
                            )}
                        </button>

                        <Link to="/contact" className="px-6 py-2.5 bg-white text-[#0B1C3E] font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-white/20 hover:scale-105 text-xs uppercase tracking-widest border-2 border-transparent hover:border-navis-gold/20">
                            Zapisz się
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white p-2"
                        >
                            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: '100vh' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="fixed inset-0 top-20 bg-[#0B1C3E]/95 backdrop-blur-xl z-40 md:hidden overflow-hidden border-t border-white/10"
                        >
                            <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="text-2xl font-black text-white hover:text-navis-gold transition-colors tracking-wider"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={toggleTheme}
                                    className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10 mt-4"
                                    aria-label="Toggle Theme"
                                >
                                    {theme === 'dark' ? (
                                        <span className="material-symbols-outlined text-2xl text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-spin-pause">light_mode</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-2xl text-white hover:text-navis-gold transition-colors">dark_mode</span>
                                    )}
                                </button>
                                <Link to="/contact" className="px-10 py-4 bg-white text-[#0B1C3E] font-bold rounded-full text-lg shadow-xl shadow-white/10 mt-8 hover:scale-105 transition-transform">
                                    Zapisz się
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content OUTLET */}
            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[#0B1C3E] border-t border-white/10 py-16 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-navis-gold/50 to-transparent"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <img src={logo} alt="Navis Logo" className="h-10 w-10 rounded-full border border-navis-gold" />
                                <span className="text-2xl font-black tracking-widest text-white">NAVIS</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed font-light mb-6">
                                Profesjonalna szkoła żeglarstwa i sportów motorowodnych. Realizujemy marzenia o wolności na wodzie. Dołącz do nas już dziś.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-navis-gold hover:text-white transition-colors"><i className="fab fa-facebook-f"></i>F</a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-navis-gold hover:text-white transition-colors"><i className="fab fa-instagram"></i>I</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white tracking-wide">Kontakt</h4>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-navis-gold transition-colors text-navis-gold group-hover:text-white material-symbols-outlined text-sm">location_on</span>
                                    Świderska 4a, 11-500 Gajewo
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-navis-gold transition-colors text-navis-gold group-hover:text-white material-symbols-outlined text-sm">phone</span>
                                    +48 791 828 731
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-navis-gold transition-colors text-navis-gold group-hover:text-white material-symbols-outlined text-sm">mail</span>
                                    szekla@zeglarstwomazury.pl
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white tracking-wide">Na skróty</h4>
                            <ul className="space-y-3 text-gray-300 font-light">
                                <li><Link to="/about" className="hover:text-navis-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-navis-gold rounded-full"></span>O Nas</Link></li>
                                <li><Link to="/courses" className="hover:text-navis-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-navis-gold rounded-full"></span>Szkolenia</Link></li>
                                <li><Link to="/cruises" className="hover:text-navis-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-navis-gold rounded-full"></span>Rejsy</Link></li>
                                <li><Link to="/diving" className="hover:text-navis-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-navis-gold rounded-full"></span>Nurkowanie</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm font-light">
                        &copy; {new Date().getFullYear()} Navis Yachting School. Designed by AI Agents.
                    </div>
                </div>
            </footer>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpeg';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'O Nas', href: '#about' },
        { name: 'Szkolenia', href: '#courses' },
        { name: 'Rejsy', href: '#cruises' },
        { name: 'Nurkowanie', href: '#diving' },
        { name: 'Kontakt', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navis-navy/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3 group">
                    <img src={logo} alt="Navis Logo" className="h-12 w-12 rounded-full border-2 border-navis-gold transition-transform group-hover:scale-105" />
                    <span className={`text-2xl font-bold tracking-wider ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'}`}>NAVIS</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-white font-medium hover:text-navis-gold transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-navis-gold transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                    <button className="px-6 py-2 border-2 border-navis-gold text-navis-gold font-bold rounded-full hover:bg-navis-gold hover:text-white transition-all uppercase text-sm tracking-widest">
                        Zapisz się
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white text-3xl focus:outline-none"
                >
                    <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-navis-navy border-t border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white text-lg font-medium hover:text-navis-gold"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

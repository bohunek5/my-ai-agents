import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_main.jpeg';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Sailing Adventure"
                    className="w-full h-full object-cover brightness-[0.7] transform scale-105 animate-ken-burns" // Simple scale for now, maybe custom anim later
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navis-navy/30 to-navis-navy/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="block text-navis-gold font-bold tracking-[0.2em] mb-4 uppercase text-sm md:text-base">
                        Professional Yachting School
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
                        NAVIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">YACHTING</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl mx-auto">
                        Poczuj smak przygody na wodzie. Szkolimy żeglarzy i motorowodniaków z pasją i profesjonalizmem.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/courses" className="px-8 py-4 bg-navis-gold text-white font-bold rounded-full hover:bg-yellow-600 transition-all shadow-lg hover:scale-105 uppercase tracking-wide">
                            Sprawdź Kursy
                        </Link>
                        <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-navis-navy transition-all uppercase tracking-wide">
                            Kontakt
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="material-symbols-outlined text-4xl">keyboard_arrow_down</span>
            </motion.div>
        </section>
    );
}

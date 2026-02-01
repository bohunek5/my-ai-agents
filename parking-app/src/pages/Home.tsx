import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg-2.jpg'; // Assuming this exists from previous file
import { Link } from 'react-router-dom';

export const Home = () => {
    const offers = [
        { title: 'Jachty', price: '200 PLN', icon: 'directions_boat' },
        { title: 'Autobusy', price: '150 PLN', icon: 'directions_bus' },
        { title: 'Kampery', price: '100 PLN', icon: 'airport_shuttle' },
        { title: 'Osobówki', price: '50 PLN', icon: 'directions_car' },
    ];

    return (
        <div className="w-full bg-background-light dark:bg-slate-900 font-sans">
            {/* Hero Section */}
            <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden bg-tech-navy">
                {/* Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <img src={heroBg} alt="Parking Hero" className="w-full h-full object-cover grayscale mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-tech-navy/80 via-tech-navy/60 to-tech-navy"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8 text-left"
                    >
                        <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-tight tracking-tight drop-shadow-2xl">
                            Twój majątek <br />
                            <span className="text-primary">pod ochroną 24/7</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed font-light">
                            Najbezpieczniejsze miejsce dla Twojego pojazdu. Monitoring, ochrona fizyczna i ubezpieczenie w standardzie premium.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/rezerwacja"
                                className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-[0_10px_30px_-10px_rgba(0,86,179,0.5)] hover:bg-blue-600 hover:scale-105 hover:shadow-[0_15px_40px_-10px_rgba(0,86,179,0.6)] transition-all duration-300 transform"
                            >
                                Zarezerwuj teraz
                            </Link>
                            <Link
                                to="/oferta"
                                className="px-10 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                Oferta
                            </Link>
                        </div>
                    </motion.div>

                    {/* Live Status Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center md:justify-end"
                    >
                        <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-action-green/20 rounded-full blur-[60px] -mr-10 -mt-10 animate-pulse"></div>

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-action-green opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-action-green"></span>
                                    </span>
                                    <span className="text-action-green font-bold uppercase tracking-widest text-xs">Live Status</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">sensors</span>
                            </div>

                            <div className="text-center mb-6">
                                <div className="text-7xl font-display font-black text-white mb-2 tracking-tighter shadow-green-glow">
                                    14
                                </div>
                                <p className="text-slate-300 font-medium">Aktualnie wolnych miejsc</p>
                            </div>

                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "15%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="bg-action-green h-full rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                                ></motion.div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 text-center">Zaktualizowano: Przed chwilą</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Offer Grid */}
            <section className="py-24 px-6 bg-neutral-gray relative z-10 -mt-10 rounded-t-[3rem]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-4xl text-tech-navy mb-4">Wybierz swój pojazd</h2>
                        <p className="text-slate-500">Elastyczne plany postojowe dla każdej klasy</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {offers.map((offer, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-8xl text-primary">{offer.icon}</span>
                                </div>

                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">{offer.icon}</span>
                                </div>

                                <h3 className="font-display font-bold text-xl text-tech-navy mb-2">{offer.title}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-primary">{offer.price}</span>
                                    <span className="text-slate-400 text-sm">/ dobę</span>
                                </div>

                                <button className="w-full mt-6 py-3 rounded-lg border border-primary/20 text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
                                    Wybierz
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="px-6 py-4 flex flex-col items-center md:items-start hover:bg-slate-50 transition-colors rounded-xl">
                            <div className="p-4 bg-blue-50 text-primary rounded-full mb-6">
                                <span className="material-symbols-outlined text-4xl">videocam</span>
                            </div>
                            <h3 className="font-display font-bold text-xl text-tech-navy mb-3">Monitoring 4K</h3>
                            <p className="text-slate-500 leading-relaxed">
                                System 120 kamer ultra-wysokiej rozdzielczości z analizą AI, pokrywający 100% powierzchni parkingu.
                            </p>
                        </div>

                        <div className="px-6 py-4 flex flex-col items-center md:items-start hover:bg-slate-50 transition-colors rounded-xl">
                            <div className="p-4 bg-green-50 text-action-green rounded-full mb-6">
                                <span className="material-symbols-outlined text-4xl">verified_user</span>
                            </div>
                            <h3 className="font-display font-bold text-xl text-tech-navy mb-3">Ubezpieczenie OC w cenie</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Pełna polisa ubezpieczeniowa chroniąca Twój majątek od wszelkich zdarzeń losowych w cenie postoju.
                            </p>
                        </div>

                        <div className="px-6 py-4 flex flex-col items-center md:items-start hover:bg-slate-50 transition-colors rounded-xl">
                            <div className="p-4 bg-purple-50 text-purple-600 rounded-full mb-6">
                                <span className="material-symbols-outlined text-4xl">local_police</span>
                            </div>
                            <h3 className="font-display font-bold text-xl text-tech-navy mb-3">Ochrona fizyczna</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Kwalifikowani pracownicy ochrony patrolujący obiekt 24 godziny na dobę, 7 dni w tygodniu.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

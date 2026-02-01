import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Offer = () => {
    const pricingPlans = [
        {
            title: "Postój Krótkoterminowy",
            icon: "schedule",
            features: [
                "Idealny na zakupy lub spotkania",
                "Naliczanie minutowe",
                "Dostęp do toalety",
                "Możliwość płatności w aplikacji"
            ],
            price: "5 PLN",
            period: "/ godzina",
            highlight: false
        },
        {
            title: "Doba Hotelowa",
            icon: "night_shelter",
            features: [
                "Bezpieczna noc dla Twojego auta",
                "Wjazd i wyjazd 24/7",
                "Ochrona fizyczna",
                "Miejsce monitorowane"
            ],
            price: "50 PLN",
            period: "/ 24h",
            highlight: true
        },
        {
            title: "Abonament Miesięczny",
            icon: "calendar_month",
            features: [
                "Gwarantowane stałe miejsce",
                "Karta magnetyczna w cenie",
                "Myjnia ręczna 1x w miesiącu",
                "Priorytetowa obsługa"
            ],
            price: "450 PLN",
            period: "/ miesiąc",
            highlight: false
        }
    ];

    const vehicleTypes = [
        { name: "Osobówki", price: "50 PLN", icon: "directions_car" },
        { name: "SUV & Van", price: "65 PLN", icon: "airport_shuttle" },
        { name: "Motocykle", price: "30 PLN", icon: "two_wheeler" },
        { name: "Kampery", price: "100 PLN", icon: "rv_hookup" },
        { name: "Jachty", price: "200 PLN", icon: "directions_boat" },
    ];

    return (
        <div className="w-full bg-background-light dark:bg-slate-900 min-h-screen pb-20">
            {/* Header */}
            <section className="bg-tech-navy pt-32 pb-20 px-6 rounded-b-[3rem] shadow-2xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <span className="material-symbols-outlined text-[300px] text-white">sell</span>
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display font-black text-4xl md:text-6xl text-white mb-6"
                    >
                        Elastyczna Oferta
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-lg max-w-2xl mx-auto"
                    >
                        Niezależnie od tego, czy parkujesz na godzinę, czy potrzebujesz stałego miejsca - mamy rozwiązanie skrojone pod Twoje potrzeby.
                    </motion.p>
                </div>
            </section>

            {/* Main Pricing Cards */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 -mt-32">
                {pricingPlans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className={`relative p-8 rounded-2xl border ${plan.highlight ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/30 scale-105 z-10' : 'bg-white dark:bg-slate-800 text-tech-navy dark:text-white border-slate-200 dark:border-slate-700 shadow-xl'} flex flex-col`}
                    >
                        {plan.highlight && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-green text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                Najczęściej Wybierany
                            </div>
                        )}
                        <div className={`p-3 rounded-xl w-fit mb-6 ${plan.highlight ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                            <span className="material-symbols-outlined text-3xl">{plan.icon}</span>
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-slate-500'}`}>{plan.title}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-slate-400'}`}>{plan.period}</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <span className="material-symbols-outlined text-action-green text-lg">check_circle</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-white text-primary hover:bg-slate-100' : 'bg-tech-navy text-white hover:bg-primary'}`}>
                            Wybierz Pakiet
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Vehicle Table */}
            <div className="max-w-4xl mx-auto px-6 mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-tech-navy dark:text-white mb-4">Cennik wg Typu Pojazdu</h2>
                    <p className="text-slate-500">Stawki dobowe dla niestandardowych gabarytów</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                    {vehicleTypes.map((vehicle, index) => (
                        <div key={index} className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined">{vehicle.icon}</span>
                                </div>
                                <span className="font-bold text-lg text-tech-navy dark:text-white">{vehicle.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="block font-black text-xl text-primary">{vehicle.price}</span>
                                <span className="text-xs text-slate-400">/ doba</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary to-blue-600 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Potrzebujesz wyceny indywidualnej?</h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Dla flot samochodowych oraz postojów długoterminowych (powyżej 3 m-cy) przygotowujemy specjalne oferty rabatowe.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/kontakt" className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            Skontaktuj się z nami
                        </Link>
                        <a href="tel:+48123456789" className="px-8 py-4 bg-black/20 text-white font-bold rounded-xl border border-white/20 hover:bg-black/30 transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">call</span>
                            +48 123 456 789
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

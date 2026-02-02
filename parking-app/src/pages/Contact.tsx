import { motion } from 'framer-motion';
import { useState } from 'react';
import heroBg from '../assets/hero-bg-3.jpg'; // Reusing existing asset or placeholder

export const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
    };
    return (
        <div className="w-full bg-neutral-gray dark:bg-slate-900 min-h-screen pb-20">
            {/* Header */}
            <section className="relative bg-tech-navy pt-40 pb-20 px-6 rounded-b-[3rem] shadow-2xl mb-8 md:mb-12 overflow-hidden flex items-center justify-center min-h-[400px]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src={heroBg} alt="Contact Hero" className="w-full h-full object-cover grayscale mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-tech-navy/90 via-tech-navy/70 to-tech-navy"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display font-black text-4xl md:text-6xl text-white mb-6 drop-shadow-lg"
                    >
                        Skontaktuj się z nami
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-lg max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Jesteśmy do Twojej dyspozycji 24/7. Masz pytania? Chętnie pomożemy.
                    </motion.p>
                </div>
            </section>

            {/* Main Content Grid - Mobile: Stacked with Gap, Desktop: Overlap */}
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 md:px-20 lg:px-40 -mt-10 md:-mt-24 relative z-20">

                {/* Left Column: Info & Map */}
                <div className="flex flex-col gap-6 order-2 md:order-1">
                    <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                            <span className="material-symbols-outlined text-3xl">call</span>
                        </div>
                        <div>
                            <h3 className="text-tech-navy dark:text-white font-bold text-lg mb-1">Infolinia 24h</h3>
                            <p className="text-slate-500 text-sm mb-2">Dla klientów indywidualnych i firm</p>
                            <a href="tel:+48607241090" className="text-primary font-bold text-xl hover:underline">607 241 090</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                            <span className="material-symbols-outlined text-3xl">location_on</span>
                        </div>
                        <div>
                            <h3 className="text-tech-navy dark:text-white font-bold text-lg mb-1">Adres</h3>
                            <p className="text-slate-500 text-sm mb-2">Biuro i Parking</p>
                            <p className="text-primary font-bold text-lg leading-tight">
                                ul. Sybiraków 28<br />
                                11-500 Giżycko
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                            <span className="material-symbols-outlined text-3xl">mail</span>
                        </div>
                        <div>
                            <h3 className="text-tech-navy dark:text-white font-bold text-lg mb-1">Email</h3>
                            <p className="text-slate-500 text-sm mb-2">Odpowiadamy średnio w 15 minut</p>
                            <a href="mailto:biuro@radlight.pl" className="text-primary font-bold text-xl hover:underline break-words">biuro@radlight.pl</a>
                        </div>
                    </div>

                    {/* Map Preview */}
                    <div className="w-full h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 box-content">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.604533966606!2d21.75620897711808!3d54.03666297257916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e156477e68d097%3A0xc033703d29486c65!2sul.%20Sybirak%C3%B3w%2028%2C%2011-500%20Gi%C5%BCycko!5e0!3m2!1spl!2spl!4v1706863000000!5m2!1spl!2spl"
                            className="border-0 w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-700"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>

                {/* Right Column: Reform (Order 1 on mobile to be First?) No, usually Contact Info is below on mobile?
                   User said "Formularz na prawo, reszta na lewo" - Desktop.
                   "tak samo na mobilnych" - this is ambiguous.
                   If I put Form First on mobile (order-1), it will be seen first.
                   Let's keep Form as Order-1 (First on mobile) and Info as Order-2?
                   User complained about "Header overlaps content".
                   IF the Form is the first thing, and it overlaps.
                   I'll use `order-1` for Form on Mobile and `md:order-2` on Desktop.
                */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-100 dark:border-slate-800 order-1 md:order-2">
                    <h2 className="text-3xl font-display font-black text-tech-navy dark:text-white mb-2">Napisz do nas</h2>
                    <p className="text-slate-500 mb-8">Wypełnij formularz, a my zajmiemy się resztą.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Imię</label>
                                <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Jan Kowalski" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="jan@example.com" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">Temat</label>
                            <select id="subject" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer">
                                <option>Rezerwacja miejsca</option>
                                <option>Oferta dla firm</option>
                                <option>Problem techniczny</option>
                                <option>Inne</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">Wiadomość</label>
                            <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="W czym możemy pomóc?"></textarea>
                        </div>

                        <button type="submit" className="mt-4 w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 active:scale-95 transition-all transform shadow-lg hover:shadow-primary/50 flex items-center justify-center gap-2 group">
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">send</span>
                            Wyślij wiadomość
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

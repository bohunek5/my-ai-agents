import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-white dark:bg-navis-navy text-navis-navy dark:text-white relative overflow-hidden transition-colors duration-500">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-navis-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Info */}
                    <div className="md:w-1/2">
                        <span className="text-navis-gold font-bold tracking-widest uppercase mb-2 block">Kontakt / Contact</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Daj nam znać, <br />że chcesz wypłynąć!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg transition-colors duration-500">
                            Masz pytania dotyczące szkoleń, rejsów lub zimowania łodzi? Jesteśmy do Twojej dyspozycji.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <span className="p-4 bg-navis-light dark:bg-white/10 rounded-full text-navis-gold transition-colors duration-500">
                                    <span className="material-symbols-outlined text-2xl">location_on</span>
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Adres</h3>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">Świderska 4a<br />11-500 Gajewo, Polska</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <span className="p-4 bg-navis-light dark:bg-white/10 rounded-full text-navis-gold transition-colors duration-500">
                                    <span className="material-symbols-outlined text-2xl">phone</span>
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Telefon</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg hover:text-navis-gold dark:hover:text-white transition-colors cursor-pointer font-medium">+48 791 828 731</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <span className="p-4 bg-navis-light dark:bg-white/10 rounded-full text-navis-gold transition-colors duration-500">
                                    <span className="material-symbols-outlined text-2xl">mail</span>
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg hover:text-navis-gold dark:hover:text-white transition-colors cursor-pointer font-medium">szekla@zeglarstwomazury.pl</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 bg-gray-50 dark:bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-white/10 shadow-2xl transition-colors duration-500"
                    >
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Imię i Nazwisko</label>
                                <input type="text" className="w-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl p-4 text-navis-navy dark:text-white focus:outline-none focus:border-navis-gold transition-colors" placeholder="Jan Kowalski" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Email</label>
                                <input type="email" className="w-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl p-4 text-navis-navy dark:text-white focus:outline-none focus:border-navis-gold transition-colors" placeholder="jan@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Wiadomość</label>
                                <textarea rows={4} className="w-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl p-4 text-navis-navy dark:text-white focus:outline-none focus:border-navis-gold transition-colors" placeholder="Chcę zapytać o kurs..."></textarea>
                            </div>
                            <button className="w-full bg-navis-gold text-white font-bold py-4 rounded-xl hover:bg-yellow-600 transition-colors shadow-lg shadow-navis-gold/20 uppercase tracking-wide">
                                Wyślij Wiadomość
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

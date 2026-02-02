import { motion } from 'framer-motion';

export const Location = () => {
    return (
        <div className="w-full bg-neutral-gray dark:bg-slate-900/50 min-h-[calc(100vh-80px)]">

            {/* Header */}
            <section className="bg-tech-navy pt-32 pb-20 px-6 rounded-b-[3rem] shadow-2xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <span className="material-symbols-outlined text-[300px] text-white">location_on</span>
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display font-black text-4xl md:text-6xl text-white mb-6"
                    >
                        Lokalizacja
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-lg max-w-2xl mx-auto"
                    >
                        Giżycko, ul. Sybiraków 28. Łatwy dojazd i wygodna lokalizacja.
                    </motion.p>
                </div>
            </section>

            {/* Google Map Section */}
            <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800">
                <iframe
                    title="Google Map Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.604533966606!2d21.75620897711808!3d54.03666297257916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e156477e68d097%3A0xc033703d29486c65!2sul.%20Sybirak%C3%B3w%2028%2C%2011-500%20Gi%C5%BCycko!5e0!3m2!1spl!2spl!4v1706863000000!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <div className="max-w-[1200px] mx-auto py-12 px-4 md:px-20 lg:px-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    <div className="flex flex-col gap-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold text-tech-navy dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">directions_car</span>
                                Dojazd samochodem
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Wjazd na parking znajduje się od ulicy Sybiraków. Jesteśmy tuż obok głównej drogi.
                                Wjazd bezpośrednio z ulicy na plac.
                            </p>
                            <button className="flex items-center gap-2 text-primary font-bold hover:underline">
                                <span className="material-symbols-outlined text-sm">navigation</span>
                                Nawiguj z Google Maps
                            </button>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold text-tech-navy dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">train</span>
                                Transport publiczny
                            </h3>
                            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-tech-navy dark:text-white min-w-[60px]">Pociąg:</span>
                                    <span>Dworzec PKP Giżycko (15 min pieszo)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-tech-navy dark:text-white min-w-[60px]">Autobus:</span>
                                    <span>Komunikacja miejska w pobliżu</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-tech-navy dark:text-white min-w-[60px]">Pieszo:</span>
                                    <span>Blisko centrum i portu</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold text-tech-navy dark:text-white">W okolicy</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="size-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-bold">TB</div>
                                <div>
                                    <p className="font-bold text-tech-navy dark:text-white">Twierdza Boyen</p>
                                    <p className="text-xs text-slate-500">1.2km • 15 min pieszo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="size-10 bg-purple-100 text-purple-600 rounded flex items-center justify-center font-bold">JN</div>
                                <div>
                                    <p className="font-bold text-tech-navy dark:text-white">Ekomarina / Jezioro Niegocin</p>
                                    <p className="text-xs text-slate-500">800m • 10 min pieszo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="size-10 bg-green-100 text-green-600 rounded flex items-center justify-center font-bold">MO</div>
                                <div>
                                    <p className="font-bold text-tech-navy dark:text-white">Most Obrotowy</p>
                                    <p className="text-xs text-slate-500">2.5km • 5 min autem</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

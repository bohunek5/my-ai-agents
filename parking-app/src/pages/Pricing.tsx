
export const Pricing = () => {
    return (
        <div className="w-full bg-neutral-gray dark:bg-slate-900/50 py-16 px-4 md:px-20 lg:px-40 min-h-[calc(100vh-80px)]">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                    <h1 className="text-tech-navy dark:text-white text-4xl font-bold">Cennik Parkowania</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Wybierz opcję dopasowaną do Twoich potrzeb. Bez ukrytych kosztów.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* 1. Hourly */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                        <h3 className="text-xl font-bold text-tech-navy dark:text-white">Na Godziny</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-primary">5 zł</span>
                            <span className="text-slate-500">/ godzina</span>
                        </div>
                        <p className="text-slate-500 text-sm">Idealne na krótkie spotkania i zakupy w centrum.</p>
                        <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Płatność w aplikacji</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Pierwsze 15 min gratis</li>
                        </ul>
                        <button className="mt-auto w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Wybierz</button>
                    </div>

                    {/* 2. Daily (Popular) */}
                    <div className="relative bg-white dark:bg-slate-900 rounded-xl p-8 shadow-xl border-2 border-primary transform md:-translate-y-4 flex flex-col gap-6 z-10">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POLECANY</div>
                        <h3 className="text-xl font-bold text-tech-navy dark:text-white">Doba</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-primary">45 zł</span>
                            <span className="text-slate-500">/ 24h</span>
                        </div>
                        <p className="text-slate-500 text-sm">Najlepsza opcja dla turystów i gości hotelowych.</p>
                        <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Wielokrotny wjazd/wyjazd</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Gwarancja miejsca</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Monitoring 24/7</li>
                        </ul>
                        <button className="mt-auto w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md">Rezerwuj Teraz</button>
                    </div>

                    {/* 3. Weekly */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                        <h3 className="text-xl font-bold text-tech-navy dark:text-white">Tydzień</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-primary">200 zł</span>
                            <span className="text-slate-500">/ 7 dni</span>
                        </div>
                        <p className="text-slate-500 text-sm">Dla osób w podróży służbowej lub na urlopie.</p>
                        <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Dostęp 24/7</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Możliwość przedłużenia</li>
                        </ul>
                        <button className="mt-auto w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Wybierz</button>
                    </div>

                    {/* 4. Monthly Subscription */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                        <h3 className="text-xl font-bold text-tech-navy dark:text-white">Abonament</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-primary">350 zł</span>
                            <span className="text-slate-500">/ miesiąc</span>
                        </div>
                        <p className="text-slate-500 text-sm">Dla mieszkańców i pracowników pobliskich biur.</p>
                        <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Stałe miejsce</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Karta wjazdowa</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Faktura VAT</li>
                        </ul>
                        <button className="mt-auto w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Zamów</button>
                    </div>

                    {/* 5. Motorcycle */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                        <h3 className="text-xl font-bold text-tech-navy dark:text-white">Motocykl</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-primary">150 zł</span>
                            <span className="text-slate-500">/ miesiąc</span>
                        </div>
                        <p className="text-slate-500 text-sm">Specjalne, zadaszone miejsca dla jednośladów.</p>
                        <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Dedykowana strefa</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Szafka na kask</li>
                        </ul>
                        <button className="mt-auto w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Wybierz</button>
                    </div>

                    {/* 6. VIP Business */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                        <h3 className="text-xl font-bold text-tech-navy dark:text-white">VIP Business</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-primary">600 zł</span>
                            <span className="text-slate-500">/ miesiąc</span>
                        </div>
                        <p className="text-slate-500 text-sm">Najszersze miejsca XXL blisko wejścia i windy.</p>
                        <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Najlepsza lokalizacja</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Mycie auta raz w m-cu</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-action-green text-sm">check</span>Concierge</li>
                        </ul>
                        <button className="mt-auto w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Zamów VIP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

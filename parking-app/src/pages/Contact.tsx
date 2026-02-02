
export const Contact = () => {
    return (
        <div className="w-full bg-neutral-gray dark:bg-slate-900/50 py-16 px-4 md:px-20 lg:px-40 min-h-[calc(100vh-80px)]">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Contact Info */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-tech-navy dark:text-white text-4xl font-bold">Skontaktuj się z nami</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Jesteśmy do Twojej dyspozycji 24/7. Masz pytania dotyczące rezerwacji lub abonamentu? Napisz lub zadzwoń.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <span className="material-symbols-outlined text-2xl">call</span>
                            </div>
                            <div>
                                <h3 className="text-tech-navy dark:text-white font-bold text-lg">Infolinia 24h</h3>
                                <p className="text-slate-500 mb-2">Dla klientów indywidualnych i firm</p>
                                <a href="tel:+48607241090" className="text-primary font-bold text-xl hover:underline">607 241 090</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <span className="material-symbols-outlined text-2xl">location_on</span>
                            </div>
                            <div>
                                <h3 className="text-tech-navy dark:text-white font-bold text-lg">Adres</h3>
                                <p className="text-slate-500 mb-2">Biuro i Parking</p>
                                <p className="text-primary font-bold text-lg">
                                    ul. Sybiraków 28<br />
                                    11-500 Giżycko
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <span className="material-symbols-outlined text-2xl">mail</span>
                            </div>
                            <div>
                                <h3 className="text-tech-navy dark:text-white font-bold text-lg">Email</h3>
                                <p className="text-slate-500 mb-2">Odpowiadamy średnio w 15 minut</p>
                                <a href="mailto:biuro@radlight.pl" className="text-primary font-bold text-xl hover:underline">biuro@radlight.pl</a>
                            </div>
                        </div>

                        {/* Map Preview */}
                        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.604533966606!2d21.75620897711808!3d54.03666297257916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e156477e68d097%3A0xc033703d29486c65!2sul.%20Sybirak%C3%B3w%2028%2C%2011-500%20Gi%C5%BCycko!5e0!3m2!1spl!2spl!4v1706863000000!5m2!1spl!2spl"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-tech-navy dark:text-white mb-6">Formularz kontaktowy</h2>
                    <form className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Imię</label>
                                <input type="text" id="name" className="rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary" placeholder="Jan Kowalski" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                <input type="email" id="email" className="rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary" placeholder="jan@example.com" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">Temat</label>
                            <select id="subject" className="rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary">
                                <option>Rezerwacja miejsca</option>
                                <option>Oferta dla firm</option>
                                <option>Problem techniczny</option>
                                <option>Inne</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Wiadomość</label>
                            <textarea id="message" rows={4} className="rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary" placeholder="W czym możemy pomóc?"></textarea>
                        </div>

                        <button type="button" className="mt-2 w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">send</span>
                            Wyślij wiadomość
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

import Offer from '../components/Offer';

export default function Courses() {
    return (
        <div className="pt-12 min-h-screen">
            <div className="container mx-auto px-6 mb-12 text-center">
                <span className="text-navis-gold font-bold tracking-widest uppercase mb-2 block">Oferta Szkoleniowa</span>
                <h1 className="text-5xl md:text-6xl font-black text-navis-navy dark:text-white mb-6">Wybierz Swój Kurs</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Szkolenia żeglarskie i motorowodne na najwyższym poziomie. Przygotowujemy do egzaminów państwowych i uczymy praktycznych umiejętności niezbędnych na wodzie.
                </p>
            </div>
            <Offer />

            {/* Detailed Info Section (Example) */}
            <section className="py-24 bg-white dark:bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-navis-navy dark:text-white mb-6">Patent Żeglarza Jachtowego</h3>
                            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                                <li className="flex gap-3"><span className="text-navis-gold font-bold">✓</span> Uprawnia do prowadzenia jachtów żaglowych po wodach śródlądowych.</li>
                                <li className="flex gap-3"><span className="text-navis-gold font-bold">✓</span> Prowadzenie jachtów o długości do 12m na wodach morskich w dzień.</li>
                                <li className="flex gap-3"><span className="text-navis-gold font-bold">✓</span> Kompleksowe przygotowanie teoretyczne i praktyczne.</li>
                            </ul>
                            <a href="https://kzposejdon.pl/egzaminy-pzz/" className="mt-8 inline-block text-navis-gold font-bold hover:text-white transition-colors">Sprawdź terminy egzaminów &rarr;</a>
                        </div>
                        <div className="h-64 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

import diveImage from '../assets/image3.jpg';

export default function Diving() {
    return (
        <div className="pt-12 min-h-screen">
            <div className="container mx-auto px-6 text-center mb-16">
                <span className="text-navis-gold font-bold tracking-widest uppercase mb-2 block">Pod Wodą</span>
                <h1 className="text-5xl font-black text-navis-navy dark:text-white mb-6">Nurkowanie i Wyprawy</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                    Współpracujemy z międzynarodowymi centrami nurkowymi. Odkryj piękno raf koralowych i wraków na Filipinach.
                </p>
            </div>

            <div className="container mx-auto px-6 mb-24">
                <div className="bg-navis-navy rounded-3xl overflow-hidden shadow-2xl relative text-white">
                    <div className="md:flex">
                        <div className="md:w-1/2 min-h-[400px]">
                            <img src={diveImage} alt="Diving Philippines" className="w-full h-full object-cover" />
                        </div>
                        <div className="md:w-1/2 p-12 flex flex-col justify-center">
                            <h3 className="text-3xl font-black mb-6 text-navis-gold">Filipiny: Zatoka Coron</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Divemasterzy, z którymi jesteśmy w kontakcie, nurkują i pracują na Filipinach na wyspie Busuanga. Mówią po polsku i angielsku. Z nimi odkrycie głębin jest na wyciągnięcie ręki.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-navis-gold">scuba_diving</span> Polscy Instruktorzy</li>
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-navis-gold">landscape</span> Niesamowite widoki</li>
                                <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-navis-gold">anchor</span> Wraki statków</li>
                            </ul>
                            <a href="/contact" className="px-8 py-3 bg-white text-navis-navy font-bold rounded-full w-max hover:bg-gray-100 transition-colors">
                                Skontaktuj się z nami
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

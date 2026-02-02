import bgImage from '../assets/image4.jpg';
import sideImage from '../assets/image1.jpg';

export default function Cruises() {
    return (
        <div className="pt-12 min-h-screen">
            <div className="container mx-auto px-6 text-center mb-16">
                <span className="text-navis-gold font-bold tracking-widest uppercase mb-2 block">Relaks na Wodzie</span>
                <h1 className="text-5xl font-black text-navis-navy dark:text-white mb-6">Rejsy Rekreacyjne</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                    O ile nasza firma koncentruje się głównie na szkoleniach, to rozumiemy, że nie każdy chce być kapitanem. Czasem chcesz po prostu odpocząć.
                </p>
            </div>

            {/* Hero-like Section */}
            <div className="relative h-[500px] mb-24 overflow-hidden group">
                <img src={bgImage} alt="Cruises" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white text-center px-4 leading-tight">
                        My sterujemy.<br /> Ty wypoczywasz.
                    </h2>
                </div>
            </div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-24">
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                        Jeśli marzysz o tym, żeby rozsiąść się wygodnie na łodzi, otworzyć zimnego browarka, być wożonym i podziwiać krajobrazy – to nie ma sprawy, to też dla Ciebie zorganizujemy.
                    </p>
                    <p className="font-bold text-navis-navy dark:text-white">
                        Organizujemy rejsy śródlądowe i nie tylko, na których my dbamy o kurs, a Ty o swój relaks.
                    </p>
                    <a href="/contact" className="inline-block mt-4 px-8 py-3 bg-navis-gold text-white rounded-full font-bold hover:bg-yellow-600 transition-colors">
                        Zapytaj o Terminy
                    </a>
                </div>
                <div className="relative h-96 bg-gray-200 dark:bg-white/5 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img
                        src={sideImage}
                        alt="Relaxing Cruise"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

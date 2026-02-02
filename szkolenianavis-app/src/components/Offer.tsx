import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import imgSailing from '../assets/image4.jpg';
import imgMotor from '../assets/image5.jpg';
import imgDiving from '../assets/image3.jpg';
import imgCharter from '../assets/image1.jpg';

const offers = [
    {
        id: 'sailing',
        title: 'Szkolenia Żeglarskie',
        subtitle: 'Yacht Skipper Course',
        desc: 'Zdobądź patent żeglarza jachtowego. Wynajmij żaglówkę na Mazurach i popłyń w rejs.',
        img: imgSailing,
        link: 'https://kzposejdon.pl/egzaminy-pzz/',
        external: true
    },
    {
        id: 'motor',
        title: 'Szkolenia Motorowodne',
        subtitle: 'Motorboat Skipper Course',
        desc: 'Dla fanów prędkości i mocy. Patent sternika motorowodnego otwiera wiele możliwości.',
        img: imgMotor,
        link: 'https://kzposejdon.pl/egzaminy/',
        external: true
    },
    {
        id: 'charter',
        title: 'Szkolenia Czarterowe',
        subtitle: 'Charter Training',
        desc: 'Szybkie szkolenie praktyczne, abyś poczuł się pewnie i bezpiecznie na wynajętej łodzi.',
        img: imgCharter,
        link: '/courses',
        external: false
    },
    {
        id: 'diving',
        title: 'Nurkowanie',
        subtitle: 'Diving Expeditions',
        desc: 'Wyprawy nurkowe, m.in. na Filipiny. Odkryj wraki i rafy koralowe z naszymi Divemasterami.',
        img: imgDiving,
        link: '/diving',
        external: false
    },
];

export default function Offer() {
    return (
        <section id="courses" className="py-24 bg-navis-light dark:bg-transparent transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-navis-gold font-bold tracking-widest uppercase mb-2 block">Nasza Oferta / Offer</span>
                    <h2 className="text-4xl md:text-5xl font-black text-navis-navy dark:text-white transition-colors duration-500">Wybierz Swoją Przygodę</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group bg-white dark:bg-[#0B1C3E]/50 dark:border dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-[#0B1C3E]/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src={offer.img}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-navis-navy dark:text-white mb-1 transition-colors duration-500">{offer.title}</h3>
                                <h4 className="text-sm font-medium text-navis-gold uppercase mb-4">{offer.subtitle}</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 transition-colors duration-500">{offer.desc}</p>
                                {offer.external ? (
                                    <a
                                        href={offer.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-navis-navy dark:text-white font-bold hover:text-navis-gold dark:hover:text-navis-gold transition-colors text-sm uppercase tracking-wide border-b-2 border-navis-navy dark:border-white hover:border-navis-gold dark:hover:border-navis-gold pb-1"
                                    >
                                        Dowiedz się więcej &rarr;
                                    </a>
                                ) : (
                                    <Link
                                        to={offer.link}
                                        className="inline-block text-navis-navy dark:text-white font-bold hover:text-navis-gold dark:hover:text-navis-gold transition-colors text-sm uppercase tracking-wide border-b-2 border-navis-navy dark:border-white hover:border-navis-gold dark:hover:border-navis-gold pb-1"
                                    >
                                        Dowiedz się więcej &rarr;
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

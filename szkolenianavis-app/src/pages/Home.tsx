import Hero from '../components/Hero';
import Offer from '../components/Offer';
import About from '../components/About';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <Hero />
            <div className="relative z-10 bg-navis-light dark:bg-navis-navy transition-colors duration-500">
                <About />
                <Offer />

                {/* CTA Section */}
                <section className="py-24 px-6 bg-navis-navy text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-navis-gold/10"></div>
                    <div className="container mx-auto text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-8">Gotowy na przygodę życia?</h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                            Dołącz do setek zadowolonych żeglarzy, którzy zdobyli uprawnienia z Navis.
                        </p>
                        <Link to="/contact" className="inline-block px-12 py-5 bg-white text-navis-navy font-bold rounded-full text-lg hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl uppercase tracking-widest">
                            Skontaktuj się
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}

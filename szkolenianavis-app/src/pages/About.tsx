import AboutComponent from '../components/About'; // Reuse the nice component

export default function About() {
    return (
        <div className="pt-12">
            <div className="container mx-auto px-6 text-center mb-12">
                <h1 className="text-5xl font-black text-navis-navy dark:text-white mb-6">O Nas</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                    Poznaj historię Navis i ludzi, którzy podzielą się z Tobą pasją do żeglarstwa.
                </p>
            </div>
            <AboutComponent />

            {/* Additional Stats/Team Section (Optional Polish) */}
            <section className="py-24 bg-navis-navy text-white mt-12">
                <div className="container mx-auto px-6 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-6">
                            <span className="text-5xl font-black text-navis-gold block mb-2">10+</span>
                            <span className="text-gray-300 uppercase tracking-widest text-sm">Lat Doświadczenia</span>
                        </div>
                        <div className="p-6">
                            <span className="text-5xl font-black text-navis-gold block mb-2">500+</span>
                            <span className="text-gray-300 uppercase tracking-widest text-sm">Przeszkolonych Żeglarzy</span>
                        </div>
                        <div className="p-6">
                            <span className="text-5xl font-black text-navis-gold block mb-2">100%</span>
                            <span className="text-gray-300 uppercase tracking-widest text-sm">Pasji</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597762470488-387751f538c6?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-grayscale-[0.5]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-transparent to-[#1A1A1A]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">
                        NOWOŚĆ W GIŻYCKU
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                    Twój własny warsztat<br />
                    <span className="text-primary">na godziny</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                    Profesjonalna przestrzeń przy ul. Sybiraków 28. <br className="hidden md:block" />
                    W pełni wyposażone stanowiska. Wynajmij, napraw, wyjedź.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group">
                        Zarezerwuj termin
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-white font-bold rounded hover:border-white transition-colors">
                        Sprawdź cennik
                    </button>
                </div>
            </div>
        </section>
    );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DomkiPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[url('/images/hero_bg.jpg')]"
                />
                <div className="relative z-20 text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-playfair mb-4">Domki Skorupki</h1>
                    <p className="text-xl md:text-2xl font-light">Twoja prywatna przystań</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
                <div className="prose dark:prose-invert max-w-none text-center">
                    <h2 className="text-3xl font-playfair mb-6 text-slate-900 dark:text-white">Relaks w rytmie slow</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                        Domki w Skorupkach to idealne miejsce dla rodzin i grup przyjaciół.
                        Położone w malowniczej okolicy, zapewniają prywatność i swobodę.
                        (Strona w przygotowaniu - więcej zdjęć i opisów wkrótce).
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

import { motion } from 'framer-motion';
import aboutImg from '../assets/image1.jpg'; // Using one of the downloaded images

export default function About() {
    return (
        <section id="about" className="py-24 bg-white dark:bg-transparent transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="absolute top-4 left-4 w-full h-full border-2 border-navis-gold -z-10 rounded-3xl"></div>
                        <img
                            src={aboutImg}
                            alt="About Navis"
                            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <span className="text-navis-gold font-bold tracking-widest uppercase mb-2 block">O Nas / About Us</span>
                        <h2 className="text-4xl md:text-5xl font-black text-navis-navy dark:text-white mb-8 leading-tight transition-colors duration-500">
                            Spełniamy Twoje <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-navis-navy to-blue-500 dark:from-white dark:to-blue-300">Marzenia o Żeglowaniu</span>
                        </h2>

                        <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-500">
                            <p>
                                Jeżeli pragniesz poczuć smak przygody na wodzie, zdobyć wymarzone uprawnienia albo po prostu rzucić wszystko i wypłynąć w rejs to dobrze trafiłeś! Jesteśmy tu po to aby każdy mógł spełnić swoje marzenie.
                            </p>
                            <p>
                                Szkolimy przyszłych żeglarzy i motorowodniaków, przygotowujemy do egzaminów państwowych oraz międzynarodowych. Nasi instruktorzy mówią również biegle po angielsku. Przekazujemy Ci wiedzę teoretyczną i praktykę dzięki której będziesz mógł poczuć się pewnie na wodzie.
                            </p>
                            <div className="p-6 bg-navis-light dark:bg-white/10 border-l-4 border-navis-gold rounded-r-xl italic text-navis-navy dark:text-white transition-colors duration-500">
                                <p>"The adventure is on the way, all you need is to get aboard."</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

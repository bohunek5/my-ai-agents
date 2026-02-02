import { MapPin, Hammer, Wifi, Snowflake, ArrowUpCircle } from "lucide-react";

export default function LocationCard() {
    const amenities = [
        { icon: ArrowUpCircle, label: "Podnośnik 4T" },
        { icon: Hammer, label: "Komplet narzędzi" },
        { icon: Snowflake, label: "Ogrzewana hala" },
        { icon: Wifi, label: "Szybkie Wi-Fi" },
    ];

    return (
        <section className="py-24 bg-[#151515]" id="location">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
                            <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                                Lokalizacja & Wyposażenie
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Wszystko czego potrzebujesz <br />
                            <span className="text-primary">w jednym miejscu</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Nasz garaż to nie tylko cztery ściany. To profesjonalne stanowisko warsztatowe wyposażone w wysokiej klasy sprzęt, dzięki któremu sprawnie wykonasz każdą naprawę.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {amenities.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-[#222] border border-white/5 hover:border-primary/50 transition-colors group">
                                    <div className="p-2 rounded-md bg-[#1A1A1A] text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-semibold text-gray-200">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-white">
                            <MapPin className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-bold">ul. Sybiraków 28</p>
                                <p className="text-sm text-gray-400">11-500 Giżycko</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        {/* Placeholder for Map - using an iframe or static image in real app */}
                        <div className="absolute inset-0 bg-[#2A2A2A] flex items-center justify-center">
                            {/* Google Maps Embed Mock */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2366.123456789!2d21.7654321!3d54.0321098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTCwMDEnNTUuNiJOIDIxwrA0NSw1NS42IkU!5e0!3m2!1sen!2spl!4v1600000000000!5m2!1sen!2spl"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
                                allowFullScreen={false}
                                loading="lazy"
                            ></iframe>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 bg-[#1A1A1A]/90 backdrop-blur p-4 rounded-lg border border-white/10 flex justify-between items-center">
                            <span className="text-white font-medium">Jak dojechać?</span>
                            <button className="text-primary text-sm font-bold hover:underline">
                                Nawiguj
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

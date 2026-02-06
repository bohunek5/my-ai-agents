"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Apartments() {
    const { t } = useLanguage();

    const apartments = [
        {
            id: 1,
            title: t("apartments", "items.stranda.title"),
            location: t("apartments", "items.stranda.location"),
            description: t("apartments", "items.stranda.description"),
            image: "/images/apartments_1.jpg",
            people: "4-6",
            link: "/apartamenty/stranda",
            price: "350 zł"
        },
        {
            id: 2,
            title: t("apartments", "items.kisajno.title"),
            location: t("apartments", "items.kisajno.location"),
            description: t("apartments", "items.kisajno.description"),
            image: "/images/apartments_2.jpg",
            people: "2-4",
            link: "/apartamenty/kisajno",
            price: "400 zł"
        },
        {
            id: 3,
            title: t("apartments", "items.fuleda.title"),
            location: t("apartments", "items.fuleda.location"),
            description: t("apartments", "items.fuleda.description"),
            image: "/images/apartments_1.jpg",
            people: "6-10",
            link: "/apartamenty/fuleda",
            price: "800 zł"
        }
    ];

    return (
        <section id="apartamenty" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-4 transition-colors">
                        {t("apartments", "title")}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
                        {t("apartments", "description")}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {apartments.map((apt) => (
                        <div key={apt.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={apt.image}
                                    alt={apt.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-900 dark:text-white shadow-sm">
                                    {t("apartments", "pricePrefix")} {apt.price}/{t("apartments", "night")}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-amber-500 text-sm font-medium mb-3">
                                    <MapPin size={16} />
                                    {apt.location}
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-500 transition-colors">
                                    {apt.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow line-clamp-3">
                                    {apt.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
                                    <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                        <Users size={16} />
                                        {apt.people} {t("apartments", "people")}
                                    </span>

                                    <Link href={apt.link} className="flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                                        {t("apartments", "details")}
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

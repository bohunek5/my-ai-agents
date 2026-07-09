"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { strandaApartments } from "@/data/stranda-apartments";
import { getAssetPath } from "@/utils/assetPath";


// Update buildings data structure to include images from strandaApartments data
const getBuildingsData = () => {
    const buildings: Record<"A" | "B" | "C", { id: string; image: string }[]> = {
        A: [],
        B: [],
        C: [],
    };

    Object.values(strandaApartments).forEach((apt) => {
        const b = apt.building as "A" | "B" | "C";
        if (buildings[b]) {
            buildings[b].push({
                id: apt.id,
                image: apt.gallery.heroImage || apt.gallery.images[0] || getAssetPath("/images/placeholder.webp"),
            });
        }
    });

    // Ensure they are sorted by ID
    buildings.A.sort((a, b) => a.id.localeCompare(b.id));
    buildings.B.sort((a, b) => a.id.localeCompare(b.id));
    buildings.C.sort((a, b) => a.id.localeCompare(b.id));

    return buildings;
};

export default function StrandaPage() {
    const { t } = useLanguage();
    const buildings = useMemo(() => getBuildingsData(), []);
    const buildingKeys: Array<"A" | "B" | "C"> = ["A", "B", "C"];

    // Filter states
    const [filterJacuzzi, setFilterJacuzzi] = useState(false);
    const [filterCapacity, setFilterCapacity] = useState<'all' | '4' | '6'>('all');
    const [filterFloor, setFilterFloor] = useState<'all' | 'parter' | 'pietro'>('all');

    const filteredBuildings = useMemo(() => {
        const result: Record<"A" | "B" | "C", typeof buildings.A> = { A: [], B: [], C: [] };
        
        for (const buildingKey of buildingKeys) {
            result[buildingKey] = buildings[buildingKey].filter((unit) => {
                const aptData = strandaApartments[unit.id as keyof typeof strandaApartments];
                if (!aptData) return false;
                
                // Check Jacuzzi
                if (filterJacuzzi) {
                    const hasJacuzzi = aptData.amenities?.terrace?.some((item: string) => item.toLowerCase().includes('jacuzzi')) 
                        || aptData.title?.toLowerCase().includes('jacuzzi');
                    if (!hasJacuzzi) return false;
                }
                
                // Check Capacity
                if (filterCapacity !== 'all') {
                    const guestsStr = aptData.guests || "4";
                    const parts = guestsStr.split('+').map(n => parseInt(n.trim(), 10) || 0);
                    const totalGuests = parts.reduce((a, b) => a + b, 0);
                    
                    if (filterCapacity === '4' && totalGuests > 4) return false;
                    if (filterCapacity === '6' && totalGuests <= 4) return false;
                }
                
                // Check Floor
                if (filterFloor !== 'all') {
                    const floorDigit = parseInt(unit.id[1], 10);
                    const isParter = floorDigit === 1;
                    
                    if (filterFloor === 'parter' && !isParter) return false;
                    if (filterFloor === 'pietro' && isParter) return false;
                }
                
                return true;
            });
        }
        return result;
    }, [buildings, filterJacuzzi, filterCapacity, filterFloor]);

    const filtersLabels = (t("stranda", "filters") as any) || {};

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getAssetPath('/images/stranda/stranda_main.webp')}')` }}
                />
                <div className="relative z-20 text-center text-white p-4">
                    <div className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg mb-4">Giżycko, Jezioro Kisajno</div>
                    <h1 className="text-4xl md:text-7xl font-sans mb-2">Stranda Residence</h1>
                    <p className="text-xl md:text-3xl font-light">{t("stranda", "subtitle")}</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {t("stranda", "description")}
                    </p>
                </div>

                {/* Filters Panel */}
                <div className="mb-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
                        
                        {/* Jacuzzi Toggle */}
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{filtersLabels.jacuzzi || "Tylko z Jacuzzi"}</span>
                            <button
                                onClick={() => setFilterJacuzzi(!filterJacuzzi)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${filterJacuzzi ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500/50'}`}
                            >
                                {filterJacuzzi ? "✓ " + (filtersLabels.jacuzzi || "Tylko z Jacuzzi") : "○ " + (filtersLabels.jacuzzi || "Tylko z Jacuzzi")}
                            </button>
                        </div>

                        {/* Capacity Selector */}
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{filtersLabels.size || "Rozmiar"}</span>
                            <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 flex-wrap">
                                {['all', '4', '6'].map((cap) => (
                                    <button
                                        key={cap}
                                        onClick={() => setFilterCapacity(cap as any)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${filterCapacity === cap ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        {cap === 'all' ? (filtersLabels.sizeAny || "Dowolny") : cap === '4' ? (filtersLabels.size4 || "Max 4 os.") : (filtersLabels.size6 || "Max 6 os.")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Floor Selector */}
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{filtersLabels.floor || "Kondygnacja"}</span>
                            <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 flex-wrap">
                                {['all', 'parter', 'pietro'].map((floor) => (
                                    <button
                                        key={floor}
                                        onClick={() => setFilterFloor(floor as any)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${filterFloor === floor ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        {floor === 'all' ? (filtersLabels.floorAny || "Dowolna") : floor === 'parter' ? (filtersLabels.floorParter || "Parter") : (filtersLabels.floorPietro || "Piętro")}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Building Sections */}
                {buildingKeys.map((buildingKey) => {
                    if (filteredBuildings[buildingKey].length === 0) return null;
                    
                    return (
                        <motion.div layout key={buildingKey} className="mb-24 last:mb-0">
                            {/* Section Header with Large Button */}
                            <motion.div layout className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-12">
                                {/* Building Label */}
                                <div className="w-full sm:w-auto px-12 py-5 bg-amber-500 text-white rounded-full font-bold text-xl md:text-2xl shadow-xl shadow-amber-500/20 text-center tracking-widest uppercase">
                                    {t("stranda", "building")} {buildingKey}
                                </div>
                            </motion.div>

                            {/* Units Grid */}
                            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {filteredBuildings[buildingKey].map((unit) => {
                                        const aptData = strandaApartments[unit.id as keyof typeof strandaApartments];
                                        return (
                                            <motion.div 
                                                layout
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.3 }}
                                                key={unit.id} 
                                                className="group flex flex-col h-full space-y-4"
                                            >
                                                <Link href={`/apartamenty/stranda/${unit.id}`} className="block flex-grow">
                                                    <div
                                                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col h-full relative"
                                                    >
                                                        <div className="relative h-64 w-full overflow-hidden">
                                                            <Image
                                                                src={unit.image}
                                                                alt={`Apartament ${unit.id}`}
                                                                fill
                                                                quality={95}
                                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                                            <div className="absolute bottom-4 left-5 text-white">
                                                                <span className="text-xs uppercase tracking-widest opacity-90 font-medium mb-1 block">{t("stranda", "apartment")}</span>
                                                                <h3 className="text-2xl font-bold font-sans">
                                                                    {unit.id === 'c-studio' ? 'C Studio' : unit.id === 'c-z-dwoma-sypialniami' ? 'C z dwoma sypialniami' : unit.id === 'c-z-jedna-sypialnia' ? 'C z jedną sypialnią' : unit.id}
                                                                    {aptData?.amenities?.terrace?.some((item: string) => item.includes('jacuzzi')) && aptData?.amenities?.living?.some((item: string) => item.includes('sauna')) 
                                                                        ? " z sauną i jacuzzi"
                                                                        : aptData?.amenities?.terrace?.some((item: string) => item.includes('jacuzzi')) && aptData?.description?.includes('na dachu')
                                                                        ? " z jacuzzi na dachu"
                                                                        : aptData?.amenities?.terrace?.some((item: string) => item.includes('jacuzzi'))
                                                                        ? " z jacuzzi"
                                                                        : aptData?.amenities?.living?.some((item: string) => item.includes('sauna'))
                                                                        ? " z sauną"
                                                                        : ""}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <a
                                                    href={`https://engine37851.idobooking.com/index.php?ob[${aptData?.idoBookingId || '1'}]=&showOtherOffers=true&currency=0&language=0&from_own_button=1`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full bg-[#00c853] hover:bg-[#00e676] text-white text-center py-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                                                >
                                                    {(t("apartments", "bookBtn") as string) || "ZAREZERWUJ GO"}
                                                </a>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </section>
            
            <Footer />
        </main>
    );
}

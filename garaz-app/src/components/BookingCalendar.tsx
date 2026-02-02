"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Info } from "lucide-react";
import { motion } from "framer-motion";

type SlotStatus = "available" | "occupied" | "selected";

interface TimeSlot {
    id: string;
    time: string;
    status: SlotStatus;
    price: number;
}

const DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
const HOURS = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

export default function BookingCalendar() {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Mock data generation
    const generateSlots = (dayIndex: number) => {
        return HOURS.map((time, i) => ({
            id: `d${dayIndex}-t${i}`,
            time,
            status: Math.random() > 0.7 ? "occupied" : "available",
            price: 45, // PLN
        } as TimeSlot));
    };

    const [weekOffset, setWeekOffset] = useState(0);

    const handleSlotClick = (slot: TimeSlot) => {
        if (slot.status === "occupied") return;
        setSelectedSlot(selectedSlot === slot.id ? null : slot.id);
    };

    return (
        <section className="py-24 bg-[#1A1A1A]" id="booking">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Calendar Section */}
                    <div className="lg:w-2/3">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Wybierz termin</h2>
                            <p className="text-gray-400">Rezerwacja online w 3 minuty. Bez dzwonienia.</p>
                        </div>

                        <div className="flex items-center justify-between mb-6 bg-secondary/30 p-4 rounded-lg border border-white/5">
                            <button
                                onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                                disabled={weekOffset === 0}
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <span className="font-semibold text-white">
                                {weekOffset === 0 ? "Ten tydzień" : `Tydzień +${weekOffset}`}
                            </span>
                            <button
                                onClick={() => setWeekOffset(weekOffset + 1)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {DAYS.map((day) => (
                                <div key={day} className="text-center">
                                    <span className="text-sm font-medium text-gray-500">{day}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {DAYS.map((_, dayIndex) => (
                                <div key={dayIndex} className="space-y-2">
                                    {generateSlots(dayIndex).map((slot) => {
                                        const isSelected = selectedSlot === slot.id;
                                        return (
                                            <motion.button
                                                key={slot.id}
                                                whileHover={{ scale: slot.status !== "occupied" ? 1.05 : 1 }}
                                                whileTap={{ scale: slot.status !== "occupied" ? 0.95 : 1 }}
                                                onClick={() => handleSlotClick(slot)}
                                                className={`
                          w-full py-2.5 rounded text-xs font-semibold transition-all
                          ${slot.status === "occupied"
                                                        ? "bg-occupied text-gray-400 cursor-not-allowed border border-transparent"
                                                        : isSelected
                                                            ? "bg-primary text-white ring-2 ring-primary ring-offset-2 ring-offset-[#1A1A1A]"
                                                            : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333333] border border-white/5"
                                                    }
                        `}
                                            >
                                                {slot.time}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-6 mt-8 justify-center lg:justify-start">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-[#2A2A2A] border border-white/5"></div>
                                <span className="text-sm text-gray-400">Dostępny</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-occupied"></div>
                                <span className="text-sm text-gray-400">Zajęty</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-primary"></div>
                                <span className="text-sm text-gray-400">Twój wybór</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24 bg-secondary/20 backdrop-blur border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Podsumowanie</h3>

                            {selectedSlot ? (
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
                                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Wybrany termin</p>
                                            <p className="text-white font-medium">Poniedziałek, 12:00 - 14:00</p>
                                            <p className="text-xs text-gray-500 mt-1">2 godziny</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 my-4"></div>

                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400">Cena za godzinę</span>
                                        <span className="text-white">45 zł</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-400">Czas trwania</span>
                                        <span className="text-white">2h</span>
                                    </div>

                                    <div className="flex justify-between items-center text-lg font-bold text-white pt-4 border-t border-white/10">
                                        <span>Do zapłaty</span>
                                        <span className="text-primary">90 zł</span>
                                    </div>

                                    <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20">
                                        Przejdź do płatności
                                    </button>

                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        Rezerwacja jest bezpieczna. Możesz anulować do 24h przed terminem.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Wybierz godzinę z kalendarza, aby zobaczyć szczegóły rezerwacji.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ReservationFormProps {
    onClose: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        vehicleType: 'car',
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setStep(2);
        setTimeout(() => {
            setStep(3); // Success state
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-tech-navy p-6 flex justify-between items-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold font-display">Rezerwacja Miejsca</h3>
                        <p className="text-blue-200 text-sm">Gwarancja bezpiecznego postoju</p>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Od kiedy</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium dark:text-white"
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Do kiedy</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium dark:text-white"
                                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pojazd</label>
                                <select
                                    className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium dark:text-white"
                                    value={formData.vehicleType}
                                    onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                                >
                                    <option value="car">Osobówka (Standard)</option>
                                    <option value="suv">SUV / Terenowy</option>
                                    <option value="van">Bus / Dostawczy</option>
                                    <option value="camper">Kamper</option>
                                </select>
                            </div>

                            <div className="space-y-4 pt-2">
                                <input
                                    type="email"
                                    placeholder="Twój adres email"
                                    required
                                    className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium dark:text-white"
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <span>Potwierdź rezerwację</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="py-12 flex flex-col items-center text-center">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
                            <h4 className="text-xl font-bold text-tech-navy dark:text-white mb-2">Przetwarzanie...</h4>
                            <p className="text-slate-500">Sprawdzamy dostępność miejsc.</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="py-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h4 className="text-2xl font-bold text-tech-navy dark:text-white mb-2">Rezerwacja przyjęta!</h4>
                            <p className="text-slate-500 mb-8 max-w-xs">Potwierdzenie wysłaliśmy na Twój adres email. Do zobaczenia na parkingu!</p>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Zamknij
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

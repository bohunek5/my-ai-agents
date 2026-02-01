import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Client {
    id: number;
    name: string;
    email: string;
    vehicle: string;
    plate: string;
    lastPurchase: string;
    product?: string;
    status: 'active' | 'inactive' | 'expired';
}

export const ClientPanel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState<'client' | 'admin'>('client');
    const [view, setView] = useState<'dashboard' | 'settings'>('dashboard');
    const [email, setEmail] = useState('jan.kowalski@example.com');
    const [password, setPassword] = useState('password123');

    // Admin State
    const [clients, setClients] = useState<Client[]>([
        { id: 1, name: "TechBud Sp. z o.o.", email: "biuro@techbud.pl", vehicle: "Mercedes Sprinter", plate: "WA 98234", lastPurchase: "2025-10-03", product: "Betoniarka X5", status: 'active' },
        { id: 2, name: "Piekarnia Jan Kowalski", email: "piekarnia@kowalski.pl", vehicle: "Fiat Ducato", plate: "WB 77123", lastPurchase: "2026-01-21", product: "Mąka Żytnia 50kg", status: 'active' },
        { id: 3, name: "Auto-Serwis Max", email: "max@serwis.com", vehicle: "Toyota Hilux", plate: "WJ 44556", lastPurchase: "2025-09-03", product: "Olej Silnikowy 5L", status: 'inactive' },
        { id: 4, name: "Hotel Blue", email: "recepcja@hotelblue.pl", vehicle: "Volkswagen Crafter", plate: "KR 55992", lastPurchase: "2026-01-26", product: "Ręczniki Hotelowe", status: 'active' },
        { id: 5, name: "Eko-Warzywa", email: "kontakt@ekowarzywa.pl", vehicle: "Renault Master", plate: "LU 11223", lastPurchase: "2025-07-15", product: "Nawóz Bio", status: 'expired' }
    ]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // New Client Form State
    const [newClientData, setNewClientData] = useState<Partial<Client>>({
        name: '', email: '', vehicle: '', plate: '', status: 'active'
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            if (email === 'admin' && password === 'admin7') {
                setUserType('admin');
                setIsLoggedIn(true);
            } else {
                setUserType('client');
                setIsLoggedIn(true);
            }
        }, 500);
    };

    const handleAddClient = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Math.max(...clients.map(c => c.id)) + 1;
        const now = new Date().toISOString().split('T')[0];
        const clientToAdd: Client = {
            id: newId,
            name: newClientData.name || 'Nowy Klient',
            email: newClientData.email || 'brak@email.com',
            vehicle: newClientData.vehicle || 'Brak pojazdu',
            plate: newClientData.plate || '---',
            lastPurchase: now,
            product: 'Nowa Rezerwacja',
            status: (newClientData.status as any) || 'active'
        };
        setClients([...clients, clientToAdd]);
        setIsAddModalOpen(false);
        setNewClientData({ name: '', email: '', vehicle: '', plate: '', status: 'active' });
    };

    if (isLoggedIn) {
        return (
            <div className="w-full min-h-screen bg-background-light dark:bg-slate-900 pb-20 font-sans relative">
                {/* Dashboard Header */}
                <div className="bg-tech-navy text-white pt-28 pb-12 px-6 rounded-b-[2rem] shadow-xl mb-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-[2px]">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <span className="material-symbols-outlined text-3xl">person</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-display font-bold">Witaj, {userType === 'admin' ? 'Administratorze' : 'Jan!'}</h1>
                                <p className="text-slate-400 text-sm">{userType === 'admin' ? 'Panel Zarządzania' : 'Klient Premium • ID: #88291'}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {userType === 'client' && (
                                <button
                                    onClick={() => setView('settings')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${view === 'settings' ? 'bg-white text-tech-navy font-bold' : 'bg-white/10 hover:bg-white/20'}`}
                                >
                                    <span className="material-symbols-outlined text-lg">settings</span>
                                    Ustawienia
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (view === 'settings') {
                                        setView('dashboard');
                                    } else {
                                        setIsLoggedIn(false);
                                        setUserType('client');
                                        setView('dashboard');
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm border border-red-500/20"
                            >
                                <span className="material-symbols-outlined text-lg">{view === 'settings' ? 'arrow_back' : 'logout'}</span>
                                {view === 'settings' ? 'Wróć' : 'Wyloguj'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-6">
                    {userType === 'admin' ? (
                        // ADMIN VIEW
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-tech-navy dark:text-white">Lista Klientów</h2>
                                    <p className="text-sm text-slate-400">Zarządzaj dostępem i rezerwacjami</p>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    Dodaj Klienta
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50 uppercase tracking-wider text-xs font-bold text-slate-500">
                                        <tr>
                                            <th className="px-6 py-4">Firma / Klient</th>
                                            <th className="px-6 py-4">Pojazd</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Ostatnia Akt.</th>
                                            <th className="px-6 py-4 text-right">Akcje</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {clients.map((client) => (
                                            <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-tech-navy dark:text-white">{client.name}</p>
                                                    <p className="text-xs text-slate-400">{client.email}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-slate-700 dark:text-slate-300">{client.vehicle}</p>
                                                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-mono mt-1">{client.plate}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                        ${client.status === 'active' ? 'bg-green-100 text-green-700' :
                                                            client.status === 'inactive' ? 'bg-slate-100 text-slate-600' :
                                                                'bg-red-100 text-red-600'}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'active' ? 'bg-green-600' : client.status === 'inactive' ? 'bg-slate-500' : 'bg-red-500'}`}></span>
                                                        {client.status === 'active' ? 'Aktywny' : client.status === 'inactive' ? 'Nieaktywny' : 'Wygasł'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {client.lastPurchase}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => setSelectedClient(client)}
                                                        className="text-primary hover:text-blue-700 font-bold text-xs uppercase tracking-wide bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                                                    >
                                                        Szczegóły
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : view === 'dashboard' ? (
                        // CLIENT DASHBOARD VIEW
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Status Card */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Active Reservation */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                        <span className="material-symbols-outlined text-9xl text-action-green">check_circle</span>
                                    </div>

                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div>
                                            <h2 className="text-lg font-bold text-tech-navy dark:text-white mb-1">Aktywny Postój</h2>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                                                Parkuje
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Miejsce</p>
                                            <p className="text-3xl font-black text-primary">A-42</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 relative z-10">
                                        <div>
                                            <p className="text-slate-400 text-xs mb-1">Pojazd</p>
                                            <p className="font-bold dark:text-white">Volvo XC90</p>
                                            <p className="text-xs text-slate-500">WI 54321</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs mb-1">Wjazd</p>
                                            <p className="font-bold dark:text-white">Dziś, 08:30</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs mb-1">Czas trwania</p>
                                            <p className="font-bold text-primary">4h 15m</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs mb-1">Koszt bieżący</p>
                                            <p className="font-bold dark:text-white">25.00 PLN</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 relative z-10">
                                        <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20">
                                            Opłać i Wyjedź
                                        </button>
                                        <button className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center">
                                            <span className="material-symbols-outlined">qr_code_2</span>
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Recent History */}
                                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6">
                                    <h3 className="text-lg font-bold text-tech-navy dark:text-white mb-6">Ostatnie Aktywności</h3>
                                    <div className="space-y-4">
                                        {[
                                            { date: "Wczoraj, 18:45", action: "Wyjazd z parkingu", cost: "-35.00 PLN", icon: "output", color: "text-slate-500" },
                                            { date: "Wczoraj, 09:00", action: "Wjazd na parking", cost: "", icon: "input", color: "text-action-green" },
                                            { date: "28 Sty, 14:20", action: "Automatyczna płatność", cost: "-450.00 PLN", icon: "credit_card", color: "text-primary" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center ${item.color}`}>
                                                        <span className="material-symbols-outlined">{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm dark:text-white">{item.action}</p>
                                                        <p className="text-xs text-slate-400">{item.date}</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-sm dark:text-slate-200">{item.cost}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                {/* Quick Actions */}
                                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Szybkie Akcje</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center gap-2 text-center group">
                                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">add_card</span>
                                            <span className="text-xs font-bold">Dodaj Pojazd</span>
                                        </button>
                                        <button className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center gap-2 text-center group">
                                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">receipt_long</span>
                                            <span className="text-xs font-bold">Faktury</span>
                                        </button>
                                        <button className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center gap-2 text-center group">
                                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">diversity_3</span>
                                            <span className="text-xs font-bold">Rodzina</span>
                                        </button>
                                        <button className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center gap-2 text-center group">
                                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">help_center</span>
                                            <span className="text-xs font-bold">Pomoc</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Subscription Status */}
                                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-yellow-300">workspace_premium</span>
                                        <span className="font-bold text-sm uppercase tracking-wider text-blue-100">Plan Premium</span>
                                    </div>

                                    <p className="text-2xl font-black mb-1">Abonament</p>
                                    <p className="text-blue-100 text-sm mb-6">Ważny do: 28 Lut 2026</p>

                                    <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden mb-6">
                                        <div className="bg-white/90 h-full w-[15%] rounded-full"></div>
                                    </div>

                                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors border border-white/20">
                                        Przedłuż Pakiet
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // SETTINGS VIEW
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h2 className="text-2xl font-black text-tech-navy dark:text-white mb-8">Ustawienia Konta</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Personal Details */}
                                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">person</span>
                                        </div>
                                        <h3 className="font-bold text-lg dark:text-white">Dane Osobowe</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Imię i Nazwisko</label>
                                            <input type="text" defaultValue="Jan Kowalski" className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email kontaktowy</label>
                                            <input type="email" defaultValue="jan.kowalski@example.com" className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Telefon</label>
                                            <input type="tel" defaultValue="+48 123 456 789" className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-medium" />
                                        </div>
                                        <button className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-2 hover:bg-blue-600 transition-colors">
                                            Zapisz Zmiany
                                        </button>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                            <span className="material-symbols-outlined">lock</span>
                                        </div>
                                        <h3 className="font-bold text-lg dark:text-white">Bezpieczeństwo</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Obecne hasło</label>
                                            <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nowe hasło</label>
                                            <input type="password" placeholder="Minimum 8 znaków" className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-medium" />
                                        </div>
                                        <div className="pt-2">
                                            <div className="flex items-center gap-3 mb-2 text-sm text-slate-600 dark:text-slate-400">
                                                <span className="material-symbols-outlined text-action-green">check_circle</span>
                                                Weryfikacja dwuetapowa (2FA) aktywna
                                            </div>
                                        </div>
                                        <button className="w-full py-3 border border-slate-200 dark:border-slate-700 text-tech-navy dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                            Zmień Hasło
                                        </button>
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                                            <span className="material-symbols-outlined">notifications</span>
                                        </div>
                                        <h3 className="font-bold text-lg dark:text-white">Powiadomienia</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            "Powiadomienia o zbliżającym się końcu postoju",
                                            "Faktura VAT na maila",
                                            "Promocje i zniżki dla stałych klientów",
                                            "Alerty bezpieczeństwa (wykrycie ruchu przy pojeździe)"
                                        ].map((item, i) => (
                                            <label key={i} className="flex items-center gap-4 cursor-pointer p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-action-green"></div>
                                                </div>
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* MODALS */}
                <AnimatePresence>
                    {isAddModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="bg-tech-navy p-6 flex justify-between items-center text-white">
                                    <h3 className="text-lg font-bold">Dodaj Nowego Klienta</h3>
                                    <button onClick={() => setIsAddModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                <div className="p-8">
                                    <form onSubmit={handleAddClient} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nazwa Firmy / Imię</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                                                value={newClientData.name}
                                                onChange={e => setNewClientData({ ...newClientData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                                                value={newClientData.email}
                                                onChange={e => setNewClientData({ ...newClientData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pojazd</label>
                                                <input
                                                    type="text"
                                                    placeholder="np. Volvo XC60"
                                                    className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                                                    value={newClientData.vehicle}
                                                    onChange={e => setNewClientData({ ...newClientData, vehicle: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Rejestracja</label>
                                                <input
                                                    type="text"
                                                    placeholder="np. WX 12345"
                                                    className="w-full p-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium uppercase font-mono"
                                                    value={newClientData.plate}
                                                    onChange={e => setNewClientData({ ...newClientData, plate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <button className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-4 hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20">
                                            Zatwierdź i Dodaj
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {selectedClient && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedClient(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="absolute top-0 left-0 w-full h-32 bg-tech-navy">
                                    <div className="absolute top-4 right-4">
                                        <button onClick={() => setSelectedClient(null)} className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                                            <span className="material-symbols-outlined">close</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="relative pt-20 px-8 pb-8">
                                    <div className="flex justify-between items-end mb-6">
                                        <div className="flex items-end gap-4">
                                            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded-xl text-slate-400">
                                                    <span className="material-symbols-outlined text-4xl">domain</span>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <h2 className="text-2xl font-bold font-display text-tech-navy dark:text-white">{selectedClient.name}</h2>
                                                <div className="flex items-center gap-2 text-primary font-bold">
                                                    <span className="material-symbols-outlined text-sm">mail</span>
                                                    {selectedClient.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-3
                                            ${selectedClient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {selectedClient.status === 'active' ? 'Konto Aktywne' : 'Konto Wygasło'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Dane Pojazdu</h4>
                                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-slate-500">Model:</span>
                                                    <span className="font-bold">{selectedClient.vehicle}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500">Rejestracja:</span>
                                                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{selectedClient.plate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Ostatnia Aktywność</h4>
                                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-slate-500">Data:</span>
                                                    <span className="font-bold">{selectedClient.lastPurchase}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500">Typ:</span>
                                                    <span className="text-primary font-bold">{selectedClient.product || 'Standardowy Postój'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 dark:border-slate-700 pt-6 flex gap-4">
                                        <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors">
                                            Edytuj Dane
                                        </button>
                                        <button className="flex-1 py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-100 transition-colors border border-red-100">
                                            Zablokuj Konto
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center min-h-[calc(100vh-80px)] bg-neutral-gray dark:bg-slate-900/90 py-12 px-4 relative">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-action-green/10 rounded-full blur-[100px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative z-10"
            >
                <div className="bg-tech-navy p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-t from-tech-navy to-transparent z-10"></div>
                        {/* Abstract Pattern would go here */}
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="size-16 flex items-center justify-center bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-xl shadow-blue-900/50 mb-2">
                            <span className="material-symbols-outlined text-white text-4xl">local_parking</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white font-display tracking-tight">Panel Klienta</h1>
                            <p className="text-slate-400 text-sm mt-1">Bezpieczny Parking 24/7</p>
                        </div>
                    </div>
                </div>

                <div className="p-10">
                    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="login-email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">mail</span>
                                    <input
                                        type="text"
                                        id="login-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700 dark:text-white"
                                        placeholder="twoj@email.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="login-password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hasło</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">lock</span>
                                    <input
                                        type="password"
                                        id="login-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700 dark:text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <a href="#" className="text-xs text-primary font-bold hover:underline">Przypomnij hasło</a>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 mt-2 flex items-center justify-center gap-2 group"
                        >
                            <span>Zaloguj się bezpiecznie</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-slate-500 text-sm">
                            Nie posiadasz konta?{' '}
                            <Link to="/oferta" className="text-primary font-bold hover:underline">Zarezerwuj miejsce</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

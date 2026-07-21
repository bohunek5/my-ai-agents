"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { LayoutDashboard, CalendarRange, DollarSign, Settings, Check, X, ShieldAlert, TrendingUp, Mail, Lock } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";

type Booking = {
  id: string;
  dates: string;
  days: number;
  addons: string;
  total: number;
  status: "Paid" | "Confirmed" | "Cancelled" | "Pending";
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  created_at: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
};

export default function DamianNAdminPage() {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "messages" | "settings">("dashboard");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Price Configuration states
  const [boatPrice, setBoatPrice] = useState(800);
  const [supPrice, setSupPrice] = useState(50);
  const [bikePrice, setBikePrice] = useState(40);
  const [ebikePrice, setEbikePrice] = useState(80);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Initialize and load data from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Load Prices
      const savedBoat = localStorage.getItem("price_boat");
      const savedSup = localStorage.getItem("price_sup");
      const savedBike = localStorage.getItem("price_bike");
      const savedEbike = localStorage.getItem("price_ebike");
      
      if (savedBoat) setBoatPrice(Number(savedBoat));
      if (savedSup) setSupPrice(Number(savedSup));
      if (savedBike) setBikePrice(Number(savedBike));
      if (savedEbike) setEbikePrice(Number(savedEbike));

      // 2. Load Bookings (or seed if empty)
      const savedBookingsStr = localStorage.getItem("mazury_bookings");
      if (savedBookingsStr) {
        setBookings(JSON.parse(savedBookingsStr));
      } else {
        // Seed initial mock bookings
        const seedBookings: Booking[] = [
          {
            id: "MA-74921",
            dates: "14.07.2026 - 21.07.2026",
            days: 8,
            addons: "SUP x 2, Rower tradycyjny x 2",
            total: 7840,
            status: "Confirmed",
            clientName: "Anna Nowak",
            clientEmail: "anna.nowak@example.com",
            clientPhone: "+48 500 600 700",
            created_at: new Date(Date.now() - 86400000 * 2).toISOString()
          },
          {
            id: "MA-18503",
            dates: "25.07.2026 - 28.07.2026",
            days: 4,
            addons: "Rower elektryczny x 2",
            total: 3840,
            status: "Paid",
            clientName: "Tomasz Kowalski",
            clientEmail: "tomasz.k@example.com",
            clientPhone: "+48 601 202 303",
            created_at: new Date(Date.now() - 86400000 * 4).toISOString()
          },
          {
            id: "MA-90342",
            dates: "01.08.2026 - 05.08.2026",
            days: 5,
            addons: "SUP x 1",
            total: 4250,
            status: "Pending",
            clientName: "Marek Zając",
            clientEmail: "marek.zajac@example.com",
            clientPhone: "+48 700 800 900",
            created_at: new Date(Date.now() - 86400000 * 1).toISOString()
          }
        ];
        localStorage.setItem("mazury_bookings", JSON.stringify(seedBookings));
        setBookings(seedBookings);
      }

      // 3. Load Messages
      const savedMessagesStr = localStorage.getItem("mazury_messages");
      if (savedMessagesStr) {
        setMessages(JSON.parse(savedMessagesStr));
      } else {
        const seedMessages: Message[] = [
          {
            id: "MSG-001",
            name: "Jan Kowalski",
            email: "jan.kowalski@example.com",
            subject: "Pytanie o czarter",
            content: "Dzień dobry, czy w terminie 15.08-22.08 jest dostępny jacht ze sternikiem?",
            date: new Date(Date.now() - 86400000 * 1).toISOString(),
            isRead: false
          },
          {
            id: "MSG-002",
            name: "Anna Nowak",
            email: "anna.nowak@example.com",
            subject: "Rowery elektryczne",
            content: "Chciałabym wynająć dwa rowery elektryczne na weekend. Czy jest opcja dowozu?",
            date: new Date(Date.now() - 86400000 * 3).toISOString(),
            isRead: true
          }
        ];
        localStorage.setItem("mazury_messages", JSON.stringify(seedMessages));
        setMessages(seedMessages);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "MazuryAktywnie11500$") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Nieprawidłowe hasło");
    }
  };

  const handleMarkMessageRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, isRead: true } : m);
    setMessages(updated);
    localStorage.setItem("mazury_messages", JSON.stringify(updated));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("price_boat", String(boatPrice));
    localStorage.setItem("price_sup", String(supPrice));
    localStorage.setItem("price_bike", String(bikePrice));
    localStorage.setItem("price_ebike", String(ebikePrice));
    setSettingsSaved(true);
    setTimeout(() => {
      setSettingsSaved(false);
    }, 4000);
  };

  const handleUpdateStatus = (id: string, nextStatus: Booking["status"]) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: nextStatus };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem("mazury_bookings", JSON.stringify(updated));
  };

  // Metrics calculations
  const totalRevenue = bookings
    .filter((b) => b.status === "Paid" || b.status === "Confirmed")
    .reduce((sum, b) => sum + b.total, 0);

  const activeBookingsCount = bookings.filter(
    (b) => b.status === "Paid" || b.status === "Confirmed" || b.status === "Pending"
  ).length;

  const occupancyRate = bookings.length > 0 
    ? Math.min(100, Math.round((bookings.filter(b => b.status !== "Cancelled").length / 10) * 100))
    : 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white text-center">
              Panel Administratora
            </h1>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Wprowadź hasło dostępu
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hasło"
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
              {authError && <p className="text-red-500 text-xs mt-2 font-bold">{authError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-red-650 dark:text-red-400">
            <ShieldAlert size={24} />
            <span className="font-black tracking-tight text-gray-900 dark:text-white">CMS PANEL</span>
          </div>

          <nav className="flex flex-col gap-2 font-bold text-sm">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/30"
              }`}
            >
              <LayoutDashboard size={18} />
              <span>{t("Admin", "dashboard")}</span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all cursor-pointer ${
                activeTab === "bookings"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/30"
              }`}
            >
              <CalendarRange size={18} />
              <span>{t("Admin", "bookings")}</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all cursor-pointer ${
                activeTab === "messages"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>Wiadomości</span>
              </div>
              {messages.filter(m => !m.isRead).length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {messages.filter(m => !m.isRead).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/30"
              }`}
            >
              <Settings size={18} />
              <span>{t("Admin", "settings")}</span>
            </button>
          </nav>
        </div>

        <div className="hidden md:block pt-6 border-t border-gray-150 dark:border-gray-700 text-[10px] text-gray-400">
          Zalogowany jako Administrator
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-grow p-6 md:p-10 space-y-8">
        
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            {t("Admin", "title")}
          </h1>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full text-xs font-bold uppercase tracking-wider">
            v1.2.0 (Next.js 16)
          </span>
        </div>

        {/* Tab 1: Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex justify-between items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {t("Admin", "totalRevenue")}
                  </span>
                  <p className="text-3xl font-black text-gray-950 dark:text-white">
                    {totalRevenue} {t("Admin", "currency")}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex justify-between items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {t("Admin", "activeBookings")}
                  </span>
                  <p className="text-3xl font-black text-gray-950 dark:text-white">
                    {activeBookingsCount}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <CalendarRange size={24} />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex justify-between items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {t("Admin", "occupancyRate")}
                  </span>
                  <p className="text-3xl font-black text-gray-950 dark:text-white">
                    {occupancyRate}%
                  </p>
                </div>
                <div className="p-3 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-2xl">
                  <TrendingUp size={24} />
                </div>
              </div>

            </div>

            {/* General Info / Tip */}
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-800 space-y-2 text-sm leading-relaxed">
              <h3 className="font-bold text-blue-900 dark:text-blue-300">Witaj w Panelu Zarządzania!</h3>
              <p className="text-blue-700 dark:text-blue-400">
                Możesz zarządzać cenami usług czarteru oraz dodatków w zakładce <strong>Ustawienia Cen</strong>. Zmiany tam wprowadzone natychmiastowo zaktualizują kalkulator cenowy dla klientów na stronie rezerwacji. Aby zasymulować nowe rezerwacje, przejdź na podstronę Rezerwacja jako użytkownik i opłać czarter.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings Management */}
        {activeTab === "bookings" && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Lista rezerwacji klientów
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              {bookings.length === 0 ? (
                <div className="p-12 text-center text-gray-400 dark:text-gray-500">
                  {t("Admin", "noBookings")}
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <th className="p-4">{t("Admin", "bookingId")}</th>
                      <th className="p-4">Klient</th>
                      <th className="p-4">{t("Admin", "dates")}</th>
                      <th className="p-4">{t("Admin", "days")}</th>
                      <th className="p-4">{t("Admin", "addons")}</th>
                      <th className="p-4">{t("Admin", "total")}</th>
                      <th className="p-4">{t("Admin", "status")}</th>
                      <th className="p-4 text-right">{t("Admin", "actions")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700 font-semibold text-gray-700 dark:text-gray-300">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/10">
                        <td className="p-4 text-blue-600 dark:text-blue-400 font-black">
                          {booking.id}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900 dark:text-white">{booking.clientName || "Brak danych"}</div>
                          <div className="text-xs text-gray-500 flex flex-col mt-1 space-y-0.5">
                            {booking.clientPhone && <span>{booking.clientPhone}</span>}
                            {booking.clientEmail && <span>{booking.clientEmail}</span>}
                          </div>
                        </td>
                        <td className="p-4 font-bold">
                          {booking.dates}
                        </td>
                        <td className="p-4 text-gray-500">
                          {booking.days}
                        </td>
                        <td className="p-4 text-xs font-medium text-gray-500 max-w-xs truncate">
                          {booking.addons}
                        </td>
                        <td className="p-4 text-gray-950 dark:text-white font-bold">
                          {booking.total} PLN
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            booking.status === "Paid" || booking.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : booking.status === "Cancelled"
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
                          }`}>
                            {t("Admin", booking.status.toLowerCase())}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          {(booking.status === "Pending" || booking.status === "Paid") && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, "Confirmed")}
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-950/50 cursor-pointer"
                              title="Potwierdź rezerwację"
                              aria-label={`Potwierdź rezerwację ${booking.id}`}
                            >
                              <Check size={16} />
                            </button>
                          )}
                          {booking.status !== "Cancelled" && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, "Cancelled")}
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/50 cursor-pointer"
                              title="Anuluj rezerwację"
                              aria-label={`Anuluj rezerwację ${booking.id}`}
                            >
                              <X size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Settings Pricing */}
        {activeTab === "settings" && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t("Admin", "priceSettings")}
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-lg">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" htmlFor="set-price-boat">
                    {t("Admin", "boatPrice")}
                  </label>
                  <input 
                    type="number" 
                    id="set-price-boat"
                    min="1"
                    value={boatPrice}
                    onChange={(e) => setBoatPrice(Number(e.target.value))}
                    className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" htmlFor="set-price-sup">
                    {t("Admin", "supPrice")}
                  </label>
                  <input 
                    type="number" 
                    id="set-price-sup"
                    min="0"
                    value={supPrice}
                    onChange={(e) => setSupPrice(Number(e.target.value))}
                    className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" htmlFor="set-price-bike">
                    {t("Admin", "bikePrice")}
                  </label>
                  <input 
                    type="number" 
                    id="set-price-bike"
                    min="0"
                    value={bikePrice}
                    onChange={(e) => setBikePrice(Number(e.target.value))}
                    className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" htmlFor="set-price-ebike">
                    {t("Admin", "ebikePrice")}
                  </label>
                  <input 
                    type="number" 
                    id="set-price-ebike"
                    min="0"
                    value={ebikePrice}
                    onChange={(e) => setEbikePrice(Number(e.target.value))}
                    className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm font-semibold"
                  />
                </div>
              </div>

              {settingsSaved && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-sm font-semibold flex items-center gap-2">
                  <Check size={18} />
                  <span>{t("Admin", "settingsSaved")}</span>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                {t("Admin", "saveSettings")}
              </button>

            </form>
          </div>
        )}

      </main>

    </div>
  );
}

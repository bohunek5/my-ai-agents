"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { LayoutDashboard, CalendarRange, DollarSign, Settings, Check, X, ShieldAlert, TrendingUp, Image as ImageIcon, FileText, Eye, Mail, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

type Booking = {
  id: string;
  dates: string;
  days: number;
  addons: string;
  total: number;
  status: "Paid" | "Confirmed" | "Cancelled" | "Pending";
  created_at: string;
  clientEmail?: string;
  clientPhone?: string;
  clientName?: string;
};

export default function AdminPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "settings" | "cms" | "gallery">("dashboard");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Price Configuration states
  const [boatPrice, setBoatPrice] = useState(800);
  const [supPrice, setSupPrice] = useState(50);
  const [bikePrice, setBikePrice] = useState(40);
  const [ebikePrice, setEbikePrice] = useState(80);
  const [settingsSaved, setSettingsSaved] = useState(false);
  
  // CMS states
  const [selectedPage, setSelectedPage] = useState("glowna");
  const [cmsHeroText, setCmsHeroText] = useState("");
  const [cmsHeroTitle, setCmsHeroTitle] = useState("");
  const [cmsHeroImage, setCmsHeroImage] = useState("");
  const [cmsSaved, setCmsSaved] = useState(false);

  // Gallery states
  const [galleryImages, setGalleryImages] = useState([
    "/images/gallery/5S5A6951.webp",
    "/images/gallery/5S5A6966.webp",
    "/images/gallery/5S5A6945.webp"
  ]);
  const [newImage, setNewImage] = useState("");

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
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
            clientName: "Jan Kowalski",
            clientEmail: "jan.kowalski@example.com",
            clientPhone: "123 456 789"
          },
          {
            id: "MA-18503",
            dates: "25.07.2026 - 28.07.2026",
            days: 4,
            addons: "Rower elektryczny x 2",
            total: 3840,
            status: "Paid",
            created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
            clientName: "Anna Nowak",
            clientEmail: "anna@example.com",
            clientPhone: "987 654 321"
          }
        ];
        localStorage.setItem("mazury_bookings", JSON.stringify(seedBookings));
        setBookings(seedBookings);
      }
      
      // Load CMS handled in separate useEffect
      
      // Load Gallery
      const savedGallery = localStorage.getItem("cms_gallery");
      if (savedGallery) setGalleryImages(JSON.parse(savedGallery));
    }
  }, [selectedPage]);

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

  useEffect(() => {
    const pageDefaults: Record<string, { title: string, subtitle: string, image: string }> = {
      glowna: { title: "STILLO 31", subtitle: "Rozpocznij swoją przygodę na Mazurach", image: "/images/gallery/5S5A6951.webp" },
      stillo: { title: "STILLO 31", subtitle: "Luksus na wodzie.", image: "/images/gallery/5S5A6952.webp" },
      oferta: { title: "OFERTA", subtitle: "Wynajem Stillo 31, deski SUP, e-bike", image: "/images/gallery/5S5A6957.webp" },
      rezerwacja: { title: "REZERWACJA", subtitle: "Wybierz termin, zaznacz Stillo 31 oraz dodatki: 4 deski SUP, 4 rowery tradycyjne.", image: "/images/gallery/5S5A6968.webp" },
      kontakt: { title: "KONTAKT", subtitle: "Zadzwoń, napisz albo zapytaj o termin czarteru Stillo 31 i dostępność dodatkowego sprzętu.", image: "/images/gallery/5S5A6968.webp" },
      fundusze: { title: "FUNDUSZE", subtitle: "Informacja o projekcie, zakupach i wsparciu z Funduszy Europejskich dla nowej oferty turystycznej.", image: "/images/gallery/5S5A6952.webp" },
      galeria: { title: "GALERIA", subtitle: "Zobacz Stillo 31, jasne wnętrza oraz sprzęt do aktywnego wypoczynku na Mazurach.", image: "/images/gallery/5S5A7012.webp" },
    };

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`cms_${selectedPage}`);
      const def = pageDefaults[selectedPage] || { title: "", subtitle: "", image: "" };
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCmsHeroText(parsed.subtitle || def.subtitle);
          setCmsHeroTitle(parsed.title || def.title);
          setCmsHeroImage(parsed.image || def.image);
        } catch (e) {
          setCmsHeroText(saved);
          setCmsHeroTitle(def.title);
          setCmsHeroImage(def.image);
        }
      } else {
        setCmsHeroText(def.subtitle);
        setCmsHeroTitle(def.title);
        setCmsHeroImage(def.image);
      }
    }
  }, [selectedPage]);

  const handleSaveCms = () => {
    const dataToSave = {
      title: cmsHeroTitle,
      subtitle: cmsHeroText,
      image: cmsHeroImage
    };
    localStorage.setItem(`cms_${selectedPage}`, JSON.stringify(dataToSave));
    setCmsSaved(true);
    setTimeout(() => setCmsSaved(false), 3000);
  };

  const handleAddImage = () => {
    if (newImage.trim() !== "") {
      const updated = [...galleryImages, newImage];
      setGalleryImages(updated);
      localStorage.setItem("cms_gallery", JSON.stringify(updated));
      setNewImage("");
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    localStorage.setItem("cms_gallery", JSON.stringify(updated));
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
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: nextStatus });
    }
  };
  
  const handleDeleteBooking = (id: string) => {
    if(confirm("Czy na pewno chcesz usunąć tę rezerwację?")) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem("mazury_bookings", JSON.stringify(updated));
    }
  };

  const handleSendEmail = () => {
    if (!selectedBooking) return;
    
    setIsSendingEmail(true);
    
    const subject = encodeURIComponent(`Aktualizacja Rezerwacji - Mazury Aktywnie (ID: ${selectedBooking.id})`);
    const body = encodeURIComponent(`Witaj ${selectedBooking.clientName || 'Klient'},\n\nTwoja rezerwacja (ID: ${selectedBooking.id}) została zaktualizowana.\n\nStatus: ${
      selectedBooking.status === "Pending" ? "Oczekująca" : 
      selectedBooking.status === "Paid" ? "Opłacona" : 
      selectedBooking.status === "Confirmed" ? "Potwierdzona" : "Anulowana"
    }\nKwota: ${selectedBooking.total} PLN\nDaty: ${selectedBooking.dates}\nIlość dni: ${selectedBooking.days}\nDodatki: ${selectedBooking.addons}\n\nDziękujemy,\nMazury Aktywnie`);
    
    window.location.href = `mailto:${selectedBooking.clientEmail || ''}?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSendingEmail(false);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    }, 500);
  };

  const saveBookingEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    const updated = bookings.map(b => b.id === selectedBooking.id ? selectedBooking : b);
    setBookings(updated);
    localStorage.setItem("mazury_bookings", JSON.stringify(updated));
    alert("Zapisano zmiany w rezerwacji!");
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <ShieldAlert className="text-blue-600 dark:text-blue-400" size={32} />
              Panel Administracyjny
            </h1>
            <p className="text-sm text-gray-500 mt-1">Zarządzaj rezerwacjami, cenami i treścią strony</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <LayoutDashboard size={18} />
            {t("Admin", "dashboard")}
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "bookings"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <CalendarRange size={18} />
            {t("Admin", "bookingsList")}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "settings"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Settings size={18} />
            {t("Admin", "settings")}
          </button>
          <button
            onClick={() => setActiveTab("cms")}
            className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "cms"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <FileText size={18} />
            Podstrony
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "gallery"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <ImageIcon size={18} />
            Galeria
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex justify-between items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {t("Admin", "totalRevenue")}
                  </span>
                  <p className="text-3xl font-black text-gray-950 dark:text-white">
                    {totalRevenue.toLocaleString()} PLN
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

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-800 space-y-2 text-sm leading-relaxed">
              <h3 className="font-bold text-blue-900 dark:text-blue-300">Witaj w rozszerzonym Panelu!</h3>
              <p className="text-blue-700 dark:text-blue-400">
                Możesz zarządzać cenami, podstronami oraz rezerwacjami. Zmiany zapisują się w Twojej przeglądarce (CMS Offline).
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings */}
        {activeTab === "bookings" && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                      <th className="p-4">{t("Admin", "dates")}</th>
                      <th className="p-4">{t("Admin", "days")}</th>
                      <th className="p-4">{t("Admin", "addons")}</th>
                      <th className="p-4">{t("Admin", "total")}</th>
                      <th className="p-4">{t("Admin", "status")}</th>
                      <th className="p-4 text-right">Akcje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700 font-semibold text-gray-700 dark:text-gray-300">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/10">
                        <td className="p-4 text-blue-600 dark:text-blue-400 font-black">
                          <button onClick={() => setSelectedBooking(booking)} className="hover:underline">{booking.id}</button>
                        </td>
                        <td className="p-4 font-bold">{booking.dates}</td>
                        <td className="p-4 text-gray-500">{booking.days}</td>
                        <td className="p-4 text-xs font-medium text-gray-500 max-w-xs truncate">{booking.addons}</td>
                        <td className="p-4 text-gray-950 dark:text-white font-bold">{booking.total} PLN</td>
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
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400 cursor-pointer"
                              title="Szczegóły"
                            >
                              <Eye size={16} />
                            </button>
                            {(booking.status === "Pending" || booking.status === "Paid") && (
                              <button
                                onClick={() => handleUpdateStatus(booking.id, "Confirmed")}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-950/50 cursor-pointer"
                                title="Potwierdź rezerwację"
                              >
                                <Check size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/50 cursor-pointer"
                              title="Usuń rezerwację"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
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
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ustawienia Cen</h2>
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Czarter za noc (PLN)</label>
                  <input type="number" required value={boatPrice} onChange={(e) => setBoatPrice(Number(e.target.value))} className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Deska SUP / doba (PLN)</label>
                  <input type="number" required value={supPrice} onChange={(e) => setSupPrice(Number(e.target.value))} className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Rower / doba (PLN)</label>
                  <input type="number" required value={bikePrice} onChange={(e) => setBikePrice(Number(e.target.value))} className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">E-Bike / doba (PLN)</label>
                  <input type="number" required value={ebikePrice} onChange={(e) => setEbikePrice(Number(e.target.value))} className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2">
                {settingsSaved ? <Check size={18} /> : <Settings size={18} />}
                <span>{settingsSaved ? "Zapisano!" : "Zapisz Ceny"}</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Podstrony (CMS) */}
        {activeTab === "cms" && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Zarządzanie treścią (Podstrony)</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Wybierz podstronę</label>
                <select 
                  value={selectedPage} 
                  onChange={(e) => setSelectedPage(e.target.value)} 
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                >
                  <option value="glowna">Strona Główna</option>
                  <option value="stillo">Stillo 31</option>
                  <option value="oferta">Oferta</option>
                  <option value="rezerwacja">Rezerwacja</option>
                  <option value="kontakt">Kontakt</option>
                  <option value="fundusze">Fundusze</option>
                  <option value="galeria">Galeria</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Obrazek Tła (URL)</label>
                <input 
                  type="text"
                  value={cmsHeroImage}
                  onChange={(e) => setCmsHeroImage(e.target.value)}
                  placeholder="/images/gallery/5S5A6952.webp"
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tytuł Hero (Główny Napis)</label>
                <input 
                  type="text"
                  value={cmsHeroTitle}
                  onChange={(e) => setCmsHeroTitle(e.target.value)}
                  placeholder="NP. MAZURY AKTYWNIE"
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Podtytuł Hero (Slogan)</label>
                <textarea 
                  value={cmsHeroText}
                  onChange={(e) => setCmsHeroText(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                />
              </div>

              <button onClick={handleSaveCms} className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2">
                {cmsSaved ? <Check size={18} /> : <FileText size={18} />}
                <span>{cmsSaved ? "Zapisano!" : "Zapisz Treść"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Galeria */}
        {activeTab === "gallery" && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Menedżer Galerii</h2>
            
            <div className="flex gap-4 mb-8 max-w-xl">
              <input 
                type="text" 
                placeholder="Ścieżka do zdjęcia, np: /images/gallery/nowe.webp" 
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-grow p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
              />
              <button 
                onClick={handleAddImage}
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Dodaj
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-200 dark:border-gray-700">
                  <Image src={src} alt="Galeria" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => handleRemoveImage(i)} className="p-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-lg">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] w-full max-w-2xl p-6 md:p-8 shadow-2xl relative border border-gray-100 dark:border-gray-800 my-4">
            <button 
              onClick={() => setSelectedBooking(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-black mb-6">Edycja Rezerwacji {selectedBooking.id}</h3>
            
            <form onSubmit={saveBookingEdits} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                  <select 
                    value={selectedBooking.status}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, status: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                  >
                    <option value="Pending">Oczekująca (Pending)</option>
                    <option value="Paid">Opłacona (Paid)</option>
                    <option value="Confirmed">Potwierdzona (Confirmed)</option>
                    <option value="Cancelled">Anulowana (Cancelled)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Kwota (PLN)</label>
                  <input 
                    type="number" 
                    value={selectedBooking.total}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, total: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Daty Czarteru</label>
                  <input 
                    type="text" 
                    value={selectedBooking.dates}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, dates: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Ilość dni</label>
                  <input 
                    type="number" 
                    value={selectedBooking.days}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, days: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Dodatki</label>
                  <input 
                    type="text" 
                    value={selectedBooking.addons}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, addons: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
                <h4 className="font-bold mb-4">Dane Klienta</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Imię i Nazwisko</label>
                    <input 
                      type="text" 
                      value={selectedBooking.clientName || ""}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking, clientName: e.target.value })}
                      placeholder="Brak danych"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Telefon</label>
                    <input 
                      type="text" 
                      value={selectedBooking.clientPhone || ""}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking, clientPhone: e.target.value })}
                      placeholder="Brak danych"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      value={selectedBooking.clientEmail || ""}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking, clientEmail: e.target.value })}
                      placeholder="Brak danych"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-semibold text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Edit size={18} />
                  Zapisz Zmiany
                </button>
                <button 
                  type="button"
                  onClick={handleSendEmail}
                  disabled={isSendingEmail || emailSent}
                  className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                    emailSent ? "bg-emerald-100 text-emerald-700" : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90"
                  }`}
                >
                  {emailSent ? <Check size={18} /> : <Mail size={18} />}
                  {isSendingEmail ? "Wysyłanie..." : emailSent ? "Wysłano E-mail" : "Powiadom Klienta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

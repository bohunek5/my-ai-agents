"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  CalendarRange, 
  DollarSign, 
  Settings, 
  Check, 
  X, 
  ShieldAlert, 
  TrendingUp, 
  Image as ImageIcon, 
  FileText, 
  Eye, 
  Mail, 
  Edit, 
  Trash2, 
  Lock, 
  LogOut, 
  Plus, 
  Search, 
  Download, 
  ShieldCheck, 
  CreditCard, 
  Ban, 
  AlertCircle, 
  User, 
  Calendar as CalendarIcon
} from "lucide-react";
import Image from "next/image";
import {
  DEFAULT_PRICES,
  normalizeLegacyDate,
  type AvailabilityRange,
  type PriceConfig,
  type SeasonalPrice,
} from "@/lib/booking";

type Booking = {
  id: string;
  dates: string;
  days: number;
  addons: string;
  total: number;
  status: "Paid" | "Confirmed" | "Cancelled" | "Pending" | "Blocked";
  created_at: string;
  clientEmail?: string;
  clientPhone?: string;
  clientName?: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
};

type AdminData = {
  ok: boolean;
  prices: PriceConfig;
  seasonal_prices: SeasonalPrice[];
  orders: Booking[];
  blocked_ranges: AvailabilityRange[];
  manual_blocked_ranges: AvailabilityRange[];
  gateway: { name: string; enabled: boolean; merchant_id: number };
  message?: string;
};

async function adminRequest<T extends Record<string, unknown> = AdminData>(body?: Record<string, unknown>): Promise<T> {
  const csrf = document.querySelector<HTMLMetaElement>('meta[name="p24-admin-csrf"]')?.content ?? "";
  const response = await fetch("/payments/admin-api.php", body ? {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrf,
    },
    credentials: "same-origin",
    body: JSON.stringify(body),
  } : {
    credentials: "same-origin",
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok || !result.ok) {
    if (response.status === 401) window.location.assign("/admin/");
    throw new Error(result.message || "Operacja nie powiodła się.");
  }
  return result as T;
}

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "payments" | "settings" | "cms" | "gallery">("dashboard");

  // Data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // New Booking Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    status: "Confirmed",
    days: 1,
    total: 1200,
    addons: "Brak",
    dates: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: ""
  });

  // Block Dates Modal
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockStartDate, setBlockStartDate] = useState("");
  const [blockEndDate, setBlockEndDate] = useState("");
  const [blockReason, setBlockReason] = useState("Przegląd techniczny / Serwis");

  // Email Notification states
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Price Configuration states
  const [boatPrice, setBoatPrice] = useState(1200);
  const [supPrice, setSupPrice] = useState(50);
  const [bikePrice, setBikePrice] = useState(50);
  const [ebikePrice, setEbikePrice] = useState(150);
  const [depositAmount, setDepositAmount] = useState(2000);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [seasonalPrices, setSeasonalPrices] = useState<SeasonalPrice[]>([]);
  const [manualBlockedRanges, setManualBlockedRanges] = useState<AvailabilityRange[]>([]);
  const [adminDataError, setAdminDataError] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSavingBlock, setIsSavingBlock] = useState(false);

  // Payment Gateways settings
  const [p24Enabled, setP24Enabled] = useState(true);
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [p24MerchantId, setP24MerchantId] = useState("184920");
  const [stripePublicKey, setStripePublicKey] = useState("pk_live_51M...mazury");
  const [paymentsSaved, setPaymentsSaved] = useState(false);

  // CMS states
  const [selectedPage, setSelectedPage] = useState("glowna");
  const [cmsHeroText, setCmsHeroText] = useState("");
  const [cmsHeroTitle, setCmsHeroTitle] = useState("");
  const [cmsHeroImage, setCmsHeroImage] = useState("");
  const [cmsSaved, setCmsSaved] = useState(false);

const ALL_FULL_GALLERY_IMAGES = [
  "/images/gallery/5S5A6951.webp",
  "/images/gallery/5S5A6952.webp",
  "/images/gallery/5S5A6954.webp",
  "/images/gallery/5S5A6955.webp",
  "/images/gallery/5S5A6957.webp",
  "/images/gallery/5S5A6968.webp",
  "/images/gallery/5S5A7012.webp",
  "/images/gallery/5S5A7029.webp",
  "/images/gallery/5S5A7031.webp",
  "/images/gallery/5S5A7032.webp",
  "/images/gallery/DSC04334-1024x576.webp",
  "/images/gallery/DSC04336-1024x683.webp",
  "/images/gallery/DSC04344-1024x576.webp",
  "/images/gallery/DSC04352-1024x576.webp",
  "/images/gallery/DSC04354-1024x576.webp",
  "/images/gallery/DSC04356-1024x576.webp",
  "/images/gallery/DSC04366-1024x576.webp",
  "/images/gallery/DSC04369-1024x576.webp",
  "/images/gallery/DSC04370-1024x576.webp",
  "/images/gallery/DSC04378-1024x576.webp",
  "/images/gallery/DSC04382-1024x576.webp",
  "/images/gallery/DSC04393-1024x576.webp",
  "/images/gallery/DSC04397-1024x576.webp",
  "/images/gallery/ebikes_optimized.webp",
  "/images/gallery/sup_boards_optimized.webp",
  "/images/gallery/trad_bikes.webp"
];

  // Gallery states
  const [galleryImages, setGalleryImages] = useState<string[]>(ALL_FULL_GALLERY_IMAGES);
  const [newImage, setNewImage] = useState("");
  const [virtualTourUrl, setVirtualTourUrl] = useState("");
  const [tourSaved, setTourSaved] = useState(false);

  // Check login session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authSession = sessionStorage.getItem("admin_auth_token");
      if (authSession === "true") {
        queueMicrotask(() => setIsAuthenticated(true));
      }
    }
  }, []);

  // Load the shared server state after the PHP login gate has authenticated the user.
  useEffect(() => {
    if (typeof window === "undefined" || !isAuthenticated) return;
    let cancelled = false;

    const loadAdminData = async () => {
      try {
        const result = await adminRequest<AdminData>();
        if (cancelled) return;
        setBoatPrice(result.prices.boat ?? DEFAULT_PRICES.boat);
        setSupPrice(result.prices.sup ?? DEFAULT_PRICES.sup);
        setBikePrice(result.prices.bike ?? DEFAULT_PRICES.bike);
        setEbikePrice(result.prices.ebike ?? DEFAULT_PRICES.ebike);
        setDepositAmount(result.prices.deposit ?? DEFAULT_PRICES.deposit);
        setSeasonalPrices(Array.isArray(result.seasonal_prices) ? result.seasonal_prices : []);
        setBookings(Array.isArray(result.orders) ? result.orders : []);
        setManualBlockedRanges(Array.isArray(result.manual_blocked_ranges) ? result.manual_blocked_ranges : []);
        setP24Enabled(Boolean(result.gateway?.enabled));
        setP24MerchantId(String(result.gateway?.merchant_id || ""));
        setStripeEnabled(false);

        // One-time migration of blocks created by the old browser-only panel.
        if (!localStorage.getItem("server_blocks_migrated_v2")) {
          const legacy = JSON.parse(localStorage.getItem("blocked_dates") || "[]") as Array<Record<string, unknown>>;
          const migrated = legacy.flatMap((item) => {
            if (item.status && item.status !== "blocked") return [];
            const from = normalizeLegacyDate(String(item.from || ""));
            const to = normalizeLegacyDate(String(item.to || ""));
            if (!from || !to) return [];
            return [{ from, to, status: "blocked" as const, reason: String(item.reason || "Blokada administratora") }];
          });
          if (migrated.length > 0 && result.manual_blocked_ranges.length === 0) {
            const saved = await adminRequest<{ ok: boolean; manual_blocked_ranges: AvailabilityRange[] }>({
              action: "save_blocked_ranges",
              blocked_ranges: migrated,
            });
            if (!cancelled) setManualBlockedRanges(saved.manual_blocked_ranges);
          }
          localStorage.setItem("server_blocks_migrated_v2", "true");
        }
        setAdminDataError("");
      } catch (error) {
        if (!cancelled) setAdminDataError(error instanceof Error ? error.message : "Nie udało się wczytać danych z serwera.");
      }

      // Gallery/CMS remain separate from the booking system for now.
      const savedGallery = localStorage.getItem("cms_gallery");
      if (savedGallery) {
        try {
          const parsed = JSON.parse(savedGallery);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const merged = [...parsed];
            ALL_FULL_GALLERY_IMAGES.forEach(img => {
              if (!merged.includes(img)) merged.push(img);
            });
            setGalleryImages(merged);
          } else {
            setGalleryImages(ALL_FULL_GALLERY_IMAGES);
          }
        } catch {
          setGalleryImages(ALL_FULL_GALLERY_IMAGES);
        }
      } else {
        setGalleryImages(ALL_FULL_GALLERY_IMAGES);
      }
      const savedTour = localStorage.getItem("virtual_tour_url");
      if (savedTour) setVirtualTourUrl(savedTour);
    };

    loadAdminData();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth_token");
    window.location.assign("/admin/?logout=1");
  };

  // Save Settings (Pricing)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setAdminDataError("");
    try {
      const pricesResult = await adminRequest<{ ok: boolean; prices: PriceConfig }>({
        action: "save_prices",
        prices: { boat: boatPrice, sup: supPrice, bike: bikePrice, ebike: ebikePrice, deposit: depositAmount },
      });
      const seasonalResult = await adminRequest<{ ok: boolean; seasonal_prices: SeasonalPrice[] }>({
        action: "save_seasonal_prices",
        seasonal_prices: seasonalPrices,
      });
      setBoatPrice(pricesResult.prices.boat);
      setSupPrice(pricesResult.prices.sup);
      setBikePrice(pricesResult.prices.bike);
      setEbikePrice(pricesResult.prices.ebike);
      setDepositAmount(pricesResult.prices.deposit);
      setSeasonalPrices(seasonalResult.seasonal_prices);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (error) {
      setAdminDataError(error instanceof Error ? error.message : "Nie udało się zapisać cennika.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Save Payment Settings
  const handleSavePayments = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminRequest({ action: "test_p24" });
      setPaymentsSaved(true);
      setTimeout(() => setPaymentsSaved(false), 3000);
    } catch (error) {
      setAdminDataError(error instanceof Error ? error.message : "Nie udało się połączyć z Przelewy24.");
    }
  };

  // CMS handling
  useEffect(() => {
    const pageDefaults: Record<string, { title: string, subtitle: string, image: string }> = {
      glowna: { title: "STILLO 31", subtitle: "Rozpocznij swoją przygodę na Mazurach", image: "/images/gallery/5S5A6951.webp" },
      stillo: { title: "STILLO 31", subtitle: "Luksus na wodzie.", image: "/images/gallery/5S5A6952.webp" },
      oferta: { title: "OFERTA", subtitle: "Wynajem Stillo 31, deski SUP, e-bike", image: "/images/gallery/5S5A6957.webp" },
      rezerwacja: { title: "REZERWACJA", subtitle: "Wybierz termin i skomponuj swój wyjazd Stillo 31.", image: "/images/gallery/5S5A6968.webp" },
      kontakt: { title: "KONTAKT", subtitle: "Zadzwoń, napisz albo zapytaj o termin czarteru Stillo 31 i dostępność dodatkowego sprzętu.", image: "/images/gallery/5S5A6968.webp" },
      fundusze: { title: "FUNDUSZE EUROPEJSKIE", subtitle: "Nowa oferta turystyczna dofinansowana ze środków Unii Europejskiej.", image: "/images/gallery/5S5A6952.webp" },
      galeria: { title: "GALERIA ZDJĘĆ", subtitle: "Zobacz Stillo 31, jasne wnętrza oraz sprzęt do aktywnego wypoczynku na Mazurach.", image: "/images/gallery/5S5A7012.webp" },
    };

    if (typeof window !== "undefined" && isAuthenticated) {
      const saved = localStorage.getItem(`cms_${selectedPage}`);
      const def = pageDefaults[selectedPage] || { title: "", subtitle: "", image: "" };
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          queueMicrotask(() => {
            setCmsHeroText(parsed.subtitle || def.subtitle);
            setCmsHeroTitle(parsed.title || def.title);
            setCmsHeroImage(parsed.image || def.image);
          });
        } catch {
          queueMicrotask(() => {
            setCmsHeroText(saved);
            setCmsHeroTitle(def.title);
            setCmsHeroImage(def.image);
          });
        }
      } else {
        queueMicrotask(() => {
          setCmsHeroText(def.subtitle);
          setCmsHeroTitle(def.title);
          setCmsHeroImage(def.image);
        });
      }
    }
  }, [selectedPage, isAuthenticated]);

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

  // Gallery Management
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

  const addSeasonalPrice = () => {
    const year = new Date().getFullYear();
    setSeasonalPrices((current) => [
      ...current,
      {
        id: `period-${Date.now()}`,
        name: "Nowy okres",
        from: `${year}-05-01`,
        to: `${year}-05-31`,
        price: boatPrice,
      },
    ]);
  };

  const updateSeasonalPrice = (id: string, patch: Partial<SeasonalPrice>) => {
    setSeasonalPrices((current) => current.map((period) => period.id === id ? { ...period, ...patch } : period));
  };

  const removeSeasonalPrice = (id: string) => {
    setSeasonalPrices((current) => current.filter((period) => period.id !== id));
  };

  // Booking Actions
  const handleUpdateStatus = async (id: string, nextStatus: Booking["status"]) => {
    const booking = bookings.find((item) => item.id === id);
    if (!booking || nextStatus === "Blocked") return;
    try {
      const result = await adminRequest<{ ok: boolean; orders: Booking[] }>({
        action: "save_booking",
        booking: { ...booking, status: nextStatus },
      });
      setBookings(result.orders);
      if (selectedBooking?.id === id) setSelectedBooking({ ...selectedBooking, status: nextStatus });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Nie udało się zmienić statusu.");
    }
  };
  
  const handleDeleteBooking = async (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć tę rezerwację z systemu?")) {
      try {
        const result = await adminRequest<{ ok: boolean; orders: Booking[] }>({ action: "delete_booking", booking_id: id });
        setBookings(result.orders);
        if (selectedBooking?.id === id) setSelectedBooking(null);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Nie udało się usunąć rezerwacji.");
      }
    }
  };

  // Add Manual Booking
  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdBooking: Booking = {
      id: "",
      dates: newBooking.dates || "Termin ustalić",
      days: Number(newBooking.days) || 1,
      addons: newBooking.addons || "Brak",
      total: Number(newBooking.total) || 1200,
      status: (newBooking.status as Booking["status"]) || "Confirmed",
      created_at: new Date().toISOString(),
      clientName: newBooking.clientName || "Klient Ręczny",
      clientEmail: newBooking.clientEmail || "",
      clientPhone: newBooking.clientPhone || "",
      notes: newBooking.notes || "Rezerwacja wprowadzona ręcznie przez administratora"
    };

    try {
      const result = await adminRequest<{ ok: boolean; orders: Booking[] }>({ action: "save_booking", booking: createdBooking });
      setBookings(result.orders);
      setShowAddModal(false);
      setNewBooking({
        status: "Confirmed", days: 1, total: 1200, addons: "Brak", dates: "",
        clientName: "", clientEmail: "", clientPhone: "", notes: "",
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Nie udało się dodać rezerwacji.");
    }
  };

  // Block Dates in Calendar
  const handleBlockDates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockStartDate || !blockEndDate) {
      alert("Proszę podać datę początkową i końcową blokady.");
      return;
    }
    if (blockEndDate < blockStartDate) {
      alert("Data końcowa nie może być wcześniejsza niż początkowa.");
      return;
    }
    setIsSavingBlock(true);
    try {
      const next = [
        ...manualBlockedRanges,
        { from: blockStartDate, to: blockEndDate, status: "blocked" as const, reason: blockReason },
      ];
      const result = await adminRequest<{ ok: boolean; manual_blocked_ranges: AvailabilityRange[] }>({
        action: "save_blocked_ranges",
        blocked_ranges: next,
      });
      setManualBlockedRanges(result.manual_blocked_ranges);
      setShowBlockModal(false);
      setBlockStartDate("");
      setBlockEndDate("");
      alert("Termin został zapisany na serwerze i jest już niedostępny w publicznym kalendarzu.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Nie udało się zapisać blokady.");
    } finally {
      setIsSavingBlock(false);
    }
  };

  const handleRemoveBlockedRange = async (index: number) => {
    const next = manualBlockedRanges.filter((_, rangeIndex) => rangeIndex !== index);
    try {
      const result = await adminRequest<{ ok: boolean; manual_blocked_ranges: AvailabilityRange[] }>({
        action: "save_blocked_ranges",
        blocked_ranges: next,
      });
      setManualBlockedRanges(result.manual_blocked_ranges);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Nie udało się usunąć blokady.");
    }
  };

  // Export Bookings to CSV
  const exportBookingsToCSV = () => {
    if (bookings.length === 0) {
      alert("Brak rezerwacji do wyeksportowania.");
      return;
    }
    const headers = ["ID", "Daty", "Dni", "Dodatki", "Suma (PLN)", "Status", "Klient", "Email", "Telefon", "Uwagi"];
    const rows = bookings.map(b => [
      b.id,
      `"${b.dates}"`,
      b.days,
      `"${b.addons}"`,
      b.total,
      b.status,
      `"${b.clientName || ''}"`,
      `"${b.clientEmail || ''}"`,
      `"${b.clientPhone || ''}"`,
      `"${b.notes || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rezerwacje_MazuryAktywnie_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Email Notification to Client
  const handleSendEmail = async () => {
    if (!selectedBooking) return;
    setIsSendingEmail(true);
    try {
      await adminRequest({ action: "send_booking_email", booking_id: selectedBooking.id });
      setIsSendingEmail(false);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (error) {
      setIsSendingEmail(false);
      alert(error instanceof Error ? error.message : "Nie udało się wysłać wiadomości.");
    }
  };

  // Save Booking Edits from Modal
  const saveBookingEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    try {
      const result = await adminRequest<{ ok: boolean; orders: Booking[] }>({ action: "save_booking", booking: selectedBooking });
      setBookings(result.orders);
      setSelectedBooking(result.orders.find((booking) => booking.id === selectedBooking.id) || null);
      alert("Zapisano zmiany w rezerwacji na serwerze.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Nie udało się zapisać rezerwacji.");
    }
  };

  // Filtered Bookings list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.clientName && b.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.clientEmail && b.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.dates && b.dates.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && b.status === statusFilter;
  });

  // Metrics calculations
  const totalRevenue = bookings
    .filter((b) => b.status === "Paid" || b.status === "Confirmed")
    .reduce((sum, b) => sum + b.total, 0);

  const activeBookingsCount = bookings.filter(
    (b) => b.status === "Paid" || b.status === "Confirmed" || b.status === "Pending"
  ).length;

  const pendingBookingsCount = bookings.filter((b) => b.status === "Pending").length;

  const occupancyRate = bookings.length > 0 
    ? Math.min(100, Math.round((bookings.filter(b => b.status !== "Cancelled" && b.status !== "Blocked").length / 12) * 100))
    : 0;

  // ----------------------------------------------------
  // SCREEN 1: LOGIN GATE (If not authenticated)
  // Adaptive Day/Night Support (Jasny / Ciemny)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-5 relative group">
              <ShieldCheck size={40} className="animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Panel Admina
            </h1>
            <p className="text-xs text-blue-600 dark:text-blue-300 uppercase tracking-widest font-bold mt-2">
              Mazury Aktywnie • System Zarządzania
            </p>
          </div>

          <form action="/admin/" method="post" className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Login</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
                <input 
                  type="text" 
                  name="username"
                  required
                  placeholder="admin"
                  value={loginUsername} 
                  onChange={(e) => setLoginUsername(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-sm font-semibold transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Hasło</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-sm font-semibold transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              <span>Zaloguj się</span>
              <Lock size={18} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 text-center text-xs text-gray-400 dark:text-slate-500">
            Dostęp zastrzeżony wyłącznie dla upoważnionych administratorów Portu Sztynort.
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SCREEN 2: EXPANDED ADMIN DASHBOARD (When authenticated)
  // Adaptive Day/Night Support (Dzień / Noc)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 pt-24 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 rounded-2xl text-blue-600 dark:text-blue-400">
              <ShieldAlert size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                  Panel Administracyjny CMS
                </h1>
                <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Aktywny
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Port Sztynort • Zarządzanie rezerwacjami, cennikiem, płatnościami i treścią
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 dark:border-white/10 pt-4 md:pt-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400 dark:text-slate-400">Zalogowano jako:</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Administrator (admin)</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-600/20 dark:hover:bg-rose-600/30 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={16} />
              <span>Wyloguj</span>
            </button>
          </div>
        </div>

        {adminDataError && (
          <div className="mb-6 p-4 rounded-2xl border border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200 text-sm font-semibold flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0" />
            <span>{adminDataError}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide border-b border-gray-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Pulpit i Statystyki</span>
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer relative ${
              activeTab === "bookings"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <CalendarRange size={18} />
            <span>Rezerwacje i Kalendarz</span>
            {pendingBookingsCount > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center ml-1">
                {pendingBookingsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "payments"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <CreditCard size={18} />
            <span>Bramki Płatności</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <Settings size={18} />
            <span>Cennik i Kaucja</span>
          </button>
          <button
            onClick={() => setActiveTab("cms")}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "cms"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <FileText size={18} />
            <span>Edycja Podstron</span>
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "gallery"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white dark:bg-slate-900/60 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <ImageIcon size={18} />
            <span>Galeria Zdjęć</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap gap-4 items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-6 rounded-3xl border border-blue-200 dark:border-blue-500/30 shadow-md dark:shadow-none">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Szybkie Zarządzanie Systemem</h3>
                <p className="text-xs text-gray-600 dark:text-slate-300">Wprowadzaj nowe czartery lub blokuj termin serwisowy w kalendarzu</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus size={16} />
                  <span>+ Dodaj Rezerwację</span>
                </button>
                <button
                  onClick={() => setShowBlockModal(true)}
                  className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-600/30 transition-all flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Ban size={16} />
                  <span>Zablokuj Termin</span>
                </button>
                <button
                  onClick={exportBookingsToCSV}
                  className="px-5 py-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 font-bold border border-gray-200 dark:border-white/10 rounded-2xl transition-all flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  <Download size={16} />
                  <span>Pobierz CSV</span>
                </button>
              </div>
            </div>

            {/* Metric Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none flex justify-between items-center relative overflow-hidden group">
                <div className="space-y-1 relative z-10">
                  <span className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest">Suma Przychodu</span>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{totalRevenue.toLocaleString()} PLN</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-400">Z potwierdzonych czarterów</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-500/20">
                  <DollarSign size={28} />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none flex justify-between items-center relative overflow-hidden group">
                <div className="space-y-1 relative z-10">
                  <span className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest">Rezerwacje</span>
                  <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{activeBookingsCount}</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-400">Aktywne w sezonie 2026</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-200 dark:border-blue-500/20">
                  <CalendarRange size={28} />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none flex justify-between items-center relative overflow-hidden group">
                <div className="space-y-1 relative z-10">
                  <span className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest">Wskaźnik Obłożenia</span>
                  <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{occupancyRate}%</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-400">Jacht Stillo 31</p>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-200 dark:border-indigo-500/20">
                  <TrendingUp size={28} />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none flex justify-between items-center relative overflow-hidden group">
                <div className="space-y-1 relative z-10">
                  <span className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest">Kaucja Zwrotna</span>
                  <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{depositAmount} PLN</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-400">Rozliczenie gotówkowe w porcie</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-200 dark:border-amber-500/20">
                  <ShieldCheck size={28} />
                </div>
              </div>
            </div>

            {/* System Status Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-md dark:shadow-none space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <CreditCard size={18} />
                  <span>System Płatności</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Przelewy24</p>
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Bramki aktywne w trybie live</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-md dark:shadow-none space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Mail size={18} />
                  <span>Poczta Powiadomień</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">kontakt@mazuryaktywnie.com.pl</p>
                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                  <Check size={14} />
                  <span>Adres aktywny na serwerze</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-md dark:shadow-none space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <CalendarIcon size={18} />
                  <span>Wirtualny Spacer 3D</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Gotowe miejsce pod kod iframe</p>
                <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-300">
                  <span>Dostępne w zakładce Galeria</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS LIST & CALENDAR */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between gap-4 bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg">
              <div className="relative flex-grow max-w-md">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Szukaj po ID, nazwisku lub e-mailu..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-2xl text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-gray-500 dark:text-slate-400 mr-2 uppercase tracking-wider">Status:</span>
                {["ALL", "Paid", "Confirmed", "Pending", "Blocked", "Cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      statusFilter === st
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "bg-gray-100 dark:bg-slate-950 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {st === "ALL" ? "Wszystkie" : st === "Paid" ? "Opłacona" : st === "Confirmed" ? "Potwierdzona" : st === "Pending" ? "Oczekuje" : st === "Blocked" ? "Zablokowany" : "Anulowane"}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <CalendarRange size={20} className="text-blue-600 dark:text-blue-400" />
                  <span>Lista Czarterów ({filteredBookings.length})</span>
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus size={16} />
                    <span>Nowa rezerwacja</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                {filteredBookings.length === 0 ? (
                  <div className="p-16 text-center text-gray-400 dark:text-slate-500 space-y-2">
                    <AlertCircle size={32} className="mx-auto text-gray-300 dark:text-slate-600" />
                    <p className="text-sm font-semibold">Brak rezerwacji spełniających kryteria.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
                        <th className="p-4">ID Rezerwacji</th>
                        <th className="p-4">Termin Czarteru</th>
                        <th className="p-4">Klient / Dane</th>
                        <th className="p-4">Dodatki</th>
                        <th className="p-4">Kwota</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Akcje</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium text-gray-700 dark:text-slate-300">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          <td className="p-4 font-black text-blue-600 dark:text-blue-400">
                            <button onClick={() => setSelectedBooking(booking)} className="hover:underline flex items-center gap-1.5 cursor-pointer">
                              <span>{booking.id}</span>
                            </button>
                          </td>
                          <td className="p-4 font-bold text-gray-900 dark:text-white">{booking.dates} ({booking.days}d)</td>
                          <td className="p-4">
                            <div className="font-bold text-gray-900 dark:text-slate-200">{booking.clientName || 'Klient'}</div>
                            <div className="text-[10px] text-gray-500 dark:text-slate-400">{booking.clientEmail}</div>
                          </td>
                          <td className="p-4 max-w-xs truncate text-gray-500 dark:text-slate-400">{booking.addons}</td>
                          <td className="p-4 font-black text-gray-900 dark:text-white text-sm">{booking.total} PLN</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              booking.status === "Paid" || booking.status === "Confirmed"
                                ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30"
                                : booking.status === "Blocked"
                                ? "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
                                : booking.status === "Cancelled"
                                ? "bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30"
                                : "bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30"
                            }`}>
                              {booking.status === "Paid" ? "Opłacona" : booking.status === "Confirmed" ? "Potwierdzona" : booking.status === "Blocked" ? "Zablokowany" : booking.status === "Cancelled" ? "Anulowana" : "Oczekuje"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className="p-2 rounded-xl bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-600/30 border border-blue-200 dark:border-blue-500/30 transition-all cursor-pointer"
                                title="Podgląd i edycja"
                              >
                                <Eye size={16} />
                              </button>
                              {booking.status === "Pending" && (
                                <button
                                  onClick={() => handleUpdateStatus(booking.id, "Confirmed")}
                                  className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 border border-emerald-200 dark:border-emerald-500/30 transition-all cursor-pointer"
                                  title="Zatwierdź rezerwację"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-600/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-600/30 border border-rose-200 dark:border-rose-500/30 transition-all cursor-pointer"
                                title="Usuń"
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
          </div>
        )}

        {/* TAB 3: PAYMENTS & GATEWAYS */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900/80 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl space-y-6 max-w-3xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CreditCard className="text-blue-600 dark:text-blue-400" size={24} />
                <span>Konfiguracja Bramek Płatności Online</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                Płatności są obsługiwane po stronie serwera przez Przelewy24. Klucze nie są wyświetlane ani zapisywane w przeglądarce.
              </p>

              <form onSubmit={handleSavePayments} className="space-y-6">
                <div className="p-6 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Przelewy24 (P24)</h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400">Polskie szybkie przelewy i BLIK</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={p24Enabled} 
                      readOnly
                      disabled
                      className="w-5 h-5 accent-blue-600"
                    />
                  </div>
                  {p24Enabled && (
                    <div className="pt-2 border-t border-gray-200 dark:border-white/5 space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">ID Sprzedawcy (Merchant ID)</label>
                        <input 
                          type="text" 
                          value={p24MerchantId}
                          readOnly
                          className="w-full p-3 rounded-xl bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Stripe Payments</h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400">Wyłączone — karta i BLIK są dostępne w Przelewy24</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={stripeEnabled} 
                      readOnly
                      disabled
                      className="w-5 h-5 accent-blue-600"
                    />
                  </div>
                  {stripeEnabled && (
                    <div className="pt-2 border-t border-gray-200 dark:border-white/5 space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Klucz Publiczny (Publishable Key)</label>
                        <input 
                          type="text" 
                          value={stripePublicKey}
                          onChange={(e) => setStripePublicKey(e.target.value)}
                          className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  {paymentsSaved ? <Check size={18} /> : <Settings size={18} />}
                  <span>{paymentsSaved ? "Połączenie działa" : "Sprawdź połączenie z Przelewy24"}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS (PRICING & DEPOSIT) */}
        {activeTab === "settings" && (
          <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl p-8 animate-in fade-in duration-300 max-w-5xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <DollarSign className="text-emerald-600 dark:text-emerald-400" size={24} />
              <span>Konfiguracja Cennika i Kaucji (PLN / doba)</span>
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Jacht Stillo 31 (PLN / doba)</label>
                  <input type="number" required value={boatPrice} onChange={(e) => setBoatPrice(Number(e.target.value))} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Kaucja Zwrotna (PLN)</label>
                  <input type="number" required value={depositAmount} onChange={(e) => setDepositAmount(Number(e.target.value))} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Deska SUP (PLN / doba)</label>
                  <input type="number" required value={supPrice} onChange={(e) => setSupPrice(Number(e.target.value))} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Rower tradycyjny (PLN / doba)</label>
                  <input type="number" required value={bikePrice} onChange={(e) => setBikePrice(Number(e.target.value))} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Rower elektryczny e-bike (PLN / doba)</label>
                  <input type="number" required value={ebikePrice} onChange={(e) => setEbikePrice(Number(e.target.value))} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-white/10 pt-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white">Ceny dla okresów sezonu</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      Cena okresowa zastępuje cenę bazową jachtu w podanych dniach. Okresy nie mogą na siebie nachodzić.
                    </p>
                  </div>
                  <button type="button" onClick={addSeasonalPrice} className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer">
                    <Plus size={16} /> Dodaj okres
                  </button>
                </div>

                {seasonalPrices.length === 0 ? (
                  <div className="p-4 rounded-2xl border border-dashed border-gray-300 dark:border-white/15 text-sm text-gray-500 dark:text-slate-400">
                    Brak wyjątków — przez cały sezon obowiązuje cena bazowa {boatPrice} PLN za dobę.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {seasonalPrices.map((period) => (
                      <div key={period.id} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_.8fr_auto] gap-3 items-end p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                          Nazwa
                          <input type="text" maxLength={60} required value={period.name} onChange={(event) => updateSeasonalPrice(period.id, { name: event.target.value })} className="mt-1 w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white" />
                        </label>
                        <label className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                          Od
                          <input type="date" required value={period.from} onChange={(event) => updateSeasonalPrice(period.id, { from: event.target.value })} className="mt-1 w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white" />
                        </label>
                        <label className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                          Do
                          <input type="date" required value={period.to} onChange={(event) => updateSeasonalPrice(period.id, { to: event.target.value })} className="mt-1 w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white" />
                        </label>
                        <label className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                          PLN / doba
                          <input type="number" min={1} required value={period.price} onChange={(event) => updateSeasonalPrice(period.id, { price: Number(event.target.value) })} className="mt-1 w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white" />
                        </label>
                        <button type="button" onClick={() => removeSeasonalPrice(period.id)} aria-label={`Usuń okres ${period.name}`} className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300 cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" disabled={isSavingSettings} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider text-xs disabled:opacity-60 disabled:cursor-wait">
                {settingsSaved ? <Check size={18} /> : <Settings size={18} />}
                <span>{isSavingSettings ? "Zapisywanie..." : settingsSaved ? "Zapisano na serwerze!" : "Zapisz cały cennik w systemie"}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: CMS PODSTRONY */}
        {activeTab === "cms" && (
          <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl p-8 animate-in fade-in duration-300 max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
              <span>Zarządzanie Treścią Podstron (CMS)</span>
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Wybierz podstronę</label>
                <select 
                  value={selectedPage} 
                  onChange={(e) => setSelectedPage(e.target.value)} 
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="glowna">Strona Główna</option>
                  <option value="stillo">Stillo 31</option>
                  <option value="oferta">Oferta</option>
                  <option value="rezerwacja">Rezerwacja</option>
                  <option value="kontakt">Kontakt</option>
                  <option value="fundusze">Fundusze Europejskie</option>
                  <option value="galeria">Galeria Zdjęć</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Obrazek Tła (URL)</label>
                <input 
                  type="text"
                  value={cmsHeroImage}
                  onChange={(e) => setCmsHeroImage(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Główny Tytuł Hero</label>
                <input 
                  type="text"
                  value={cmsHeroTitle}
                  onChange={(e) => setCmsHeroTitle(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Podtytuł / Opis</label>
                <textarea 
                  value={cmsHeroText}
                  onChange={(e) => setCmsHeroText(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button onClick={handleSaveCms} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider text-xs">
                {cmsSaved ? <Check size={18} /> : <FileText size={18} />}
                <span>{cmsSaved ? "Zapisano Zmiany!" : "Zapisz Treść Podstrony"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: GALERIA ZDJĘĆ & WIRTUALNY SPACER */}
        {activeTab === "gallery" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Virtual Tour Box */}
            <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl p-8 max-w-2xl space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarIcon className="text-blue-600 dark:text-blue-400" size={20} />
                <span>Link do Wirtualnego Spaceru 3D (Matterport / Kuula / YouTube)</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Wklej link iframe lub adres URL wirtualnego spaceru 360°, aby osadzić go automatycznie na stronie galerii.
              </p>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="https://my.matterport.com/show/?m=... lub URL spaceru 3D" 
                  value={virtualTourUrl}
                  onChange={(e) => setVirtualTourUrl(e.target.value)}
                  className="flex-grow p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <button 
                  onClick={() => {
                    localStorage.setItem("virtual_tour_url", virtualTourUrl);
                    setTourSaved(true);
                    setTimeout(() => setTourSaved(false), 3000);
                  }}
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  {tourSaved ? <Check size={16} /> : null}
                  <span>{tourSaved ? "Zapisano!" : "Zapisz Spacer"}</span>
                </button>
              </div>
            </div>

            {/* Gallery Photo Manager */}
            <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ImageIcon className="text-blue-600 dark:text-blue-400" size={24} />
                    <span>Menedżer Zdjęć Galerii ({galleryImages.length} zdjęć)</span>
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Zarządzaj widocznymi zdjęciami lub dodawaj własne ścieżki zdjęć</p>
                </div>
                <button
                  onClick={() => {
                    setGalleryImages(ALL_FULL_GALLERY_IMAGES);
                    localStorage.setItem("cms_gallery", JSON.stringify(ALL_FULL_GALLERY_IMAGES));
                    alert("Przywrócono pełną bazę 26 zdjęć jachtu, kabin i sprzętu!");
                  }}
                  className="px-4 py-2.5 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 text-blue-600 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-700/50 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Przywróć Pełne 26 Zdjęć
                </button>
              </div>
              
              <div className="flex gap-4 mb-8 max-w-xl">
                <input 
                  type="text" 
                  placeholder="Ścieżka do zdjęcia, np: /images/gallery/nowe.webp" 
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="flex-grow p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <button 
                  onClick={handleAddImage}
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  Dodaj Zdjęcie
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-slate-950">
                    <Image src={src} alt="Galeria" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => handleRemoveImage(i)} className="p-3 bg-rose-600 text-white rounded-full hover:bg-rose-500 shadow-lg cursor-pointer">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD MANUAL BOOKING */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400">
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus size={24} className="text-blue-600 dark:text-blue-400" />
              <span>Dodaj Ręczną Rezerwację</span>
            </h3>

            <form onSubmit={handleCreateManualBooking} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Imię i Nazwisko Klienta</label>
                <input 
                  type="text" 
                  required
                  placeholder="np. Jan Kowalski"
                  value={newBooking.clientName}
                  onChange={(e) => setNewBooking({...newBooking, clientName: e.target.value})}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="jan@example.com"
                    value={newBooking.clientEmail}
                    onChange={(e) => setNewBooking({...newBooking, clientEmail: e.target.value})}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Telefon</label>
                  <input 
                    type="text" 
                    placeholder="600 111 222"
                    value={newBooking.clientPhone}
                    onChange={(e) => setNewBooking({...newBooking, clientPhone: e.target.value})}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Termin (Daty)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="10.08.2026 - 17.08.2026"
                    value={newBooking.dates}
                    onChange={(e) => setNewBooking({...newBooking, dates: e.target.value})}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Liczba Dni</label>
                  <input 
                    type="number" 
                    required
                    value={newBooking.days}
                    onChange={(e) => setNewBooking({...newBooking, days: Number(e.target.value)})}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Kwota (PLN)</label>
                  <input 
                    type="number" 
                    required
                    value={newBooking.total}
                    onChange={(e) => setNewBooking({...newBooking, total: Number(e.target.value)})}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={newBooking.status}
                    onChange={(e) => setNewBooking({...newBooking, status: e.target.value as Booking["status"]})}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                  >
                    <option value="Confirmed">Potwierdzona</option>
                    <option value="Paid">Opłacona</option>
                    <option value="Pending">Oczekująca</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Dodatki</label>
                <input 
                  type="text" 
                  placeholder="np. SUP x 2, Rower e-bike x 1"
                  value={newBooking.addons}
                  onChange={(e) => setNewBooking({...newBooking, addons: e.target.value})}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all mt-4 uppercase tracking-wider cursor-pointer"
              >
                Dodaj Rezerwację
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BLOCK DATES */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-8 border border-gray-200 dark:border-white/10 shadow-2xl relative">
            <button onClick={() => setShowBlockModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400">
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Ban size={24} className="text-amber-600 dark:text-amber-400" />
              <span>Zablokuj Termin w Kalendarzu</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">
              Wyznaczone daty zostaną oznaczone jako niedostępne w kalendarzu dla klientów.
            </p>

            <form onSubmit={handleBlockDates} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Data od</label>
                <input 
                  type="date" 
                  required
                  value={blockStartDate}
                  onChange={(e) => setBlockStartDate(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Data do</label>
                <input 
                  type="date" 
                  required
                  value={blockEndDate}
                  onChange={(e) => setBlockEndDate(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Powód Blokady</label>
                <input 
                  type="text" 
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-semibold"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSavingBlock}
                className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg transition-all mt-4 uppercase tracking-wider cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              >
                {isSavingBlock ? "Zapisywanie..." : "Zablokuj wybrany termin"}
              </button>
            </form>

            {manualBlockedRanges.length > 0 && (
              <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-slate-200 mb-3">Aktywne blokady</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {manualBlockedRanges.map((blocked, index) => (
                    <div key={`${blocked.from}-${blocked.to}-${index}`} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10">
                      <div className="min-w-0">
                        <p className="text-xs font-black text-gray-900 dark:text-white">{blocked.from} – {blocked.to}</p>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 truncate">{blocked.reason || "Blokada administratora"}</p>
                      </div>
                      <button type="button" onClick={() => handleRemoveBlockedRange(index)} className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10 cursor-pointer" aria-label="Usuń blokadę">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: BOOKING EDIT & DETAILS */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl relative my-4">
            <button onClick={() => setSelectedBooking(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-slate-400">
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Rezerwacja {selectedBooking.id}</h3>
            
            <form onSubmit={saveBookingEdits} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={selectedBooking.status}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, status: e.target.value as Booking["status"] })}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-bold text-gray-900 dark:text-white text-xs"
                  >
                    <option value="Pending">Oczekująca (Pending)</option>
                    <option value="Paid">Opłacona (Paid)</option>
                    <option value="Confirmed">Potwierdzona (Confirmed)</option>
                    <option value="Cancelled">Anulowana (Cancelled)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Kwota (PLN)</label>
                  <input 
                    type="number" 
                    value={selectedBooking.total}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, total: Number(e.target.value) })}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-bold text-gray-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Daty Czarteru</label>
                  <input 
                    type="text" 
                    value={selectedBooking.dates}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, dates: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-bold text-gray-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Ilość dni</label>
                  <input 
                    type="number" 
                    value={selectedBooking.days}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, days: Number(e.target.value) })}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-bold text-gray-900 dark:text-white text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Dodatki na pokład</label>
                  <input 
                    type="text" 
                    value={selectedBooking.addons}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, addons: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-bold text-gray-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-white/10 pt-4 mt-4 space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider">Dane Kontaktowe Klienta</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-500 dark:text-slate-400 mb-1">Imię i Nazwisko</label>
                    <input 
                      type="text" 
                      value={selectedBooking.clientName || ""}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking, clientName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-semibold text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-500 dark:text-slate-400 mb-1">Telefon</label>
                    <input 
                      type="text" 
                      value={selectedBooking.clientPhone || ""}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking, clientPhone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-semibold text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-500 dark:text-slate-400 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      value={selectedBooking.clientEmail || ""}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking, clientEmail: e.target.value })}
                      className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-semibold text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-500 dark:text-slate-400 mb-1">Notatki / Uwagi</label>
                    <textarea 
                      value={selectedBooking.notes || ""}
                      onChange={(e) => setSelectedBooking({ ...selectedBooking, notes: e.target.value })}
                      className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 font-semibold text-gray-900 dark:text-white"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button 
                  type="submit"
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Edit size={16} />
                  <span>Zapisz Zmiany</span>
                </button>
                <button 
                  type="button"
                  onClick={handleSendEmail}
                  disabled={isSendingEmail || emailSent}
                  className={`flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider ${
                    emailSent ? "bg-emerald-500 text-slate-950 font-black" : "bg-gray-900 dark:bg-slate-800 text-white hover:bg-gray-800 dark:hover:bg-slate-700 border border-gray-200 dark:border-white/10"
                  }`}
                >
                  {emailSent ? <Check size={16} /> : <Mail size={16} />}
                  <span>{isSendingEmail ? "Przygotowanie..." : emailSent ? "Wysłano E-mail" : "Wyślij E-mail do Klienta"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

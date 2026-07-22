"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, differenceInDays } from "date-fns";
import { pl as localePl, enGB as localeEn, de as localeDe } from "date-fns/locale";
import { Ship, Calendar, Plus, Minus, CreditCard, CheckCircle2, Lock, AlertCircle, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";

export default function ReservationPage() {
  const { t, language } = useLanguage();
  
  // Dynamic prices (loaded from localStorage or default)
  const [boatPrice, setBoatPrice] = useState(1200);
  const [supPrice, setSupPrice] = useState(50);
  const [bikePrice, setBikePrice] = useState(50);
  const [ebikePrice, setEbikePrice] = useState(150);

  // States
  const [supCount, setSupCount] = useState(0);
  const [bikeCount, setBikeCount] = useState(0);
  const [ebikeCount, setEbikeCount] = useState(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [showPayment, setShowPayment] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  // Form states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Load prices from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBoat = localStorage.getItem("price_boat");
      const savedSup = localStorage.getItem("price_sup");
      const savedBike = localStorage.getItem("price_bike");
      const savedEbike = localStorage.getItem("price_ebike");
      if (savedBoat) setBoatPrice(Number(savedBoat));
      if (savedSup) setSupPrice(Number(savedSup));
      if (savedBike) setBikePrice(Number(savedBike));
      if (savedEbike) setEbikePrice(Number(savedEbike));
    }
  }, []);

  // Calculate rental duration in days
  const days = range?.from && range?.to ? differenceInDays(range.to, range.from) + 1 : 0;

  // Costs calculations
  const totalBoat = boatPrice * days;
  const totalSup = supPrice * supCount * days;
  const totalBikes = bikePrice * bikeCount * days;
  const totalEbikes = ebikePrice * ebikeCount * days;
  const total = totalBoat + totalSup + totalBikes + totalEbikes;

  // Date locale resolver
  const getLocale = () => {
    if (language === "pl") return localePl;
    if (language === "de") return localeDe;
    return localeEn;
  };

  const handleOpenPayment = () => {
    if (days === 0) {
      alert(t("Reservation", "selectDatesAlert"));
      return;
    }
    setShowPayment(true);
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvc || !clientEmail || !clientPhone) {
      alert("Proszę wypełnić wszystkie dane, e-mail i telefon.");
      return;
    }

    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setPaySuccess(true);
      
      // Save reservation to local storage for Admin Panel
      if (typeof window !== "undefined") {
        const existingBookingsStr = localStorage.getItem("mazury_bookings");
        const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
        
        const bookingDatesStr = range?.from && range?.to 
          ? `${format(range.from, "dd.MM.yyyy")} - ${format(range.to, "dd.MM.yyyy")}`
          : "";

        const addonsList = [];
        if (supCount > 0) addonsList.push(`SUP x ${supCount}`);
        if (bikeCount > 0) addonsList.push(`Rower tradycyjny x ${bikeCount}`);
        if (ebikeCount > 0) addonsList.push(`Rower elektryczny x ${ebikeCount}`);

        const newBooking = {
          id: `MA-${Math.floor(10000 + Math.random() * 90000)}`,
          dates: bookingDatesStr,
          days: days,
          addons: addonsList.join(", ") || "Brak",
          total: total,
          status: "Paid",
          clientName: cardName,
          clientEmail: clientEmail,
          clientPhone: clientPhone,
          created_at: new Date().toISOString()
        };

        localStorage.setItem("mazury_bookings", JSON.stringify([newBooking, ...existingBookings]));
      }

      setTimeout(() => {
        setShowPayment(false);
        setPaySuccess(false);
        setRange(undefined);
        setSupCount(0);
        setBikeCount(0);
        setEbikeCount(0);
      }, 3000);

    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SubpageHero pageId="rezerwacja"
        title={t("Reservation", "title")}
        subtitle=""
        eyebrow="Rezerwacja online"
        image="/images/gallery/5S5A6968.webp"
        align="left"
      />
      
      {/* Floating Back Button */}
      <div className="absolute top-20 sm:top-24 md:top-32 left-4 md:left-8 z-40">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md text-white rounded-full shadow-lg border border-white/20 transition-all font-bold text-sm"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Powrót</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pt-4 pb-8 md:py-16">
        


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Options Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Boat Selection */}
            <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-5 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Ship size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>1. Wybierz jacht</span>
              </h2>
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-blue-600 dark:border-blue-400 p-4 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-full sm:w-48 h-40 sm:h-32 rounded-xl overflow-hidden shrink-0">
                  <Image 
                    src="/images/gallery/5S5A6951.webp" 
                    alt="Jacht Stillo 31" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Stillo 31</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider self-center sm:self-auto">
                      {t("Reservation", "boatSelected")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Luksusowy houseboat dla 8 osób. W pełni wyposażony, dostosowany do niepełnosprawności.
                  </p>
                  <p className="text-lg font-black text-blue-600 dark:text-blue-400">
                    {boatPrice} {t("Reservation", "pricePerDay")}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Equipment Options */}
            <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-5 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Plus size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>2. Wybierz opcje dodatkowe</span>
              </h2>

              <div className="space-y-4">
                {/* SUP */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                  <div className="relative w-full sm:w-28 h-32 sm:h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src="/images/gallery/sup_boards_optimized.webp" alt="SUP" fill className="object-cover" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left flex-grow">
                    <h3 className="font-bold text-gray-900 dark:text-white">{t("Reservation", "supBoards")}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto sm:mx-0">{t("Reservation", "supDesc")}</p>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {supPrice} {t("Reservation", "pricePerDay")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 shrink-0">
                    <button 
                      onClick={() => setSupCount(Math.max(0, supCount - 1))}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      aria-label="Zmniejsz"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-black text-xl">{supCount}</span>
                    <button 
                      onClick={() => setSupCount(Math.min(4, supCount + 1))}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      aria-label="Zwiększ"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Bikes */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                  <div className="relative w-full sm:w-28 h-32 sm:h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src="/images/gallery/trad_bikes.webp" alt="Rowery" fill className="object-cover" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left flex-grow">
                    <h3 className="font-bold text-gray-900 dark:text-white">{t("Reservation", "bikes")}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto sm:mx-0">{t("Reservation", "bikesDesc")}</p>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {bikePrice} {t("Reservation", "pricePerDay")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 shrink-0">
                    <button 
                      onClick={() => setBikeCount(Math.max(0, bikeCount - 1))}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      aria-label="Zmniejsz"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-black text-xl">{bikeCount}</span>
                    <button 
                      onClick={() => setBikeCount(Math.min(4, bikeCount + 1))}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      aria-label="Zwiększ"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* E-Bikes */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                  <div className="relative w-full sm:w-28 h-32 sm:h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src="/images/gallery/ebikes_optimized.webp" alt="Rowery elektryczne" fill className="object-cover" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left flex-grow">
                    <h3 className="font-bold text-gray-900 dark:text-white">{t("Reservation", "eBikes")}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto sm:mx-0">{t("Reservation", "eBikesDesc")}</p>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {ebikePrice} {t("Reservation", "pricePerDay")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 shrink-0">
                    <button 
                      onClick={() => setEbikeCount(Math.max(0, ebikeCount - 1))}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      aria-label="Zmniejsz"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-black text-xl">{ebikeCount}</span>
                    <button 
                      onClick={() => setEbikeCount(Math.min(4, ebikeCount + 1))}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      aria-label="Zwiększ"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. Calendar Selection */}
            <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-5 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>3. Wybierz termin czarteru</span>
              </h2>

              <div className="flex flex-col items-center overflow-x-auto pb-4 w-full">
                <div className="min-w-max">
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    locale={getLocale()}
                    min={1}
                    disabled={{ before: new Date() }}
                    className="mx-auto border border-gray-150 dark:border-gray-700 p-2 sm:p-4 rounded-2xl dark:bg-gray-900 bg-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 sticky top-24 space-y-6 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              
              <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-700">
                {t("Reservation", "summary")}
              </h2>

              {/* Dates Info */}
              <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-455">
                <div className="flex justify-between">
                  <span className="font-semibold">{t("Reservation", "startDate")}:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {range?.from ? format(range.from, "dd.MM.yyyy") : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t("Reservation", "endDate")}:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {range?.to ? format(range.to, "dd.MM.yyyy") : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t("Reservation", "daysCount")}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{days}</span>
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-700" />

              {/* Breakdown */}
              {days > 0 ? (
                <div className="space-y-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Czarter Stillo 31:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{totalBoat} PLN</span>
                  </div>
                  {supCount > 0 && (
                    <div className="flex justify-between">
                      <span>SUP boards ({supCount}x):</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{totalSup} PLN</span>
                    </div>
                  )}
                  {bikeCount > 0 && (
                    <div className="flex justify-between">
                      <span>Rowery tradycyjne ({bikeCount}x):</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{totalBikes} PLN</span>
                    </div>
                  )}
                  {ebikeCount > 0 && (
                    <div className="flex justify-between">
                      <span>E-bikes ({ebikeCount}x):</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{totalEbikes} PLN</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/15 rounded-xl flex gap-2 items-center text-xs text-blue-700 dark:text-blue-300">
                  <AlertCircle size={16} />
                  <span>Wybierz daty, aby zobaczyć kalkulację kosztów.</span>
                </div>
              )}

              <div className="h-px bg-gray-100 dark:bg-gray-700" />

              {/* Sum */}
              <div className="flex justify-between items-center text-base md:text-lg font-black text-gray-900 dark:text-white">
                <span>{t("Reservation", "totalSum")}</span>
                <span className="text-2xl text-blue-600 dark:text-blue-400">{total} PLN</span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOpenPayment}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                <span>{t("Reservation", "payButton")}</span>
              </button>

              <div className="flex justify-center items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                <Lock size={12} />
                <span>Bezpieczne szyfrowanie SSL</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* STRIPE / PRZELEWY24 MOCK GATEWAY MODAL */}
      {showPayment && (
        <div 
          className="fixed inset-0 z-[250] bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white/90 dark:bg-black/80 backdrop-blur-3xl rounded-[2rem] w-full max-w-md p-5 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] relative border border-white/40 dark:border-white/10 my-auto max-h-[95dvh] overflow-y-auto no-scrollbar">
            
            {/* Close Button */}
            <button 
              onClick={() => { if (!isPaying) setShowPayment(false); }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              aria-label="Zamknij bramkę płatności"
              disabled={isPaying}
            >
              <X size={18} />
            </button>

            {paySuccess ? (
              <div className="text-center py-8 space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t("Reservation", "paySuccess")}
                </h3>
                <p className="text-xs text-gray-400">
                  Potwierdzenie wysłano na e-mail. Przekierowywanie...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">
                    {t("Reservation", "paymentTitle")}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("Reservation", "paymentSim")}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl flex justify-between items-center text-sm font-semibold border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Kwota do zapłaty:</span>
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">{total} PLN</span>
                </div>
                <form onSubmit={handlePaySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="card-name">
                      {t("Reservation", "cardHolder")}
                    </label>
                    <input 
                      type="text" 
                      id="card-name"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jan Kowalski"
                      className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="client-email">
                        E-mail
                      </label>
                      <input 
                        type="email" 
                        id="client-email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="jan@example.com"
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="client-phone">
                        Telefon
                      </label>
                      <input 
                        type="tel" 
                        id="client-phone"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+48 123 456 789"
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="card-number">
                      {t("Reservation", "cardNumber")}
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="card-number"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none pl-12"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="card-expiry">
                        Ważność (MM/RR)
                      </label>
                      <input 
                        type="text" 
                        id="card-expiry"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="card-cvc">
                        CVC
                      </label>
                      <input 
                        type="password" 
                        id="card-cvc"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        maxLength={3}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none text-center"
                      />
                    </div>
                  </div>

                  {/* Mandatory Terms Agreement Checkbox for Przelewy24 / RODO Compliance */}
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
                    <input 
                      type="checkbox" 
                      id="accept-terms"
                      required
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                    />
                    <label htmlFor="accept-terms" className="text-xs text-gray-600 dark:text-gray-300 leading-snug cursor-pointer select-none">
                      Oświadczam, że zapoznałem się i akceptuję <Link href="/regulamin" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Regulamin Świadczenia Usług</Link> oraz <Link href="/polityka-prywatnosci" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Politykę Prywatności (RODO)</Link>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isPaying || !acceptTerms}
                    className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                  >
                    {isPaying ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span className="text-lg">Zapłać przez Przelewy24 / Kartę</span>
                      </>
                    )}
                  </button>
                </form>

                  <div className="flex justify-center items-center gap-1.5 text-[10px] text-gray-400 mt-4">
                    <ShieldCheck size={12} />
                    <span>Zgodne z certyfikacją PCI-DSS</span>
                  </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// Inline svg fallback for ShieldCheck
function ShieldCheck({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  );
}

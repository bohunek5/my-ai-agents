"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, startOfToday } from "date-fns";
import { pl as localePl, enGB as localeEn, de as localeDe } from "date-fns/locale";
import { Ship, Calendar, Plus, Minus, CreditCard, Lock, AlertCircle, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";
import {
  DEFAULT_PRICES,
  availabilityMatchers,
  boatPriceForRange,
  rentalDays,
  type AvailabilityRange,
  type SeasonalPrice,
} from "@/lib/booking";

export default function ReservationPage() {
  const { t, language } = useLanguage();
  
  // Dynamic prices (loaded from localStorage or default)
  const [boatPrice, setBoatPrice] = useState(1200);
  const [supPrice, setSupPrice] = useState(50);
  const [bikePrice, setBikePrice] = useState(50);
  const [ebikePrice, setEbikePrice] = useState(150);
  const [seasonalPrices, setSeasonalPrices] = useState<SeasonalPrice[]>([]);
  const [reservedRanges, setReservedRanges] = useState<AvailabilityRange[]>([]);
  const [configError, setConfigError] = useState("");

  // States
  const [supCount, setSupCount] = useState(0);
  const [bikeCount, setBikeCount] = useState(0);
  const [ebikeCount, setEbikeCount] = useState(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [showPayment, setShowPayment] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Form states
  const [cardName, setCardName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Load shared prices and availability from the server.
  useEffect(() => {
    let cancelled = false;
    fetch("/payments/availability.php", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.message || "Nie udało się pobrać kalendarza.");
        return result;
      })
      .then((result) => {
        if (cancelled) return;
        const prices = result.prices || DEFAULT_PRICES;
        setBoatPrice(Number(prices.boat ?? DEFAULT_PRICES.boat));
        setSupPrice(Number(prices.sup ?? DEFAULT_PRICES.sup));
        setBikePrice(Number(prices.bike ?? DEFAULT_PRICES.bike));
        setEbikePrice(Number(prices.ebike ?? DEFAULT_PRICES.ebike));
        setSeasonalPrices(Array.isArray(result.seasonal_prices) ? result.seasonal_prices : []);
        setReservedRanges(Array.isArray(result.ranges) ? result.ranges : []);
        setConfigError("");
      })
      .catch((error) => {
        if (!cancelled) setConfigError(error instanceof Error ? error.message : "Nie udało się pobrać danych rezerwacji.");
      });
    return () => { cancelled = true; };
  }, []);

  // The end date is the return date: 28-29 is one charter night.
  const days = rentalDays(range);

  // Costs calculations
  const totalBoat = boatPriceForRange(range, boatPrice, seasonalPrices);
  const totalSup = supPrice * supCount * days;
  const totalBikes = bikePrice * bikeCount * days;
  const totalEbikes = ebikePrice * ebikeCount * days;
  const total = totalBoat + totalSup + totalBikes + totalEbikes;
  const minimumBoatPrice = Math.min(boatPrice, ...seasonalPrices.map((period) => period.price));

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
    setPaymentError("");
    setShowPayment(true);
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!range?.from || !cardName || !clientEmail || !clientPhone || !acceptTerms) {
      setPaymentError("Uzupełnij dane kontaktowe i zaakceptuj regulamin.");
      return;
    }

    setIsPaying(true);
    setPaymentError("");
    try {
      const endDate = range.to ?? range.from;
      const response = await fetch("/payments/start.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: cardName,
          email: clientEmail,
          phone: clientPhone,
          startDate: format(range.from, "dd.MM.yyyy"),
          endDate: format(endDate, "dd.MM.yyyy"),
          sup: supCount,
          bike: bikeCount,
          ebike: ebikeCount,
          terms: acceptTerms,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.redirect_url) throw new Error(result.message || "Nie udało się uruchomić płatności.");
      window.location.assign(result.redirect_url);
    } catch (error) {
      setIsPaying(false);
      setPaymentError(error instanceof Error ? error.message : "Nie udało się połączyć z Przelewy24.");
    }
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
            
            {/* 1. Boat info */}
            <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Ship size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t("Reservation", "step1Title")}</span>
              </h2>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-150 dark:border-gray-800">
                <Image 
                  src="/images/gallery/5S5A7031.webp" 
                  alt="Stillo 31" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl text-white flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-lg">Stillo 31 (2026)</h3>
                    <p className="text-xs text-gray-300">Luksusowy jacht motorowy • Bez patentu</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-blue-400">od {minimumBoatPrice} {t("Reservation", "pricePerDay")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Optional Extras */}
            <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Plus size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t("Reservation", "step2Title")}</span>
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
                      className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                      aria-label="Zmniejsz"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-black text-xl">{supCount}</span>
                    <button 
                      onClick={() => setSupCount(Math.min(4, supCount + 1))}
                      className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
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
                      className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                      aria-label="Zmniejsz"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-black text-xl">{bikeCount}</span>
                    <button 
                      onClick={() => setBikeCount(Math.min(4, bikeCount + 1))}
                      className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
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
                      className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                      aria-label="Zmniejsz"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-black text-xl">{ebikeCount}</span>
                    <button 
                      onClick={() => setEbikeCount(Math.min(4, ebikeCount + 1))}
                      className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
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
                <span>{t("Reservation", "step3Title")}</span>
              </h2>

              {configError && (
                <div className="mb-5 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 text-sm flex items-center gap-2">
                  <AlertCircle size={18} className="shrink-0" /> {configError}
                </div>
              )}

              <div className="flex flex-col items-center overflow-x-auto pb-4 w-full">
                <div className="min-w-max flex flex-col items-center">
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    locale={getLocale()}
                    min={1}
                    excludeDisabled
                    disabled={[
                      { before: startOfToday() },
                      ...availabilityMatchers(reservedRanges),
                    ]}
                    className="mx-auto border border-gray-150 dark:border-gray-700 p-2 sm:p-4 rounded-2xl dark:bg-gray-900 bg-white"
                  />
                  
                  {/* Legenda pod kalendarzem */}
                  <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-700 dark:text-gray-300 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-100 border border-green-500 dark:bg-green-900/40 dark:border-green-400"></div>
                      <span>Dostępne</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-100 border border-red-500 dark:bg-red-900/40 dark:border-red-400 flex items-center justify-center relative">
                         <div className="absolute w-[120%] h-[1px] bg-red-500 dark:bg-red-400 rotate-45 rounded"></div>
                      </div>
                      <span>Niedostępne</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-cyan-500 dark:bg-cyan-500 shadow-[0_2px_8px_rgba(6,182,212,0.5)]"></div>
                      <span>Twój wybór</span>
                    </div>
                  </div>
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
                    {range?.to ? format(range.to, "dd.MM.yyyy") : range?.from ? format(range.from, "dd.MM.yyyy") : "-"}
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

      {/* Secure Przelewy24 hand-off */}
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

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Bezpieczna płatność Przelewy24</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Po zapisaniu danych przejdziesz na stronę Przelewy24, gdzie wybierzesz BLIK, szybki przelew lub kartę.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl flex justify-between items-center text-sm font-semibold border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Kwota do zapłaty:</span>
                <span className="text-lg font-black text-blue-600 dark:text-blue-400">{total} PLN</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200 text-xs leading-relaxed border border-emerald-200 dark:border-emerald-500/20">
                Nie wpisujesz danych karty na tej stronie. Formularz zapisuje rezerwację na serwerze, a płatność odbywa się bezpośrednio u operatora Przelewy24.
              </div>

              <form onSubmit={handlePaySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="client-name">Imię i nazwisko</label>
                  <input 
                    type="text" 
                    id="client-name"
                    required
                    maxLength={40}
                    autoComplete="name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Jan Kowalski"
                    className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="client-email">E-mail</label>
                    <input type="email" id="client-email" required maxLength={50} autoComplete="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="jan@example.com" className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1" htmlFor="client-phone">Telefon</label>
                    <input type="tel" id="client-phone" required maxLength={20} autoComplete="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="+48 123 456 789" className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-800 dark:focus:border-blue-500 dark:bg-gray-950 text-sm font-semibold transition-all outline-none" />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
                  <input type="checkbox" id="accept-terms" required checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0" />
                  <label htmlFor="accept-terms" className="text-xs text-gray-600 dark:text-gray-300 leading-snug cursor-pointer select-none">
                    Oświadczam, że zapoznałem się i akceptuję <Link href="/polityka-prywatnosci" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Regulamin i Politykę Prywatności</Link> oraz <Link href="/rodo" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Klauzulę RODO</Link>.
                  </label>
                </div>

                {paymentError && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200 text-xs flex gap-2" role="alert">
                    <AlertCircle size={16} className="shrink-0" /> {paymentError}
                  </div>
                )}

                <button type="submit" disabled={isPaying || !acceptTerms} className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95">
                  {isPaying ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ShieldCheck size={18} /><span className="text-lg">Przejdź do Przelewy24</span></>}
                </button>
              </form>

              <div className="flex justify-center items-center gap-1.5 text-[10px] text-gray-400 mt-4">
                    <ShieldCheck size={12} />
                <span>Płatność obsługuje PayPro S.A. (Przelewy24)</span>
              </div>
            </div>

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

import { addDays, differenceInCalendarDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";

export type SeasonalPrice = {
  id: string;
  name: string;
  from: string;
  to: string;
  price: number;
};

export type AvailabilityRange = {
  from: string;
  to: string;
  status: "blocked" | "booked" | "held";
  reason?: string;
};

export type PriceConfig = {
  boat: number;
  sup: number;
  bike: number;
  ebike: number;
  deposit: number;
};

export const DEFAULT_PRICES: PriceConfig = {
  boat: 1200,
  sup: 50,
  bike: 50,
  ebike: 150,
  deposit: 2000,
};

export function rentalDays(range?: DateRange): number {
  if (!range?.from) return 0;
  if (!range.to) return 1;
  return Math.max(1, differenceInCalendarDays(range.to, range.from));
}

export function isoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function localDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function priceForDate(date: Date, basePrice: number, periods: SeasonalPrice[]): number {
  const key = isoDate(date);
  return periods.find((period) => key >= period.from && key <= period.to)?.price ?? basePrice;
}

export function boatPriceForRange(range: DateRange | undefined, basePrice: number, periods: SeasonalPrice[]): number {
  const days = rentalDays(range);
  if (!range?.from || days === 0) return 0;

  let total = 0;
  for (let offset = 0; offset < days; offset += 1) {
    total += priceForDate(addDays(range.from, offset), basePrice, periods);
  }
  return total;
}

export function availabilityMatchers(ranges: AvailabilityRange[]) {
  return ranges.map((range) => ({
    from: localDate(range.from),
    to: localDate(range.to),
  }));
}

export function normalizeLegacyDate(value: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : null;
}

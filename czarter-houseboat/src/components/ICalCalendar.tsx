"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

interface CalendarEvent {
    start: Date;
    end: Date;
    summary?: string;
}

const localeMap: Record<string, string> = {
    pl: 'pl-PL',
    en: 'en-US',
    de: 'de-DE',
    cs: 'cs-CZ',
    lt: 'lt-LT',
    es: 'es-ES'
};

const ICalCalendar = ({ icalUrl, apartmentId = "A103" }: { icalUrl: string; apartmentId?: string }) => {
    const { language } = useLanguage();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const getTrans = (lang: string) => {
        // @ts-expect-error - key access
        return translations[lang]?.calendar || translations['en'].calendar || translations['pl'].calendar;
    }
    const t = getTrans(language);

    const parseDate = useCallback((v: string): Date => {
        // Handle format like 20240315T120000Z or 20240315
        const y = parseInt(v.substring(0, 4));
        const m = parseInt(v.substring(4, 6)) - 1;
        const d = parseInt(v.substring(6, 8));
        if (v.includes('T')) {
            const h = parseInt(v.substring(9, 11));
            const min = parseInt(v.substring(11, 13));
            const s = parseInt(v.substring(13, 15));
            return new Date(Date.UTC(y, m, d, h, min, s));
        }
        return new Date(y, m, d);
    }, []);

    const parseICal = useCallback((text: string): CalendarEvent[] => {
        const events: CalendarEvent[] = [];
        try {
            const lines = text.split(/\r?\n/);
            let currentEvent: Partial<CalendarEvent> = {};

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line === 'BEGIN:VEVENT') {
                    currentEvent = {};
                } else if (line.startsWith('DTSTART')) {
                    const parts = line.split(':');
                    const val = parts[parts.length - 1];
                    if (val) currentEvent.start = parseDate(val);
                } else if (line.startsWith('DTEND')) {
                    const parts = line.split(':');
                    const val = parts[parts.length - 1];
                    if (val) currentEvent.end = parseDate(val);
                } else if (line.startsWith('SUMMARY')) {
                    currentEvent.summary = line.split(':')[1];
                } else if (line === 'END:VEVENT') {
                    if (currentEvent.start && currentEvent.end) {
                        events.push(currentEvent as CalendarEvent);
                    }
                }
            }
        } catch (e) {
            console.error('Error parsing iCal:', e);
        }
        return events;
    }, [parseDate]);

    useEffect(() => {
        let isMounted = true;

        const fetchCalendarWithFallback = async () => {
            setLoading(true);
            let hasData = false;

            // 1. Try cache
            const cacheKey = `ical_cache_${apartmentId}`;
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                try {
                    const { text, timestamp } = JSON.parse(cachedData);
                    const isNewEnough = Date.now() - timestamp < 3600000;
                    const parsed = parseICal(text);
                    if (isMounted) {
                        setEvents(parsed);
                        hasData = true;
                        if (isNewEnough) {
                            setLoading(false);
                        }
                    }
                } catch (e) {
                    console.warn("Błąd odczytu cache iCal:", e);
                }
            }

            const fetchWithRetry = async (url: string) => {
                const proxies = [
                    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
                    `https://corsproxy.io/?${encodeURIComponent(url)}`,
                    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
                ];
                
                for (let i = 0; i < proxies.length; i++) {
                    try {
                        const proxyUrl = proxies[i];
                        const response = await fetch(proxyUrl);
                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        const text = await response.text();
                        if (!text || !text.includes('BEGIN:VCALENDAR')) throw new Error("Format");
                        return text;
                    } catch (e) {
                        if (i === proxies.length - 1) throw e;
                        await new Promise(r => setTimeout(r, 1000));
                    }
                }
                return null;
            };

            try {
                const text = await fetchWithRetry(icalUrl);
                if (text && isMounted) {
                    const parsedEvents = parseICal(text);
                    setEvents(parsedEvents);
                    setError(null);
                    setLoading(false);
                    localStorage.setItem(cacheKey, JSON.stringify({
                        text,
                        timestamp: Date.now()
                    }));
                    return;
                }
            } catch {
                // Ignore error, handle failure below
            }

            if (isMounted && !hasData) {
                setError(t.error);
            }
            if (isMounted) setLoading(false);
        };

        fetchCalendarWithFallback();

        return () => {
            isMounted = false;
        };
    }, [icalUrl, parseICal, apartmentId, t.error]);

    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        setCurrentDate(newDate);
    };

    const getDayStatus = (day: number) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        checkDate.setHours(0, 0, 0, 0);

        let isStart = false;
        let isEnd = false;
        let isMiddle = false;

        events.forEach(event => {
            const start = new Date(event.start);
            start.setHours(0, 0, 0, 0);
            const end = new Date(event.end);
            end.setHours(0, 0, 0, 0);

            if (checkDate.getTime() === start.getTime()) isStart = true;
            else if (checkDate.getTime() === end.getTime()) isEnd = true;
            else if (checkDate > start && checkDate < end) isMiddle = true;
        });

        if (isStart && isEnd) return 'transition';
        if (isMiddle) return 'full';
        if (isStart) return 'check-in';
        if (isEnd) return 'check-out';
        return 'free';
    };

    const monthName = currentDate.toLocaleString(localeMap[language] || 'pl-PL', { month: 'long', year: 'numeric' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const getDayStyle = (status: string) => {
        const baseStyle = 'border border-slate-300 dark:border-slate-600';
        switch (status) {
            case 'full':
                return `bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium ${baseStyle}`;
            case 'check-in':
                return `text-red-600 dark:text-red-400 font-medium ${baseStyle} bg-[linear-gradient(to_bottom_right,transparent_50%,rgba(239,68,68,0.2)_50%)]`;
            case 'check-out':
                return `text-red-600 dark:text-red-400 font-medium ${baseStyle} bg-[linear-gradient(to_bottom_right,rgba(239,68,68,0.2)_50%,transparent_50%)]`;
            case 'transition':
                return `bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium ${baseStyle}`;
            default:
                return `text-slate-700 dark:text-slate-300 ${baseStyle} hover:bg-slate-100 dark:hover:bg-slate-800`;
        }
    };



    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white">{t.title} {apartmentId}</h3>
                </div>
                {loading && <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />}
            </div>

            <div className="p-6">
                {error && (
                    <div className="mb-6 p-4 bg-amber-50 dark:bg-slate-800 border-l-4 border-amber-500 rounded-r-lg flex gap-3 text-sm text-amber-800 dark:text-amber-200">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-slate-800 dark:text-white">{capitalizedMonth}</h4>
                    <div className="flex gap-2">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="p-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-900 dark:text-white flex items-center justify-center"
                            title={t.prevMonth}
                        >
                            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => changeMonth(1)}
                            className="p-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-900 dark:text-white flex items-center justify-center"
                            title={t.nextMonth}
                        >
                            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {t.days.map((day: string) => (
                        <div key={day} className="text-center text-xs font-bold text-slate-400 py-1 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: (firstDayOfMonth(currentDate) + 6) % 7 }).map((_, i) => (
                        <div key={`empty-${i}`} className="p-2" />
                    ))}
                    {Array.from({ length: daysInMonth(currentDate) }).map((_, i) => {
                        const day = i + 1;
                        const status = getDayStatus(day);
                        return (
                            <div
                                key={day}
                                className={`
                                    p-2 text-center text-sm rounded-lg transition-all relative
                                    ${getDayStyle(status)}
                                `}
                            >
                                {day}
                                {(status === 'full' || status === 'transition') && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-[10px] md:text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-red-100 dark:bg-red-900/30 border border-slate-300 dark:border-slate-600" />
                        <span className="text-slate-500">{t.legend.busy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600 bg-[linear-gradient(to_bottom_right,rgba(239,68,68,0.2)_50%,transparent_50%)]"
                        />
                        <span className="text-slate-500">{t.legend.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600 bg-[linear-gradient(to_bottom_right,transparent_50%,rgba(239,68,68,0.2)_50%)]"
                        />
                        <span className="text-slate-500">{t.legend.checkOut}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-transparent border border-slate-300 dark:border-slate-600" />
                        <span className="text-slate-500">{t.legend.available}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ICalCalendar;

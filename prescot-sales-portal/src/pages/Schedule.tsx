/**
 * Schedule.tsx – Terminarz Handlowca
 * Pełna strona z listą wszystkich odłożonych / przeniesionych kontaktów.
 * Dane z localStorage: prescot_postponed_dates_${username}
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { ALL_LEADS } from '../data/mockData';
import type { Lead } from '../data/mockData';
import { Calendar, ChevronLeft, ChevronRight, Check, X, Clock, Zap } from 'lucide-react';
import styles from './Schedule.module.css';

type TaskStatus = 'pending' | 'success' | 'postponed' | 'rejected';

interface ScheduledItem {
    lead: Lead;
    date: string; // YYYY-MM-DD
    status: TaskStatus;
}

const DAY_NAMES_PL = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const MONTH_NAMES_PL = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
const MONTH_SHORT_PL = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];

function isoToDate(iso: string): Date {
    return new Date(iso + 'T12:00:00');
}

// Bezpieczna konwersja daty na YYYY-MM-DD w lokalnej strefie czasowej
function toLocalISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function datesInMonth(year: number, month: number): Date[] {
    const result: Date[] = [];
    const first = new Date(year, month, 1);
    // Start from Monday
    const start = new Date(first);
    const dow = start.getDay(); // 0=Sun
    const diff = (dow === 0 ? -6 : 1 - dow);
    start.setDate(start.getDate() + diff);
    // 6 weeks grid = 42 cells
    for (let i = 0; i < 42; i++) {
        result.push(new Date(start));
        start.setDate(start.getDate() + 1);
    }
    return result;
}

export const Schedule: React.FC = () => {
    const { user } = useAuth();
    const today = useMemo(() => new Date(), []);
    const todayISO = toLocalISO(today);

    const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [postponedDates, setPostponedDates] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem(`prescot_postponed_dates_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>(() => {
        const saved = localStorage.getItem(`prescot_tasks_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [selectedISO, setSelectedISO] = useState<string | null>(todayISO);

    // Sync z localStorage
    useEffect(() => {
        const refresh = () => {
            const pd = localStorage.getItem(`prescot_postponed_dates_${user?.username}`);
            if (pd) setPostponedDates(JSON.parse(pd));
            const ts = localStorage.getItem(`prescot_tasks_${user?.username}`);
            if (ts) setTaskStatuses(JSON.parse(ts));
        };
        window.addEventListener('storage', refresh);
        const id = setInterval(refresh, 3000);
        return () => { window.removeEventListener('storage', refresh); clearInterval(id); };
    }, [user?.username]);

    // Wszystkie zaplanowane kontakty posortowane wg daty
    const allScheduled = useMemo((): ScheduledItem[] => {
        return Object.entries(postponedDates)
            .map(([id, date]) => {
                const lead = ALL_LEADS.find(l => l.id === id);
                const status = taskStatuses[id] || 'postponed';
                // ONLY yellow (postponed) leads should appear in the schedule
                return (lead && status === 'postponed') ? { lead, date, status: 'postponed' as TaskStatus } : null;
            })
            .filter(Boolean)
            .sort((a, b) => a!.date.localeCompare(b!.date)) as ScheduledItem[];
    }, [postponedDates, taskStatuses]);

    // Kontakty na wybrany dzień
    const selectedDayItems = useMemo((): ScheduledItem[] => {
        if (!selectedISO) return [];
        return allScheduled.filter(i => i.date === selectedISO);
    }, [allScheduled, selectedISO]);

    // Mapa: data → liczba kontaktów
    const countByDate = useMemo(() => {
        const m: Record<string, { total: number; statuses: TaskStatus[] }> = {};
        allScheduled.forEach(({ date, status }) => {
            if (!m[date]) m[date] = { total: 0, statuses: [] };
            m[date].total++;
            m[date].statuses.push(status);
        });
        return m;
    }, [allScheduled]);

    const calendarDays = useMemo(() =>
        datesInMonth(viewDate.year, viewDate.month), [viewDate]);

    const prevMonth = useCallback(() => {
        setViewDate(v => {
            const d = new Date(v.year, v.month - 1, 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });
    }, []);

    const nextMonth = useCallback(() => {
        setViewDate(v => {
            const d = new Date(v.year, v.month + 1, 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });
    }, []);

    const statusColor = (s: TaskStatus) => {
        if (s === 'success') return '#10b981';
        if (s === 'rejected') return '#ef4444';
        return '#f59e0b';
    };

    const statusLabel = (s: TaskStatus) => {
        if (s === 'success') return '✓ Zrealizowany';
        if (s === 'rejected') return '✗ Odrzucony';
        return '⏳ Oczekuje';
    };

    // Dominujący kolor dnia kalendarza (jeśli różne statusy)
    const dayDotColor = (isoDate: string) => {
        const info = countByDate[isoDate];
        if (!info) return null;
        const hasSuccess = info.statuses.includes('success');
        const hasRejected = info.statuses.includes('rejected');
        const hasPending = info.statuses.includes('postponed') || info.statuses.includes('pending');
        if (hasPending) return '#f59e0b';   // żółty – priorytet (są niezałatwione)
        if (hasSuccess && !hasRejected) return '#10b981';
        if (hasRejected && !hasSuccess) return '#ef4444';
        return '#a78bfa'; // mix
    };

    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-main">
                <div className={styles.aurora} />

                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Terminarz</h1>
                        <p className={styles.subtitle}>
                            Wszystkie przeniesione kontakty &bull; {user?.fullName}
                        </p>
                    </div>
                    <div className={styles.statBadge}>
                        <Calendar size={18} />
                        <span>{allScheduled.length} zaplanowanych</span>
                    </div>
                </header>

                <div className={styles.contentGrid}>

                    {/* ── Lewa: Kalendarz + lista wszystkich ── */}
                    <div className={styles.leftCol}>

                        {/* Kalendarz */}
                        <div className={styles.calendarBox}>
                            <div className={styles.calNav}>
                                <button className={styles.calNavBtn} onClick={prevMonth} title="Poprzedni miesiąc">
                                    <ChevronLeft size={18} />
                                </button>
                                <div className={styles.calMonthLabel}>
                                    {MONTH_NAMES_PL[viewDate.month]} {viewDate.year}
                                </div>
                                <button className={styles.calNavBtn} onClick={nextMonth} title="Następny miesiąc">
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            {/* Nagłówki dni */}
                            <div className={styles.calGrid}>
                                {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => (
                                    <div key={d} className={styles.calDayHeader}>{d}</div>
                                ))}

                                {calendarDays.map((date, i) => {
                                    const iso = toLocalISO(date);
                                    const isThisMonth = date.getMonth() === viewDate.month;
                                    const isToday = iso === todayISO;
                                    const isSelected = iso === selectedISO;
                                    const dot = dayDotColor(iso);
                                    const count = countByDate[iso]?.total;

                                    return (
                                        <button
                                            key={i}
                                            className={[
                                                styles.calDay,
                                                !isThisMonth ? styles.calDayOtherMonth : '',
                                                isToday ? styles.calDayToday : '',
                                                isSelected ? styles.calDaySelected : '',
                                                dot ? styles.calDayHasEvent : '',
                                            ].join(' ')}
                                            onClick={() => setSelectedISO(iso)}
                                            title={iso}
                                        >
                                            <span className={styles.calDayNum}>{date.getDate()}</span>
                                            {dot && (
                                                <span
                                                    className={styles.calDot}
                                                    style={{ background: dot }}
                                                    title={`${count} kontakt(ów)`}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pełna lista chronologiczna */}
                        <div className={styles.allListBox}>
                            <div className={styles.allListHeader}>
                                <Clock size={16} />
                                WSZYSTKIE ZAPLANOWANE
                            </div>
                            {allScheduled.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <Zap size={32} style={{ opacity: 0.2 }} />
                                    <p>Brak przeniesionych kontaktów</p>
                                    <span>Użyj przycisku „📅 ODŁÓŻ W CZASIE" w karcie CRM</span>
                                </div>
                            ) : (
                                allScheduled.map(({ lead, date, status }) => {
                                    const d = isoToDate(date);
                                    const isSelected = date === selectedISO;
                                    return (
                                        <div
                                            key={lead.id}
                                            className={[
                                                styles.listEntry,
                                                isSelected ? styles.listEntryActive : '',
                                            ].join(' ')}
                                            onClick={() => setSelectedISO(date)}
                                        >
                                            <div
                                                className={styles.listDot}
                                                style={{ background: statusColor(status) }}
                                            />
                                            <div className={styles.listInfo}>
                                                <div className={styles.listName}>{lead.name}</div>
                                                <div className={styles.listMeta}>
                                                    {DAY_NAMES_PL[d.getDay()]}, {d.getDate()} {MONTH_SHORT_PL[d.getMonth()]} {d.getFullYear()}
                                                </div>
                                            </div>
                                            <div
                                                className={styles.listStatus}
                                                style={{ color: statusColor(status) }}
                                            >
                                                {statusLabel(status)}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* ── Prawa: Dzień wybrany ── */}
                    <div className={styles.rightCol}>
                        {selectedISO && (
                            <>
                                <div className={styles.dayHeader}>
                                    <div className={styles.dayTitle}>
                                        {(() => {
                                            const d = isoToDate(selectedISO);
                                            return `${DAY_NAMES_PL[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES_PL[d.getMonth()]} ${d.getFullYear()}`;
                                        })()}
                                    </div>
                                    {selectedISO === todayISO && (
                                        <span className={styles.todayBadge}>DZIŚ</span>
                                    )}
                                </div>

                                {selectedDayItems.length === 0 ? (
                                    <div className={styles.dayEmpty}>
                                        <Calendar size={40} style={{ opacity: 0.15 }} />
                                        <p>Brak kontaktów na ten dzień</p>
                                    </div>
                                ) : (
                                    <div className={styles.dayCards}>
                                        {selectedDayItems.map(({ lead, status }) => (
                                            <div key={lead.id} className={styles.dayCard}>
                                                {/* Status bar */}
                                                <div
                                                    className={styles.dayCardBar}
                                                    style={{ background: statusColor(status) }}
                                                />
                                                <div className={styles.dayCardContent}>
                                                    <div className={styles.dayCardTop}>
                                                        <div className={styles.dayCardName}>{lead.name}</div>
                                                        <div
                                                            className={styles.dayCardStatus}
                                                            style={{
                                                                color: statusColor(status),
                                                                borderColor: statusColor(status) + '44',
                                                                background: statusColor(status) + '11',
                                                            }}
                                                        >
                                                            {status === 'success' && <Check size={12} />}
                                                            {status === 'rejected' && <X size={12} />}
                                                            {(status === 'postponed' || status === 'pending') && <Clock size={12} />}
                                                            <span>{statusLabel(status)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

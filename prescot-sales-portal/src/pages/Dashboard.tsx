import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import {
    BarChart3,
    Target,
    Check,
    X,
    Calendar,
    MessageSquare,
    ListTodo,
    Users,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';
import { ALL_LEADS } from '../data/mockData';
import type { Lead } from '../data/mockData';
import styles from './Dashboard.module.css';
import weeklyStyles from './WeeklyPlan.module.css';
import { CrmCard } from '../components/CrmCard/CrmCard';

type TaskStatus = 'pending' | 'success' | 'postponed' | 'rejected';

const REPS_LIST = [
    { id: 'dariuszn' }, { id: 'annag' }, { id: 'annaa' }, { id: 'adamg' }, { id: 'iwonab' }
];

// ────────── DatePicker Modal ──────────
interface DatePickerModalProps {
    leadName: string;
    onConfirm: (date: string) => void;
    onCancel: () => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ leadName, onConfirm, onCancel }) => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(() => {
        // Default: jutro
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });

    // Generuj kolejne 14 dni jako przyciski quick-pick (w tym DZISIAJ)
    const quickDays = useMemo(() => {
        const todayRef = new Date();
        const days: { iso: string; label: string; dayName: string }[] = [];
        const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
        const monthNames = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
        for (let i = 0; i <= 14; i++) {
            const d = new Date(todayRef);
            d.setDate(todayRef.getDate() + i);
            const iso = d.toISOString().split('T')[0];
            days.push({
                iso,
                label: i === 0 ? 'DZIŚ' : `${d.getDate()} ${monthNames[d.getMonth()]}`,
                dayName: dayNames[d.getDay()],
            });
        }
        return days;
    }, []);

    return (
        <div className={styles.datePickerOverlay} onClick={onCancel}>
            <div className={styles.datePickerBox} onClick={e => e.stopPropagation()}>
                <div className={styles.datePickerHeader}>
                    <div className={styles.datePickerTag}>TERMINARZ</div>
                    <h3 className={styles.datePickerTitle}>Wybierz datę odłożenia</h3>
                    <p className={styles.datePickerSub}>{leadName}</p>
                    <button className={styles.datePickerClose} onClick={onCancel}><X size={18} /></button>
                </div>

                {/* Quick-pick grid */}
                <div className={styles.quickPickGrid}>
                    {quickDays.map(day => (
                        <button
                            key={day.iso}
                            className={`${styles.quickDayBtn} ${selectedDate === day.iso ? styles.quickDayActive : ''}`}
                            onClick={() => setSelectedDate(day.iso)}
                        >
                            <span className={styles.quickDayName}>{day.dayName}</span>
                            <span className={styles.quickDayDate}>{day.label}</span>
                        </button>
                    ))}
                </div>

                {/* Manual input */}
                <div className={styles.datePickerManual}>
                    <label className={styles.datePickerLabel}>Lub wpisz datę ręcznie:</label>
                    <input
                        type="date"
                        className={styles.datePickerInput}
                        value={selectedDate}
                        min={todayISO}
                        onChange={e => setSelectedDate(e.target.value)}
                    />
                </div>

                <div className={styles.datePickerActions}>
                    <button className={styles.datePickerCancel} onClick={onCancel}>Anuluj</button>
                    <button
                        className={styles.datePickerConfirm}
                        onClick={() => selectedDate && onConfirm(selectedDate)}
                        disabled={!selectedDate}
                    >
                        📅 Odłóż na {selectedDate ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' }) : '?'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ────────── Mini terminarz (lista zaplanowanych) ──────────
interface ScheduledListProps {
    postponedDates: Record<string, string>;
    taskStatuses: Record<string, TaskStatus>;
}

const ScheduledList: React.FC<ScheduledListProps> = ({ postponedDates, taskStatuses }) => {
    const [open, setOpen] = useState(false);

    const items = useMemo(() => {
        return Object.entries(postponedDates)
            .map(([id, date]) => {
                const lead = ALL_LEADS.find(l => l.id === id);
                const status = taskStatuses[id];
                // ONLY yellow (postponed) leads that haven't been settled later should be here
                return (lead && status === 'postponed') ? { lead, date, status: 'postponed' as TaskStatus } : null;
            })
            .filter(Boolean)
            .sort((a, b) => a!.date.localeCompare(b!.date)) as { lead: Lead; date: string; status: TaskStatus }[];
    }, [postponedDates, taskStatuses]);

    if (items.length === 0) return null;

    const formatDate = (iso: string) =>
        new Date(iso + 'T12:00:00').toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', weekday: 'short' });

    const statusColor = (s: TaskStatus) => {
        if (s === 'success') return '#10B981';
        if (s === 'rejected') return '#ef4444';
        return '#f59e0b'; // postponed / pending
    };

    return (
        <div className={styles.scheduledPanel}>
            <button className={styles.scheduledToggle} onClick={() => setOpen(v => !v)}>
                <Calendar size={16} />
                <span>TERMINARZ ({items.length})</span>
                {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {open && (
                <div className={styles.scheduledList}>
                    {items.map(({ lead, date, status }) => (
                        <div key={lead.id} className={styles.scheduledEntry}>
                            <div
                                className={styles.scheduledDot}
                                style={{ background: statusColor(status) }}
                            />
                            <div className={styles.scheduledInfo}>
                                <div className={styles.scheduledName}>{lead.name}</div>
                                <div className={styles.scheduledDate}>{formatDate(date)}</div>
                            </div>
                            <div
                                className={styles.scheduledBadge}
                                style={{ color: statusColor(status) }}
                            >
                                {status === 'success' ? '✓ ZAŁ.' : status === 'rejected' ? '✗ ODRZUC.' : '⏳ CZEKA'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ────────── Dashboard główny ──────────
export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const currentDate = useMemo(() => new Date(), []);
    const isPrezes = user?.role === 'prezes' || user?.role === 'admin';

    const getDayName = (date: Date) => {
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        return days[date.getDay()];
    };
    const dayOfWeek = getDayName(currentDate);
    const todayISO = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>(() => {
        const saved = localStorage.getItem(`prescot_tasks_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [taskNotes, setTaskNotes] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem(`prescot_notes_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [presidentNotes, setPresidentNotes] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem('prescot_president_notes');
        return saved ? JSON.parse(saved) : {};
    });
    const [postponedDates, setPostponedDates] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem(`prescot_postponed_dates_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [contactHistory, setContactHistory] = useState<Record<string, number>>(() => {
        try {
            const saved = localStorage.getItem("prescot_contact_history");
            return saved ? JSON.parse(saved) : {};
        } catch { return {}; }
    });

    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    // Date picker state
    const [datePickerLeadId, setDatePickerLeadId] = useState<string | null>(null);

    const getMastermindDailyPlan = useCallback((): Lead[] => {
        const saved = localStorage.getItem('prescot_mastermind_plan');
        if (!saved || !user?.username) return [];
        const plan = JSON.parse(saved);
        const dayIds: string[] = plan.reps?.[user.username]?.[dayOfWeek] || [];
        return dayIds.map((id: string) => ALL_LEADS.find(l => l.id === id)).filter(Boolean) as Lead[];
    }, [user, dayOfWeek]);

    const [mastermindLeads, setMastermindLeads] = useState<Lead[]>(() => getMastermindDailyPlan());

    // Kontakty przeniesione na DZIŚ (extra)
    const scheduledToday = useMemo(() => {
        return Object.entries(postponedDates)
            .filter(([, date]) => date === todayISO)
            .map(([id]) => ALL_LEADS.find(l => l.id === id))
            .filter(Boolean) as Lead[];
    }, [postponedDates, todayISO]);

    useEffect(() => {
        if (isPrezes) { navigate('/weekly-plan'); return; }
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setSelectedLeadId(null); setDatePickerLeadId(null); }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isPrezes, navigate]);

    useEffect(() => {
        const refresh = () => {
            setMastermindLeads(getMastermindDailyPlan());
            const tSaved = localStorage.getItem(`prescot_tasks_${user?.username}`);
            if (tSaved) setTaskStatuses(JSON.parse(tSaved));
            const nSaved = localStorage.getItem(`prescot_notes_${user?.username}`);
            if (nSaved) setTaskNotes(JSON.parse(nSaved));
            const pSaved = localStorage.getItem('prescot_president_notes');
            if (pSaved) setPresidentNotes(JSON.parse(pSaved));
            const pdSaved = localStorage.getItem(`prescot_postponed_dates_${user?.username}`);
            if (pdSaved) setPostponedDates(JSON.parse(pdSaved));
        };
        window.addEventListener('storage', refresh);
        const poll = setInterval(refresh, 5000);
        return () => { window.removeEventListener('storage', refresh); clearInterval(poll); };
    }, [getMastermindDailyPlan, user?.username]);

    const planLeads = useMemo(() => mastermindLeads.slice(0, 3), [mastermindLeads]);

    // Stałe 2 sloty prospekcji – zawsze widoczne pod retencją
    const NEW_CLIENT_SLOTS = useMemo(() => [
        {
            id: 'new-client-0',
            name: 'NOWY KLIENT DO POZYSKANIA',
            city: 'Czeka na dane',
            person: 'PROSPEKCJA',
            phone: '-', email: '-',
            industry: 'PROSPEKCJA',
            isNewClientSlot: true,
            detail: '', companyAnalysis: '', purchaseHistory: '',
            suggestions: '', type: 'new_lead' as const,
            assignedTo: user?.username || '',
            salesPotential: '', icebreaker: ''
        },
        {
            id: 'new-client-1',
            name: 'NOWY KLIENT DO POZYSKANIA',
            city: 'Czeka na dane',
            person: 'PROSPEKCJA',
            phone: '-', email: '-',
            industry: 'PROSPEKCJA',
            isNewClientSlot: true,
            detail: '', companyAnalysis: '', purchaseHistory: '',
            suggestions: '', type: 'new_lead' as const,
            assignedTo: user?.username || '',
            salesPotential: '', icebreaker: ''
        },
    ], [user?.username]);

    const allCurrentTasks = useMemo(() => {
        // Retencja z placeholderami (wypełnia do max 3)
        const placeholders = Array.from({ length: Math.max(0, 3 - planLeads.length) }).map((_, i) => ({
            id: `placeholder-${i}`, name: 'OCZEKUJE NA PLAN', city: 'Baza zewnętrzna',
            person: 'Czeka na plan prezesa', phone: '-', email: '-', industry: 'RETENCJA',
            isPlaceholder: true, detail: '', companyAnalysis: '', purchaseHistory: '',
            suggestions: '', type: 'new_lead' as const, assignedTo: user?.username || '',
            salesPotential: '', icebreaker: ''
        }));
        return [...planLeads, ...placeholders];
    }, [planLeads, user?.username]);


    const activeLead = useMemo(() =>
        [...allCurrentTasks, ...scheduledToday, ...NEW_CLIENT_SLOTS].find(l => l.id === selectedLeadId),
        [selectedLeadId, allCurrentTasks, scheduledToday, NEW_CLIENT_SLOTS]);

    const updateStatus = useCallback((taskId: string, status: TaskStatus) => {
        setTaskStatuses(prev => {
            const currentStatus = prev[taskId];
            const nextStatus = currentStatus === status ? 'pending' : status;

            const next = { ...prev, [taskId]: nextStatus };
            localStorage.setItem(`prescot_tasks_${user?.username}`, JSON.stringify(next));

            // ALWAYS remove from schedule if settled (Green/Red) OR if pending.
            // Only 'postponed' (Yellow) belongs in the schedule.
            if (nextStatus !== 'postponed') {
                setPostponedDates(prevPD => {
                    if (!prevPD[taskId]) return prevPD;
                    const nextPD = { ...prevPD };
                    delete nextPD[taskId];
                    localStorage.setItem(`prescot_postponed_dates_${user?.username}`, JSON.stringify(nextPD));
                    window.dispatchEvent(new StorageEvent('storage', {
                        key: `prescot_postponed_dates_${user?.username}`,
                        newValue: JSON.stringify(nextPD)
                    }));
                    return nextPD;
                });
            }

            return next;
        });
    }, [user?.username]);

    const saveNote = useCallback((taskId: string, note: string) => {
        setTaskNotes(prev => {
            const next = { ...prev, [taskId]: note };
            localStorage.setItem(`prescot_notes_${user?.username}`, JSON.stringify(next));
            return next;
        });
    }, [user?.username]);

    // Otwórz date picker dla danego kontaktu
    const openDatePicker = useCallback((leadId: string) => {
        setDatePickerLeadId(leadId);
    }, []);

    // Potwierdź datę z date pickera
    const confirmPostpone = useCallback((date: string) => {
        if (!datePickerLeadId || !user?.username) return;
        // Zapisz datę
        setPostponedDates(prev => {
            const next = { ...prev, [datePickerLeadId]: date };
            localStorage.setItem(`prescot_postponed_dates_${user.username}`, JSON.stringify(next));
            // Powiadom WeeklyPlan
            window.dispatchEvent(new StorageEvent('storage', {
                key: `prescot_postponed_dates_${user.username}`,
                newValue: JSON.stringify(next)
            }));
            return next;
        });
        // Ustaw status 'postponed'
        updateStatus(datePickerLeadId, 'postponed');
        setDatePickerLeadId(null);
    }, [datePickerLeadId, user?.username, updateStatus]);

    const globalTotalContacts = useMemo(() => {
        let count = 0;
        REPS_LIST.forEach(rep => {
            const saved = localStorage.getItem(`prescot_notes_${rep.id}`);
            if (saved) {
                const notes = JSON.parse(saved);
                count += Object.values(notes).filter(n => (n as string).trim().length > 0).length;
            }
        });
        return count;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskNotes]);

    const formattedDate = currentDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
    const realTaskCount = allCurrentTasks.filter(t => !('isPlaceholder' in t && t.isPlaceholder)).length + scheduledToday.length;
    const successCount = Object.values(taskStatuses).filter(s => s === 'success').length;

    const renderTaskItem = (item: Lead & { isPlaceholder?: boolean }, isScheduled = false) => {
        const status = taskStatuses[item.id] || (isScheduled ? 'postponed' : 'pending');
        const isActive = selectedLeadId === item.id;
        const isPlaceholder = 'isPlaceholder' in item && item.isPlaceholder;
        const postponedTo = postponedDates[item.id];

        // Status bar color classes
        const statusCls =
            status === 'success' ? styles.itemSuccess :
                status === 'rejected' ? styles.itemRejected :
                    status === 'postponed' ? styles.itemPostponed : '';

        return (
            <div
                key={item.id}
                className={[
                    styles.planItem,
                    isActive ? styles.activeTask : '',
                    isPlaceholder ? styles.placeholderItem : '',
                    isScheduled ? styles.scheduledItem : '',
                    statusCls,
                ].join(' ')}
                onClick={() => !isPlaceholder && setSelectedLeadId(item.id)}
            >
                <div className={styles.planInfo}>
                    <div className={styles.planName}>{item.name}</div>
                    <div className={styles.planDetail}>
                        {isScheduled && postponedTo
                            ? `📅 Przeniesiony z ${postponedTo} · ${item.city}`
                            : `${item.city} · ${item.person}`}
                    </div>
                </div>
                {!isPlaceholder && (
                    <div className={styles.taskMeta}>
                        {(taskNotes[item.id] || '').trim() && <MessageSquare size={14} className={styles.noteIndicator} />}
                        {status === 'success' && <Check size={16} className={styles.successIcon} />}
                        {status === 'postponed' && <Calendar size={16} className={styles.postponedIcon} />}
                        {status === 'rejected' && <X size={16} className={styles.rejectedIcon} />}
                    </div>
                )}
            </div>
        );
    };

    // Slot nowego klienta do pozyskania – identyczny wygląd co planItem
    const renderNewClientSlot = (item: { id: string; name: string; city: string; person: string }) => {
        const isActive = selectedLeadId === item.id;
        return (
            <div
                key={item.id}
                className={[
                    styles.planItem,
                    styles.newClientSlot,
                    isActive ? styles.activeTask : '',
                ].join(' ')}
                onClick={() => setSelectedLeadId(item.id)}
                title="Slot nowego klienta do pozyskania – dane zostaną uzupełnione przez agenta"
            >
                <div className={styles.planInfo}>
                    <div className={styles.planName}>{item.name}</div>
                    <div className={styles.planDetail}>
                        {item.city} · czeka na dane nowego kontrahenta
                    </div>
                </div>
                <div className={styles.taskMeta}>
                    <div className={styles.prospectDots}>
                        <span /><span /><span />
                    </div>
                </div>
            </div>
        );
    };

    if (isPrezes) return null;

    const activeLeadPresidentNote = activeLead
        ? (presidentNotes[`${activeLead.assignedTo}_${activeLead.id}`] || '')
        : '';

    const datePickerLead = datePickerLeadId ? ALL_LEADS.find(l => l.id === datePickerLeadId) : null;

    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-main">
                <div className={styles.aurora}></div>

                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>System Operacyjny Prescot</h1>
                        <p className={styles.subtitle}>Harmonogram działań handlowych: {user?.fullName}</p>
                    </div>
                    <div className={styles.date}>{formattedDate}</div>
                </header>

                <section className={styles.stats}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <BarChart3 size={18} className={styles.statIconPrimary} />
                            <span className={styles.statLabel}>Realizacja Planu</span>
                        </div>
                        <div className={styles.statValue}>{realTaskCount > 0 ? Math.round((successCount / realTaskCount) * 100) : 0}%</div>
                        <div className={styles.statTrend}>Cel: {Math.min(successCount, 5)}/5</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <MessageSquare size={18} className={styles.statIconSuccess} />
                            <span className={styles.statLabel}>CRM (system)</span>
                        </div>
                        <div className={styles.statValue}>{globalTotalContacts}</div>
                        <div className={styles.statTrend}>Łączna liczba wpisów</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <Target size={18} className={styles.statIconAccent} />
                            <span className={styles.statLabel}>Skuteczność</span>
                        </div>
                        <div className={styles.statValue}>
                            {Object.values(taskStatuses).filter(s => s !== 'pending').length > 0
                                ? Math.round((successCount / Object.values(taskStatuses).filter(s => s !== 'pending').length) * 100)
                                : 0}%
                        </div>
                        <div className={styles.statTrend}>Sukcesy vs Kontakty</div>
                    </div>
                </section>

                <section className={styles.contentGrid}>
                    {/* ── Lewa: lista zadań + terminarz ── */}
                    <div className={styles.planSection}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionTitle}>
                                <ListTodo size={18} className={styles.todoIcon} />
                                ZADANIA – {dayOfWeek.toUpperCase()}
                            </div>
                        </div>

                        <div className={styles.planList}>
                            {/* Kontakty przeniesione na dziś – żółte extra */}
                            {scheduledToday.length > 0 && (
                                <>
                                    <div className={`${styles.groupHeader} ${styles.rescheduledHeader}`}>
                                        📅 PRZENIESIONE NA DZIŚ ({scheduledToday.length})
                                    </div>
                                    {scheduledToday.map((t: Lead) => renderTaskItem(t, true))}
                                </>
                            )}

                            {/* Harmonogram bieżący – retencja */}
                            <div className={styles.groupHeader}>HARMONOGRAM BIEŻĄCY</div>
                            {allCurrentTasks.map((t: Lead & { isPlaceholder?: boolean }) => renderTaskItem(t))}

                            {/* Prospekcja – 2 stałe sloty nowych klientów */}
                            <div className={`${styles.groupHeader} ${styles.prospectHeader}`}>
                                🎯 PROSPEKCJA – NOWI KLIENCI
                            </div>
                            {NEW_CLIENT_SLOTS.map((t) => renderNewClientSlot(t))}
                        </div>

                        {/* Mini-terminarz (rozwijany) */}
                        <ScheduledList postponedDates={postponedDates} taskStatuses={taskStatuses} />
                    </div>

                    {/* ── Prawa: karta CRM ── */}
                    <div className={styles.detailPane}>
                        {(() => {
                            const isPlaceholder = activeLead && 'isPlaceholder' in activeLead && activeLead.isPlaceholder;
                            const isNewSlot = activeLead && 'isNewClientSlot' in activeLead && activeLead.isNewClientSlot;

                            if (activeLead && !isPlaceholder && !isNewSlot) {
                                return (
                                    <CrmCard
                                        lead={activeLead}
                                        repNote={taskNotes[activeLead.id] || ''}
                                        onRepNoteChange={(note) => saveNote(activeLead.id, note)}
                                        presidentNote={activeLeadPresidentNote}
                                        onPresidentNoteChange={() => { }}
                                        isPresidentView={false}
                                        taskStatus={taskStatuses[activeLead.id]}
                                        onSetTaskStatus={(status) => updateStatus(activeLead.id, status)}
                                        onPostponeRequest={() => openDatePicker(activeLead.id)}
                                    />
                                );
                            }

                            if (isNewSlot) {
                                return (
                                    <div className={styles.prospectEmptyPanel}>
                                        <div style={{ fontSize: '3rem' }}>🎯</div>
                                        <h3>Slot Prospekcji</h3>
                                        <p>
                                            Ten slot jest przeznaczony na nowego klienta do pozyskania.<br />
                                            Wkrótce zostanie tu załadowany kontrahent z bazy prospektów<br />
                                            lub wygenerowany przez Agenta AI Mastermind.
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: '#334155', marginTop: '0.5rem' }}>
                                            Baza nowych klientów &bull; Agent AI &bull; Skrypt prospektów
                                        </p>
                                    </div>
                                );
                            }

                            return (
                                <div className={`${weeklyStyles.modal} glass`}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', minHeight: '300px' }}
                                >
                                    <Users size={48} style={{ opacity: 0.3 }} />
                                    <h3 style={{ margin: 0, fontWeight: 600 }}>Wybierz klienta z listy</h3>
                                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Kliknij firmę z harmonogramu aby zobaczyć jej kartę CRM</p>
                                </div>
                            );
                        })()}
                    </div>
                </section>

                {/* Date Picker Modal */}
                {datePickerLeadId && datePickerLead && (
                    <DatePickerModal
                        leadName={datePickerLead.name}
                        onConfirm={confirmPostpone}
                        onCancel={() => setDatePickerLeadId(null)}
                    />
                )}
            </main>
        </div>
    );
};

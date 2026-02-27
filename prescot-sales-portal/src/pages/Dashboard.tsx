import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import {
    BarChart3,
    Target,
    Check,
    X,
    Calendar,
    PhoneCall,
    Mail,
    MessageSquare,
    ListTodo,
    PieChart,
    Search
} from 'lucide-react';
import { getDailyPlanForRep } from '../data/mockData';
import type { Lead } from '../data/mockData';
import styles from './Dashboard.module.css';

type TaskStatus = 'pending' | 'success' | 'postponed' | 'rejected';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const currentDate = useMemo(() => new Date(), []);
    const isPrezes = user?.role === 'prezes' || user?.role === 'admin';

    // Helpers
    const getDayName = (date: Date) => {
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        return days[date.getDay()];
    };
    const dayOfWeek = getDayName(currentDate);

    // States for Handlowiec workflow
    const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>(() => {
        const saved = localStorage.getItem(`prescot_tasks_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [taskNotes, setTaskNotes] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem(`prescot_notes_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [rescheduledTasks] = useState<Lead[]>(() => {
        const saved = localStorage.getItem(`prescot_rescheduled_${user?.username}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [postponedDates, setPostponedDates] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem(`prescot_postponed_dates_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedPostponeDate, setSelectedPostponeDate] = useState(new Date().toISOString().split('T')[0]);
    const [customTasks] = useState<Lead[]>(() => {
        const saved = localStorage.getItem(`prescot_custom_tasks_${user?.username}`);
        return saved ? JSON.parse(saved) : [];
    });

    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

    // Global CRM Contact Counter
    const globalTotalContacts = useMemo(() => {
        const REPS_LIST = [
            { id: "dariuszn" }, { id: "annag" }, { id: "annaa" }, { id: "adamg" }, { id: "iwonab" }
        ];
        let count = 0;
        REPS_LIST.forEach(rep => {
            const saved = localStorage.getItem(`prescot_notes_${rep.id}`);
            if (saved) {
                const notes = JSON.parse(saved);
                count += Object.values(notes).filter(n => (n as string).trim().length > 0).length;
            }
        });
        return count;
    }, [taskNotes]);

    useEffect(() => {
        if (isPrezes) {
            navigate('/weekly-plan');
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedLeadId(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isPrezes, navigate]);

    const dailyPlan = useMemo(() => {
        return getDailyPlanForRep(user?.username || '', dayOfWeek);
    }, [user, dayOfWeek]);

    const allCurrentTasks = useMemo(() => {
        const actualTasks = [
            ...dailyPlan.retention.map((t: Lead) => ({ ...t, type: 'retention' as const })),
            ...customTasks
        ].slice(0, 3);

        // Add 2 placeholders if we have 3 or fewer tasks
        const placeholders = Array.from({ length: 2 }).map((_, i) => ({
            id: `placeholder-${i}`,
            name: "NOWY DO POZYSKANIA",
            city: "Baza zewnętrzna",
            person: "Czeka na przydział",
            phone: "-",
            email: "-",
            industry: "PROSPEKCJA",
            isPlaceholder: true,
            detail: "",
            companyAnalysis: "",
            purchaseHistory: "",
            suggestions: "",
            type: "new_lead" as const,
            assignedTo: user?.username || "",
            salesPotential: "",
            icebreaker: ""
        }));

        return [...actualTasks, ...placeholders];
    }, [dailyPlan, customTasks, user]);

    const activeLead = useMemo(() =>
        allCurrentTasks.find(l => l.id === selectedLeadId) ||
        rescheduledTasks.find(l => l.id === selectedLeadId),
        [selectedLeadId, allCurrentTasks, rescheduledTasks]);

    const updateStatus = (taskId: string, status: TaskStatus) => {
        if (status === 'postponed') {
            setShowDatePicker(true);
            return;
        }

        setTaskStatuses(prev => {
            const currentStatus = prev[taskId];
            const newStatus = currentStatus === status ? 'pending' : status;
            const next = { ...prev, [taskId]: newStatus };
            localStorage.setItem(`prescot_tasks_${user?.username}`, JSON.stringify(next));
            return next;
        });

        // Clean up postponed date if status changes
        const nextPDates = { ...postponedDates };
        delete nextPDates[taskId];
        setPostponedDates(nextPDates);
        localStorage.setItem(`prescot_postponed_dates_${user?.username}`, JSON.stringify(nextPDates));
    };

    const confirmPostpone = () => {
        if (!activeLead) return;
        const taskId = activeLead.id;

        // Update status
        setTaskStatuses(prev => {
            const next = { ...prev, [taskId]: 'postponed' as TaskStatus };
            localStorage.setItem(`prescot_tasks_${user?.username}`, JSON.stringify(next));
            return next;
        });

        // Update date
        const nextPDates = { ...postponedDates, [taskId]: selectedPostponeDate };
        setPostponedDates(nextPDates);
        localStorage.setItem(`prescot_postponed_dates_${user?.username}`, JSON.stringify(nextPDates));

        setShowDatePicker(false);
    };

    const saveNote = (taskId: string, note: string) => {
        setTaskNotes(prev => {
            const next = { ...prev, [taskId]: note };
            localStorage.setItem(`prescot_notes_${user?.username}`, JSON.stringify(next));
            return next;
        });
    };

    const formattedDate = currentDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
    const totalTasks = allCurrentTasks.length + rescheduledTasks.length;
    const successCount = Object.values(taskStatuses).filter(s => s === 'success').length;

    const renderTaskItem = (item: Lead & { isPlaceholder?: boolean }) => {
        const status = taskStatuses[item.id] || 'pending';
        const isActive = selectedLeadId === item.id;
        const isPlaceholder = item.isPlaceholder;

        return (
            <div
                key={item.id}
                className={`${styles.planItem} ${isActive ? styles.activeTask : ''} ${isPlaceholder ? styles.placeholderItem : ''}`}
                onClick={() => !isPlaceholder && setSelectedLeadId(item.id)}
            >
                <div className={styles.planInfo}>
                    <div className={styles.planName}>{item.name}</div>
                    <div className={styles.planDetail}>{item.city} | {item.person}</div>
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

    if (isPrezes) return null;

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
                        <div className={styles.statValue}>{totalTasks > 0 ? Math.round((successCount / totalTasks) * 100) : 0}%</div>
                        <div className={styles.statTrend}>Cel dzienny: {Math.min(successCount, 5)}/5</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <MessageSquare size={18} className={styles.statIconSuccess} />
                            <span className={styles.statLabel}>CRM</span>
                        </div>
                        <div className={styles.statValue}>{globalTotalContacts}</div>
                        <div className={styles.statTrend}>Łącznie w systemie (wszyscy)</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <Target size={18} className={styles.statIconAccent} />
                            <span className={styles.statLabel}>Skuteczność rozmów</span>
                        </div>
                        <div className={styles.statValue}>
                            {Object.values(taskStatuses).filter(s => s !== 'pending').length > 0
                                ? Math.round((successCount / Object.values(taskStatuses).filter(s => s !== 'pending').length) * 100)
                                : 0}%
                        </div>
                        <div className={styles.statTrend}>Sukcesy vs Wszystkie kontakty</div>
                    </div>
                </section>

                <section className={styles.contentGrid}>
                    <div className={styles.planSection}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionTitle}>
                                <ListTodo size={18} className={styles.todoIcon} />
                                TWOJE ZADANIA
                            </div>
                        </div>
                        <div className={styles.planList}>
                            {rescheduledTasks.length > 0 && (
                                <>
                                    <div className={`${styles.groupHeader} ${styles.rescheduledHeader}`}>KONTAKTY PRZEŁOŻONE</div>
                                    {rescheduledTasks.map(task => renderTaskItem(task))}
                                </>
                            )}
                            <div className={styles.groupHeader}>HARMONOGRAM BIEŻĄCY</div>
                            {allCurrentTasks.map(task => renderTaskItem(task))}
                        </div>
                    </div>

                    <div className={styles.rightCol}>
                        {activeLead ? (
                            <div className={styles.leadDetailCard}>
                                <div className={styles.detailHeader}>
                                    <div className={styles.companyInfo}>
                                        <h2>{activeLead.name}</h2>
                                        <span className={styles.industryTag}>{activeLead.industry}</span>
                                    </div>
                                    <div className={styles.statusBadge}>{activeLead.city}</div>
                                </div>

                                <div className={styles.contactGrid}>
                                    <a href={`tel:${activeLead.phone}`} className={styles.contactItem} title="Zadzwoń teraz">
                                        <div className={styles.contactIcon}><PhoneCall size={22} /></div>
                                        <div className={styles.contactData}>
                                            <span className={styles.contactLabel}>Telefon</span>
                                            <span className={styles.contactValue}>{activeLead.phone}</span>
                                        </div>
                                    </a>
                                    <a href={`mailto:${activeLead.email}?subject=Oferta Prescot - ${activeLead.name}`} className={styles.contactItem} title="Wyślij ofertę">
                                        <div className={styles.contactIcon}><Mail size={22} /></div>
                                        <div className={styles.contactData}>
                                            <span className={styles.contactLabel}>E-mail</span>
                                            <span className={styles.contactValue}>Wyślij ofertę</span>
                                        </div>
                                    </a>
                                </div>

                                <div className={styles.researchGrid}>
                                    <div className={styles.researchSection}>
                                        <label className={styles.crmLabel}>
                                            <Search size={16} className={styles.orangeIcon} />
                                            PROFIL BIZNESOWY (GOOGLE)
                                        </label>
                                        <div className={styles.aiInsightBox}>
                                            <p>{activeLead.companyAnalysis || 'Brak dodatkowych informacji.'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.crmSection}>
                                    <label className={styles.crmLabel}>
                                        <MessageSquare size={16} />
                                        NOTATKA Z ROZMOWY (CRM)
                                    </label>
                                    <textarea
                                        className={styles.premiumTextarea}
                                        placeholder="Wpisz tutaj ustalenia z klientem..."
                                        value={taskNotes[activeLead.id] || ''}
                                        onChange={(e) => saveNote(activeLead.id, e.target.value)}
                                    />
                                </div>

                                <div className={styles.outcomeActions}>
                                    <button
                                        onClick={() => updateStatus(activeLead.id, 'success')}
                                        className={`${styles.outcomeBtn} ${taskStatuses[activeLead.id] === 'success' ? styles.outcomeActiveSuccess : styles.outcomeSuccess}`}
                                    >
                                        <Check size={20} />
                                        <span>Współpraca</span>
                                    </button>
                                    <button
                                        onClick={() => updateStatus(activeLead.id, 'rejected')}
                                        className={`${styles.outcomeBtn} ${taskStatuses[activeLead.id] === 'rejected' ? styles.outcomeActiveRejected : styles.outcomeRejected}`}
                                    >
                                        <X size={20} />
                                        <span>Brak zainteresowania</span>
                                    </button>
                                    <button
                                        onClick={() => updateStatus(activeLead.id, 'postponed')}
                                        className={`${styles.outcomeBtn} ${taskStatuses[activeLead.id] === 'postponed' ? styles.outcomeActivePostponed : styles.outcomePostponed}`}
                                    >
                                        <Calendar size={20} />
                                        <span>Przełożone</span>
                                    </button>

                                    {showDatePicker && (
                                        <div className={styles.calendarPickerPopup}>
                                            <div className={styles.calendarHeader}>
                                                <h4>Wybierz termin ponownego kontaktu</h4>
                                                <button className={styles.calendarCloseBtn} onClick={() => setShowDatePicker(false)} title="Zamknij terminarz">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <input
                                                type="date"
                                                id="postpone-date-picker"
                                                title="Wybierz datę ponownego kontaktu"
                                                value={selectedPostponeDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setSelectedPostponeDate(e.target.value)}
                                                className={styles.calendarInput}
                                            />
                                            <div className={styles.calendarActions}>
                                                <button className={styles.calendarConfirmBtn} onClick={confirmPostpone}>ZAPLANUJ KONTAKT</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.leadDetailCard}>
                                <div className={styles.emptyLead}>
                                    <div className={styles.emptyIcon}><PieChart size={40} /></div>
                                    <p>Wybierz klienta z listy po lewej,<br />aby otworzyć portal CRM.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div >
    );
};

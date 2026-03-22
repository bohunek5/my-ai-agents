import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { REPS, getLeadById } from '../data/mockData';
import type { Lead } from '../data/mockData';
import {
    TrendingUp,
    MessageSquare,
    Search,
    History as HistoryIcon,
    ArrowLeft,
    Shield,
    BrainCircuit,
    RotateCcw,
    Contact
} from 'lucide-react';
import styles from './WeeklyPlan.module.css';
import { CrmCard } from '../components/CrmCard/CrmCard';
import { getCurrentISOWeek } from '../utils/dateUtils';
import type { WeeklyPlanDistribution } from '../utils/mastermindLogic';

interface TaskStatusMap {
    [key: string]: 'success' | 'rejected' | 'postponed' | 'pending';
}

interface HistorySnapshot {
    weekId: string;
    description: string;
    timestamp: string;
    mastermindPlan: WeeklyPlanDistribution;
    taskStatuses: Record<string, TaskStatusMap>;
    taskNotes: Record<string, Record<string, string>>;
    presidentNotes: Record<string, string>;
}

export const WeeklyPlan: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedRep, setSelectedRep] = useState(() => {
        if (user?.role === 'handlowiec') return user.username;
        return REPS[0].id;
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [generationReport, setGenerationReport] = useState<string | null>(null);
    const [viewingHistory, setViewingHistory] = useState<HistorySnapshot | null>(null);

    const [history, setHistory] = useState<HistorySnapshot[]>(() => {
        try {
            const saved = localStorage.getItem('prescot_history');
            const parsed = saved ? JSON.parse(saved) : [];
            if (parsed.length === 0) {
                return [
                    {
                        weekId: "11",
                        description: "Plan z tygodnia 11 (Brak danych)",
                        timestamp: "Archiwum",
                        mastermindPlan: { reps: {}, metadata: { generatedAt: "", rotationOffset: 0, report: "" } },
                        taskStatuses: {},
                        taskNotes: {},
                        presidentNotes: {}
                    },
                    {
                        weekId: "10",
                        description: "Plan z tygodnia 10 (Brak danych)",
                        timestamp: "Archiwum",
                        mastermindPlan: { reps: {}, metadata: { generatedAt: "", rotationOffset: 0, report: "" } },
                        taskStatuses: {},
                        taskNotes: {},
                        presidentNotes: {}
                    }
                ];
            }
            return parsed;
        } catch { return []; }
    });

    const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatusMap>>(() => {
        const allStatuses: Record<string, TaskStatusMap> = {};
        REPS.forEach(rep => {
            const saved = localStorage.getItem(`prescot_tasks_${rep.id}`);
            if (saved) allStatuses[rep.id] = JSON.parse(saved);
        });
        return allStatuses;
    });

    const [taskNotes, setTaskNotes] = useState<Record<string, Record<string, string>>>(() => {
        const allNotes: Record<string, Record<string, string>> = {};
        REPS.forEach(rep => {
            const saved = localStorage.getItem(`prescot_notes_${rep.id}`);
            if (saved) allNotes[rep.id] = JSON.parse(saved);
        });
        return allNotes;
    });

    const [presidentNotes, setPresidentNotes] = useState<Record<string, string>>(() => {
        try {
            const saved = localStorage.getItem('prescot_president_notes');
            return saved ? JSON.parse(saved) : {};
        } catch { return {}; }
    });

    const [mastermindDirectives, setMastermindDirectives] = useState<Record<string, string>>(() => {
        try {
            const saved = localStorage.getItem('prescot_mastermind_directives');
            return saved ? JSON.parse(saved) : {};
        } catch { return {}; }
    });
    const [activeNote, setActiveNote] = useState<{ id: string, name: string, note: string, repId: string, pNote: string, mmDirective: string } | null>(null);
    const [postponedDates, setPostponedDates] = useState<Record<string, Record<string, string>>>(() => {
        const all: Record<string, Record<string, string>> = {};
        REPS.forEach(rep => {
            const saved = localStorage.getItem(`prescot_postponed_dates_${rep.id}`);
            if (saved) all[rep.id] = JSON.parse(saved);
        });
        return all;
    });

    const [mastermindPlan, setMastermindPlan] = useState<WeeklyPlanDistribution>(() => {
        const saved = localStorage.getItem('prescot_mastermind_plan');
        return saved ? JSON.parse(saved) : { reps: {}, metadata: { generatedAt: "", rotationOffset: 0, report: "" } };
    });

    const days = useMemo(() => ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'], []);

    const closeModal = useCallback(() => {
        setActiveNote(null);
    }, []);

    useEffect(() => {
        const checkAutoMaintenance = async () => {
            const now = new Date();
            const day = now.getDay(); // 0-Sunday, 6-Saturday
            const currentWeek = getCurrentISOWeek();
            const lastSnapshotWeek = localStorage.getItem('prescot_last_auto_snapshot_week');
            const lastGenWeek = localStorage.getItem('prescot_last_auto_gen_week');

            // Saturday Morning: Auto-Snapshot
            if (day === 6 && lastSnapshotWeek !== currentWeek) {
                // Check if there was any progress
                const hasProgress = Object.values(taskStatuses).some(repTasks => 
                    Object.values(repTasks).some(s => s !== 'pending')
                ) || Object.values(taskNotes).some(repNotes => 
                    Object.values(repNotes).some(n => n.trim().length > 0)
                );

                if (hasProgress && Object.keys(mastermindPlan.reps || {}).length > 0) {
                    const snapshot: HistorySnapshot = {
                        weekId: currentWeek,
                        description: `Automatyczny zapis tygodnia ${currentWeek}`,
                        timestamp: new Date().toLocaleString(),
                        mastermindPlan,
                        taskStatuses,
                        taskNotes,
                        presidentNotes
                    };
                    const saved = localStorage.getItem('prescot_history');
                    const nextHistory = [snapshot, ...(saved ? JSON.parse(saved) : [])].slice(0, 50);
                    localStorage.setItem('prescot_history', JSON.stringify(nextHistory));
                    setHistory(nextHistory);
                    localStorage.setItem('prescot_last_auto_snapshot_week', currentWeek);
                    console.log("Auto-snapshot created for Saturday.");
                }
            }

            // Sunday: Auto-Generate if empty
            if (day === 0 && lastGenWeek !== currentWeek) {
                const hasPlan = Object.keys(mastermindPlan.reps || {}).length > 0;
                if (!hasPlan && (user?.role === 'admin' || user?.role === 'prezes')) {
                    const { runMastermindAnalysis } = await import('../utils/mastermindLogic');
                    const { plan } = runMastermindAnalysis();
                    setMastermindPlan(plan);
                    localStorage.setItem('prescot_mastermind_plan', JSON.stringify(plan));
                    localStorage.setItem('prescot_last_auto_gen_week', currentWeek);
                    window.dispatchEvent(new StorageEvent('storage', { key: 'prescot_mastermind_plan' }));
                    console.log("Auto-plan generated for Sunday.");
                }
            }
        };

        const refreshAll = () => {
            const allStatuses: Record<string, TaskStatusMap> = {};
            const allNotes: Record<string, Record<string, string>> = {};
            REPS.forEach(rep => {
                const sSaved = localStorage.getItem(`prescot_tasks_${rep.id}`);
                if (sSaved) allStatuses[rep.id] = JSON.parse(sSaved);
                const nSaved = localStorage.getItem(`prescot_notes_${rep.id}`);
                if (nSaved) allNotes[rep.id] = JSON.parse(nSaved);
            });
            const pSaved = localStorage.getItem('prescot_president_notes');
            if (pSaved) setPresidentNotes(JSON.parse(pSaved));

            const allPostponed: Record<string, Record<string, string>> = {};
            REPS.forEach(rep => {
                const pdSaved = localStorage.getItem(`prescot_postponed_dates_${rep.id}`);
                if (pdSaved) allPostponed[rep.id] = JSON.parse(pdSaved);
            });
            setPostponedDates(allPostponed);
            setTaskStatuses(allStatuses);
            setTaskNotes(allNotes);

            const mmSaved = localStorage.getItem('prescot_mastermind_plan');
            if (mmSaved) {
                setMastermindPlan(JSON.parse(mmSaved));
            }
        };

        checkAutoMaintenance();
        window.addEventListener('storage', refreshAll);
        const poll = setInterval(refreshAll, 5000);

        return () => {
            window.removeEventListener('storage', refreshAll);
            clearInterval(poll);
        };
    }, [mastermindPlan, taskStatuses, taskNotes, presidentNotes, user]);

    // Derived values for easy consumption throughout the component
    const effectiveMMPlan = viewingHistory ? viewingHistory.mastermindPlan : mastermindPlan;
    const effectiveStatuses = viewingHistory ? viewingHistory.taskStatuses : taskStatuses;
    const effectiveNotes = viewingHistory ? viewingHistory.taskNotes : taskNotes;
    const effectivePNotes = viewingHistory ? viewingHistory.presidentNotes : presidentNotes;

    const getPlanForDay = useCallback((repId: string, day: string) => {
        const mmPlanIds: string[] = effectiveMMPlan.reps?.[repId]?.[day] || [];

        if (mmPlanIds.length > 0) {
            const mmLeads = mmPlanIds.map((id: string) => getLeadById(id)).filter(Boolean) as Lead[];
            return { retention: mmLeads };
        }

        // Brak planu = puste dymki (nie ma fallbacku do base planu)
        return { retention: [] as Lead[] };
    }, [effectiveMMPlan]);


    const calculateDailyProgress = useCallback((repId: string, day: string) => {
        const plan = getPlanForDay(repId, day);
        const target = plan.retention.length || 5;
        const repTasks = effectiveStatuses[repId] || {};
        const completed = [...plan.retention].filter(t =>
            repTasks[t.id] && repTasks[t.id] !== 'pending'
        ).length;
        return target > 0 ? Math.round((completed / target) * 100) : 0;
    }, [effectiveStatuses, getPlanForDay]);

    const hasCRMNote = (repId: string, taskId: string) => {
        const notes = effectiveNotes[repId] || {};
        return !!notes[taskId] && notes[taskId].trim().length > 0;
    };

    const hasPresidentNote = (repId: string, taskId: string) => {
        return !!effectivePNotes[`${repId}_${taskId}`] && effectivePNotes[`${repId}_${taskId}`].trim().length > 0;
    };

    const openCRM = (repId: string, taskId: string, leadName: string) => {
        const notes = effectiveNotes[repId] || {};
        const note = notes[taskId] || "";
        const pNote = effectivePNotes[`${repId}_${taskId}`] || "";
        const mmDirective = mastermindDirectives[`${repId}_${taskId}`] || "";
        setActiveNote({ id: taskId, name: leadName, note, repId, pNote, mmDirective });
    };

    const updateNote = (newNote: string) => {
        if (!activeNote || user?.role === 'admin' || user?.role === 'prezes') return;
        const { id, repId } = activeNote;
        const currentRepNotes = taskNotes[repId] || {};
        const nextNotes = { ...currentRepNotes, [id]: newNote };
        setTaskNotes(prev => ({ ...prev, [repId]: nextNotes }));
        localStorage.setItem(`prescot_notes_${repId}`, JSON.stringify(nextNotes));
        setActiveNote(prev => prev ? { ...prev, note: newNote } : null);
    };

    const updatePresidentNote = (newPNote: string) => {
        if (!activeNote) return;
        const key = `${activeNote.repId}_${activeNote.id}`;
        const nextPNotes = { ...presidentNotes, [key]: newPNote };
        setPresidentNotes(nextPNotes);
        localStorage.setItem('prescot_president_notes', JSON.stringify(nextPNotes));
        setActiveNote(prev => prev ? { ...prev, pNote: newPNote } : null);
    };

    const setTaskStatus = (status: 'success' | 'postponed' | 'rejected' | 'pending') => {
        if (!activeNote) return;
        const { id, repId } = activeNote;

        setTaskStatuses(prev => {
            const currentRepTasks = prev[repId] || {};
            const currentStatus = currentRepTasks[id];
            const nextStatus = currentStatus === status ? 'pending' : status;

            const nextStatuses: TaskStatusMap = { ...currentRepTasks, [id]: nextStatus };
            const nextStyles = { ...prev, [repId]: nextStatuses };
            localStorage.setItem(`prescot_tasks_${repId}`, JSON.stringify(nextStatuses));

            // Jeśli status zmienia się na inny niż 'postponed', usuwamy datę z terminarza dla tego handlowca
            if (nextStatus !== 'postponed') {
                setPostponedDates(prevPD => {
                    const repPD = prevPD[repId] || {};
                    if (!repPD[id]) return prevPD;
                    const nextRepPD = { ...repPD };
                    delete nextRepPD[id];
                    const nextAllPD = { ...prevPD, [repId]: nextRepPD };
                    localStorage.setItem(`prescot_postponed_dates_${repId}`, JSON.stringify(nextRepPD));
                    window.dispatchEvent(new StorageEvent('storage', {
                        key: `prescot_postponed_dates_${repId}`,
                        newValue: JSON.stringify(nextRepPD)
                    }));
                    return nextAllPD;
                });
            }

            return nextStyles;
        });
    };

    const resetAllProgress = () => {
        setShowResetConfirm(true);
    };

    const performReset = async () => {
        setShowResetConfirm(false);
        const { resetMastermindRotation } = await import('../utils/mastermindLogic');
        resetMastermindRotation();

        // NUCLEAR RESET: Clear everything
        const keysToClear = [
            'prescot_president_notes',
            'prescot_mastermind_plan',
            'prescot_history'
        ];

        // Clear for all reps
        REPS.forEach(rep => {
            keysToClear.push(`prescot_tasks_${rep.id}`);
            keysToClear.push(`prescot_notes_${rep.id}`);
            keysToClear.push(`prescot_postponed_dates_${rep.id}`);
        });

        keysToClear.forEach(key => localStorage.removeItem(key));

        setHistory([]);
        setViewingHistory(null);

        setTaskStatuses({});
        setTaskNotes({});
        setPresidentNotes({});
        setMastermindDirectives({});
        setMastermindPlan({ reps: {}, metadata: { generatedAt: "", rotationOffset: 0, report: "" } });
        setPostponedDates({});

        //* Cleaned up CSS */
        // Force reload and clear cache-like states
        window.location.href = window.location.origin + window.location.pathname;
    };

    const strategicInsights = useMemo(() => {
        const repId = selectedRep;
        const fixedWeeklyTarget = 25;
        const completedCount = Object.values(effectiveStatuses[repId] || {}).filter(s => s !== 'pending').length;
        const weekProgress = Math.round((completedCount / fixedWeeklyTarget) * 100);

        let totalContacts = 0;
        REPS.forEach(rep => {
            const notes = effectiveNotes[rep.id] || {};
            totalContacts += Object.values(notes).filter(n => (n as string).trim().length > 0).length;
        });

        return { weekProgress, totalCalls: fixedWeeklyTarget, completedCalls: completedCount, totalContacts };
    }, [selectedRep, effectiveStatuses, effectiveNotes]);


    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleUlozPlan = async () => {
        // Reset check: If this is Sunday, we can generate a fresh one.
        // If mid-week, we only snapshot if there was actual work (notes or statuses).
        const hasProgress = Object.values(taskStatuses).some(repTasks => 
            Object.values(repTasks).some(s => s !== 'pending')
        ) || Object.values(taskNotes).some(repNotes => 
            Object.values(repNotes).some(n => n.trim().length > 0)
        );

        if (hasProgress && Object.keys(mastermindPlan.reps || {}).length > 0) {
            const snapshot: HistorySnapshot = {
                weekId: getCurrentISOWeek(),
                description: `Manualny zapis tygodnia ${getCurrentISOWeek()}`,
                timestamp: new Date().toLocaleString(),
                mastermindPlan,
                taskStatuses,
                taskNotes,
                presidentNotes
            };
            const nextHistory = [snapshot, ...history].slice(0, 50);
            setHistory(nextHistory);
            localStorage.setItem('prescot_history', JSON.stringify(nextHistory));
        }

        setIsAnalyzing(true);
        const { runMastermindAnalysis } = await import('../utils/mastermindLogic');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const { directives, plan } = runMastermindAnalysis();

        const newDirectives = { ...mastermindDirectives };
        directives.forEach(res => {
            const key = `${res.repId}_${res.clientId}`;
            newDirectives[key] = res.directive;
        });
        setMastermindDirectives(newDirectives);
        localStorage.setItem('prescot_mastermind_directives', JSON.stringify(newDirectives));

        setMastermindPlan(plan);
        localStorage.setItem('prescot_mastermind_plan', JSON.stringify(plan));
        window.dispatchEvent(new StorageEvent('storage', { key: 'prescot_mastermind_plan' }));

        setIsAnalyzing(false);
        setGenerationReport(plan.metadata?.report || "Plan wygenerowany pomyślnie.");
    };


    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-main">
                <div className={styles.auroraBg}></div>
                {Object.keys(mastermindPlan).length > 0 && (
                    <div className={styles.mmBadge}>
                        <BrainCircuit size={14} />
                        AGENT MASTERMIND: TYDZIEŃ ZAPLANOWANY
                    </div>
                )}

                <header className={styles.header}>
                    <div className={styles.titleSection}>
                        <div className={styles.prestigeTag}>SYSTEM ZARZĄDZANIA SPRZEDAŻĄ</div>
                        <h1 className={styles.title}>Panel Zarządzania: Plan Tygodniowy</h1>
                        <p className={styles.subtitle}>Strategiczna analiza operacji handlowych w czasie rzeczywistym</p>
                    </div>

                    <div className={styles.headerActions}>
                        <div className={styles.searchBar}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Szukaj klienta w planie..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            className={styles.historyBtnManual} 
                            onClick={() => setShowHistoryModal(true)}
                        >
                            <HistoryIcon size={18} /> HISTORIA PLANÓW
                        </button>
                        {(user?.role === 'admin' || user?.role === 'prezes') && (
                            <>
                                <button
                                    className={`${styles.mastermindBtn} ${isAnalyzing ? styles.analyzing : ''}`}
                                    onClick={handleUlozPlan}
                                    disabled={isAnalyzing}
                                >
                                    <BrainCircuit size={18} className={isAnalyzing ? styles.spin : ''} />
                                    {isAnalyzing ? 'ANALIZUJĘ DANE ERP...' : 'UŁÓŻ PLAN TYGODNIA'}
                                </button>
                                <button className={`${styles.exportBtn} ${styles.resetBtn}`} onClick={resetAllProgress} disabled={isAnalyzing}>
                                    <RotateCcw size={18} /> RESET
                                </button>
                            </>
                        )}
                    </div>
                </header>

                {viewingHistory && (
                    <div className={styles.historyContextBar}>
                        <div className={styles.liveBadge}>TRYB PODGLĄDU HISTORII</div>
                        <span>Przeglądasz: <strong>{viewingHistory.description}</strong> ({viewingHistory.timestamp})</span>
                        <button className={styles.backToLiveBtn} onClick={() => setViewingHistory(null)}>
                            <ArrowLeft size={16} /> POWRÓT DO AKTUALNEGO PLANU
                        </button>
                    </div>
                )}


                <section className={styles.strategicGrid}>
                    <div className={`${styles.insightCard} glass`}>
                        <div className={styles.insightHeader}>
                            <div className={styles.insightIcon}><TrendingUp size={24} /></div>
                            <span className={styles.insightLabel}>PROGRES TYGODNIA</span>
                        </div>
                        <div className={styles.insightValue}>{strategicInsights.weekProgress}%</div>
                        <div className={styles.progressBarWrapper}>
                            <div
                                className={styles.progressBarFill}
                                style={{ '--progress': `${strategicInsights.weekProgress}%` } as React.CSSProperties}
                            ></div>
                        </div>
                    </div>

                    <div className={`${styles.insightCard} glass`}>
                        <div className={styles.insightHeader}>
                            <div className={styles.insightIcon}><Contact size={24} /></div>
                            <span className={styles.insightLabel}>KONTAKTY CRM</span>
                        </div>
                        <div className={styles.insightValue}>{strategicInsights.totalContacts}</div>
                        <div className={styles.insightSubtext}>Łączna liczba wpisów w bazie</div>
                    </div>

                    <div className={`${styles.insightCard} ${styles.ceoTile} glass spotlight`} onClick={() => navigate('/strategy')}>
                        <div className={styles.insightHeader}>
                            <div className={styles.insightIcon}><BrainCircuit size={24} /></div>
                            <span className={styles.insightLabel}>ANALIZA STRATEGICZNA</span>
                        </div>
                        <div className={styles.insightValue}>OPEN</div>
                        <div className={styles.insightSubtext}>Briefing AI Agent Pipeline</div>
                    </div>
                </section>

                <div className={styles.navContainer}>
                    <nav className={styles.repNav}>
                        {REPS.map(rep =>
                            <button
                                key={rep.id}
                                className={`${styles.repNavItem} ${selectedRep === rep.id && !viewingHistory ? styles.repNavActive : ''}`}
                                onClick={() => {
                                    setSelectedRep(rep.id);
                                    setViewingHistory(null);
                                }}
                            >
                                <Contact size={16} />
                                <span>{rep.name}</span>
                            </button>
                        )}
                    </nav>
                </div>

                <div className={`${styles.dashboardContainer} glass`}>
                    <div className={styles.tableHeader}>
                        <div className={styles.colDay}>Harmonogram</div>
                        <div className={styles.colLeads}>Klienci Stali</div>
                        <div className={styles.colLeads}>Akwizycja</div>
                        <div className={styles.colProgress}>Efektywność</div>
                    </div>

                    <div className={styles.planRows}>
                        {(!effectiveMMPlan.reps?.[selectedRep] || Object.keys(effectiveMMPlan.reps[selectedRep]).length === 0) ? (
                            <div className={styles.emptyPlanPlaceholder}>
                                <div className={styles.emptyPlanIcon}>📅</div>
                                {user?.role === 'handlowiec' ? (
                                    <>
                                        <div className={styles.emptyPlanTitle}>Plan tygodnia nie został wygenerowany</div>
                                        <div className={styles.emptyPlanSub}>Poczekaj aż prezes wygeneruje plan na ten tydzień.</div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.emptyPlanTitle}>Wygeneruj Plan Tygodnia</div>
                                        <div className={styles.emptyPlanSub}>Kliknij przycisk „Ułóż Plan Tygodnia" aby AI przydzieliło klientów na każdy dzień tygodnia.</div>
                                    </>
                                )}
                            </div>
                        ) : (
                            days.map((day: string, idx: number) => {
                                const plan = getPlanForDay(selectedRep, day);
                                const progress = calculateDailyProgress(selectedRep, day);

                                const now = new Date();
                                const monday = new Date(now);
                                const currentDay = now.getDay();
                                const diff = (currentDay === 0 ? -6 : 1) - currentDay;
                                monday.setDate(now.getDate() + diff);
                                const targetDate = new Date(monday);
                                targetDate.setDate(monday.getDate() + idx);
                                const targetISO = targetDate.toISOString().split('T')[0];

                                const scheduledForDay = Object.entries(postponedDates[selectedRep] || {})
                                    .filter(([, date]) => date === targetISO)
                                    .map(([id]) => getLeadById(id))
                                    .filter(Boolean);

                                return (
                                    <div key={day} className={styles.dayRow}>
                                        <div className={styles.dayIndicator}>
                                            <div className={styles.dayLabel}>{day}</div>
                                            <div className={styles.daySubLabel}>{targetISO}</div>
                                        </div>

                                        <div className={styles.leadsGroup}>
                                            {plan.retention.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.city.toLowerCase().includes(searchTerm.toLowerCase())).map(lead => {
                                                const status = effectiveStatuses[selectedRep]?.[lead.id];
                                                const chipClass = status === 'success' ? styles.successChip : status === 'postponed' ? styles.postponedChip : status === 'rejected' ? styles.rejectedChip : '';
                                                return (
                                                    <div key={lead.id} className={styles.leadChipContainer}>
                                                        <div className={`${styles.leadChip} ${chipClass}`} onClick={() => openCRM(selectedRep, lead.id, lead.name)}>
                                                            <div className={styles.leadChipTop}><span className={styles.leadChipName}>{lead.name}</span></div>
                                                            <div className={styles.leadChipBottom}>
                                                                <div className={styles.leadChipCitySection}>
                                                                    <span className={styles.leadChipCity}>{lead.city}</span>
                                                                    {hasCRMNote(selectedRep, lead.id) && <MessageSquare size={12} className={styles.crmLoggedIcon} />}
                                                                    {hasPresidentNote(selectedRep, lead.id) && <Shield size={12} className={styles.presidentNoteIcon} />}
                                                                    {user?.role === 'prezes' && hasPresidentNote(selectedRep, lead.id) && (
                                                                        <span className={styles.pNoteSnippet}>{effectivePNotes[`${selectedRep}_${lead.id}`].substring(0, 15)}...</span>
                                                                    )}
                                                                </div>
                                                                <div className={styles.leadChipIcons}>
                                                                    {hasCRMNote(selectedRep, lead.id) && <MessageSquare size={12} className={styles.crmLoggedIcon} />}
                                                                    {hasPresidentNote(selectedRep, lead.id) && <Shield size={12} className={styles.presidentNoteIcon} />}
                                                                </div>
                                                            </div>
                                                            {status && status !== 'pending' && (
                                                                <div className={`${styles.crmStatusBar} ${status === 'success' ? styles.crmStatusGreen : status === 'postponed' ? styles.crmStatusYellow : styles.crmStatusRed}`} />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {scheduledForDay.map(lead => {
                                                const sStatus = taskStatuses[selectedRep]?.[lead!.id];
                                                // Kolor chipu: żółty (przeniesiony), zielony (sukces), czerwony (odrzucony)
                                                const sChipCls = sStatus === 'success'
                                                    ? styles.successChip
                                                    : sStatus === 'rejected'
                                                        ? styles.rejectedChip
                                                        : styles.scheduledLeadChip; // domyślnie żółty
                                                return (
                                                    <div key={`sched-${lead!.id}`} className={styles.leadChipContainer}>
                                                        <div className={`${styles.leadChip} ${sChipCls}`} onClick={() => openCRM(selectedRep, lead!.id, lead!.name)}>
                                                            <div className={styles.leadChipTop}>
                                                                <span className={styles.leadChipName}>{lead!.name}</span>
                                                                <span className={styles.scheduledBadge}>
                                                                    {sStatus === 'success' ? '✓ ZREALIZOWANY' : sStatus === 'rejected' ? '✗ ODRZUCONY' : '📅 PRZENIESIONY'}
                                                                </span>
                                                            </div>
                                                            <div className={styles.leadChipBottom}><span className={styles.leadChipCity}>{lead!.city}</span></div>
                                                            {sStatus && sStatus !== 'pending' && (
                                                                <div className={`${styles.crmStatusBar} ${sStatus === 'success' ? styles.crmStatusGreen : sStatus === 'postponed' ? styles.crmStatusYellow : styles.crmStatusRed}`} />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className={styles.leadsGroup}>
                                            {[1, 2].map((_, i) => (
                                                <div key={`new-${day}-${i}`} className={styles.leadChipContainer}>
                                                    <div className={`${styles.leadChip} ${styles.newLeadChip}`}>
                                                        <div className={styles.leadChipTop}><span className={styles.leadChipName}>NOWY KLIENT</span></div>
                                                        <div className={styles.leadChipBottom}><span className={styles.leadChipCity}>PROSPEKCJA</span></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={styles.progressMetric}><div className={styles.metricRing}>{progress}%</div></div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {activeNote && getLeadById(activeNote.id) && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div onClick={e => e.stopPropagation()}>
                            <CrmCard
                                lead={getLeadById(activeNote.id)!}
                                repNote={activeNote.note}
                                onRepNoteChange={updateNote}
                                presidentNote={activeNote.pNote}
                                onPresidentNoteChange={updatePresidentNote}
                                mastermindDirective={activeNote.mmDirective}
                                isPresidentView={user?.role === 'admin' || user?.role === 'prezes'}
                                taskStatus={effectiveStatuses[activeNote.repId]?.[activeNote.id]}
                                onSetTaskStatus={setTaskStatus}
                                onClose={closeModal}
                                isReadOnly={!!viewingHistory}
                            />
                        </div>
                    </div>                )}
            </main>
            {showResetConfirm && (
                <div className={styles.confirmOverlay}>
                    <div className={styles.confirmBox}>
                        <h3>⚠️ Resetuj System</h3>
                        <p>Czy na pewno chcesz zresetować wszystkie postępy, wytyczne i plan Masterminda? Tej operacji nie można cofnąć.</p>
                        <div className={styles.confirmBtns}>
                            <button className={styles.confirmNo} onClick={() => setShowResetConfirm(false)}>Anuluj</button>
                            <button className={styles.confirmYes} onClick={performReset}>TAK, RESETUJ</button>
                        </div>
                    </div>
                </div>
            )}

            {showHistoryModal && (
                <div className={styles.confirmOverlay} onClick={() => setShowHistoryModal(false)}>
                    <div className={styles.historyModal} onClick={e => e.stopPropagation()}>
                        <div className={styles.historyModalHeader}>
                            <h3>🗄️ Historia Planów</h3>
                            <button className={styles.closeModalBtn} onClick={() => setShowHistoryModal(false)}>✕</button>
                        </div>
                        <div className={styles.historyList}>
                            {history.length === 0 ? (
                                <p className={styles.emptyHistoryText}>Brak zapisanego archiwum.</p>
                            ) : (
                                history.map((snap, idx) => (
                                    <div 
                                        key={snap.weekId + idx} 
                                        className={`${styles.historyCard} ${viewingHistory?.timestamp === snap.timestamp ? styles.activeHistoryCard : ''}`}
                                        onClick={() => {
                                            setViewingHistory(snap);
                                            setShowHistoryModal(false);
                                        }}
                                    >
                                        <div className={styles.historyCardTitle}>{snap.description}</div>
                                        <div className={styles.historyCardMeta}>{snap.timestamp}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {generationReport && (
                <div className={styles.confirmOverlay}>
                    <div className={styles.reportBox}>
                        <div className={styles.reportIcon}><BrainCircuit size={32} /></div>
                        <h3>ANALIZA ZAKOŃCZONA</h3>
                        <p>{generationReport}</p>
                        <button className={styles.confirmYes} onClick={() => setGenerationReport(null)}>Zrozumiałem</button>
                    </div>
                </div>
            )}
        </div>
    );
};

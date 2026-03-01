import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { REPS, getLeadById } from '../data/mockData';
import type { Lead } from '../data/mockData';
import {
    BrainCircuit,
    TrendingUp,
    Contact,
    Download,
    MessageSquare,
    RotateCcw,
    Search,
    Shield
} from 'lucide-react';
import styles from './WeeklyPlan.module.css';
import { CrmCard } from '../components/CrmCard/CrmCard';

interface TaskStatusMap {
    [key: string]: 'success' | 'rejected' | 'postponed' | 'pending';
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
        const saved = localStorage.getItem('prescot_president_notes');
        return saved ? JSON.parse(saved) : {};
    });

    const [activeNote, setActiveNote] = useState<{ id: string, name: string, note: string, repId: string, pNote: string } | null>(null);
    const [postponedDates, setPostponedDates] = useState<Record<string, Record<string, string>>>(() => {
        const all: Record<string, Record<string, string>> = {};
        REPS.forEach(rep => {
            const saved = localStorage.getItem(`prescot_postponed_dates_${rep.id}`);
            if (saved) all[rep.id] = JSON.parse(saved);
        });
        return all;
    });

    const [mastermindPlan, setMastermindPlan] = useState<{ reps: Record<string, Record<string, string[]>>, metadata?: { generatedAt: string, rotationOffset: number } }>(() => {
        const saved = localStorage.getItem('prescot_mastermind_plan');
        return saved ? JSON.parse(saved) : { reps: {} };
    });

    const days = useMemo(() => ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'], []);

    const closeModal = useCallback(() => {
        setActiveNote(null);
    }, []);

    useEffect(() => {
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

            // Kluczowe: odśwież mastermindPlan żeby handlowiec widział plan wygenerowany przez prezesa
            const mmSaved = localStorage.getItem('prescot_mastermind_plan');
            if (mmSaved) {
                setMastermindPlan(JSON.parse(mmSaved));
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('storage', refreshAll);
        window.addEventListener('keydown', handleEsc);

        // Polling co 5s dla handlowca – synchronizuje plan bez reloadu strony
        const poll = setInterval(refreshAll, 5000);

        return () => {
            window.removeEventListener('storage', refreshAll);
            window.removeEventListener('keydown', handleEsc);
            clearInterval(poll);
        };
    }, [closeModal]);

    const getPlanForDay = useCallback((repId: string, day: string) => {
        const mmPlanIds: string[] = mastermindPlan.reps?.[repId]?.[day] || [];

        if (mmPlanIds.length > 0) {
            const mmLeads = mmPlanIds.map((id: string) => getLeadById(id)).filter(Boolean) as Lead[];
            return { retention: mmLeads };
        }

        // Brak planu = puste dymki (nie ma fallbacku do base planu)
        return { retention: [] as Lead[] };
    }, [mastermindPlan]);


    const calculateDailyProgress = useCallback((repId: string, day: string) => {
        const plan = getPlanForDay(repId, day);
        const target = plan.retention.length || 5;
        const repTasks = taskStatuses[repId] || {};
        const completed = [...plan.retention].filter(t =>
            repTasks[t.id] && repTasks[t.id] !== 'pending'
        ).length;
        return target > 0 ? Math.round((completed / target) * 100) : 0;
    }, [taskStatuses, getPlanForDay]);

    const hasCRMNote = (repId: string, taskId: string) => {
        const notes = taskNotes[repId] || {};
        return !!notes[taskId] && notes[taskId].trim().length > 0;
    };

    const hasPresidentNote = (repId: string, taskId: string) => {
        return !!presidentNotes[`${repId}_${taskId}`] && presidentNotes[`${repId}_${taskId}`].trim().length > 0;
    };

    const openCRM = (repId: string, taskId: string, leadName: string) => {
        const notes = taskNotes[repId] || {};
        const note = notes[taskId] || "";
        const pNote = presidentNotes[`${repId}_${taskId}`] || "";
        setActiveNote({ id: taskId, name: leadName, note, repId, pNote });
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
            'prescot_contact_history',
            'prescot_mastermind_plan'
        ];

        // Clear for all reps
        REPS.forEach(rep => {
            keysToClear.push(`prescot_tasks_${rep.id}`);
            keysToClear.push(`prescot_notes_${rep.id}`);
            keysToClear.push(`prescot_postponed_dates_${rep.id}`);
        });

        keysToClear.forEach(key => localStorage.removeItem(key));

        setTaskStatuses({});
        setTaskNotes({});
        setPresidentNotes({});
        setMastermindPlan({ reps: {} });
        setPostponedDates({});

        // Force reload and clear cache-like states
        window.location.href = window.location.origin + window.location.pathname;
    };

    const strategicInsights = useMemo(() => {
        const repId = selectedRep;
        const fixedWeeklyTarget = 25;
        const completedCount = Object.values(taskStatuses[repId] || {}).filter(s => s !== 'pending').length;
        const weekProgress = Math.round((completedCount / fixedWeeklyTarget) * 100);

        let totalContacts = 0;
        REPS.forEach(rep => {
            const saved = localStorage.getItem(`prescot_notes_${rep.id}`);
            if (saved) {
                const notes = JSON.parse(saved);
                totalContacts += Object.values(notes).filter(n => (n as string).trim().length > 0).length;
            }
        });

        return { weekProgress, totalCalls: fixedWeeklyTarget, completedCalls: completedCount, totalContacts };
    }, [selectedRep, taskStatuses]);


    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleUlozPlan = async () => {
        setIsAnalyzing(true);
        const { runMastermindAnalysis } = await import('../utils/mastermindLogic');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const { directives, plan } = runMastermindAnalysis();

        // 1. Update President Notes (Directives)
        const newPresidentNotes = { ...presidentNotes };
        directives.forEach(res => {
            const key = `${res.repId}_${res.clientId}`;
            if (!newPresidentNotes[key] || newPresidentNotes[key].includes('QUICK WIN') || newPresidentNotes[key].includes('CHURN') || newPresidentNotes[key].includes('REGRESJA')) {
                newPresidentNotes[key] = res.directive;
            }
        });
        setPresidentNotes(newPresidentNotes);
        localStorage.setItem('prescot_president_notes', JSON.stringify(newPresidentNotes));

        // 2. Update Weekly Plan Distribution
        setMastermindPlan(plan);
        localStorage.setItem('prescot_mastermind_plan', JSON.stringify(plan));
        // Rozgłoś zmianę dla handlowców w tej samej przeglądarce
        window.dispatchEvent(new StorageEvent('storage', { key: 'prescot_mastermind_plan' }));

        setIsAnalyzing(false);
        alert(`AGENT MASTERMIND ZAKOŃCZYŁ ANALIZĘ.\n\nWygenerowano ${directives.length} nowych wytycznych oraz ułożono optymalny plan (3 firmy dziennie) dla każdego handlowca.\n\nSprawdź harmonogram!`);
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
                        <button className={styles.exportBtn} onClick={() => alert('Generowanie raportu...')}>
                            <Download size={18} /> EKSPORT XLSX
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

                <nav className={styles.repNav}>
                    {REPS.map(rep =>
                        <button
                            key={rep.id}
                            className={`${styles.repNavItem} ${selectedRep === rep.id ? styles.repNavActive : ''}`}
                            onClick={() => setSelectedRep(rep.id)}
                        >
                            <Contact size={16} />
                            <span>{rep.name}</span>
                        </button>
                    )}
                </nav>

                <div className={`${styles.dashboardContainer} glass`}>
                    <div className={styles.tableHeader}>
                        <div className={styles.colDay}>Harmonogram</div>
                        <div className={styles.colLeads}>Klienci Stali</div>
                        <div className={styles.colLeads}>Akwizycja</div>
                        <div className={styles.colProgress}>Efektywność</div>
                    </div>

                    <div className={styles.planRows}>
                        {(!mastermindPlan.reps?.[selectedRep] || Object.keys(mastermindPlan.reps[selectedRep]).length === 0) ? (
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
                                                const status = taskStatuses[selectedRep]?.[lead.id];
                                                const chipClass = status === 'success' ? styles.successChip : status === 'postponed' ? styles.postponedChip : status === 'rejected' ? styles.rejectedChip : '';
                                                return (
                                                    <div key={lead.id} className={styles.leadChipContainer}>
                                                        <div className={`${styles.leadChip} ${chipClass}`} onClick={() => openCRM(selectedRep, lead.id, lead.name)}>
                                                            <div className={styles.leadChipTop}><span className={styles.leadChipName}>{lead.name}</span></div>
                                                            <div className={styles.leadChipBottom}>
                                                                <div className={styles.leadChipCitySection}>
                                                                    <span className={styles.leadChipCity}>{lead.city}</span>
                                                                    {user?.role === 'prezes' && hasPresidentNote(selectedRep, lead.id) && (
                                                                        <span className={styles.pNoteSnippet}>{presidentNotes[`${selectedRep}_${lead.id}`].substring(0, 15)}...</span>
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
                                isPresidentView={user?.role === 'admin' || user?.role === 'prezes'}
                                taskStatus={taskStatuses[activeNote.repId]?.[activeNote.id]}
                                onSetTaskStatus={setTaskStatus}
                                onClose={closeModal}
                            />
                        </div>
                    </div>
                )}
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
        </div>
    );
};

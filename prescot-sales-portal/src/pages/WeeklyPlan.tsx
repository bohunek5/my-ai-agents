import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { REPS, getDailyPlanForRep, getLeadById } from '../data/mockData';
import {
    Zap,
    BrainCircuit,
    TrendingUp,
    Contact,
    Download,
    X,
    MessageSquare,
    RotateCcw,
    Search,
    Shield
} from 'lucide-react';
import styles from './WeeklyPlan.module.css';

interface TaskStatusMap {
    [key: string]: 'success' | 'rejected' | 'postponed' | 'pending';
}

export const WeeklyPlan: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedRep, setSelectedRep] = useState(REPS[0].id);
    const [searchTerm, setSearchTerm] = useState('');

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

    const days = useMemo(() => ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'], []);

    const closeModal = useCallback(() => {
        setActiveNote(null);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
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
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeModal]);

    const calculateDailyProgress = useCallback((repId: string, day: string) => {
        const plan = getDailyPlanForRep(repId, day);
        const target = 5;
        const repTasks = taskStatuses[repId] || {};
        const completed = [...plan.retention].filter(t =>
            repTasks[t.id] && repTasks[t.id] !== 'pending'
        ).length;
        return Math.round((completed / target) * 100);
    }, [taskStatuses]);

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
        const currentRepTasks = taskStatuses[repId] || {};
        const nextStatuses: TaskStatusMap = { ...currentRepTasks, [id]: status };
        setTaskStatuses(prev => ({ ...prev, [repId]: nextStatuses }));
        localStorage.setItem(`prescot_tasks_${repId}`, JSON.stringify(nextStatuses));
    };

    const resetAllProgress = () => {
        if (!window.confirm('CZY NA PEWNO CHCESZ ZRESETOWAĆ WSZYSTKIE POSTĘPY?')) return;
        REPS.forEach(rep => {
            localStorage.removeItem(`prescot_tasks_${rep.id}`);
            localStorage.removeItem(`prescot_notes_${rep.id}`);
        });
        localStorage.removeItem('prescot_president_notes');
        setTaskStatuses({});
        setTaskNotes({});
        setPresidentNotes({});
        alert('SYSTEM ZRESETOWANY.');
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

    const presidentNotesSummary = useMemo(() => {
        if (user?.role !== 'prezes' && user?.role !== 'admin') return [];
        return Object.entries(presidentNotes)
            .filter(([, note]) => note.trim().length > 0)
            .map(([key, note]) => {
                const [repId, taskId] = key.split('_');
                const rep = REPS.find(r => r.id === repId);
                const lead = getLeadById(taskId);
                return { repName: rep?.name || '?', leadName: lead?.name || taskId, note, repId, taskId };
            });
    }, [presidentNotes, user?.role]);

    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-main">
                <div className={styles.auroraBg}></div>

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
                            <button className={`${styles.exportBtn} ${styles.resetBtn}`} onClick={resetAllProgress}>
                                <RotateCcw size={18} /> RESET
                            </button>
                        )}
                    </div>
                </header>

                {presidentNotesSummary.length > 0 && (
                    <section className={styles.pNotesOverview}>
                        <div className={styles.pNotesHeader}>
                            <Shield size={20} className={styles.blueIcon} />
                            <h3>AKTYWNE WYTYCZNE ZARZĄDU ({presidentNotesSummary.length})</h3>
                        </div>
                        <div className={styles.pNotesGrid}>
                            {presidentNotesSummary.map((pn, i) => (
                                <div
                                    key={i}
                                    className={`${styles.pNoteCard} glass`}
                                    onClick={() => {
                                        setSelectedRep(pn.repId);
                                        openCRM(pn.repId, pn.taskId, pn.leadName);
                                    }}
                                >
                                    <div className={styles.pNoteTarget}>
                                        <strong>{pn.leadName}</strong> <span>({pn.repName})</span>
                                    </div>
                                    <p className={styles.pNoteText}>"{pn.note.substring(0, 80)}{pn.note.length > 80 ? '...' : ''}"</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className={styles.strategicGrid}>
                    <div className={`${styles.insightCard} glass`}>
                        <div className={styles.insightHeader}>
                            <div className={styles.insightIcon}><TrendingUp size={24} /></div>
                            <span className={styles.insightLabel}>PROGRES TYGODNIA</span>
                        </div>
                        <div className={styles.insightValue}>{strategicInsights.weekProgress}%</div>
                        <div className={styles.progressBarWrapper}>
                            <div className={styles.progressBarFill} style={{ width: `${strategicInsights.weekProgress}%` }}></div>
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
                        {days.map((day: string, idx: number) => {
                            const progress = calculateDailyProgress(selectedRep, day);
                            const plan = getDailyPlanForRep(selectedRep, day);

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
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {scheduledForDay.map(lead => (
                                            <div key={lead!.id} className={styles.leadChipContainer}>
                                                <div className={`${styles.leadChip} ${styles.scheduledLeadChip}`} onClick={() => openCRM(selectedRep, lead!.id, lead!.name)}>
                                                    <div className={styles.leadChipTop}><span className={styles.leadChipName}>{lead!.name}</span><span className={styles.scheduledBadge}>ZALEGŁE</span></div>
                                                    <div className={styles.leadChipBottom}><span className={styles.leadChipCity}>{lead!.city}</span><MessageSquare size={12} className={styles.crmLoggedIcon} /></div>
                                                </div>
                                            </div>
                                        ))}
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
                        })}
                    </div>
                </div>

                {activeNote && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={`${styles.modal} glass led-glow`} onClick={e => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <div><div className={styles.modalTag}>KARTA CRM</div><h3 className={styles.futuristicTitle}>{activeNote.name}</h3></div>
                                <button className={styles.closeIconBtn} onClick={closeModal} title="Zamknij"><X size={20} /></button>
                            </div>
                            <div className={styles.modalBody}>
                                <div className={styles.modalSplitLayout}>
                                    <div className={styles.modalLeftColumn}>
                                        <div className={styles.crmSectionBlock}>
                                            <label className={styles.noteLabel}><MessageSquare size={14} className={styles.orangeIcon} /> RAPORT HANDLOWCA</label>
                                            {!(user?.role === 'admin' || user?.role === 'prezes') ? (
                                                <>
                                                    <div className={styles.statusButtonGroup}>
                                                        <button className={`${styles.statusBtnSmall} ${styles.statusSuccess} ${taskStatuses[activeNote.repId]?.[activeNote.id] === 'success' ? styles.active : ''}`} onClick={() => setTaskStatus('success')}>SUKCES</button>
                                                        <button className={`${styles.statusBtnSmall} ${styles.statusPostponed} ${taskStatuses[activeNote.repId]?.[activeNote.id] === 'postponed' ? styles.active : ''}`} onClick={() => setTaskStatus('postponed')}>ODŁOŻONE</button>
                                                        <button className={`${styles.statusBtnSmall} ${styles.statusRejected} ${taskStatuses[activeNote.repId]?.[activeNote.id] === 'rejected' ? styles.active : ''}`} onClick={() => setTaskStatus('rejected')}>BRAK ZAINT.</button>
                                                    </div>
                                                    <textarea value={activeNote.note || ''} onChange={(e) => updateNote(e.target.value)} className={styles.modalTextarea} placeholder="Główne ustalenia..." />
                                                </>
                                            ) : (
                                                <div className={styles.readonlyNote}>{activeNote.note || 'Brak wpisów handlowca.'}</div>
                                            )}
                                        </div>

                                        {(user?.role === 'admin' || user?.role === 'prezes') && (
                                            <div className={styles.crmSectionBlock}>
                                                <label className={styles.noteLabel}><Shield size={14} className={styles.blueIcon} /> WYTYCZNE ZARZĄDU</label>
                                                <textarea value={activeNote.pNote || ''} onChange={(e) => updatePresidentNote(e.target.value)} className={styles.modalTextarea} placeholder="Twoje sugestie dla handlowca..." />
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.modalRightColumn}>
                                        {activeNote && getLeadById(activeNote.id) && (
                                            <>
                                                <div className={styles.aiInsightSection}>
                                                    <label className={styles.noteLabel}><Search size={14} className={styles.orangeIcon} /> PROFIL BIZNESOWY</label>
                                                    <div className={styles.aiInsightBox}>
                                                        <p>{getLeadById(activeNote.id)?.companyAnalysis}</p>
                                                    </div>
                                                </div>

                                                <div className={styles.aiInsightSection}>
                                                    <label className={styles.noteLabel}><TrendingUp size={14} className={styles.orangeIcon} /> HISTORIA ZAKUPÓW (Metry/Szt + Cena śr.)</label>
                                                    <div className={`${styles.aiInsightBox} ${styles.scrollableHistory}`}>
                                                        <div className={styles.historyContent}>
                                                            {getLeadById(activeNote.id)?.purchaseHistory.split('\\n').map((line: string, i: number) => (
                                                                <div key={i} className={styles.historyLine}>{line}</div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.aiInsightSection}>
                                                    <label className={styles.noteLabel}><Zap size={14} className={styles.blueIcon} /> SUGESTIA: CO POWINIEN BRAĆ?</label>
                                                    <div className={`${styles.aiInsightBox} ${styles.suggestionBox}`}>
                                                        <p>{getLeadById(activeNote.id)?.suggestions}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.modalFooter}><button className={styles.saveBtn} onClick={closeModal}>ZAPISZ I ZAMKNIJ</button></div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

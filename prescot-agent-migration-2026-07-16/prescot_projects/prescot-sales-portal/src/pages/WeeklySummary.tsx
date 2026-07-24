import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { REPS, getLeadById } from '../data/mockData';
import {
    TrendingUp,
    Zap,
    ChevronRight,
    Loader2,
    ShieldCheck
} from 'lucide-react';
import styles from './WeeklySummary.module.css';

interface RepPerformance {
    id: string;
    name: string;
    contactCount: number;
    notes: { clientId: string, clientName: string, text: string, status: string }[];
    summaryAI?: string;
}

export const WeeklySummary: React.FC = () => {
    const { user } = useAuth();
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [expandedRep, setExpandedRep] = useState<string | null>(null);

    const performanceData = useMemo(() => {
        return REPS.map(rep => {
            const taskData = localStorage.getItem(`prescot_tasks_${rep.id}`);
            const noteData = localStorage.getItem(`prescot_notes_${rep.id}`);

            const tasks = taskData ? JSON.parse(taskData) : {};
            const notes = noteData ? JSON.parse(noteData) : {};

            const validNotes: RepPerformance['notes'] = [];
            let count = 0;

            Object.entries(tasks).forEach(([clientId, status]) => {
                if (status === 'success' || status === 'rejected') {
                    count++;
                    const lead = getLeadById(clientId);
                    if (notes[clientId]) {
                        validNotes.push({
                            clientId,
                            clientName: lead?.name || clientId,
                            text: notes[clientId],
                            status: status as string
                        });
                    }
                }
            });

            // "Script" logic for AI-style summary
            let summary = "";
            if (count === 0) {
                summary = "Brak zarejestrowanych kontaktów w tym tygodniu. Wymagana weryfikacja aktywności.";
            } else if (count < 5) {
                summary = `Niska aktywność (${count} kont.). Handlowiec skupił się na wąskiej grupie klientów. Główne ustalenia dotyczą m.in. ${validNotes[0]?.clientName || 'braku danych'}.`;
            } else {
                summary = `Wysoka aktywność (${count} kont.). Realizacja planu przebiega pomyślnie. Handlowiec skutecznie domyka tematy u kluczowych odbiorców.`;
            }

            return {
                id: rep.id,
                name: rep.name,
                contactCount: count,
                notes: validNotes,
                summaryAI: summary
            } as RepPerformance;
        });
    }, []);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setShowResults(true);
        }, 2500);
    };

    if (user?.role === 'handlowiec') {
        return <div className="page-layout"><Sidebar /><main className="page-main"><h1>Brak dostępu.</h1></main></div>;
    }

    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-main">
                <div className={styles.auroraBg}></div>

                <div className={styles.container}>
                    <header className={styles.header}>
                        <div className={styles.headerTag}>SYSTEM ANALITYKI ZARZĄDCZEJ</div>
                        <h1 className={styles.title}>Podsumowanie Tygodnia</h1>
                        <p className={styles.subtitle}>Przegląd zaangażowania i efektów pracy zespołu handlowego</p>
                    </header>

                    {!showResults ? (
                        <div className={styles.generateContainer}>
                            <div className={styles.generateIcon}>
                                <ShieldCheck size={48} color="var(--primary)" />
                            </div>
                            <h2 className={styles.generateTitle}>Gotowy do generowania zestawienia?</h2>
                            <p className={styles.generateText}>
                                System przeanalizuje wszystkie wpisy handlowców, statusy zadań oraz notatki CRM z bieżącego tygodnia, aby przygotować strategiczne podsumowanie.
                            </p>
                            <button
                                className={styles.generateBtn}
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className={styles.spin} /> PRZETWARZANIE DANYCH...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={20} /> GENERUJ ZESTAWIENIE
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className={styles.repGrid}>
                            {performanceData.map(rep => (
                                <div
                                    key={rep.id}
                                    className={`${styles.repCard} ${expandedRep === rep.id ? styles.expanded : ''}`}
                                    onClick={() => setExpandedRep(expandedRep === rep.id ? null : rep.id)}
                                >
                                    <div className={styles.repHeader}>
                                        <div className={styles.repNameInfo}>
                                            <div className={styles.repName}>{rep.name}</div>
                                            <div className={styles.repIdLabel}>ID: {rep.id}</div>
                                        </div>
                                        <div className={styles.statBadge}>
                                            {rep.contactCount} KONTAKTÓW
                                        </div>
                                    </div>

                                    <div className={styles.repSummary}>
                                        <TrendingUp size={14} style={{ marginRight: '8px' }} />
                                        <strong>OCENA SYSTEMU:</strong><br />
                                        {rep.summaryAI}
                                    </div>

                                    {expandedRep === rep.id && (
                                        <div className={styles.detailsList}>
                                            <div className={styles.detailsHeader}>
                                                <h4>SZCZEGÓŁY WPISÓW:</h4>
                                            </div>
                                            {rep.notes.length === 0 ? (
                                                <div className={styles.noReports}>Brak szczegółowych raportów.</div>
                                            ) : (
                                                rep.notes.map((note, idx) => (
                                                    <div key={idx} className={styles.detailItem}>
                                                        <div className={styles.detailHeader}>
                                                            <span className={styles.detailClient}>{note.clientName}</span>
                                                            <span className={`${styles.statusLabel} ${note.status === 'success' ? styles.statusGreen : styles.statusRed}`}>
                                                                {note.status === 'success' ? '✓ SUKCES' : '✗ BRAK'}
                                                            </span>
                                                        </div>
                                                        <p className={styles.detailText}>{note.text}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}

                                    {!expandedRep && (
                                        <div className={styles.expandPrompt}>
                                            KLIKNIJ ABY ROZWINĄĆ <ChevronRight size={12} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

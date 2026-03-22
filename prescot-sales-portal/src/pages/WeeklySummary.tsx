import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { REPS } from '../data/mockData';
import {
    TrendingUp,
    Loader2,
    ShieldCheck,
    Calendar
} from 'lucide-react';
import styles from './WeeklySummary.module.css';

// History-based performance interface
interface RepHistoryPerformance {
    id: string;
    name: string;
    total: number;
    successes: number;
    lastNote: string;
}

export const WeeklySummary: React.FC = () => {
    const { user } = useAuth();
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const historyData = useMemo(() => {
        try {
            const saved = localStorage.getItem('prescot_history');
            const history: any[] = saved ? JSON.parse(saved) : [];
            return history[0] || null; // Pobierz ostatni zapisany tydzień
        } catch { return null; }
    }, []);

    const performanceData = useMemo(() => {
        if (!historyData) return [];

        return REPS.map(rep => {
            const tasks = historyData.taskStatuses?.[rep.id] || {};
            const notes = historyData.taskNotes?.[rep.id] || {};

            let total = 0;
            let successes = 0;
            let lastNote = "";

            Object.entries(tasks).forEach(([clientId, status]) => {
                total++;
                if (status === 'success') {
                    successes++;
                }
                if (notes[clientId]) {
                    lastNote = notes[clientId];
                }
            });

            return {
                id: rep.id,
                name: rep.name,
                total,
                successes,
                lastNote
            };
        });
    }, [historyData]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setShowResults(true);
        }, 1500);
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
                        <p className={styles.subtitle}>Wyniki oraz aktywność zespołu z ubiegłego tygodnia {historyData ? `(${historyData.weekId})` : ''}</p>
                    </header>

                    {!showResults ? (
                        <div className={styles.generateContainer}>
                            <div className={styles.generateIcon}>
                                <ShieldCheck size={48} color="var(--primary)" />
                            </div>
                            <h2 className={styles.generateTitle}>Przeanalizować ubiegły tydzień?</h2>
                            <p className={styles.generateText}>
                                System przygotuje zestawienie tabelaryczne na podstawie ostatniego zamkniętego cyklu pracy zespołu.
                            </p>
                            <button
                                className={styles.generateBtn}
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className={styles.spin} /> ANALIZA ARCHIWALNA...
                                    </>
                                ) : (
                                    <>
                                        <TrendingUp size={20} /> POKAŻ WYNIKI
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className={`${styles.tableWrapper} glass`}>
                            {!historyData ? (
                                <div className={styles.noDataState}>
                                    <Calendar size={64} className={styles.noDataIcon} />
                                    <h3>Brak danych historycznych</h3>
                                    <p>Nie odnaleziono zapisów z ubiegłego tygodnia w archiwum systemu.</p>
                                </div>
                            ) : (
                                <table className={styles.summaryTable}>
                                    <thead>
                                        <tr>
                                            <th>HANDLOWIEC</th>
                                            <th>KONTAKTY (SUKCESY / RAZEM)</th>
                                            <th>SKUTECZNOŚĆ</th>
                                            <th>OSTATNIA ISTOTNA NOTATKA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {performanceData.map(rep => {
                                            const trend = rep.total > 0 ? Math.round((rep.successes / rep.total) * 100) : 0;
                                            return (
                                                <tr key={rep.id}>
                                                    <td>
                                                        <div className={styles.repTableInfo}>
                                                            <div className={styles.repName}>{rep.name}</div>
                                                            <div className={styles.repIdLabel}>ID: {rep.id}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.statContainer}>
                                                            <span className={styles.successValue}>{rep.successes}</span>
                                                            <span className={styles.separator}>/</span>
                                                            <span className={styles.totalValue}>{rep.total}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.efficiencyCell}>
                                                            <div className={styles.efficiencyValue}>{trend}%</div>
                                                            <div className={styles.miniProgress}>
                                                                <div 
                                                                    className={styles.miniProgressFill} 
                                                                    style={{ width: `${trend}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={styles.noteCell}>
                                                        <div className={styles.noteText}>
                                                            {rep.lastNote || "---"}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

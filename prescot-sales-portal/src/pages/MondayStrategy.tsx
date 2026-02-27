
import React, { useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { REPS, getLeadById } from '../data/mockData';
import {
    Zap,
    AlertCircle,
    Trophy,
    BrainCircuit,
    MessageSquare,
    TrendingUp,
    LineChart
} from 'lucide-react';
import styles from './MondayStrategy.module.css';

export const MondayStrategy: React.FC = () => {
    // 1. Gather all data from localStorage
    const reportData = useMemo(() => {
        const stats = REPS.map(rep => {
            const savedTasks = localStorage.getItem(`prescot_tasks_${rep.id}`);
            const savedNotes = localStorage.getItem(`prescot_notes_${rep.id}`);
            const tasks = savedTasks ? JSON.parse(savedTasks) : {};
            const notes = savedNotes ? JSON.parse(savedNotes) : {};

            const completed = Object.values(tasks).filter(s => s === 'success').length;
            const total = Object.values(tasks).filter(s => s !== 'pending').length;

            // Extract interesting notes for discussion
            const criticalNotes = Object.entries(notes)
                .map(([id, note]) => {
                    const lead = getLeadById(id);
                    return { leadName: lead?.name || 'Nieznany', note: note as string };
                })
                .filter(item => item.note.length > 10)
                .slice(-3); // Last 3 notes

            return {
                ...rep,
                completed,
                total,
                criticalNotes,
                efficiency: total > 0 ? Math.round((completed / total) * 100) : 0
            };
        });

        const totalSuccess = stats.reduce((acc, curr) => acc + curr.completed, 0);

        return { stats, totalSuccess };
    }, []);

    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-main">
                <div className={styles.auroraBg}></div>

                <header className={styles.header}>
                    <div>
                        <div className={styles.prestigeTag}>ZINTEGROWANY EKOSYSTEM SPRZEDAŻOWY</div>
                        <h1 className={styles.title}>Briefing Strategiczny Prezesa</h1>
                    </div>
                    <div className={styles.aiBadge}>
                        <BrainCircuit size={20} />
                        <span>ORCHESTRATOR AKTYWNY</span>
                    </div>
                </header>

                <section className={styles.topMetrics}>
                    <div className={`${styles.metricCard} glass`}>
                        <div className={styles.metricHeader}>
                            <Trophy size={20} className={styles.gold} />
                            <span>SUKCESY ZESPOŁU</span>
                        </div>
                        <div className={styles.metricValue}>{reportData.totalSuccess}</div>
                        <div className={styles.metricLabel}>Sfinalizowane projekty (ostatnie 7 dni)</div>
                    </div>
                    <div className={`${styles.metricCard} glass spotlight`}>
                        <div className={styles.metricHeader}>
                            <Zap size={20} className={styles.orange} />
                            <span>FOCUS DNIA</span>
                        </div>
                        <div className={styles.metricValue}>FINALIZACJA PROCESÓW</div>
                    </div>
                </section>

                {/* 1. SEKCJA RYNKOWA - RAPORT PROSPECTORA */}
                <div className={styles.marketGrid}>
                    <div className={`${styles.marketCard} glass`}>
                        <div className={styles.sectionTitle}><TrendingUp size={24} /> Raport Agenta: PROSPECTOR</div>
                        <div className={styles.trendItem}>
                            <div className={styles.trendIcon}><Zap size={18} /></div>
                            <div className={styles.trendContent}>
                                <h4>Segment OEM: Partnerstwa Produkcyjne</h4>
                                <p>Zidentyfikowano potencjał u producentów poszukujących stabilnych komponentów pod własną markę. Kluczowy atut: certyfikacja Prescot i 7-letni cykl gwarancyjny.</p>
                            </div>
                        </div>
                        <div className={styles.trendItem}>
                            <div className={styles.trendIcon}><LineChart size={18} /></div>
                            <div className={styles.trendContent}>
                                <h4>Oświetlenie Inwestycyjne: Wymogi CRI Ra97</h4>
                                <p>Analiza rynku wskazuje na rosnące znaczenie wysokiej wierności barw w projektach wnętrz premium. Przygotowano dokumentację techniczną dla serii Delux.</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.marketCard} glass`}>
                        <div className={styles.sectionTitle}><AlertCircle size={24} /> Logika Agenta: ANALYST</div>
                        <div className={styles.trendItem}>
                            <div className={styles.trendContent}>
                                <span className={styles.competitorBadge}>OPTYMALIZACJA</span>
                                <h4>Monitoring Kontynuacji Zakupowych</h4>
                                <p>Agregacja danych o klientach wymagających uzupełnienia stanów magazynowych (zasilacze Scharfer / sterowniki MiBoxer). Przygotowano zestawienia kompatybilności.</p>
                            </div>
                        </div>
                        <div className={styles.trendItem}>
                            <div className={styles.trendContent}>
                                <span className={styles.competitorBadge}>PROJEKT</span>
                                <h4>Integracja Systemowa: Kluś + Prescot</h4>
                                <p>Walidacja wymiarowa taśm ultra-wąskich (3mm/4mm) w dedykowanych profilach aluminiowych. Gotowe rozwiązania dla studiów meblowych.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. SEKCJA OPERACYJNA - WRITER & PROMOTER */}
                <div className={styles.strategyRow}>
                    <div className={`${styles.strategyCard} glass`}>
                        <div className={styles.strategyHeader}>
                            <BrainCircuit size={20} className={styles.blue} />
                            <h3>Zalecenia Agenta: WRITER</h3>
                        </div>
                        <div className={styles.aiSummary}>
                            <p>
                                Rekomendowana strategia opiera się na transparentności technicznej i edukacji klienta.
                                Skupiamy się na analizie TCO (Total Cost of Ownership), wykazując realne korzyści z inwestycji w polską produkcję.
                            </p>
                        </div>
                        <ul className={styles.strategyList}>
                            <li><strong>Model Partnerski OEM:</strong> Wsparcie w budowaniu marki własnej klienta przy wykorzystaniu zaplecza produkcyjnego w Giżycku.</li>
                            <li><strong>Checklista Niezawodności (PCB 4oz):</strong> Podkreślanie roli grubego podłoża miedzi (4oz) dla stabilności termicznej i ekstremalnej żywotności LED.</li>
                            <li><strong>Doradztwo Projektowe:</strong> Wykorzystanie oficjalnej dystrybucji marek premium jako gwarancji spójności całego systemu.</li>
                        </ul>
                    </div>

                    <div className={`${styles.strategyCard} glass`}>
                        <div className={styles.strategyHeader}>
                            <MessageSquare size={20} className={styles.orange} />
                            <h3>Scenariusz Agenta: PROMOTER</h3>
                        </div>
                        <div className={styles.scriptBox}>
                            <p><em>"Analizując Państwa realizacje w segmencie mebli premium, widzimy potencjał do optymalizacji montażu dzięki wyjątkowej trwałości naszych taśm premium. Jako polski producent oferujemy pełne wsparcie wizerunkowe (OEM) oraz powtarzalność barwy w standardzie SDCM3."</em></p>
                            <p><em>"Nasze rozwiązania 24V na podkładzie 4oz zapewniają stabilność parametrów nawet przy dużych metrażach. Proponuję merytoryczne spotkanie online w celu omówienia specyfikacji technicznej i możliwości testowych."</em></p>
                        </div>
                    </div>
                </div>

                {/* 3. RUTYNA HANDLOWA - KLUCZOWE PYTANIA */}
                <div className={styles.questionsSection}>
                    <h2 className={styles.sectionTitle}>Rutyna Handlowa: Kluczowe Pytania</h2>
                    <div className={styles.questionsGrid}>
                        <div className={`${styles.questionCard} glass`}>
                            <div className={styles.qHeader}>
                                <span className={styles.qNumber}>01</span>
                                <h4 className={styles.qText}>Jaki jest realny Total Cost of Ownership (TCO) u klienta?</h4>
                            </div>
                            <div className={styles.mentalityBubble}>
                                <BrainCircuit size={14} className={styles.qIcon} />
                                <p>Odchodzimy od licytacji cenowej za metr. Jeśli klient ponosi koszty reklamacji i serwisu, nasze PCB 4oz generuje mu realne oszczędności w skali roku. Sprzedajemy bezawaryjność i reputację jego marki, a nie komponent.</p>
                            </div>
                        </div>
                        <div className={`${styles.questionCard} glass`}>
                            <div className={styles.qHeader}>
                                <span className={styles.qNumber}>02</span>
                                <h4 className={styles.qText}>Gdzie są techniczne wąskie gardła w obecnych projektach?</h4>
                            </div>
                            <div className={styles.mentalityBubble}>
                                <BrainCircuit size={14} className={styles.qIcon} />
                                <p>Wchodzimy w rolę audytora technicznego. Szukamy problemów z temperaturą, stabilnością zasilania czy spadkiem jasności (VF). Wykazujemy, jak nasze 24V na podkładzie 4oz eliminuje te ryzyka fizycznie, a nie tylko na papierze.</p>
                            </div>
                        </div>
                        <div className={`${styles.questionCard} glass`}>
                            <div className={styles.qHeader}>
                                <span className={styles.qNumber}>03</span>
                                <h4 className={styles.qText}>Jaki jest potencjał na skalowanie w modelu OEM Giżycko?</h4>
                            </div>
                            <div className={styles.mentalityBubble}>
                                <BrainCircuit size={14} className={styles.qIcon} />
                                <p>Pozycjonujemy Prescot jako zewnętrzny dział R&D klienta. Made in Poland to dziś szybkość reakcji i powtarzalność barwy (SDCM3). Przekonujemy do wyjścia z azjatyckiego importu na rzecz lokalnej kontroli nad jakością.</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 4. SZCZEGÓŁY - STATUS HANDLOWCÓW */}
                <div className={styles.repSummary}>
                    <h2 className={styles.sectionTitle}>Podsumowanie Aktywności Handlowców</h2>
                    <div className={styles.repGrid}>
                        {reportData.stats.map(rep => (
                            <div key={rep.id} className={`${styles.repCard} glass`}>
                                <div className={styles.repHeader}>
                                    <div className={styles.repName}>{rep.name}</div>
                                    <div className={styles.repStat}>{rep.completed} sukcesy ({rep.efficiency}%)</div>
                                </div>
                                <div className={styles.repNotes}>
                                    {rep.criticalNotes.length > 0 ? (
                                        rep.criticalNotes.map((n, i) => (
                                            <div key={i} className={styles.noteItem}>
                                                <span className={styles.leadLabel}>{n.leadName}:</span>
                                                <p>{n.note.substring(0, 100)}...</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className={styles.emptyNotes}>Brak istotnych wpisów CRM w tym tygodniu.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

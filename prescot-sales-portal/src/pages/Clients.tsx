
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import {
    Users,
    Search,
    MessageSquare,
    ChevronRight,
    Filter,
    TrendingUp,
    Target,
    Tags,
    ChevronLeft,
} from 'lucide-react';
import type { Lead } from '../data/mockData';
import { ALL_LEADS, REPS } from '../data/mockData';
import styles from './Clients.module.css';
import weeklyStyles from './WeeklyPlan.module.css';
import { CrmCard } from '../components/CrmCard/CrmCard';

export const Clients: React.FC = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [sortParam, setSortParam] = useState<'default' | 'alpha' | 'activity'>('default');
    const [showSortMenu, setShowSortMenu] = useState(false);

    const [selectedRepId, setSelectedRepId] = useState<string | null>(null);
    const [selectedClient, setSelectedClient] = useState<Lead | null>(null);

    const selectClient = (client: Lead | null) => setSelectedClient(client);

    const [taskStatuses] = useState<Record<string, Record<string, string>>>(() => {
        const all: Record<string, Record<string, string>> = {};
        REPS.forEach(rep => {
            try {
                const saved = localStorage.getItem(`prescot_tasks_${rep.id}`);
                if (saved) all[rep.id] = JSON.parse(saved);
            } catch { /* ignore */ }
        });
        return all;
    });

    const [presidentNotes, setPresidentNotes] = useState<Record<string, string>>(() => {
        try {
            const saved = localStorage.getItem('prescot_president_notes');
            return saved ? JSON.parse(saved) : {};
        } catch { return {}; }
    });

    const [repNotesMap, setRepNotesMap] = useState<Record<string, Record<string, string>>>(() => {
        const notes: Record<string, Record<string, string>> = {};
        REPS.forEach(rep => {
            try {
                const saved = localStorage.getItem(`prescot_notes_${rep.id}`);
                if (saved) notes[rep.id] = JSON.parse(saved);
            } catch { /* ignore */ }
        });
        return notes;
    });

    const savePresidentNote = (repId: string, clientId: string, value: string) => {
        const key = `${repId}_${clientId}`;
        const next = { ...presidentNotes, [key]: value };
        setPresidentNotes(next);
        localStorage.setItem('prescot_president_notes', JSON.stringify(next));
    };

    const saveRepNote = (clientId: string, note: string) => {
        if (!selectedClient) return;
        const repId = selectedClient.assignedTo;
        const existing = repNotesMap[repId] || {};
        const next = { ...existing, [clientId]: note };
        setRepNotesMap(prev => ({ ...prev, [repId]: next }));
        localStorage.setItem(`prescot_notes_${repId}`, JSON.stringify(next));
    };

    const repCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        ALL_LEADS.forEach(l => { counts[l.assignedTo] = (counts[l.assignedTo] || 0) + 1; });
        return counts;
    }, []);

    const baseLeads = useMemo(() => {
        if (user?.role === 'admin' || user?.role === 'prezes') {
            if (selectedRepId) return ALL_LEADS.filter(l => l.assignedTo === selectedRepId);
            return ALL_LEADS;
        }
        return ALL_LEADS.filter(l => l.assignedTo === user?.username);
    }, [user, selectedRepId]);

    const stats = useMemo(() => {
        const total = baseLeads.length;
        let newLeads = 0, activeCount = 0, premiumLeads = 0;
        const premiumTerms = ['premium', 'meble', 'architektura', 'wnętrza', 'smart home'];
        baseLeads.forEach(l => {
            if (l.type === 'new_lead') newLeads++;
            const hNote = (repNotesMap[l.assignedTo] || {})[l.id];
            const pNote = presidentNotes[`${l.assignedTo}_${l.id}`];
            if ((hNote && hNote.length > 0) || (pNote && pNote.length > 0)) activeCount++;
            if (premiumTerms.some(term => l.industry.toLowerCase().includes(term))) premiumLeads++;
        });
        return {
            total,
            activityCount: activeCount,
            activityLabel: newLeads > 0 ? 'Nowych' : 'Aktywnych',
            premiumPercent: total > 0 ? Math.round((premiumLeads / total) * 100) : 0,
        };
    }, [baseLeads, presidentNotes, repNotesMap]);

    const hasCRMNote = (repId: string, taskId: string) => {
        const notes = repNotesMap[repId] || {};
        return !!notes[taskId] && notes[taskId].trim().length > 0;
    };

    const filteredClients = useMemo(() => {
        const q = search.toLowerCase().trim();
        const source = (user?.role === 'admin' || user?.role === 'prezes') && !selectedRepId ? ALL_LEADS : baseLeads;
        const results = [];
        for (const c of source) {
            if (!q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q)) {
                results.push(c);
            }
        }

        results.sort((a, b) => {
            const repA = a.assignedTo;
            const repB = b.assignedTo;
            const statusA = taskStatuses[repA]?.[a.id];
            const statusB = taskStatuses[repB]?.[b.id];

            const countA = (statusA === 'success' || statusA === 'rejected') ? 1 : 0;
            const countB = (statusB === 'success' || statusB === 'rejected') ? 1 : 0;

            if (countA > 0 && countB === 0) return -1;
            if (countB > 0 && countA === 0) return 1;
            if (sortParam === 'alpha') return a.name.localeCompare(b.name, 'pl');
            if (sortParam === 'activity') {
                const score = (c: Lead) => {
                    let s = 0;
                    if (repNotesMap[c.assignedTo]?.[c.id]) s += 10;
                    if (presidentNotes[`${c.assignedTo}_${c.id}`]) s += 5;
                    return s;
                };
                return score(b) - score(a);
            }
            return 0;
        });

        return results.slice(0, 100);
    }, [search, baseLeads, user?.role, selectedRepId, sortParam, repNotesMap, presidentNotes, taskStatuses]);

    const isPresidentView = user?.role === 'admin' || user?.role === 'prezes';
    const currentRepNote = selectedClient ? (repNotesMap[selectedClient.assignedTo]?.[selectedClient.id] || '') : '';
    const currentPresidentNote = selectedClient ? (presidentNotes[`${selectedClient.assignedTo}_${selectedClient.id}`] || '') : '';

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div>
                        <div className={styles.breadcrumb}>
                            <h1 className={styles.title} onClick={() => { setSelectedRepId(null); setSelectedClient(null); }}>Baza Klientów</h1>
                            {isPresidentView && selectedRepId && (
                                <div className={styles.repTag}>
                                    <ChevronRight size={20} />
                                    <span>{REPS.find(r => r.id === selectedRepId)?.name}</span>
                                </div>
                            )}
                        </div>
                        <p className={styles.subtitle}>
                            {selectedRepId ? `Portfel klientów handlowca: ${REPS.find(r => r.id === selectedRepId)?.name}` : 'Centralny rejestr kontrahentów i relacji B2B'}
                        </p>
                    </div>
                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={20} />
                        <input type="text" placeholder="Szukaj po nazwie, mieście lub branży..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
                    </div>
                </header>

                <section className={styles.overview}>
                    <div className={`${styles.statsCard} glass`}>
                        <div className={styles.statsIcon}><TrendingUp size={20} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Całkowity Portfel</span>
                            <span className={styles.statsValue}>{stats.total} Partnerów</span>
                        </div>
                    </div>
                    <div className={`${styles.statsCard} glass accent`}>
                        <div className={styles.statsIcon}><Target size={20} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Aktywność (30 dni)</span>
                            <span className={styles.statsValue}>+{stats.activityCount} {stats.activityLabel}</span>
                        </div>
                    </div>
                    <div className={`${styles.statsCard} glass`}>
                        <div className={styles.statsIcon}><Tags size={20} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Segment Premium</span>
                            <span className={styles.statsValue}>{stats.premiumPercent}% Bazy</span>
                        </div>
                    </div>
                </section>

                <div className={styles.contentGrid}>
                    <div className={`${styles.listSection} glass`}>
                        {isPresidentView && !selectedRepId && search.length === 0 ? (
                            <>
                                <div className={styles.listHeader}>
                                    <span>Handlowcy / Portfele</span>
                                    <Users size={16} />
                                </div>
                                <div className={styles.repList}>
                                    {REPS.map(rep => (
                                        <div key={rep.id} className={styles.repItem} onClick={() => setSelectedRepId(rep.id)}>
                                            <div className={styles.repAvatar}>{rep.name[0]}</div>
                                            <div className={styles.repInfo}>
                                                <div className={styles.repName}>{rep.name}</div>
                                                <div className={styles.repStats}>{repCounts[rep.id] || 0} Kontrahentów</div>
                                            </div>
                                            <ChevronRight size={18} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.listHeader}>
                                    <div className={styles.listTitle}>
                                        {selectedRepId && (
                                            <button className={styles.backBtn} onClick={() => { setSelectedRepId(null); setSelectedClient(null); }} title="Wróć">
                                                <ChevronLeft size={16} />
                                            </button>
                                        )}
                                        <span>Klient / Branża</span>
                                    </div>
                                    <div className={styles.filterWrapper}>
                                        <Filter size={16} className={styles.filterIcon} style={{ opacity: showSortMenu ? 1 : 0.6 }} onClick={() => setShowSortMenu(!showSortMenu)} />
                                        {showSortMenu && (
                                            <div className={styles.sortMenu}>
                                                <button onClick={() => { setSortParam('default'); setShowSortMenu(false); }} className={`${styles.sortOption} ${sortParam === 'default' ? styles.sortOptionActive : ''}`}>Domyślnie</button>
                                                <button onClick={() => { setSortParam('alpha'); setShowSortMenu(false); }} className={`${styles.sortOption} ${sortParam === 'alpha' ? styles.sortOptionActive : ''}`}>Alfabetycznie (A-Z)</button>
                                                <button onClick={() => { setSortParam('activity'); setShowSortMenu(false); }} className={`${styles.sortOption} ${sortParam === 'activity' ? styles.sortOptionActive : ''}`}>Ilość kontaktów</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.clientList}>
                                    {filteredClients.map((client) => {
                                        const repId = client.assignedTo;
                                        const status = taskStatuses[repId]?.[client.id];
                                        const cCount = (status === 'success' || status === 'rejected') ? 1 : 0;

                                        return (
                                            <div
                                                key={client.id}
                                                className={`${styles.clientItem} ${selectedClient?.id === client.id ? styles.active : ''} ${cCount > 0 ? styles.contactedGreen : ''}`}
                                                onClick={() => selectClient(client)}
                                            >
                                                <div className={styles.leadInfo}>
                                                    <div className={styles.clientName}>
                                                        {client.name}
                                                        {hasCRMNote(client.assignedTo, client.id) && <MessageSquare size={12} className={styles.noteIndicator} />}
                                                    </div>
                                                    <div className={styles.clientDetails}>
                                                        <span className={styles.industryTag}>{client.industry}</span>
                                                        <span className={styles.dot}>•</span>
                                                        <span className={styles.cityText}>{client.city}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.clientPotential}>
                                                    <div className={styles.contactBadge}>{cCount}/5</div>
                                                    <div className={styles.potentialValue}>{client.salesPotential || 'Nowy'}</div>
                                                </div>
                                                <ChevronRight size={18} className={styles.arrow} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.detailSection}>
                        {selectedClient ? (
                            <CrmCard
                                lead={selectedClient}
                                repNote={currentRepNote}
                                onRepNoteChange={(note) => saveRepNote(selectedClient.id, note)}
                                presidentNote={currentPresidentNote}
                                onPresidentNoteChange={(note) => savePresidentNote(selectedClient.assignedTo, selectedClient.id, note)}
                                isPresidentView={isPresidentView}
                            />
                        ) : (
                            <div className={`${weeklyStyles.modal} glass`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', minHeight: '300px' }}>
                                <Users size={48} style={{ opacity: 0.3 }} />
                                <h3 style={{ margin: 0, fontWeight: 600 }}>Wybierz klienta z listy</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem' }}>Kliknij firmę aby zobaczyć pełną kartę CRM</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

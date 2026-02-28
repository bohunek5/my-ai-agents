
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import {
    Users,
    Search,
    PhoneCall,
    Mail,
    MapPin,
    MessageSquare,
    ChevronRight,
    Filter,
    TrendingUp,
    Target,
    Tags,
    Save,
    ChevronLeft,
    Shield
} from 'lucide-react';
import type { Lead } from '../data/mockData';
import { ALL_LEADS, REPS } from '../data/mockData';
import styles from './Clients.module.css';

import rawData from '../data/sales_data_parsed.json';
import { analyzeClientPurchases } from '../utils/crossSell';
import type { Sale } from '../utils/crossSell';

export const Clients: React.FC = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [sortParam, setSortParam] = useState<'default' | 'alpha' | 'activity'>('default');
    const [showSortMenu, setShowSortMenu] = useState(false);

    const [selectedRepId, setSelectedRepId] = useState<string | null>(null);
    const [selectedClient, setSelectedClient] = useState<Lead | null>(null);

    const [presidentNotes, setPresidentNotes] = useState<Record<string, string>>(() => {
        try {
            const saved = localStorage.getItem('prescot_president_notes');
            return saved ? JSON.parse(saved) : {};
        } catch { return {}; }
    });

    // Load all rep notes once to avoid localStorage in loops
    const allRepNotes = useMemo(() => {
        const notes: Record<string, Record<string, string>> = {};
        REPS.forEach(rep => {
            try {
                const saved = localStorage.getItem(`prescot_notes_${rep.id}`);
                if (saved) notes[rep.id] = JSON.parse(saved);
            } catch { /* ignore */ }
        });
        return notes;
    }, []);

    const saveDirective = (repId: string, clientId: string, directive: string) => {
        const key = `${repId}_${clientId}`;
        const next = { ...presidentNotes, [key]: directive };
        setPresidentNotes(next);
        localStorage.setItem('prescot_president_notes', JSON.stringify(next));
    };

    // Pre-calculate rep counts for much faster rendering
    const repCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        ALL_LEADS.forEach(l => {
            counts[l.assignedTo] = (counts[l.assignedTo] || 0) + 1;
        });
        return counts;
    }, []);

    // Base collection for the selected rep/view - NO search dependency here!
    const baseLeads = useMemo(() => {
        if (user?.role === 'admin' || user?.role === 'prezes') {
            if (selectedRepId) return ALL_LEADS.filter(l => l.assignedTo === selectedRepId);
            return ALL_LEADS;
        }
        return ALL_LEADS.filter(l => l.assignedTo === user?.username);
    }, [user, selectedRepId]);

    const stats = useMemo(() => {
        const total = baseLeads.length;
        let newLeads = 0;
        let activeCount = 0;
        let premiumLeads = 0;

        const premiumTerms = ['premium', 'meble', 'architektura', 'wnętrza', 'smart home'];

        baseLeads.forEach(l => {
            if (l.type === 'new_lead') newLeads++;

            const hNote = (allRepNotes[l.assignedTo] || {})[l.id];
            const pNote = presidentNotes[`${l.assignedTo}_${l.id}`];
            if ((hNote && hNote.length > 0) || (pNote && pNote.length > 0)) {
                activeCount++;
            }

            const ind = l.industry.toLowerCase();
            if (premiumTerms.some(term => ind.includes(term))) {
                premiumLeads++;
            }
        });

        const activityLabel = newLeads > 0 ? 'Nowych' : 'Aktywnych';
        const premiumPercent = total > 0 ? Math.round((premiumLeads / total) * 100) : 0;

        return { total, activityCount: activeCount, activityLabel, premiumPercent };
    }, [baseLeads, presidentNotes, allRepNotes]);

    const hasCRMNote = (repId: string, taskId: string) => {
        const notes = allRepNotes[repId] || {};
        return !!notes[taskId] && notes[taskId].trim().length > 0;
    };

    const filteredClients = useMemo(() => {
        const q = search.toLowerCase().trim();
        const source = (user?.role === 'admin' || user?.role === 'prezes') && !selectedRepId ? ALL_LEADS : baseLeads;

        const results = [];
        for (let i = 0; i < source.length; i++) {
            const c = source[i];
            if (!q || c.name.toLowerCase().includes(q) ||
                c.city.toLowerCase().includes(q) ||
                c.industry.toLowerCase().includes(q)) {
                results.push(c);
            }
        }

        if (sortParam === 'alpha') {
            results.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
        } else if (sortParam === 'activity') {
            const getContactScore = (client: Lead) => {
                let score = 0;
                if (allRepNotes[client.assignedTo]?.[client.id]) score += 10;
                if (presidentNotes[`${client.assignedTo}_${client.id}`]) score += 5;
                if (client.type === 'retention') score += 2;
                return score;
            };
            results.sort((a, b) => getContactScore(b) - getContactScore(a));
        }

        return results.slice(0, 100);
    }, [search, baseLeads, user?.role, selectedRepId, sortParam, allRepNotes, presidentNotes]);

    const selectedRepName = useMemo(() => {
        return REPS.find(r => r.id === selectedRepId)?.name || 'Wszyscy Handlowcy';
    }, [selectedRepId]);

    const crossSellAnalysis = useMemo(() => {
        if (!selectedClient) return null;

        // Match client by cleaning up common suffixes for better matching
        const cleanName = (name: string) => name.toLowerCase().replace(/sp\.? z o\.?o\.?/g, '').replace(/spółka z ograniczoną odpowiedzialnością/g, '').trim();
        const targetClean = cleanName(selectedClient.name);

        const clientSales = (rawData as Sale[]).filter(sale => {
            if (!sale.company) return false;
            const saleClean = cleanName(sale.company);
            return saleClean.includes(targetClean) || targetClean.includes(saleClean);
        });

        return analyzeClientPurchases(clientSales);
    }, [selectedClient]);

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div>
                        <div className={styles.breadcrumb}>
                            <h1 className={styles.title} onClick={() => { setSelectedRepId(null); setSelectedClient(null); }}>Baza Klientów</h1>
                            {(user?.role === 'admin' || user?.role === 'prezes') && selectedRepId && (
                                <div className={styles.repTag}>
                                    <ChevronRight size={20} />
                                    <span>{selectedRepName}</span>
                                </div>
                            )}
                        </div>
                        <p className={styles.subtitle}>
                            {selectedRepId ? `Portfel klientów handlowca: ${selectedRepName}` : 'Centralny rejestr kontrahentów i relacji B2B'}
                        </p>
                    </div>

                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Szukaj po nazwie, mieście lub branży..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
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
                        {(user?.role === 'admin' || user?.role === 'prezes') && !selectedRepId && search.length === 0 ? (
                            <>
                                <div className={styles.listHeader}>
                                    <span>Handlowcy / Portfele</span>
                                    <Users size={16} />
                                </div>
                                <div className={styles.repList}>
                                    {REPS.map(rep => (
                                        <div
                                            key={rep.id}
                                            className={styles.repItem}
                                            onClick={() => setSelectedRepId(rep.id)}
                                        >
                                            <div className={styles.repAvatar}>{rep.name[0]}</div>
                                            <div className={styles.repInfo}>
                                                <div className={styles.repName}>{rep.name}</div>
                                                <div className={styles.repStats}>
                                                    {repCounts[rep.id] || 0} Kontrahentów
                                                </div>
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
                                            <button className={styles.backBtn} onClick={() => { setSelectedRepId(null); setSelectedClient(null); }} title="Wróć do listy handlowców">
                                                <ChevronLeft size={16} />
                                            </button>
                                        )}
                                        <span>Klient / Branża</span>
                                    </div>
                                    <div className={styles.filterWrapper}>
                                        <Filter
                                            size={16}
                                            className={styles.filterIcon}
                                            style={{ opacity: showSortMenu ? 1 : 0.6 }}
                                            onClick={() => setShowSortMenu(!showSortMenu)}
                                        />
                                        {showSortMenu && (
                                            <div className={styles.sortMenu}>
                                                <button
                                                    onClick={() => { setSortParam('default'); setShowSortMenu(false); }}
                                                    className={`${styles.sortOption} ${sortParam === 'default' ? styles.sortOptionActive : ''}`}
                                                >
                                                    Domyślnie
                                                </button>
                                                <button
                                                    onClick={() => { setSortParam('alpha'); setShowSortMenu(false); }}
                                                    className={`${styles.sortOption} ${sortParam === 'alpha' ? styles.sortOptionActive : ''}`}
                                                >
                                                    Alfabetycznie (A-Z)
                                                </button>
                                                <button
                                                    onClick={() => { setSortParam('activity'); setShowSortMenu(false); }}
                                                    className={`${styles.sortOption} ${sortParam === 'activity' ? styles.sortOptionActive : ''}`}
                                                >
                                                    Ilość kontaktów
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div className={styles.clientList}>
                                    {filteredClients.map((client) => (
                                        <div
                                            key={client.id}
                                            className={`${styles.clientItem} ${selectedClient?.id === client.id ? styles.active : ''}`}
                                            onClick={() => setSelectedClient(client)}
                                        >
                                            <div className={styles.leadInfo}>
                                                <div className={styles.clientName}>
                                                    {client.name}
                                                    {hasCRMNote(selectedRepId || user?.username || '', client.id) && <MessageSquare size={12} className={styles.noteIndicator} />}
                                                </div>
                                                <div className={styles.clientDetails}>
                                                    <span className={styles.industryTag}>{client.industry}</span>
                                                    <span className={styles.dot}>•</span>
                                                    <span className={styles.cityText}>{client.city}</span>
                                                </div>
                                            </div>
                                            <div className={styles.clientPotential}>
                                                <div className={styles.potentialValue}>
                                                    {client.salesPotential || 'Nowy'}
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className={styles.arrow} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.detailSection}>
                        {selectedClient ? (
                            <div className={`${styles.detailCard} glass`}>
                                <div className={styles.detailHeader}>
                                    <div className={styles.detailAvatar}>{selectedClient.name[0]}</div>
                                    <div className={styles.detailTitle}>
                                        <h2>{selectedClient.name}</h2>
                                        <p>{selectedClient.industry} | {selectedClient.city}</p>
                                    </div>
                                </div>

                                <div className={styles.detailGrid}>
                                    <div className={styles.detailItem}>
                                        <Users size={18} />
                                        <div>
                                            <label>Decydent</label>
                                            <span>{selectedClient.person}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailItem} onClick={() => window.open(`tel:${selectedClient.phone}`)}>
                                        <PhoneCall size={18} />
                                        <div>
                                            <label>Telefon</label>
                                            <span className={styles.link}>{selectedClient.phone}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <Mail size={18} />
                                        <div>
                                            <label>Email</label>
                                            <span className={styles.link}>{selectedClient.email}</span>
                                        </div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <MapPin size={18} />
                                        <div>
                                            <label>Lokalizacja</label>
                                            <span>{selectedClient.city}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.detailBodyColumns}>
                                    <div className={styles.aiInsightSection}>
                                        <div className={styles.crmHeader}>
                                            <Search size={16} className={styles.aiIcon} />
                                            <h3>PROFIL BIZNESOWY</h3>
                                        </div>
                                        <div className={styles.aiInsightBox}>
                                            <p>
                                                {selectedClient.companyAnalysis}
                                            </p>
                                        </div>
                                    </div>

                                    {selectedClient.purchaseHistory && selectedClient.purchaseHistory !== "Brak historii zakupów." ? (
                                        <div className={styles.purchaseTableSection}>
                                            <div className={styles.crmHeader}>
                                                <Tags size={16} className={styles.orangeIcon} />
                                                <h3>HISTORIA ZAKUPÓW</h3>
                                            </div>
                                            <div className={styles.purchaseTableWrapper}>
                                                <table className={styles.purchaseTable}>
                                                    <thead>
                                                        <tr>
                                                            <th>Towar / Model</th>
                                                            <th className={styles.qtyHeader}>Sztuk</th>
                                                            <th className={styles.qtyHeader}>Wartość</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(() => {
                                                            const history = selectedClient.purchaseHistory.replace(/\\n/g, '\n');
                                                            const lines = history.split('\n').filter(l => l.includes('•'));
                                                            const totalLine = history.split('\n').find(l => l.includes('ŁĄCZNIE:'));

                                                            return (
                                                                <>
                                                                    {lines.map((line, lid) => {
                                                                        const cleanLine = line.replace('•', '').trim();
                                                                        const parts = cleanLine.split('|');
                                                                        const namePart = parts[0].trim();
                                                                        const qtyPart = parts[1] ? parts[1].replace('Ilość:', '').trim() : '?';
                                                                        const valuePart = parts[3] ? parts[3].replace('Wartość:', '').trim() : '';

                                                                        return (
                                                                            <tr key={lid}>
                                                                                <td>{namePart}</td>
                                                                                <td className={styles.purchaseQty}>{qtyPart}</td>
                                                                                <td className={styles.purchaseQty}>{valuePart}</td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                    {totalLine && (
                                                                        <tr className={styles.purchaseTotalRow}>
                                                                            <td>Suma zamówień</td>
                                                                            <td colSpan={2} className={`${styles.purchaseQty} ${styles.purchaseTotalValue}`}>
                                                                                {totalLine.replace('ŁĄCZNIE:', '').trim()}
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            );
                                                        })()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.purchaseTableSection}>
                                            <div className={styles.crmHeader}>
                                                <Tags size={16} className={styles.orangeIcon} />
                                                <h3>HISTORIA ZAKUPÓW</h3>
                                            </div>
                                            <div className={styles.purchaseTableWrapper + ' ' + styles.emptyPurchaseState}>
                                                <span>Brak historii zakupów</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {crossSellAnalysis && crossSellAnalysis.totalPurchases > 0 && (
                                    <div className={styles.crossSellSection}>
                                        <div className={styles.crmHeader}>
                                            <Target size={16} className={styles.crossSellTitle} />
                                            <h3 className={styles.crossSellTitle}>ANALIZA CROSS-SELL (Na podst. dotychczasowych zamówień)</h3>
                                        </div>
                                        <div className={styles.crossSellSummaryBox}>
                                            Suma pozycji w historii: <strong>{crossSellAnalysis.totalPurchases}</strong> | Kupionych sztuk: <strong>{crossSellAnalysis.totalQuantity}</strong>
                                        </div>
                                        {crossSellAnalysis.recommendations.map((rec, idx) => (
                                            <div key={idx} className={styles.crossSellBox}>
                                                <div className={styles.crossSellContent}>
                                                    <strong>⚠️ {rec.reason}</strong>
                                                    <span>👉 <strong>Zaproponuj:</strong> {rec.products}</span>
                                                    <em>Brak asortymentu: {rec.impact}</em>
                                                </div>
                                            </div>
                                        ))}
                                        {crossSellAnalysis.recommendations.length === 0 && (
                                            <div className={`${styles.crossSellBox} ${styles.crossSellBoxSuccess}`}>
                                                <div className={styles.crossSellContent}>
                                                    <strong>✅ Świetne portfolio zakupowe!</strong>
                                                    <span>Ten klient korzysta już z pełnego wachlarza asortymentu (Profile, Taśmy, Zasilacze, Smart Home). Pracuj nad wolumenem.</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}


                                <div className={styles.crmSection}>
                                    <div className={styles.noteField}>
                                        <div className={styles.crmHeader}>
                                            <MessageSquare size={16} className={styles.orangeIcon} />
                                            <h3>HISTORIA ROZMÓW / USTALENIA (HANDLOWIEC)</h3>
                                        </div>
                                        <div className={styles.readonlyNote}>
                                            {(allRepNotes[selectedClient.assignedTo] || {})[selectedClient.id] || 'Brak wpisanych ustaleń przez handlowca.'}
                                        </div>
                                    </div>

                                    <div className={styles.noteField}>
                                        <div className={styles.crmHeader}>
                                            <Shield size={16} className={styles.blueIcon} />
                                            <h3>UWAGI PREZESA</h3>
                                        </div>
                                        {(user?.role === 'admin' || user?.role === 'prezes') ? (
                                            <>
                                                <textarea
                                                    placeholder="Wpisz wytyczne dla handlowca odnośnie tego klienta..."
                                                    className={styles.crmTextarea}
                                                    value={presidentNotes[`${selectedClient.assignedTo}_${selectedClient.id}`] || ''}
                                                    onChange={(e) => setPresidentNotes({ ...presidentNotes, [`${selectedClient.assignedTo}_${selectedClient.id}`]: e.target.value })}
                                                />
                                                <button
                                                    className={`${styles.saveBtn} ${styles.blueBtn}`}
                                                    onClick={() => saveDirective(selectedClient.assignedTo, selectedClient.id, presidentNotes[`${selectedClient.assignedTo}_${selectedClient.id}`] || '')}
                                                >
                                                    <Save size={16} /> ZAPISZ UWAGI
                                                </button>
                                            </>
                                        ) : (
                                            <div className={`${styles.readonlyNote} ${styles.presidentNote}`}>
                                                {presidentNotes[`${selectedClient.assignedTo}_${selectedClient.id}`] || 'Brak aktualnych uwag od Prezesa.'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`${styles.emptyState} glass`}>
                                <Users size={48} />
                                <h3>Wybierz klienta z listy</h3>
                                <p>Aby zobaczyć szczegóły, dane kontaktowe i historię CRM</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

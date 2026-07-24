import React, { useState, useMemo } from 'react';
import {
    Users,
    Search,
    PhoneCall,
    Mail,
    MapPin,
    MessageSquare,
    Target,
    Tags,
    Save,
    Shield,
} from 'lucide-react';
import type { Lead } from '../../data/mockData';
import styles from '../../pages/Clients.module.css';

import rawData from '../../data/sales_data_parsed.json';
import { analyzeClientPurchases } from '../../utils/crossSell';
import type { Sale } from '../../utils/crossSell';

interface ClientDetailPanelProps {
    /** Wybrany klient do wyświetlenia. null = stan pusty */
    selectedClient: Lead | null;
    /** Notatki handlowca: { [clientId]: string } */
    repNotes: Record<string, string>;
    /** Callback do zapisu notatki handlowca */
    onSaveRepNote: (clientId: string, note: string) => void;
    /** Notatki prezesa: { [repId_clientId]: string } */
    presidentNotes: Record<string, string>;
    /** Callback do zapisu uwag prezesa */
    onSavePresidentNote: (repId: string, clientId: string, value: string) => void;
    /** Czy pokazywać sekcję UWAGI PREZESA */
    showPresidentNotes: boolean;
    /** Slot na dodatkowe akcje pod panelem (np. przyciski outcome handlowca) */
    actionSlot?: React.ReactNode;
}

export const ClientDetailPanel: React.FC<ClientDetailPanelProps> = ({
    selectedClient,
    repNotes,
    onSaveRepNote,
    presidentNotes,
    onSavePresidentNote,
    showPresidentNotes,
    actionSlot,
}) => {
    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);

    // Reset historii przy zmianie klienta
    const clientId = selectedClient?.id;
    React.useEffect(() => {
        setShowPurchaseHistory(false);
    }, [clientId]);

    const crossSellAnalysis = useMemo(() => {
        if (!selectedClient) return null;
        const cleanName = (name: string) =>
            name.toLowerCase()
                .replace(/sp\.? z o\.?o\.?/g, '')
                .replace(/spółka z ograniczoną odpowiedzialnością/g, '')
                .trim();
        const targetClean = cleanName(selectedClient.name);
        const clientSales = (rawData as Sale[]).filter(sale => {
            if (!sale.company) return false;
            const saleClean = cleanName(sale.company);
            return saleClean.includes(targetClean) || targetClean.includes(saleClean);
        });
        return analyzeClientPurchases(clientSales);
    }, [selectedClient]);

    if (!selectedClient) {
        return (
            <div className={`${styles.emptyState} glass`}>
                <Users size={48} />
                <h3>Wybierz klienta z listy</h3>
                <p>Aby zobaczyć szczegóły, dane kontaktowe i historię CRM</p>
            </div>
        );
    }

    const presidNoteKey = `${selectedClient.assignedTo}_${selectedClient.id}`;

    return (
        <div className={`${styles.detailCard} glass`}>
            {/* Nagłówek */}
            <div className={styles.detailHeader}>
                <div className={styles.detailAvatar}>{selectedClient.name[0]}</div>
                <div className={styles.detailTitle}>
                    <h2>{selectedClient.name}</h2>
                    <p>{selectedClient.industry} | {selectedClient.city}</p>
                </div>
            </div>

            {/* Dane kontaktowe */}
            <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                    <Users size={18} />
                    <div><label>Decydent</label><span>{selectedClient.person}</span></div>
                </div>
                <div className={styles.detailItem} onClick={() => window.open(`tel:${selectedClient.phone}`)}>
                    <PhoneCall size={18} />
                    <div><label>Telefon</label><span className={styles.link}>{selectedClient.phone}</span></div>
                </div>
                <div className={styles.detailItem}>
                    <Mail size={18} />
                    <div><label>Email</label><span className={styles.link}>{selectedClient.email}</span></div>
                </div>
                <div className={styles.detailItem}>
                    <MapPin size={18} />
                    <div><label>Lokalizacja</label><span>{selectedClient.city}</span></div>
                </div>
            </div>

            {/* Profil biznesowy + Historia zakupów */}
            <div className={styles.detailBodyColumns}>
                <div className={styles.aiInsightSection}>
                    <div className={styles.crmHeader}>
                        <Search size={16} className={styles.aiIcon} />
                        <h3>PROFIL BIZNESOWY</h3>
                    </div>
                    <div className={styles.aiInsightBox}>
                        <p>{selectedClient.companyAnalysis}</p>
                    </div>
                </div>

                {selectedClient.purchaseHistory && selectedClient.purchaseHistory !== 'Brak historii zakupów.' ? (
                    <div className={styles.purchaseTableSection}>
                        <div className={styles.historyHeader}>
                            <div className={styles.crmHeader}>
                                <Tags size={16} className={styles.orangeIcon} />
                                <h3>HISTORIA ZAKUPÓW</h3>
                            </div>
                            <button
                                className={styles.toggleHistoryBtn}
                                onClick={() => setShowPurchaseHistory(p => !p)}
                            >
                                {showPurchaseHistory ? '▲ Zwiń' : '▼ Pokaż historię'}
                            </button>
                        </div>
                        {showPurchaseHistory && (
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
                        )}
                    </div>
                ) : (
                    <div className={styles.purchaseTableSection}>
                        <div className={styles.crmHeader}>
                            <Tags size={16} className={styles.orangeIcon} />
                            <h3>HISTORIA ZAKUPÓW</h3>
                        </div>
                        <div className={`${styles.purchaseTableWrapper} ${styles.emptyPurchaseState}`}>
                            <span>Brak historii zakupów</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Cross-sell */}
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

            {/* CRM: notatki handlowca + uwagi prezesa */}
            <div className={styles.crmSection}>
                <div className={styles.noteField}>
                    <div className={styles.crmHeader}>
                        <MessageSquare size={16} className={styles.orangeIcon} />
                        <h3>HISTORIA ROZMÓW / USTALENIA (HANDLOWIEC)</h3>
                    </div>
                    <textarea
                        placeholder="Wpisz notatki z rozmowy, ustalenia, kolejne kroki..."
                        className={styles.crmTextarea}
                        value={repNotes[selectedClient.id] || ''}
                        onChange={(e) => onSaveRepNote(selectedClient.id, e.target.value)}
                    />
                </div>

                {showPresidentNotes && (
                    <div className={styles.noteField}>
                        <div className={styles.crmHeader}>
                            <Shield size={16} className={styles.blueIcon} />
                            <h3>UWAGI PREZESA</h3>
                        </div>
                        <textarea
                            placeholder="Wpisz wytyczne dla handlowca odnośnie tego klienta..."
                            className={styles.crmTextarea}
                            value={presidentNotes[presidNoteKey] || ''}
                            onChange={(e) =>
                                onSavePresidentNote(selectedClient.assignedTo, selectedClient.id, e.target.value)
                            }
                        />
                        <button
                            className={`${styles.saveBtn} ${styles.blueBtn}`}
                            onClick={() =>
                                onSavePresidentNote(selectedClient.assignedTo, selectedClient.id, presidentNotes[presidNoteKey] || '')
                            }
                        >
                            <Save size={16} /> ZAPISZ UWAGI
                        </button>
                    </div>
                )}
            </div>

            {/* Slot na zewnętrzne akcje (np. przyciski outcome handlowca) */}
            {actionSlot}
        </div>
    );
};

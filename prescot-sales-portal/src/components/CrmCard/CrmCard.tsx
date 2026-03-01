/**
 * CrmCard – JEDYNY widok karty kontrahenta w systemie.
 * Używany w: WeeklyPlan (modal), Clients (inline), Dashboard (inline).
 *
 * isPresidentView=false → handlowiec: RAPORT edytowalny + przyciski akcji, BEZ wytycznych zarządu
 * isPresidentView=true  → prezes: RAPORT readonly + WYTYCZNE ZARZĄDU edytowalne
 * onClose=undefined     → tryb inline (bez X i "ZAPISZ I ZAMKNIJ")
 * onPostponeRequest     → kliknięcie "ODŁÓŻ W CZASIE" otwiera terminarz w rodzicu
 */
import React, { useState } from 'react';
import { MessageSquare, Shield, Search, Zap, TrendingUp, X } from 'lucide-react';
import type { Lead } from '../../data/mockData';
import rawSales from '../../data/sales_data_parsed.json';
import styles from '../../pages/WeeklyPlan.module.css';

interface CrmCardProps {
    lead: Lead;
    repNote: string;
    onRepNoteChange: (note: string) => void;
    presidentNote: string;
    onPresidentNoteChange: (note: string) => void;
    isPresidentView: boolean;
    taskStatus?: 'success' | 'postponed' | 'rejected' | 'pending';
    onSetTaskStatus?: (status: 'success' | 'postponed' | 'rejected') => void;
    /** Callback otwierający date picker – gdy podany, ODŁÓŻ W CZASIE go wywołuje */
    onPostponeRequest?: () => void;
    /** Tryb MODAL: pokazuje X + "ZAPISZ I ZAMKNIJ" */
    onClose?: () => void;
    /** Slot na dodatkowe akcje (np. duże przyciski outcome w Dashboard) */
    actionSlot?: React.ReactNode;
}

export const CrmCard: React.FC<CrmCardProps> = ({
    lead,
    repNote,
    onRepNoteChange,
    presidentNote,
    onPresidentNoteChange,
    isPresidentView,
    taskStatus,
    onSetTaskStatus,
    onPostponeRequest,
    onClose,
    actionSlot,
}) => {
    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);

    // Purchase history is now collapsed by default as requested.

    const handlePostpone = () => {
        if (onPostponeRequest) {
            onPostponeRequest();
        } else {
            onSetTaskStatus?.('postponed');
        }
    };

    return (
        <div
            className={`${styles.modal} glass led-glow ${!onClose ? styles.inlineCard : ''}`}
        >
            {/* ── Nagłówek ── */}
            <div className={styles.modalHeader}>
                <div>
                    <div className={styles.modalTag}>KARTA CRM</div>
                    <h3 className={styles.futuristicTitle}>{lead.name.toUpperCase()}</h3>
                </div>
                {onClose && (
                    <button className={styles.closeIconBtn} onClick={onClose} title="Zamknij">
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* ── Body ── */}
            <div className={styles.modalBody}>
                <div className={styles.modalSplitLayout}>

                    {/* ← Lewa kolumna */}
                    <div className={styles.modalLeftColumn}>
                        <div className={styles.crmSectionBlock}>
                            <label className={styles.noteLabel}>
                                <MessageSquare size={14} className={styles.orangeIcon} /> RAPORT HANDLOWCA
                            </label>

                            {!isPresidentView ? (
                                <>
                                    {onSetTaskStatus && (
                                        <div className={styles.statusButtonGroup}>
                                            <button
                                                className={`${styles.statusBtnSmall} ${styles.statusSuccess} ${taskStatus === 'success' ? styles.active : ''}`}
                                                onClick={() => onSetTaskStatus('success')}
                                            >
                                                SUKCES
                                            </button>
                                            <button
                                                className={`${styles.statusBtnSmall} ${styles.statusPostponed} ${taskStatus === 'postponed' ? styles.active : ''}`}
                                                onClick={handlePostpone}
                                            >
                                                📅 ODŁÓŻ W CZASIE
                                            </button>
                                            <button
                                                className={`${styles.statusBtnSmall} ${styles.statusRejected} ${taskStatus === 'rejected' ? styles.active : ''}`}
                                                onClick={() => onSetTaskStatus('rejected')}
                                            >
                                                BRAK ZAINT.
                                            </button>
                                        </div>
                                    )}
                                    <textarea
                                        value={repNote || ''}
                                        onChange={(e) => onRepNoteChange(e.target.value)}
                                        className={styles.modalTextarea}
                                        placeholder="Główne ustalenia z rozmowy..."
                                    />
                                </>
                            ) : (
                                <div className={styles.readonlyNote}>
                                    {repNote || 'Brak wpisów handlowca.'}
                                </div>
                            )}
                        </div>

                        {isPresidentView && (
                            <div className={styles.crmSectionBlock}>
                                <label className={styles.noteLabel}>
                                    <Shield size={14} className={styles.blueIcon} /> WYTYCZNE ZARZĄDU
                                </label>
                                <textarea
                                    value={presidentNote || ''}
                                    onChange={(e) => onPresidentNoteChange(e.target.value)}
                                    className={styles.modalTextarea}
                                    placeholder="Twoje sugestie dla handlowca..."
                                />
                            </div>
                        )}
                    </div>

                    {/* → Prawa kolumna: Analiza + Historia + Wytyczna systemu */}
                    <div className={styles.modalRightColumn}>

                        {/* Link do Google Serch (Zamiast AI Bzdur) */}
                        <div className={styles.aiInsightSection}>
                            <label className={styles.noteLabel}>
                                <Search size={14} className={styles.orangeIcon} /> WERYFIKACJA FIRMY (ZEWNĘTRZNA)
                            </label>
                            <div className={styles.aiInsightBox}>
                                <button
                                    className={styles.googleSearchBtn}
                                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(lead.name + ' ' + (lead.city || ''))}`, '_blank')}
                                >
                                    <Search size={16} />
                                    SPRAWDŹ FIRMĘ W GOOGLE
                                </button>
                                <p className={styles.searchSubtext}>
                                    Otwiera wyniki wyszukiwania dla: <strong>{lead.name} {lead.city}</strong>
                                </p>
                            </div>
                        </div>

                        {/* Historia zakupów */}
                        <div className={styles.aiInsightSection}>
                            <div className={styles.historyHeader}>
                                <label className={styles.noteLabel}>
                                    <TrendingUp size={14} className={styles.orangeIcon} /> HISTORIA ZAKUPÓW (DATA/INDEX/KWOTA)
                                </label>
                                <button
                                    className={styles.toggleHistoryBtn}
                                    onClick={() => setShowPurchaseHistory(p => !p)}
                                >
                                    {showPurchaseHistory ? '▲ Zwiń' : '▼ Pokaż historię'}
                                </button>
                            </div>
                            {showPurchaseHistory && (
                                <div className={`${styles.aiInsightBox} ${styles.scrollableHistory}`}>
                                    <table className={styles.purchaseTable}>
                                        <thead>
                                            <tr>
                                                <th>PRODUKT / INDEKS</th>
                                                <th>ILOŚĆ</th>
                                                <th>CENA</th>
                                                <th>WARTOŚĆ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                // 1.5 Dynamic ERP Lookup for data consistency
                                                const cleanName = (n: string) => (n || '').toLowerCase()
                                                    .replace(/sp\.? z o\.?o\.?/g, '')
                                                    .replace(/spółka z ograniczoną odpowiedzialnością/g, '')
                                                    .trim();
                                                const targetName = cleanName(lead.name);
                                                const erpSales = (rawSales as Array<{ company?: string; product: string; quantity: number; year: number }>).filter(s => {
                                                    const sName = cleanName(s.company || '');
                                                    return sName.includes(targetName) || targetName.includes(sName);
                                                });

                                                if (erpSales.length > 0 && (!lead.purchaseHistory || lead.purchaseHistory.includes('Brak historii'))) {
                                                    const erpRows = erpSales.slice(0, 8).map((sale, sidx) => (
                                                        <tr key={`erp-${sidx}`}>
                                                            <td className={styles.productCell}>{sale.product}</td>
                                                            <td className={styles.qtyCell}>{sale.quantity}</td>
                                                            <td className={styles.priceCell}>LOG ERP</td>
                                                            <td className={styles.totalCell}>{sale.year}</td>
                                                        </tr>
                                                    ));
                                                    const totalQty = erpSales.reduce((acc, s) => acc + s.quantity, 0);
                                                    return (
                                                        <>
                                                            {erpRows}
                                                            <tr key="total-erp" className={styles.totalRow}>
                                                                <td className={styles.totalLabelCell} colSpan={2}>ŁĄCZNIE (Z LOGÓW ERP)</td>
                                                                <td className={styles.totalValueCell} colSpan={2}>{totalQty} szt.</td>
                                                            </tr>
                                                        </>
                                                    );
                                                }

                                                if (!lead.purchaseHistory || lead.purchaseHistory.includes('Brak historii')) {
                                                    return (
                                                        <tr>
                                                            <td colSpan={4} className={styles.historyLine}>Brak historii zakupów.</td>
                                                        </tr>
                                                    );
                                                }

                                                // 1. Wyodrębnij część podsumowującą (ŁĄCZNIE) jeśli istnieje
                                                let mainHistory = lead.purchaseHistory;
                                                let totalSummary = '';
                                                if (mainHistory.includes('ŁĄCZNIE:')) {
                                                    const splitPoint = mainHistory.indexOf('ŁĄCZNIE:');
                                                    totalSummary = mainHistory.substring(splitPoint).replace('ŁĄCZNIE:', '').trim();
                                                    mainHistory = mainHistory.substring(0, splitPoint);
                                                }

                                                // 2. Renderuj produkty
                                                const rows = mainHistory.split('•').filter(t => t.trim()).map((item, idx) => {
                                                    const parts = item.split('|').map(p => p.trim());
                                                    let product = parts[0] || '';
                                                    // Czyść kropkę na początku
                                                    if (product.startsWith('•')) product = product.substring(1).trim();

                                                    const qty = parts.find(p => p.toLowerCase().includes('ilość'))?.split(':')[1]?.trim() || '-';
                                                    const price = parts.find(p => p.toLowerCase().includes('cena'))?.split(':')[1]?.trim() || '-';
                                                    let total = parts.find(p => p.toLowerCase().includes('wartość'))?.split(':')[1]?.trim() || '-';

                                                    // Usuń "ŁĄCZNIE" z komórki jeśli tam trafiło
                                                    if (total.toUpperCase().includes('ŁĄCZNIE')) {
                                                        total = total.split(/ŁĄCZNIE/i)[0].trim();
                                                    }

                                                    return (
                                                        <tr key={idx}>
                                                            <td className={styles.productCell}>{product}</td>
                                                            <td className={styles.qtyCell}>{qty}</td>
                                                            <td className={styles.priceCell}>{price}</td>
                                                            <td className={styles.totalCell}>{total}</td>
                                                        </tr>
                                                    );
                                                });

                                                // 3. Dodaj wiersz podsumowania na końcu - pełna wartość
                                                if (totalSummary) {
                                                    rows.push(
                                                        <tr key="total-row" className={styles.totalRow}>
                                                            <td className={styles.totalLabelCell} colSpan={2}>ŁĄCZNIE</td>
                                                            <td className={styles.totalValueCell} colSpan={2}>{totalSummary}</td>
                                                        </tr>
                                                    );
                                                }

                                                return rows;
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Inteligentna wytyczna */}
                        <div className={styles.aiInsightSection}>
                            <label className={styles.noteLabel}>
                                <Zap size={14} className={styles.blueIcon} /> INTELIGENTNA WYTYCZNA Z SYSTEMU
                            </label>
                            <div className={`${styles.aiInsightBox} ${styles.suggestionBox}`}>
                                <p className={styles.directiveText}>
                                    {presidentNote || lead.suggestions || 'Brak aktywnych wytycznych Mastermind dla tego klienta.'}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer (modal mode) */}
            {onClose && (
                <div className={styles.modalFooter}>
                    <button className={styles.saveBtn} onClick={onClose}>ZAPISZ I ZAMKNIJ</button>
                </div>
            )}

            {actionSlot}
        </div>
    );
};

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
    /** Inteligentna wytyczna Masterminda (System) */
    mastermindDirective?: string;
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
    mastermindDirective,
    actionSlot,
}) => {
    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

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

                        <div className={styles.crmSectionBlock}>
                            <label className={styles.noteLabel}>
                                <Shield size={14} className={styles.blueIcon} /> WYTYCZNE ZARZĄDU
                            </label>
                            {isPresidentView ? (
                                <textarea
                                    value={presidentNote || ''}
                                    onChange={(e) => onPresidentNoteChange(e.target.value)}
                                    className={styles.modalTextarea}
                                    placeholder="Twoje sugestie dla handlowca..."
                                />
                            ) : (
                                <div className={styles.readonlyNote}>
                                    {presidentNote || 'Brak dodatkowych wytycznych od zarządu.'}
                                </div>
                            )}
                        </div>
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
                                                const cleanName = (n: string) => (n || '').toLowerCase()
                                                    .replace(/sp\.? z o\.?o\.?/g, '')
                                                    .replace(/spółka z ograniczoną odpowiedzialnością/g, '')
                                                    .trim();
                                                const targetName = cleanName(lead.name);
                                                const erpSales = (rawSales as any[]).filter(s => {
                                                    const sName = cleanName(s.company || '');
                                                    return sName.includes(targetName) || targetName.includes(sName);
                                                });

                                                const salesByYear = erpSales.reduce((acc: Record<string, any[]>, sale) => {
                                                    const yearMatch = sale.year?.toString().match(/\d{4}/);
                                                    const year = yearMatch ? yearMatch[0] : 'Inne';
                                                    if (!acc[year]) acc[year] = [];
                                                    acc[year].push(sale);
                                                    return acc;
                                                }, {});

                                                const availableYears = Object.keys(salesByYear).sort((a, b) => b.localeCompare(a));
                                                const activeYear = selectedYear || availableYears[0];

                                                if (availableYears.length === 0) {
                                                    return (
                                                        <tr>
                                                            <td colSpan={4} className={styles.historyLine}>Brak historii zakupów w bazie ERP.</td>
                                                        </tr>
                                                    );
                                                }

                                                return (
                                                    <>
                                                        <tr>
                                                            <td colSpan={4} style={{ padding: '5px 15px' }}>
                                                                <div className={styles.yearTabs}>
                                                                    {availableYears.map(yr => (
                                                                        <button
                                                                            key={yr}
                                                                            className={`${styles.yearTab} ${activeYear === yr ? styles.yearTabActive : ''}`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setSelectedYear(yr);
                                                                            }}
                                                                        >
                                                                            {yr}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {salesByYear[activeYear]?.map((sale, sidx) => (
                                                            <tr key={`${activeYear}-${sidx}`}>
                                                                <td className={styles.productCell}>{sale.product}</td>
                                                                <td className={styles.qtyCell}>{sale.quantity}</td>
                                                                <td className={styles.priceCell}>{sale.price || '0.00'}</td>
                                                                <td className={styles.totalCell}>{sale.value || '0.00'} PLN</td>
                                                            </tr>
                                                        ))}
                                                        <tr className={styles.totalRow}>
                                                            <td className={styles.totalLabelCell} colSpan={2}>PODSUMOWANIE ROKU {activeYear}</td>
                                                            <td className={styles.totalValueCell} colSpan={2}>
                                                                {salesByYear[activeYear]?.reduce((acc, s) => acc + (s.value || 0), 0).toFixed(2)} PLN
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
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
                                    {mastermindDirective || lead.suggestions || 'Brak aktywnych wytycznych Mastermind dla tego klienta.'}
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

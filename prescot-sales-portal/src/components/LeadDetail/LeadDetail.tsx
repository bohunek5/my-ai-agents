import React, { useMemo } from 'react';
import {
    MessageSquare,
    Shield,
    Search,
    Tags,
    Zap,
    X
} from 'lucide-react';
import type { Lead } from '../../data/mockData';
import styles from './LeadDetail.module.css';

interface LeadDetailProps {
    lead: Lead;
    repNotes?: string;
    presidentNote?: string;
    onSavePresidentNote?: (note: string) => void;
    onSaveRepNote?: (note: string) => void;
    onClose?: () => void;
    isPrezes?: boolean;
}

export const LeadDetail: React.FC<LeadDetailProps> = ({
    lead,
    repNotes,
    presidentNote,
    onSavePresidentNote,
    onSaveRepNote,
    onClose,
    isPrezes
}) => {
    const renderPurchaseHistory = () => {
        if (!lead.purchaseHistory || lead.purchaseHistory === "Brak historii zakupów.") {
            return <div className={styles.emptyState}>Brak historii zakupów.</div>;
        }

        const history = lead.purchaseHistory.replace(/\\n/g, '\n');
        const lines = history.split('\n').filter(l => l.includes('•'));

        return (
            <table className={styles.historyTable}>
                <tbody>
                    {lines.map((line, lid) => {
                        const cleanLine = line.replace('•', '').trim();
                        const parts = cleanLine.split('|');
                        const namePart = parts[0].trim();
                        const qtyPart = parts[1] ? parts[1].replace('Ilość:', '').trim() : '';
                        const pricePart = parts[2] ? parts[2].replace('Cena:', '').trim().replace('Cena śr.:', '').trim() : '';
                        const valuePart = parts[3] ? parts[3].replace('Wartość:', '').trim() : '';

                        return (
                            <tr key={lid}>
                                <td>{namePart}</td>
                                <td>{qtyPart && `Ilość: ${qtyPart}`}</td>
                                <td className={styles.qty}>
                                    {pricePart && <div className={styles.unitPrice}>Cena: {pricePart}</div>}
                                    {valuePart && <div className={styles.rowValue}>Wartość: {valuePart}</div>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.topHeader}>
                <div className={styles.kartaCrmLabel}>KARTA CRM</div>
                <div className={styles.leadName}>{lead.name.toUpperCase()}</div>
                {onClose && (
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className={styles.contentGrid}>
                {/* Left Column: Notes & Directives */}
                <div className={styles.leftCol}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <MessageSquare size={16} className={styles.orangeIcon} />
                            RAPORT HANDLOWCA
                        </div>
                        <textarea
                            className={styles.textarea}
                            defaultValue={repNotes}
                            onChange={(e) => onSaveRepNote?.(e.target.value)}
                            placeholder="Brak wpisów handlowca."
                        />
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <Shield size={16} className={styles.blueIcon} />
                            WYTYCZNE ZARZĄDU
                        </div>
                        {isPrezes ? (
                            <textarea
                                className={`${styles.textarea} ${styles.presidentInput}`}
                                value={presidentNote}
                                onChange={(e) => onSavePresidentNote?.(e.target.value)}
                                placeholder="Wpisz wytyczne dla handlowca..."
                            />
                        ) : (
                            <div className={styles.insightBox}>
                                {presidentNote || "Brak wytycznych od Zarządu."}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Analysis & History */}
                <div className={styles.rightCol}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <Search size={16} className={styles.orangeIcon} />
                            ANALIZA PROFILU (GOOGLE/ERP)
                        </div>
                        <div className={styles.insightBox}>
                            {lead.companyAnalysis || "Brak dodatkowych informacji."}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <Tags size={16} className={styles.orangeIcon} />
                            HISTORIA ZAKUPÓW (DATA/INDEX/KWOTA)
                        </div>
                        <div className={styles.tableWrapper}>
                            {renderPurchaseHistory()}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <Zap size={16} className={styles.blueIcon} />
                            INTELIGENTNA WYTYCZNA Z SYSTEMU
                        </div>
                        <div className={`${styles.insightBox} ${styles.systemDirective}`}>
                            {lead.suggestions || "Brak systemowych sugestii."}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <button className={styles.saveButton} onClick={onClose}>
                    ZAPISZ I ZAMKNIJ
                </button>
            </div>
        </div>
    );
};

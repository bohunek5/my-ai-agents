import { ALL_LEADS } from '../data/mockData';
import rawSales from '../data/sales_data_parsed.json';
import { analyzeClientPurchases } from './crossSell';
import type { Sale } from './crossSell';

export interface MastermindResult {
    repId: string;
    clientId: string;
    clientName: string;
    directive: string;
    type: 'QUICK_WIN' | 'CHURN' | 'REGRESSION' | 'SYSTEMATIC';
    score: number; // For ranking
}

export interface WeeklyPlanDistribution {
    [repId: string]: {
        [day: string]: string[]; // Array of client IDs
    };
}

export function runMastermindAnalysis() {
    const results: MastermindResult[] = [];
    const sales = rawSales as Sale[];

    // Group sales by company for faster access
    const salesByCompany: Record<string, Sale[]> = {};

    const cleanName = (name: string) => (name || '').toLowerCase()
        .replace(/sp\.? z o\.?o\.?/g, '')
        .replace(/spółka z ograniczoną odpowiedzialnością/g, '')
        .trim();

    const leadNames = new Set(ALL_LEADS.map(l => cleanName(l.name)));

    sales.forEach(sale => {
        if (!sale.company) return;
        const cName = cleanName(sale.company);
        if (leadNames.has(cName)) {
            if (!salesByCompany[cName]) salesByCompany[cName] = [];
            salesByCompany[cName].push(sale);
        }
    });

    ALL_LEADS.forEach(lead => {
        const cName = cleanName(lead.name);
        const clientSales = salesByCompany[cName] || [];
        const analysis = analyzeClientPurchases(clientSales);

        let score = 0;
        let directive = '';
        let type: MastermindResult['type'] = 'SYSTEMATIC';

        // 1. QUICK WIN: 3/4 major categories
        const categoriesBought = analysis.boughtCategories.map(c => c.name);
        const majorCats = ['Profile i Oprawy', 'Taśmy LED / Światło', 'Zasilacze', 'Sterowanie (Smart Home)'];
        const boughtMajorsCount = majorCats.filter(c => categoriesBought.includes(c)).length;

        if (boughtMajorsCount === 3 && analysis.totalPurchases > 0) {
            const missing = majorCats.find(c => !categoriesBought.includes(c));
            directive = `💸 SZANSA (Cross-sell): Kupuje wszystko poza ${missing}. Idealny moment na domknięcie kompletu.`;
            type = 'QUICK_WIN';
            score = 100 + analysis.totalQuantity / 1000;
        }

        // 2. CHURN ALERT: Bought in 2024/2025 but missing in 2026 (current year)
        const hasHistory = clientSales.some(s => s.year === '2024' || s.year === '2025');
        const hasCurrent = clientSales.some(s => s.year === '2026');

        if (hasHistory && !hasCurrent) {
            directive = `⚠️ ALARM CHURN (2026): Klient był aktywny w ubiegłym roku, ale w 2026 jeszcze nic nie zamówił. Potrzebny pilny kontakt "odgrzewający".`;
            type = 'CHURN';
            score = 80 + analysis.totalQuantity / 1000;
        }

        // 3. REGRESSION: Significant drop (2025 vs 2024)
        const qty2024 = clientSales.filter(s => s.year === '2024').reduce((acc, s) => acc + s.quantity, 0);
        const qty2025 = clientSales.filter(s => s.year === '2025').reduce((acc, s) => acc + s.quantity, 0);

        if (qty2024 > 100 && qty2025 < qty2024 * 0.45 && type === 'SYSTEMATIC') {
            directive = `📉 REGRESJA WOLUMENU: Drastyczny spadek zamówień (-${Math.round((1 - qty2025 / qty2024) * 100)}%) w roku 2025 względem 2024. Sprawdź czy nie przeszedł do konkurencji!`;
            type = 'REGRESSION';
            score = 60 + analysis.totalQuantity / 1000;
        }

        if (directive) {
            results.push({
                repId: lead.assignedTo,
                clientId: lead.id,
                clientName: lead.name,
                directive,
                type,
                score
            });
        }
    });

    // Sort by score descending
    const sortedResults = results.sort((a, b) => b.score - a.score);

    // Filter target reps mentioned by user
    const targetReps = ['annag', 'dariuszn', 'annaa', 'adamg'];
    const distribution: WeeklyPlanDistribution = {};
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];

    targetReps.forEach(repId => {
        distribution[repId] = {};
        const repResults = sortedResults.filter(r => r.repId === repId);

        days.forEach((day, dIdx) => {
            // Take 3 items for each day from chronological list
            const start = dIdx * 3;
            const dayClients = repResults.slice(start, start + 3).map(r => r.clientId);
            distribution[repId][day] = dayClients;
        });
    });

    return {
        directives: sortedResults,
        plan: distribution
    };
}

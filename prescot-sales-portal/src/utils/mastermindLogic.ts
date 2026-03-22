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
    score: number;
}

export interface WeeklyPlanDistribution {
    reps: {
        [repId: string]: {
            [day: string]: string[];
        };
    };
    metadata: {
        generatedAt: string;
        rotationOffset: number;
        report?: string;
    };
}

export function runMastermindAnalysis(): { directives: MastermindResult[], plan: WeeklyPlanDistribution } {
    const results: MastermindResult[] = [];
    const sales = rawSales as Sale[];
    
    // Load used leads from localStorage to ensure uniqueness
    const usedLeadsKey = 'prescot_used_leads';
    const usedLeads: string[] = JSON.parse(localStorage.getItem(usedLeadsKey) || '[]');

    const cleanName = (name: string) => (name || '').toLowerCase()
        .replace(/sp\.? z o\.?o\.?/g, '')
        .replace(/spółka z ograniczoną odpowiedzialnością/g, '')
        .trim();

    const leadNames = new Set(ALL_LEADS.map(l => cleanName(l.name)));
    const salesByCompany: Record<string, Sale[]> = {};

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

        const categoriesBought = analysis.boughtCategories.map(c => c.name);
        const majorCats = ['Profile i Oprawy', 'Taśmy LED / Światło', 'Zasilacze', 'Sterowanie (Smart Home)'];
        const boughtMajorsCount = majorCats.filter(c => categoriesBought.includes(c)).length;

        if (boughtMajorsCount === 3 && analysis.totalPurchases > 0) {
            const missing = majorCats.find(c => !categoriesBought.includes(c));
            directive = `💸 SZANSA (Cross-sell): Kupuje wszystko poza ${missing}. Idealny moment na domknięcie kompletu.`;
            type = 'QUICK_WIN';
            score = 100 + analysis.totalQuantity / 1000;
        }

        const hasHistory = clientSales.some(s => s.year === '2024' || s.year === '2025');
        const hasCurrent = clientSales.some(s => s.year === '2026');

        if (hasHistory && !hasCurrent) {
            directive = `⚠️ ALARM CHURN (2026): Klient był aktywny w ubiegłym roku, ale w 2026 jeszcze nic nie zamówił. Potrzebny pilny kontakt "odgrzewający".`;
            type = 'CHURN';
            score = 80 + analysis.totalQuantity / 1000;
        }

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

    const sortedResults = results.sort((a, b) => b.score - a.score);
    const targetReps = ['annag', 'dariuszn', 'annaa', 'adamg', 'iwonab'];
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

    const offsetKey = 'prescot_mastermind_rotation_offset';
    const currentOffset = parseInt(localStorage.getItem(offsetKey) || '0');

    let totalStrategic = 0;
    let totalStandard = 0;
    const currentSessionUsed: string[] = [];

    const distribution: WeeklyPlanDistribution = {
        reps: {},
        metadata: {
            generatedAt: new Date().toISOString(),
            rotationOffset: currentOffset
        }
    };

    targetReps.forEach(repId => {
        distribution.reps[repId] = {};
        
        // 1. Get strategic leads for this rep, excluding those used in recent weeks OR this session
        const repResults = sortedResults.filter(r => 
            r.repId === repId && 
            !usedLeads.includes(r.clientId) && 
            !currentSessionUsed.includes(r.clientId)
        );

        // 2. Prepare pool: Take top strategic ones (up to 21)
        let selectionPool = repResults.slice(0, 21).map(r => r.clientId);
        totalStrategic += selectionPool.length;

        // 3. Fallback: If less than 21, add regular customers
        if (selectionPool.length < 21) {
            const fallbackCount = 21 - selectionPool.length;
            const regularCustomers = ALL_LEADS.filter(l => 
                l.assignedTo === repId && 
                !selectionPool.includes(l.id) && 
                !usedLeads.includes(l.id) &&
                !currentSessionUsed.includes(l.id)
            );
            
            const selectedFallbacks = regularCustomers.slice(0, fallbackCount).map(l => l.id);
            selectionPool = [...selectionPool, ...selectedFallbacks];
            totalStandard += selectedFallbacks.length;
        }

        currentSessionUsed.push(...selectionPool);

        // 4. Distribute into days (3 per day)
        days.forEach((day, dIdx) => {
            distribution.reps[repId][day] = selectionPool.slice(dIdx * 3, (dIdx * 3) + 3);
        });
    });

    // Update global used leads (keep last 100 for variety)
    const nextUsedLeads = [...currentSessionUsed, ...usedLeads].slice(0, 100);
    localStorage.setItem(usedLeadsKey, JSON.stringify(nextUsedLeads));

    // Intelligence Report
    const report = `AGENT MASTERMIND: Przeanalizowano bazę ERP (${sales.length} transakcji). Wykryto ${results.length} okazji strategicznych. Ułożono plan dla 5 handlowców: wybrano ${totalStrategic} okazji (Cross-sell/Churn) oraz ${totalStandard} stałych klientów (Fallback). Całość na bazie unikalnej puli (bez powtórzeń z ubiegłych tygodni).`;
    distribution.metadata.report = report;

    return {
        directives: sortedResults,
        plan: distribution
    };
}

export function resetMastermindRotation() {
    localStorage.removeItem('prescot_mastermind_rotation_offset');
    localStorage.removeItem('prescot_mastermind_plan');
    localStorage.removeItem('prescot_used_leads');
    const targetReps = ['annag', 'dariuszn', 'annaa', 'adamg', 'iwonab'];
    targetReps.forEach(repId => {
        localStorage.removeItem(`prescot_tasks_${repId}`);
        localStorage.removeItem(`prescot_notes_${repId}`);
    });
}

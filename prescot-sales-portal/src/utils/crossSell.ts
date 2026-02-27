export interface Sale {
    year: string | null;
    quarter: string | null;
    rep: string | null;
    company: string | null;
    product: string;
    sku: string;
    quantity: number;
}

export interface CategoryData {
    name: string;
    keywords: string[];
    bought: boolean;
    quantity: number;
}

const CATEGORIES = [
    { name: 'Profile i Oprawy', keywords: ['profil', 'pds', 'micro', 'liger', 'kozus', 'lipod', 'oprawa', 'aluminiow'] },
    { name: 'Taśmy LED / Światło', keywords: ['taśma', 'led', 'cob', 'smd', 'lumen', 'moduł'] },
    { name: 'Zasilacze', keywords: ['zasilacz', 'scharfer', 'hermetyczn', 'montażow', 'wtyczkow', 'mean well', 'pos'] },
    { name: 'Osłonki / Dyfuzory', keywords: ['osłona', 'ka-com', 'mleczn', 'przeźroczyst', 'hs-22', 'dyfuzor'] },
    { name: 'Sterowanie (Smart Home)', keywords: ['pilot', 'sterownik', 'milight', 'ściemniacz', 'kontroler', 'blebox'] },
    { name: 'Akcesoria i Złącza', keywords: ['przewód', 'złączka', 'łącznik', 'zaślepka', 'wago', 'wkręt'] }
];

export function analyzeClientPurchases(clientSales: Sale[]) {
    // Determine categories bought
    const analysis: Record<string, CategoryData> = {};

    for (const cat of CATEGORIES) {
        analysis[cat.name] = {
            name: cat.name,
            keywords: cat.keywords,
            bought: false,
            quantity: 0
        };
    }

    // Find bought categories
    for (const sale of clientSales) {
        const textToSearch = (sale.product + ' ' + (sale.sku || '')).toLowerCase();

        for (const cat of CATEGORIES) {
            if (cat.keywords.some(kw => textToSearch.includes(kw))) {
                analysis[cat.name].bought = true;
                analysis[cat.name].quantity += sale.quantity;
            }
        }
    }

    const boughtCategories = Object.values(analysis).filter(c => c.bought);
    const missingCategories = Object.values(analysis).filter(c => !c.bought);

    const recommendations: { reason: string; products: string; impact: string }[] = [];

    const hasProfile = analysis['Profile i Oprawy'].bought;
    const hasTape = analysis['Taśmy LED / Światło'].bought;
    const hasPower = analysis['Zasilacze'].bought;
    const hasControl = analysis['Sterowanie (Smart Home)'].bought;
    const hasCover = analysis['Osłonki / Dyfuzory'].bought;
    const hasAcc = analysis['Akcesoria i Złącza'].bought;

    if (clientSales.length > 0) {
        if (hasProfile && !hasTape) {
            recommendations.push({
                reason: 'Brakuje Źródła Światła',
                products: 'Taśmy LED Premium, moduły LED do kupowanych profili',
                impact: 'Duży potencjał cross-sell na głównym komponencie.'
            });
        }

        if (hasTape && !hasPower) {
            recommendations.push({
                reason: 'Brak Zasilaczy Scharfer',
                products: 'Zasilacze dopasowane mocą do kupowanych taśm',
                impact: 'Traci zysk na osprzęcie. Sprzedaj komplet!'
            });
        }

        if (hasProfile && !hasCover && !hasAcc) {
            recommendations.push({
                reason: 'Brak Akcesoriów do Profili',
                products: 'Osłonki mleczne, zaślepki, łączniki KLUŚ',
                impact: 'Wysokomarżowe akcesoria (łatwa dosprzedaż).'
            });
        }

        if ((hasTape || hasProfile) && !hasControl) {
            recommendations.push({
                reason: 'Brak Smart Home / Sterowania',
                products: 'Polski system BleBox, Piloty MiLight, Ściemniacze',
                impact: 'Premium cross-sell. Klienci szukają smart rozwiązań.'
            });
        }

        if (!hasProfile && hasTape) {
            recommendations.push({
                reason: 'Kupuje taśmy bez Opraw',
                products: 'Profile KLUŚ jako radiatory dla taśm',
                impact: 'Zwiększ wartość koszyka oferując systemy opraw.'
            });
        }
    }

    return {
        boughtCategories,
        missingCategories,
        recommendations,
        totalPurchases: clientSales.length,
        totalQuantity: clientSales.reduce((acc, sale) => acc + sale.quantity, 0)
    };
}

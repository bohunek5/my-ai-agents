/**
 * Formatyje cenę zgodnie z wytycznymi:
 * - maksymalnie 1 miejsce po przecinku
 * - przecinek jako separator
 * - brak zbędnych zer na końcu (np. 12.0 -> 12)
 *
 * Przykład: 12.99 -> 13, 1.231 -> 1,2, 18.50 -> 18,5
 */
export const formatPrice = (value: number | string | undefined | null): string => {
    if (value === undefined || value === null || value === '') return '0';
    
    const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
    
    if (isNaN(num)) return '0';
    
    // Zaokrąglenie do 1 miejsca po przecinku
    const rounded = Math.round(num * 10) / 10;
    
    // Zamiana kropki na przecinek
    return rounded.toString().replace('.', ',');
};

/**
 * Handles Polish pluralization (inflection).
 * Examples: 
 * 1 kontakt
 * 2, 3, 4 kontakty
 * 5, 10, 22 kontakty -> NO, 22 is "kontakty"!
 * Logic:
 * - 1: singular
 * - 2, 3, 4 (excluding 12, 13, 14): "kontakty"
 * - 0, 5-21, and others: "kontaktów"
 */
export const pluralizeKontakt = (count: number): string => {
    const absCount = Math.abs(count);
    if (absCount === 1) return "KONTAKT";
    
    const lastDigit = absCount % 10;
    const lastTwoDigits = absCount % 100;
    
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        return "KONTAKTY";
    }
    
    return "KONTAKTÓW";
};

export const pluralize = (count: number, forms: [string, string, string]): string => {
    const absCount = Math.abs(count);
    if (absCount === 1) return forms[0];
    
    const lastDigit = absCount % 10;
    const lastTwoDigits = absCount % 100;
    
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        return forms[1];
    }
    
    return forms[2];
};

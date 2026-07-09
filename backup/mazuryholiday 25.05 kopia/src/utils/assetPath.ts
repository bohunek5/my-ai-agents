/**
 * Utility to handle asset paths across different environments (local vs LH server theme)
 */
export const getAssetPath = (path: string): string => {
    if (!path) return '';

    // If it's already an absolute URL, return as is
    if (path.startsWith('http') || path.startsWith('//')) return path;

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

    if (!prefix || normalizedPath.startsWith(`${prefix}/`)) {
        return normalizedPath;
    }

    return `${prefix}${normalizedPath}`;
};

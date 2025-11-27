/**
 * Date Formatter
 * Formats dates according to locale (EN or ID)
 */
export function formatDate(date: string, locale: 'en-US' | 'id-ID' = 'en-US'): string {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Spotify Theme URL Builder
 * Builds Spotify embed URL with appropriate theme parameter
 */
export function buildSpotifyThemeUrl(baseUrl: string, isDark: boolean): string {
    return `${baseUrl}&theme=${isDark ? '0' : '1'}`;
}

/**
 * Number Formatter
 * Formats large numbers with K suffix (e.g., 1500 -> 1.5K)
 */
export function formatNumber(num: number): string {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
}

export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

/**
 * Get the locale code for date formatting
 */
export function getDateLocale(locale: Locale): string {
    return locale === 'id' ? 'id-ID' : 'en-US';
}

/**
 * Get localized text for common UI elements
 */
export const localeStrings = {
    backToJournal: {
        en: 'Back to Journal',
        id: 'Kembali ke Jurnal',
    },
} as const;

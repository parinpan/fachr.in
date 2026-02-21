export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the locale code for date formatting
 */
export function getDateLocale(_locale: Locale): string {
  return 'en-US';
}

/**
 * Get localized text for common UI elements
 */
export const localeStrings = {
  backToJournal: {
    en: 'Back to Journal',
  },
} as const;

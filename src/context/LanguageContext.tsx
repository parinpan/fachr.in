'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { locales, defaultLocale, type Locale, isValidLocale } from '@/lib/i18n';

interface LanguageContextType {
    language: Locale;
    setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const params = useParams();
    const pathname = usePathname();

    // Get locale from URL params or pathname
    const localeFromParams = params?.locale as string | undefined;
    const localeFromPath = pathname?.split('/')[1];
    
    // Determine current language from URL
    let language: Locale = defaultLocale;
    if (localeFromParams && isValidLocale(localeFromParams)) {
        language = localeFromParams;
    } else if (localeFromPath && isValidLocale(localeFromPath)) {
        language = localeFromPath;
    }

    const setLanguage = (lang: Locale) => {
        // Navigate to the new locale URL
        const currentPath = pathname || '/';
        let newPath: string;

        // Remove current locale prefix if present
        const pathWithoutLocale = locales.reduce((path, loc) => {
            if (path.startsWith(`/${loc}/`)) {
                return path.slice(loc.length + 1);
            }
            if (path === `/${loc}`) {
                return '/';
            }
            return path;
        }, currentPath);

        // Add new locale prefix (skip for default locale 'en')
        if (lang === defaultLocale) {
            newPath = pathWithoutLocale;
        } else {
            newPath = `/${lang}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
        }

        // Use window.location for navigation to ensure full page load with correct locale
        window.location.href = newPath;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

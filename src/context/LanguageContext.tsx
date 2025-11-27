'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { defaultLocale, type Locale, isValidLocale } from '@/lib/i18n';

interface LanguageContextType {
    language: Locale;
    setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Remove locale prefix from a pathname
 */
function removeLocalePrefix(pathname: string, currentLocale: Locale): string {
    // Only remove the prefix if it matches the current locale
    if (pathname.startsWith(`/${currentLocale}/`)) {
        return pathname.slice(currentLocale.length + 1);
    }
    if (pathname === `/${currentLocale}`) {
        return '/';
    }
    return pathname;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

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

    const setLanguage = useCallback((lang: Locale) => {
        const currentPath = pathname || '/';

        // Persist language preference in cookie
        document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;

        // Remove current locale prefix if present
        const pathWithoutLocale = removeLocalePrefix(currentPath, language);

        // Build new path with target locale prefix (skip prefix for default locale 'en')
        let newPath: string;
        if (lang === defaultLocale) {
            newPath = pathWithoutLocale;
        } else {
            newPath = `/${lang}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
        }

        // Use Next.js router for client-side navigation
        router.push(newPath);
        router.refresh();
    }, [pathname, language, router]);

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

'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { defaultLocale, type Locale, isValidLocale } from '@/lib/i18n';

const LANGUAGE_STORAGE_KEY = 'preferred-language';
const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

/**
 * Get the value of a cookie by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

/**
 * Set a cookie with the given name and value
 */
function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
}

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Get locale from pathname
 */
function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const maybeLocale = segments[1];
  if (maybeLocale && isValidLocale(maybeLocale)) {
    return maybeLocale;
  }
  return defaultLocale;
}

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
  let derivedLanguage: Locale = defaultLocale;
  if (localeFromParams && isValidLocale(localeFromParams)) {
    derivedLanguage = localeFromParams;
  } else if (localeFromPath && isValidLocale(localeFromPath)) {
    derivedLanguage = localeFromPath;
  }

  // Optimistic state for immediate UI updates
  const [optimisticLanguage, setOptimisticLanguage] = useState<Locale | null>(null);

  // Use optimistic language if set and different from derived, otherwise use derived
  // This auto-syncs when derivedLanguage catches up without needing useEffect
  const language = useMemo(() => {
    if (optimisticLanguage && optimisticLanguage !== derivedLanguage) {
      return optimisticLanguage;
    }
    return derivedLanguage;
  }, [optimisticLanguage, derivedLanguage]);

  const setLanguage = useCallback(
    (lang: Locale) => {
      const currentPath = pathname || '/';

      // Immediately update UI with optimistic state
      setOptimisticLanguage(lang);

      // Persist language preference in localStorage and cookie
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        setCookie(COOKIE_NAME, lang, COOKIE_MAX_AGE);
      }

      // Derive current language from pathname to avoid stale closure issue
      const currentLanguage = getLocaleFromPathname(currentPath);

      // Remove current locale prefix if present
      const pathWithoutLocale = removeLocalePrefix(currentPath, currentLanguage);

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
    },
    [pathname, router]
  );

  // On initial mount, check localStorage for saved language preference and redirect if needed
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && isValidLocale(savedLanguage)) {
      const currentPath = pathname || '/';
      const urlLanguage = getLocaleFromPathname(currentPath);

      // Sync the cookie with localStorage only if it differs (avoid unnecessary writes)
      const currentCookie = getCookie(COOKIE_NAME);
      if (currentCookie !== savedLanguage) {
        setCookie(COOKIE_NAME, savedLanguage, COOKIE_MAX_AGE);
      }

      // Only redirect if saved language differs from URL language
      if (savedLanguage !== urlLanguage) {
        const pathWithoutLocale = removeLocalePrefix(currentPath, urlLanguage);

        let newPath: string;
        if (savedLanguage === defaultLocale) {
          newPath = pathWithoutLocale;
        } else {
          newPath = `/${savedLanguage}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
        }

        router.replace(newPath);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

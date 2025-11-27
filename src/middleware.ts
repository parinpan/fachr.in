import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Paths that should not be redirected
const publicPaths = [
    '/sitemap.xml',
    '/robots.txt',
    '/feed.xml',
    '/sitemap.xsl',
    '/_next',
    '/api',
    '/images',
    '/favicon.ico',
];

function getLocaleFromPath(pathname: string): Locale | null {
    const segments = pathname.split('/');
    const maybeLocale = segments[1];
    if (locales.includes(maybeLocale as Locale)) {
        return maybeLocale as Locale;
    }
    return null;
}

function isPublicPath(pathname: string): boolean {
    return publicPaths.some(path => pathname.startsWith(path));
}

/**
 * Parse Accept-Language header and return preferred locale
 * Properly parses language tags like "id-ID,id;q=0.9,en-US;q=0.8"
 */
function getPreferredLocaleFromHeader(acceptLanguage: string): Locale {
    if (!acceptLanguage) return defaultLocale;

    // Parse language tags with optional quality values
    const languages = acceptLanguage.split(',').map(lang => {
        const [code, quality] = lang.trim().split(';');
        const q = quality ? parseFloat(quality.replace('q=', '')) : 1;
        // Extract primary language code (e.g., "id" from "id-ID")
        const primaryCode = code.split('-')[0].toLowerCase();
        return { code: primaryCode, quality: q };
    }).sort((a, b) => b.quality - a.quality);

    // Find first matching locale
    for (const lang of languages) {
        if (lang.code === 'id') return 'id';
        if (lang.code === 'en') return 'en';
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip public paths (assets, API routes, etc.)
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    // Check if locale is already in the URL
    const localeFromPath = getLocaleFromPath(pathname);

    if (localeFromPath) {
        // Locale is in URL, set cookie and proceed
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', localeFromPath, { path: '/', maxAge: 60 * 60 * 24 * 365 }); // 1 year
        return response;
    }

    // No locale in URL - check cookie first, then header
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;

    if (cookieLocale === 'id') {
        const url = request.nextUrl.clone();
        url.pathname = `/id${pathname}`;
        return NextResponse.redirect(url);
    }

    // If no cookie or cookie is 'en', check header
    if (!cookieLocale) {
        const acceptLanguage = request.headers.get('accept-language') || '';
        const preferredLocale = getPreferredLocaleFromHeader(acceptLanguage);

        if (preferredLocale === 'id') {
            const url = request.nextUrl.clone();
            url.pathname = `/id${pathname}`;
            return NextResponse.redirect(url);
        }
    }

    // Default English locale - no redirect needed
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files, API routes, and Next.js internals
        '/((?!_next/static|_next/image|api|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
    ],
};

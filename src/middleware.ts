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

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip public paths (assets, API routes, etc.)
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    // Check if locale is already in the URL
    const localeFromPath = getLocaleFromPath(pathname);
    
    if (localeFromPath) {
        // Locale is in URL, proceed normally
        return NextResponse.next();
    }

    // No locale in URL - redirect to default locale
    // For English (default), we keep the URL clean (no /en prefix)
    // For other locales, we require the prefix
    
    // Check if user wants Indonesian via Accept-Language header (optional enhancement)
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = acceptLanguage.toLowerCase().includes('id') ? 'id' : 'en';
    
    // If preferred locale is not default, redirect to that locale
    // But for the default locale (en), we don't add a prefix
    if (preferredLocale === 'id') {
        // Only redirect if the user hasn't explicitly visited the English version
        const url = request.nextUrl.clone();
        url.pathname = `/id${pathname}`;
        return NextResponse.redirect(url);
    }

    // Default English locale - no redirect needed, just continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files and API
        '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
    ],
};

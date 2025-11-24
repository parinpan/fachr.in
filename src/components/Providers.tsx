'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </LanguageProvider>
    );
}

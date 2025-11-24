'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useContent } from '@/hooks/useContent';

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const siteConfig = useContent();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-bg)] rounded-full transition-colors"
            aria-label={siteConfig.ui.themeToggle}
        >
            {isDark ? (
                <Moon size={20} className="transition-all" />
            ) : (
                <Sun size={20} className="transition-all" />
            )}
        </button>
    );
}

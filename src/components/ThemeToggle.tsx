'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useContent } from '@/hooks/useContent';

/** Subscribe function for useSyncExternalStore - always returns noop since we only need initial mount state */
const subscribeNoop = () => () => {};

/** Get server snapshot - always false on server */
const getServerSnapshot = () => false;

/** Get client snapshot - always true on client */
const getClientSnapshot = () => true;

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const siteConfig = useContent();

  // Use useSyncExternalStore for hydration-safe mounting detection
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return <div className="w-11 h-11" />; // Placeholder to avoid layout shift
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-bg)] rounded-full transition-colors"
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

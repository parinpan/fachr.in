/**
 * Theme Utility Functions
 * 
 * Helper functions to generate theme-aware class names.
 * These use CSS custom properties that automatically adapt to light/dark mode.
 * 
 * Usage:
 *   import { theme } from '@/lib/theme-utils';
 *   <div className={theme.bg.surface}>...</div>
 */

/**
 * Theme class generators using CSS variables
 * All classes automatically adapt to light/dark mode
 */
export const theme = {
  // Background classes
  bg: {
    surface: 'bg-[var(--color-surface)]',
    surfaceSecondary: 'bg-[var(--color-surface-secondary)]',
    interactive: 'bg-[var(--color-interactive-bg)]',
    interactiveHover: 'hover:bg-[var(--color-interactive-bg-hover)]',
  },
  
  // Border classes
  border: {
    default: 'border-[var(--color-border)]',
    light: 'border-[var(--color-border-light)]',
    hover: 'hover:border-[var(--color-border-hover)]',
  },
  
  // Text classes
  text: {
    primary: 'text-[var(--color-text-primary)]',
    secondary: 'text-[var(--color-text-secondary)]',
    tertiary: 'text-[var(--color-text-tertiary)]',
    muted: 'text-[var(--color-text-muted)]',
    interactive: 'text-[var(--color-interactive)]',
    interactiveHover: 'hover:text-[var(--color-interactive-hover)]',
  },
  
  // Badge classes
  badge: {
    base: 'bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] border-[var(--color-badge-border)]',
  },
  
  // Navbar classes
  navbar: {
    bg: 'bg-[var(--color-navbar-bg)]',
    border: 'border-[var(--color-navbar-border)]',
    active: 'bg-[var(--color-nav-active)] text-[var(--color-nav-active-text)]',
  },
  
  // Footer classes
  footer: {
    text: 'text-[var(--color-footer-text)]',
  },
  
  // Common component combinations
  components: {
    card: 'bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl',
    cardHover: 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-xl transition-all',
    button: 'bg-[var(--color-interactive-bg)] text-[var(--color-interactive)] hover:bg-[var(--color-interactive-bg-hover)]',
    input: 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]',
  },
} as const;

/**
 * Combine multiple theme classes
 */
export function themeClass(...classes: string[]): string {
  return classes.join(' ');
}


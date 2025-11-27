/**
 * Component Style Definitions
 *
 * Centralized style constants to reduce long className strings
 * and improve maintainability across components.
 *
 * Usage:
 *   import { styles } from '@/styles/components';
 *   <div className={styles.card.base}>...</div>
 */

/**
 * Card component styles
 */
export const cardStyles = {
    base: 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm',
    elevated: 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md',
    interactive: 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-neutral-600 transition-all cursor-pointer',
} as const;

/**
 * Button styles
 */
export const buttonStyles = {
    primary: 'inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gray-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors',
    secondary: 'p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-bg)] rounded-full transition-colors',
    icon: 'p-2 rounded-lg transition-all text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-bg)]',
    nav: 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
    navActive: 'bg-[var(--color-nav-active)] text-[var(--color-nav-active-text)] shadow-md',
    navInactive: 'text-[var(--color-text-secondary)] hover:bg-[var(--color-interactive-bg)] hover:text-[var(--color-text-primary)]',
} as const;

/**
 * Section styles
 */
export const sectionStyles = {
    container: 'mb-12',
    heading: 'text-2xl font-bold mb-6 text-gray-900 dark:text-neutral-100',
    subheading: 'text-xl md:text-2xl text-gray-500 dark:text-neutral-400 max-w-2xl leading-normal',
} as const;

/**
 * Text styles
 */
export const textStyles = {
    title: 'text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-neutral-100',
    subtitle: 'text-xl md:text-2xl text-gray-600 dark:text-neutral-400 font-medium',
    body: 'text-lg text-gray-700 dark:text-neutral-300 leading-relaxed',
    muted: 'text-sm text-gray-500 dark:text-neutral-400',
    label: 'text-sm font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider',
} as const;

/**
 * Badge styles
 */
export const badgeStyles = {
    base: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
    default: 'bg-neutral-100 dark:bg-black/90 text-neutral-600 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800',
    tech: 'bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]',
    pill: 'px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200 text-sm rounded-full font-medium',
} as const;

/**
 * Modal styles
 */
export const modalStyles = {
    overlay: 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6',
    backdrop: 'absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200',
    content: 'relative w-full max-w-2xl bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200',
    closeButton: 'absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors',
} as const;

/**
 * Input and form styles
 */
export const inputStyles = {
    base: 'w-full outline-none border-none bg-transparent text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500',
    search: 'w-full h-14 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none ring-0 text-lg text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 bg-transparent shadow-none appearance-none',
} as const;

/**
 * Grid layouts
 */
export const gridStyles = {
    twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    threeColumn: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    responsive: 'flex flex-col md:flex-row',
} as const;

/**
 * Animation classes
 */
export const animationStyles = {
    fadeIn: 'animate-in fade-in duration-200',
    slideUp: 'animate-in fade-in slide-in-from-bottom-4 duration-500',
    zoomIn: 'animate-in zoom-in-95 duration-200',
    scaleHover: 'transition-transform duration-500 group-hover:scale-105',
} as const;

/**
 * Combined component patterns
 */
export const patterns = {
    contactCard: 'flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl hover:border-gray-300 dark:hover:border-neutral-600 hover:shadow-sm transition-all group',
    experienceCard: 'relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl transition-all duration-300',
    metadataBadge: 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-interactive-bg)] text-[var(--color-text-secondary)]',
} as const;

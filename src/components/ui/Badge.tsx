import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'tech' | 'date' | 'language' | 'platform';
    icon?: ReactNode;
    className?: string;
}

/**
 * Badge Component
 * Reusable badge for tags, labels, and metadata
 * Now supports optional icons with dark/greyish backgrounds
 */
export default function Badge({ children, variant = 'default', icon, className }: BadgeProps) {
    const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors';

    const variantStyles = {
        default: 'bg-neutral-100 dark:bg-black/90 text-neutral-600 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800',
        tech: 'bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]',
        date: 'bg-neutral-100 dark:bg-black/90 text-neutral-600 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800',
        language: 'bg-neutral-100 dark:bg-black/90 text-neutral-600 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800',
        platform: 'bg-neutral-100 dark:bg-black/90 text-neutral-600 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800',
    };

    return (
        <span className={cn(baseStyles, variantStyles[variant], className)}>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
        </span>
    );
}

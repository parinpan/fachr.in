import { cn } from '@/lib/constants';
import { ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'interactive';

export interface CardProps {
    variant?: CardVariant;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm',
    elevated: 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md',
    interactive: 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-neutral-600 transition-all cursor-pointer',
};

/**
 * Card Component
 * Reusable card container with consistent styling
 * Used across WorkList, GithubRepos, BlogContent, and AppearanceList
 */
export default function Card({ variant = 'default', children, className, onClick }: CardProps) {
    return (
        <div
            className={cn(variantStyles[variant], className)}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}

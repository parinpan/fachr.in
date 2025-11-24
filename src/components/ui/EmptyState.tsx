import { ReactNode } from 'react';

export interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
}

/**
 * EmptyState Component
 * Reusable empty state display
 * Can be used in BlogContent and other list components
 */
export default function EmptyState({ icon, title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-gray-50 dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-700 p-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white dark:bg-neutral-800 rounded-full shadow-sm border border-gray-100 dark:border-neutral-700">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-3">
                {title}
            </h3>
            <p className="text-gray-500 dark:text-neutral-400 max-w-md mx-auto text-lg leading-relaxed">
                {description}
            </p>
        </div>
    );
}

import { LucideIcon } from 'lucide-react';

export interface IconWithTextProps {
    icon: LucideIcon;
    label?: string;
    value: string | number;
    size?: number;
    className?: string;
}

/**
 * IconWithText Component
 * Reusable pattern for displaying an icon with associated text
 * Used in Contact, GithubRepos, and Experience components
 */
export default function IconWithText({
    icon: Icon,
    label,
    value,
    size = 14,
    className = ''
}: IconWithTextProps) {
    return (
        <span className={`flex items-center gap-1.5 ${className}`}>
            <Icon size={size} />
            {label && <span className="sr-only">{label}</span>}
            <span>{value}</span>
        </span>
    );
}

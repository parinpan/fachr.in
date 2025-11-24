import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Scroll Thresholds
 * Centralized scroll-related constants
 */
export const SCROLL_THRESHOLDS = {
    BACK_TO_TOP: 300,
    APPEARANCE_SCROLL_AMOUNT: 400,
} as const;

/**
 * GitHub API Configuration
 * Centralized GitHub-related constants
 */
export const GITHUB_CONFIG = {
    USERNAME: 'parinpan',
    REPOS_LIMIT: 6,
    API_URL: 'https://api.github.com',
    PER_PAGE: 100,
} as const;

/**
 * Consistent Spacing Classes
 * Standardized margin-bottom values for sections
 */
export const SPACING = {
    SECTION_SMALL: 'mb-8',
    SECTION_MEDIUM: 'mb-12',
    SECTION_LARGE: 'mb-16',
} as const;

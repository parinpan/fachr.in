/**
 * Scroll Thresholds
 * Centralized scroll-related constants
 */
export const SCROLL_THRESHOLDS = {
  BACK_TO_TOP: 300,
  APPEARANCE_SCROLL_AMOUNT: 400,
  EXPERIENCE_SCROLL_AMOUNT: 450,
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

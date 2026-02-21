import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely parse a date string and return an ISO string.
 * Safari is strict with date formats (e.g. "November 2025" fails).
 * This fallback ensures we don't crash on the client.
 */
export function safeIsoDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString();

  // Remove prefixes like "Updated " often found in now page
  const cleanDateStr = dateStr.replace(/^Updated\s+/i, '');

  const date = new Date(cleanDateStr);

  // If invalid, try to append "1, " for "Month YYYY" formats
  if (isNaN(date.getTime()) && /^[a-zA-Z]+\s+\d{4}$/.test(cleanDateStr)) {
    const fallbackDate = new Date(cleanDateStr.replace(/(\s+)/, '$11, '));
    if (!isNaN(fallbackDate.getTime())) return fallbackDate.toISOString();
  }

  return !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
}

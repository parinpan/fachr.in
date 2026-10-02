import { cn, safeIsoDate } from '@/lib/utils';

describe('cn (classnames utility)', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, 'bar', null)).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
  });

  it('merges Tailwind classes correctly', () => {
    // tailwind-merge should dedupe conflicting utilities
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
    expect(cn('base', ['foo', 'bar'])).toBe('base foo bar');
  });

  it('handles objects with boolean values', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });
});

describe('safeIsoDate', () => {
  it('parses a standard date string', () => {
    const result = safeIsoDate('2024-01-15');
    expect(result).toContain('2024-01-15');
    expect(() => new Date(result)).not.toThrow();
  });

  it('parses "Month YYYY" format (Safari-safe)', () => {
    const result = safeIsoDate('November 2025');
    const date = new Date(result);
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(10); // November is 10 (0-indexed)
  });

  it('strips "Updated " prefix before parsing', () => {
    const result = safeIsoDate('Updated November 2025');
    const date = new Date(result);
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(10);
  });

  it('returns current date ISO string for undefined input', () => {
    const before = Date.now();
    const result = safeIsoDate(undefined);
    const after = Date.now();
    const parsed = new Date(result).getTime();
    expect(parsed).toBeGreaterThanOrEqual(before);
    expect(parsed).toBeLessThanOrEqual(after);
  });

  it('returns current date ISO string for completely invalid string', () => {
    const before = Date.now();
    const result = safeIsoDate('not-a-date-at-all');
    const after = Date.now();
    const parsed = new Date(result).getTime();
    expect(parsed).toBeGreaterThanOrEqual(before);
    expect(parsed).toBeLessThanOrEqual(after);
  });

  it('returns a valid ISO string for all inputs', () => {
    const inputs = ['2024-06-01', 'January 2024', 'Updated March 2025', undefined, 'garbage'];
    for (const input of inputs) {
      const result = safeIsoDate(input);
      expect(new Date(result).toISOString()).toBe(result);
    }
  });
});

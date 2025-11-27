import { cn } from '@/lib/utils';

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

import { isValidLocale, getDateLocale } from '@/lib/i18n';

describe('isValidLocale', () => {
  it('returns true for valid locales', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('id')).toBe(true);
  });

  it('returns false for invalid locales', () => {
    expect(isValidLocale('de')).toBe(false);
    expect(isValidLocale('fr')).toBe(false);
    expect(isValidLocale('')).toBe(false);
    expect(isValidLocale('EN')).toBe(false); // case sensitive
    expect(isValidLocale('ID')).toBe(false); // case sensitive
  });
});

describe('getDateLocale', () => {
  it('returns id-ID for Indonesian locale', () => {
    expect(getDateLocale('id')).toBe('id-ID');
  });

  it('returns en-US for English locale', () => {
    expect(getDateLocale('en')).toBe('en-US');
  });
});

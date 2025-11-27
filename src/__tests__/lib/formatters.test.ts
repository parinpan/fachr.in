import { formatDate, buildSpotifyThemeUrl, formatNumber } from '@/lib/formatters';

describe('formatDate', () => {
  it('formats date in en-US locale', () => {
    const result = formatDate('2024-01-15', 'en-US');
    expect(result).toBe('January 15, 2024');
  });

  it('formats date in id-ID locale', () => {
    const result = formatDate('2024-01-15', 'id-ID');
    expect(result).toBe('15 Januari 2024');
  });

  it('defaults to en-US locale when no locale specified', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBe('January 15, 2024');
  });
});

describe('buildSpotifyThemeUrl', () => {
  const baseUrl = 'https://open.spotify.com/embed/episode/12345';

  it('appends theme=0 for dark mode', () => {
    const result = buildSpotifyThemeUrl(baseUrl, true);
    expect(result).toBe(`${baseUrl}&theme=0`);
  });

  it('appends theme=1 for light mode', () => {
    const result = buildSpotifyThemeUrl(baseUrl, false);
    expect(result).toBe(`${baseUrl}&theme=1`);
  });
});

describe('formatNumber', () => {
  it('returns number as string for values under 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(100)).toBe('100');
    expect(formatNumber(999)).toBe('999');
  });

  it('formats numbers over 1000 with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(10000)).toBe('10.0K');
    expect(formatNumber(25600)).toBe('25.6K');
  });
});

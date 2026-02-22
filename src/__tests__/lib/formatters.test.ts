import { formatDate, buildSpotifyThemeUrl } from '@/lib/formatters';

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

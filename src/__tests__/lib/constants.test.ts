import { SCROLL_THRESHOLDS, GITHUB_CONFIG } from '@/lib/constants';

describe('SCROLL_THRESHOLDS', () => {
  it('has correct BACK_TO_TOP value', () => {
    expect(SCROLL_THRESHOLDS.BACK_TO_TOP).toBe(300);
  });

  it('has correct APPEARANCE_SCROLL_AMOUNT value', () => {
    expect(SCROLL_THRESHOLDS.APPEARANCE_SCROLL_AMOUNT).toBe(400);
  });
});

describe('GITHUB_CONFIG', () => {
  it('has correct USERNAME', () => {
    expect(GITHUB_CONFIG.USERNAME).toBe('parinpan');
  });

  it('has correct REPOS_LIMIT', () => {
    expect(GITHUB_CONFIG.REPOS_LIMIT).toBe(6);
  });

  it('has correct API_URL', () => {
    expect(GITHUB_CONFIG.API_URL).toBe('https://api.github.com');
  });

  it('has correct PER_PAGE', () => {
    expect(GITHUB_CONFIG.PER_PAGE).toBe(100);
  });
});

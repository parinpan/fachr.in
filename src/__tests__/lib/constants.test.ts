import { SCROLL_THRESHOLDS, GITHUB_CONFIG, SPACING } from '@/lib/constants';

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

describe('SPACING', () => {
  it('has correct SECTION_SMALL value', () => {
    expect(SPACING.SECTION_SMALL).toBe('mb-8');
  });

  it('has correct SECTION_MEDIUM value', () => {
    expect(SPACING.SECTION_MEDIUM).toBe('mb-12');
  });

  it('has correct SECTION_LARGE value', () => {
    expect(SPACING.SECTION_LARGE).toBe('mb-16');
  });
});

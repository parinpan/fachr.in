import { renderHook } from '@testing-library/react';
import { useContent } from '@/hooks/useContent';
import { siteConfig } from '@/data/content';

describe('useContent', () => {
  it('returns the siteConfig content', () => {
    const { result } = renderHook(() => useContent());
    expect(result.current).toEqual(siteConfig);
  });
});

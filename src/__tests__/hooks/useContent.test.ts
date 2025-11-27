import { renderHook } from '@testing-library/react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/context/LanguageContext';

// Mock LanguageContext
jest.mock('@/context/LanguageContext', () => ({
    useLanguage: jest.fn(),
}));

// Mock content data
jest.mock('@/data/content', () => ({
    siteConfig: { hero: { title: 'English Title' } },
}));

jest.mock('@/data/content-id', () => ({
    siteConfigId: { hero: { title: 'Indonesian Title' } },
}));

describe('useContent', () => {
    it('returns English content when language is en', () => {
        (useLanguage as jest.Mock).mockReturnValue({ language: 'en' });

        const { result } = renderHook(() => useContent());

        expect(result.current.hero.title).toBe('English Title');
    });

    it('returns Indonesian content when language is id', () => {
        (useLanguage as jest.Mock).mockReturnValue({ language: 'id' });

        const { result } = renderHook(() => useContent());

        expect(result.current.hero.title).toBe('Indonesian Title');
    });
});

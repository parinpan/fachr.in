'use client';

import { useLanguage } from '@/context/LanguageContext';

import { useContent } from '@/hooks/useContent';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();
    const siteConfig = useContent();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
            aria-label={siteConfig.ui.languageToggle}
        >
            {language === 'en' ? 'ID' : 'EN'}
        </button>
    );
}

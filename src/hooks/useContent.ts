import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/content';
import { siteConfigId } from '@/data/content-id';

export function useContent() {
    const { language } = useLanguage();
    return language === 'id' ? siteConfigId : siteConfig;
}

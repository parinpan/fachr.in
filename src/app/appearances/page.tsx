import { siteConfig } from '@/data/content';
import AppearancesContent from '@/components/AppearancesContent';

export const metadata = {
    title: `Appearances | ${siteConfig.personal.name}`,
    description: 'Watch my latest talks, interviews, and podcast appearances.',
};

export default function AppearancesPage() {
    return <AppearancesContent />;
}

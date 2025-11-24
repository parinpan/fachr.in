import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import NowContent from '@/components/NowContent';

export const metadata: Metadata = {
    title: `Now | ${siteConfig.personal.name}`,
    description: siteConfig.now.subtitle,
};

export default function NowPage() {
    return <NowContent />;
}

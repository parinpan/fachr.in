import Script from 'next/script';
import { siteConfig } from '@/data/content';

/**
 * Structured Data (JSON-LD) Component
 * SEO Best Practice - helps search engines understand your profile
 * Schema.org Person + Professional markup
 */
export default function StructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.personal.name,
        jobTitle: 'Senior Product Engineer',
        description: siteConfig.seo.description,
        url: 'https://fachr.in',
        image: `https://fachr.in${siteConfig.personal.profileImage}`,
        email: siteConfig.personal.email,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Berlin',
            addressCountry: 'Germany',
        },
        sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin,
            siteConfig.social.twitter,
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'Upvest',
        },
        alumniOf: [
            {
                '@type': 'Organization',
                name: 'Choco',
            },
            {
                '@type': 'Organization',
                name: 'Delivery Hero',
            },
            {
                '@type': 'Organization',
                name: 'Gojek',
            },
            {
                '@type': 'Organization',
                name: 'Tokopedia',
            },
        ],
        knowsAbout: [
            'Software Engineering',
            'Backend Development',
            'System Design',
            'Golang',
            'Python',
            'Kafka',
            'PostgreSQL',
            'Product Engineering',
        ],
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

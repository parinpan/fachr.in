import { siteConfig } from '@/data/content';

export default function JsonLd() {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.personal.name,
        url: siteConfig.seo.url,
        image: `${siteConfig.seo.url}${siteConfig.personal.profileImage}`,
        sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin,
            siteConfig.social.twitter,
        ],
        jobTitle: 'Software Engineer',
        worksFor: {
            '@type': 'Organization',
            name: siteConfig.experience[0].company,
        },
        description: siteConfig.seo.description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
    );
}

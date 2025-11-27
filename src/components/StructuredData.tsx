'use client';

import Script from 'next/script';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Enhanced Structured Data (JSON-LD) Component
 * Provides comprehensive schema.org markup for SEO optimization
 * Supports multilingual content and multiple schema types
 */
export default function StructuredData() {
    const siteConfig = useContent();
    const { language } = useLanguage();

    // Person Schema - Professional Profile
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://fachr.in/#person',
        name: siteConfig.personal.name,
        alternateName: 'Fachrin Aulia Nasution',
        jobTitle: 'Senior Product Engineer',
        description: siteConfig.seo.description,
        url: 'https://fachr.in',
        image: `https://fachr.in${siteConfig.personal.profileImage}`,
        email: siteConfig.personal.email,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Berlin',
            addressRegion: 'Berlin',
            addressCountry: 'DE',
        },
        sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin,
            siteConfig.social.twitter,
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'Upvest',
            url: 'https://upvest.co',
        },
        alumniOf: [
            { '@type': 'Organization', name: 'Choco', url: 'https://choco.com' },
            { '@type': 'Organization', name: 'Delivery Hero', url: 'https://deliveryhero.com' },
            { '@type': 'Organization', name: 'Gojek', url: 'https://gojek.com' },
            { '@type': 'Organization', name: 'Tokopedia', url: 'https://tokopedia.com' },
        ],
        knowsAbout: [
            'Software Engineering',
            'Backend Development',
            'System Architecture',
            'Golang',
            'Python',
            'Kafka',
            'PostgreSQL',
            'gRPC',
            'Microservices',
            'Product Engineering',
        ],
        knowsLanguage: [
            { '@type': 'Language', name: 'English', alternateName: 'en' },
            { '@type': 'Language', name: 'Indonesian', alternateName: 'id' },
        ],
    };

    // WebSite Schema - Site Information
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://fachr.in/#website',
        name: siteConfig.personal.name,
        description: siteConfig.seo.description,
        url: 'https://fachr.in',
        inLanguage: [
            { '@type': 'Language', name: 'English', alternateName: 'en' },
            { '@type': 'Language', name: 'Indonesian', alternateName: 'id' },
        ],
        author: {
            '@id': 'https://fachr.in/#person',
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://fachr.in/blog?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    // BreadcrumbList Schema - Navigation Structure
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://fachr.in',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://fachr.in/blog',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Appearances',
                item: 'https://fachr.in/appearances',
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: 'Now',
                item: 'https://fachr.in/now',
            },
        ],
    };

    // Profile Page Schema
    const profilePageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': 'https://fachr.in/#profilepage',
        mainEntity: {
            '@id': 'https://fachr.in/#person',
        },
        inLanguage: language === 'id' ? 'id-ID' : 'en-US',
        url: language === 'id' ? 'https://fachr.in?lang=id' : 'https://fachr.in',
        name: `${siteConfig.personal.name} - ${siteConfig.hero.title}`,
        description: siteConfig.seo.description,
    };

    // Combine all schemas
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [personSchema, websiteSchema, breadcrumbSchema, profilePageSchema],
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

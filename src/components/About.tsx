'use client';

import { useContent } from '@/hooks/useContent';
import { Hand, ArrowRight } from 'lucide-react';

export default function About() {
  const siteConfig = useContent();
  return (
    <section className="mb-12" aria-labelledby="about-heading">
      <h3
        id="about-heading"
        className="text-2xl font-bold mb-4 text-gray-900 dark:text-neutral-100"
      >
        {siteConfig.about.title}
      </h3>
      <p className="text-lg text-gray-800 dark:text-neutral-200 leading-relaxed text-justify">
        {siteConfig.about.greeting}
        <Hand className="inline-block w-5 h-5 ml-2 text-black-500 dark:text-neutral-400" />.{' '}
        {siteConfig.about.description}{' '}
        <a
          href={siteConfig.about.cta.link}
          className="inline-flex items-center text-gray-800 dark:text-neutral-200 hover:text-gray-900 dark:hover:text-neutral-100 underline decoration-gray-300 dark:decoration-neutral-600 hover:decoration-gray-900 dark:hover:decoration-neutral-400 transition-all"
        >
          {siteConfig.about.cta.text}
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </p>
    </section>
  );
}

import { siteConfig } from '@/data/content';
import { Hand, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section className="mb-12" aria-labelledby="about-heading">
      <h3 id="about-heading" className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
        {siteConfig.about.title}
      </h3>
      <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed text-left md:text-justify">
        {siteConfig.about.greeting}
        <Hand className="inline-block w-5 h-5 ml-2 text-[var(--color-text-muted)]" />.{' '}
        {siteConfig.about.description}{' '}
        <a
          href={siteConfig.about.cta.link}
          className="inline-flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline decoration-[var(--color-border)] hover:decoration-[var(--color-text-primary)] transition-all"
        >
          {siteConfig.about.cta.text}
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </p>
    </section>
  );
}

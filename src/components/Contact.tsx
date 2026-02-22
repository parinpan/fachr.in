import { Phone } from 'lucide-react';
import { siteConfig } from '@/data/content';
import { CONTACT_ICONS, ContactType } from '@/lib/icon-maps';
import type { ContactLink } from '@/data/types';
import type { LucideIcon } from 'lucide-react';

interface ContactLinkWithIcon extends ContactLink {
  icon: LucideIcon;
}

export default function Contact() {
  const contactLinks: ContactLinkWithIcon[] = siteConfig.contact.links.map((link: ContactLink) => {
    const IconComponent = CONTACT_ICONS[link.type as ContactType];
    return {
      ...link,
      icon: IconComponent,
    };
  });

  return (
    <section className="mb-12" aria-labelledby="contact-heading">
      <h3 id="contact-heading" className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">
        {siteConfig.contact.title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {contactLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.name === 'Email' ? undefined : '_blank'}
            rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-border-hover)] hover:shadow-sm transition-all group"
          >
            <div className="p-3 bg-[var(--color-interactive-bg)] rounded-lg text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)] transition-colors">
              <link.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)] font-medium">{link.name}</p>
              <p className="text-[var(--color-text-primary)] font-semibold">{link.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-[var(--color-surface-secondary)] rounded-2xl p-8 text-center border border-[var(--color-border-light)]">
        <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
          {siteConfig.contact.collaboration.title}
        </h4>
        <p className="text-[var(--color-text-secondary)] mb-6 max-w-lg mx-auto">
          {siteConfig.contact.collaboration.text}
        </p>
        <a
          href={siteConfig.contact.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[var(--color-button-text)] bg-[var(--color-button-bg)] rounded-lg hover:bg-[var(--color-button-bg-hover)] transition-colors group"
        >
          {siteConfig.contact.collaboration.cta}
          <Phone className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
        </a>
      </div>
    </section>
  );
}

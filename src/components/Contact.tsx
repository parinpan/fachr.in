'use client';

import { Mail, Linkedin, Github, Twitter, Phone } from 'lucide-react';
import { siteConfig } from '@/data/content';

const contactLinks = [
    {
        icon: Mail,
        ...siteConfig.contact.links.find(l => l.type === 'email')!
    },
    {
        icon: Linkedin,
        ...siteConfig.contact.links.find(l => l.type === 'linkedin')!
    },
    {
        icon: Github,
        ...siteConfig.contact.links.find(l => l.type === 'github')!
    },
    {
        icon: Twitter,
        ...siteConfig.contact.links.find(l => l.type === 'twitter')!
    }
];

export default function Contact() {
    return (
        <section className="mb-12" aria-labelledby="contact-heading">
            <h3 id="contact-heading" className="text-2xl font-bold mb-6 text-gray-900 dark:text-neutral-100">{siteConfig.contact.title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {contactLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target={link.name === 'Email' ? undefined : '_blank'}
                        rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
                        className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl hover:border-gray-300 dark:hover:border-neutral-600 hover:shadow-sm transition-all group"
                    >
                        <div className="p-3 bg-gray-100 dark:bg-neutral-700 rounded-lg text-gray-600 dark:text-neutral-300 group-hover:text-gray-900 dark:group-hover:text-neutral-100 transition-colors">
                            <link.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium">{link.name}</p>
                            <p className="text-gray-900 dark:text-neutral-100 font-semibold">{link.value}</p>
                        </div>
                    </a>
                ))}
            </div>

            <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-2xl p-8 text-center border border-gray-100 dark:border-neutral-700">
                <h4 className="text-xl font-bold text-gray-900 dark:text-neutral-100 mb-2">{siteConfig.contact.collaboration.title}</h4>
                <p className="text-gray-600 dark:text-neutral-400 mb-6 max-w-lg mx-auto">
                    {siteConfig.contact.collaboration.text}
                </p>
                <a
                    href={siteConfig.contact.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gray-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors group"
                >
                    {siteConfig.contact.collaboration.cta}
                    <Phone className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </a>
            </div>
        </section>
    );
}

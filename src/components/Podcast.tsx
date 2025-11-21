'use client';

import { siteConfig } from '@/data/content';

export default function Podcast() {
    return (
        <section className="mb-12" aria-labelledby="podcast-heading">
            <h3 id="podcast-heading" className="text-2xl font-bold mb-6 text-gray-900">{siteConfig.podcast.title}</h3>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                    style={{ borderRadius: '12px' }}
                    src={siteConfig.podcast.episodeUrl}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="grayscale brightness-75 contrast-125 hover:brightness-100 hover:contrast-100 transition-all duration-500"
                ></iframe>
            </div>
        </section>
    );
}

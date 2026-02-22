import { siteConfig } from '@/data/content';

/**
 * Web App Manifest Route Handler
 * Provides metadata for PWA capabilities and browser integration.
 * Helps search engines understand the site's identity and branding.
 */
export async function GET() {
  const manifest = {
    name: siteConfig.personal.name,
    short_name: 'Fachrin',
    description: siteConfig.seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#171717',
    icons: [
      {
        src: siteConfig.hero.image,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: siteConfig.hero.image,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}

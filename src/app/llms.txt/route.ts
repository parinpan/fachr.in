import { siteConfig } from '@/data/content';
import { getAllPosts } from '@/lib/mdx';

/**
 * llms.txt Route Handler
 * Provides a comprehensive, structured text file for AI crawlers and LLMs.
 * Follows the llmstxt.org specification for AI-friendly content discovery.
 *
 * @see https://llmstxt.org
 */
export async function GET() {
  const posts = getAllPosts(['slug', 'title', 'description', 'date', 'tags']);
  const siteUrl = siteConfig.seo.url;

  const experienceEntries = siteConfig.experience
    .map((exp) => {
      const descriptions = exp.description.map((d) => `  - ${d}`).join('\n');
      return `### ${exp.role} at ${exp.company}
- Period: ${exp.period}
- Location: ${exp.location}
- Tech Stack: ${exp.techStack.join(', ')}
- Key Contributions:
${descriptions}`;
    })
    .join('\n\n');

  const projectEntries = siteConfig.works
    .map(
      (work) => `### ${work.name} (${work.company})
- Description: ${work.description}
- Role: ${work.role}
- Tech Stack: ${work.stack}`
    )
    .join('\n\n');

  const appearanceEntries = siteConfig.appearances.items
    .map(
      (item) => `### ${item.title}
- Type: ${item.type}
- Date: ${item.date}
- Platform: ${item.platform}
- URL: ${item.url}
- Description: ${item.description}${item.language ? `\n- Language: ${item.language}` : ''}`
    )
    .join('\n\n');

  const podcastEntries = siteConfig.podcasts
    .map(
      (podcast) => `### ${podcast.title}
- Date: ${podcast.date}
- Description: ${podcast.description}${podcast.language ? `\n- Language: ${podcast.language}` : ''}`
    )
    .join('\n\n');

  const blogEntries =
    posts.length > 0
      ? posts
          .map(
            (post) => `### ${post.title}
- URL: ${siteUrl}/blog/${post.slug}
- Date: ${post.date}
- Description: ${post.description}${
              post.tags && (post.tags as string[]).length > 0
                ? `\n- Tags: ${(post.tags as string[]).join(', ')}`
                : ''
            }`
          )
          .join('\n\n')
      : 'No published posts yet. Check back soon.';

  const nowSections = siteConfig.now.sections
    .map((section) => {
      // Strip HTML tags for plain text
      const plainContent = section.content.replace(/<[^>]*>/g, '');
      return `### ${section.title}\n${plainContent}`;
    })
    .join('\n\n');

  const llmsTxt = `# ${siteConfig.personal.name}

> ${siteConfig.seo.description}

## About

${siteConfig.about.greeting}. ${siteConfig.about.description.replace(/,\s*$/, '.')}

- Location: ${siteConfig.personal.location}
- Email: ${siteConfig.personal.email}
- Website: ${siteUrl}
- GitHub: ${siteConfig.social.github}
- LinkedIn: ${siteConfig.social.linkedin}
- Twitter: ${siteConfig.social.twitter}

## Core Skills

Software Engineering, Backend Development, System Architecture, Golang, Go, Kafka, PostgreSQL, gRPC, Microservices, Product Engineering, Distributed Systems, Financial Technology, Python, Redis, BigQuery, TensorFlow, GraphQL, DynamoDB, AWS, Docker, CockroachDB, Protobuf

## Professional Experience

${experienceEntries}

## Featured Projects

${projectEntries}

## Appearances & Talks

${appearanceEntries}

## Podcasts

${podcastEntries}

## Blog

${blogEntries}

## What I'm Doing Now

${siteConfig.now.updatedAt}

${nowSections}

## Links

- Website: ${siteUrl}
- Blog: ${siteUrl}/blog
- Appearances: ${siteUrl}/appearances
- Now: ${siteUrl}/now
- RSS Feed: ${siteUrl}/feed.xml
- Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

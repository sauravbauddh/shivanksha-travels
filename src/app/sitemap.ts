import type { MetadataRoute } from 'next';
import { getAllPackages, getAllBlogPosts } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shivankshatravels.in';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  try {
    // Fetch dynamic content
    const packages = await getAllPackages();
    const blogPosts = await getAllBlogPosts();

    // Package pages
    const packagePages = packages.map((pkg: { slug: { current: string } }) => ({
      url: `${baseUrl}/packages/${pkg.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Blog pages
    const blogPages = blogPosts.map(
      (post: { slug: { current: string }; publishedAt: string }) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    );

    return [...staticPages, ...packagePages, ...blogPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if dynamic fetch fails
    return staticPages;
  }
}

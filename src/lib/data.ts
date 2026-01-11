import { supabase } from '@/lib/supabase/client';
import { Destination, Package, Testimonial, Feature, SiteContent } from '@/types/home.types';
import { FEATURES, PACKAGES, DESTINATIONS, TESTIMONIALS } from './mock-data';

// Toggle this to switch between Mock Data and Supabase
const USE_MOCK_DATA = false;

export async function getFeatures(): Promise<Feature[]> {
  // Features are static for now, or fetch from site_content if moved there
  return FEATURES;
}

export async function getDestinations(): Promise<Destination[]> {
  if (USE_MOCK_DATA) {
    return DESTINATIONS as Destination[];
  }

  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image_url,
      category: item.category,
      // rating is not in the schema for destinations but in type
    }));
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

export async function getPackages(): Promise<Package[]> {
  if (USE_MOCK_DATA) {
    return PACKAGES as Package[];
  }

  try {
    // Fetch featured packages
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      // .eq('featured', true) // Assuming getPackages means all or featured? The original getFeaturedPackages fetched featured.
      // But getPackages usually implies specific usage. 
      // Let's assume getPackages returns featured ones for home page.
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching packages:', error);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      description: item.description,
      image: item.main_image_url,
      duration: item.duration,
      rating: Number(item.rating) || 0,
      price: Number(item.price),
      featured: item.featured,
    }));
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

// Alias for sitemap
export async function getAllPackages() {
    if (USE_MOCK_DATA) {
        return PACKAGES; 
    }
    // Fetch ALL packages (not just featured)
    try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('created_at', { ascending: false });
    
        if (error) {
          console.error('Error fetching all packages:', error);
          return [];
        }
    
        return data.map((item) => ({
          _id: item.id, // Sitemap might expect _id or we fix sitemap to use id
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          mainImage: item.main_image_url,
          duration: item.duration,
          price: Number(item.price),
          image: item.main_image_url, // Satisfy Package interface
          rating: Number(item.rating) || 0 // Satisfy Package interface
        }));
      } catch (error) {
        console.error('Error fetching all packages:', error);
        return [];
      }
}

export async function getAllBlogPosts() {
    // Return empty array or implement if blog_posts table used
    try {
        const { data, error } = await supabase.from('blog_posts').select('*');
        if (error) return [];
        return data.map(post => ({
            _id: post.id,
            slug: { current: post.slug },
            title: post.title,
            publishedAt: post.published_at
        }));
    } catch {
        return [];
    }
}


export async function getTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK_DATA) {
    return TESTIMONIALS as Testimonial[];
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true) 
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      name: item.customer_name,
      location: item.location,
      image: item.customer_image_url,
      quote: item.testimonial,
      rating: Number(item.rating) || 5,
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getSiteContent(): Promise<SiteContent | null> {
  if (USE_MOCK_DATA) {
     return null;
  }

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('key', 'global')
      .single();

    if (error) {
      console.warn('Error fetching site content:', error);
      return null;
    }

    return data.content as SiteContent;
  } catch (error) {
    console.error('Error fetching site content:', error);
    return null;
  }
}

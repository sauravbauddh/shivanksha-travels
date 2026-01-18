import { FEATURES, TESTIMONIALS } from './mock-data';
import {
  fetchDestinationBySlug,
  getAllDestinations,
  getFeaturedPackages,
  getPackagesByDestinationSlug,
  getFeaturedTestimonials,
} from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { Destination, Package, Testimonial } from '@/types/home.types';

// Toggle this to switch between Mock Data and Sanity CMS
const USE_MOCK_DATA = false;

export async function getFeatures() {
  // Features are static for now as there is no Sanity schema for them
  return FEATURES;
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    const data = await getAllDestinations();

    return data.map((item: any) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
      description: item.description,
      image: item.image ? urlFor(item.image).url() : '',
      rating: undefined, // Destination schema doesn't have rating in mock data types, but interface has optional rating
      category: item.category,
    }));
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

export async function getDestinationBySlug(
  slug: string
): Promise<Destination | null> {
  try {
    const data = await fetchDestinationBySlug(slug);
    console.log(data);
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image ? urlFor(data.image).url() : '',
      rating: undefined, // Destination schema doesn't have rating in mock data types, but interface has optional rating
      category: data.category,
    };
  } catch (error) {
    console.error('Error fetching destination by slug:', error);
    return null;
  }
}

export async function getPackages(
  destinationSlug?: string
): Promise<Package[]> {
  try {
    let data;
    console.log('Destination:', destinationSlug);
    if (destinationSlug) {
      // Fetch packages for a specific destination
      data = await getPackagesByDestinationSlug(destinationSlug);
    } else {
      // Fetch all packages
      data = await getFeaturedPackages();
    }

    console.log('Packages: ', data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const packages = data.map((item: any) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      image: item.mainImage ? urlFor(item.mainImage).url() : '',
      duration: item.duration,
      rating: item.rating || 0,
      featured: item.featured || false,
      slug: item.slug?.current,
      destinationSlug: item.destinations?.[0]?.slug?.current, // Primary destination
    }));

    return packages;
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK_DATA) {
    return TESTIMONIALS;
  }

  try {
    const data = await getFeaturedTestimonials();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((item: any) => ({
      id: item._id,
      name: item.customerName,
      location: item.location,
      image: item.customerImage ? urlFor(item.customerImage).url() : '',
      quote: item.testimonial,
      rating: item.rating || 5, // Default to 5 if not provided
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

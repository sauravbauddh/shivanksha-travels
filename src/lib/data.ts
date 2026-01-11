import { DESTINATIONS, FEATURES, PACKAGES, TESTIMONIALS } from './mock-data';
import {
  getAllDestinations,
  getFeaturedPackages,
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
  // if (USE_MOCK_DATA) {
    return DESTINATIONS;
  // }

  try {
    const data = await getAllDestinations();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((item: any) => ({
      id: item._id,
      name: item.name,
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

export async function getDestination(id: string): Promise<Destination | undefined> {
  // if (USE_MOCK_DATA) {
    return DESTINATIONS.find((d) => d.id === id);
  // }

  // Fallback to fetch all and find, or implement getDestinationById in sanity queries
  const destinations = await getDestinations();
  return destinations.find((d) => d.id === id);
}

export async function getPackages(destinationId?: string): Promise<Package[]> {
  // if (USE_MOCK_DATA) {
    let packages = PACKAGES;
    if (destinationId) {
      packages = packages.filter((p) => p.destinationId === destinationId);
    }
    return packages;
  // }

  /*
  // Sanity implementation would look something like this:
  try {
    const data = await getFeaturedPackages(); // Needs update to support filtering
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let packages = data.map((item: any) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      image: item.mainImage ? urlFor(item.mainImage).url() : '',
      duration: item.duration,
      rating: item.rating || 0,
      price: item.price,
      featured: true,
      destinationId: item.destination?._ref // Assuming reference exists
    }));

    if (destinationId) {
        // pure client side filtering for now if query doesn't support it
        // In real app, you'd pass params to query
    }
    return packages;
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
  */
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

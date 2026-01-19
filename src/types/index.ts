// Sanity types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface TravelPackage {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  mainImage: SanityImage;
  gallery?: SanityImage[];
  duration: string;
  destinations?: Destination[];
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: ItineraryDay[];
  featured?: boolean;
  seo?: SEOSettings;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  meals?: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: string;
}

export interface Destination {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image: SanityImage;
  country?: string;
  region?: string;
  seo?: SEOSettings;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  customerImage?: SanityImage;
  rating: number;
  testimonial: string;
  packageReference?: TravelPackage;
  location?: string;
  travelDate?: string;
  featured?: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImage: SanityImage;
  content: unknown[];
  author: string;
  publishedAt: string;
  categories?: string[];
  seo?: SEOSettings;
}

export interface SEOSettings {
  metaTitle?: string;
  metaDescription?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

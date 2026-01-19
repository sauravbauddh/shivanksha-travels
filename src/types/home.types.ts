export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: { _type: string; current: string };
  description: string;
  image: string;
  rating?: number;
  category: 'Pilgrimage' | 'Adventure' | 'Nature' | 'Leisure';
}

export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: number; // 0-5
  featured?: boolean;
  slug?: string;
  destinationSlug?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number; // 0-5
}

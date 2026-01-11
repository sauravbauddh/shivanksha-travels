export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  rating?: number;
  category: 'Pilgrimage' | 'Adventure' | 'Nature' | 'Leisure';
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: number; // 0-5
  price: number;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number; // 0-5
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export interface ContactDetails {
  address?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLinks;
}

export interface HeroSectionData {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroVideo?: string;
}

export interface GalleryItem {
  mediaType: 'image' | 'video';
  image?: string;
  thumbnail?: string;
  videoUrl?: string;
  alt?: string;
  width?: string;
  _key: string;
}

export interface GallerySectionData {
  title: string;
  subtitle?: string;
  galleryItems: GalleryItem[];
}

export interface SiteContent {
  logo?: string;
  heroSection?: HeroSectionData;
  contactDetails?: ContactDetails;
  gallerySection?: GallerySectionData;
}

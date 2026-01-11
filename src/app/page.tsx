import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
// import { DestinationsSection } from '@/components/home/DestinationsSection';
// import { PackagesSection } from '@/components/home/PackagesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { GallerySection } from '@/components/home/GallerySection';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { DestinationsSection } from '@/components/home/DestinationsSection';
import { PackagesSection } from '@/components/home/PackagesSection';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteContent();
  const hero = data?.heroSection;
  const logoUrl = data?.logo ? urlFor(data.logo).url() : null;

  const title = 'Shivanksha Travels';
  const description =
    hero?.heroSubtitle ||
    'Experience the spiritual majesty of Uttarakhand. Curated journeys for the modern pilgrim.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: logoUrl
        ? [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      type: 'website',
      url: 'https://shivankshatravels.in',
      siteName: 'Shivanksha Travels',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: logoUrl ? [logoUrl] : undefined,
    },
    alternates: {
      canonical: 'https://shivankshatravels.in',
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <PackagesSection />
      <GallerySection />
      <TestimonialsSection />
    </main>
  );
}

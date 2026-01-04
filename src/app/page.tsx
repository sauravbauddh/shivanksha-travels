import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
// import { DestinationsSection } from '@/components/home/DestinationsSection';
// import { PackagesSection } from '@/components/home/PackagesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { GallerySection } from '@/components/home/GallerySection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      {/* <FeaturesSection /> */}
      {/* <DestinationsSection /> */}
      {/* <PackagesSection /> */}
      <GallerySection />
      <TestimonialsSection />
    </main>
  );
}

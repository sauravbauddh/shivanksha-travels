import { getPackageDetailsBySlug } from '@/lib/sanity/package-helpers';
import { getAllPackages } from '@/lib/sanity/queries';
import { PackageDetails } from '@/components/packages/PackageDetails';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PackagePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all packages
export async function generateStaticParams() {
  const packages = await getAllPackages();
  
  return packages.map((pkg: any) => ({
    slug: pkg.slug?.current || '',
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const packageData = await getPackageDetailsBySlug(slug);

  if (!packageData) {
    return {
      title: 'Package Not Found | Shivanksha Travels',
    };
  }

  const title =
    packageData.seo?.metaTitle || `${packageData.title} | Shivanksha Travels`;
  const description =
    packageData.seo?.metaDescription ||
    packageData.description ||
    'Explore this amazing travel package with Shivanksha Travels';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: packageData.mainImage
        ? [
            {
              url: packageData.mainImage,
              width: 1200,
              height: 630,
              alt: packageData.title,
            },
          ]
        : undefined,
      type: 'website',
      url: `https://shivankshatravels.in/packages/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: packageData.mainImage ? [packageData.mainImage] : undefined,
    },
    alternates: {
      canonical: `https://shivankshatravels.in/packages/${slug}`,
    },
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  console.log("Params slug:", slug);
  const packageData = await getPackageDetailsBySlug(slug);

  if (!packageData) {
    notFound();
  }

  // Transform data to match PackageDetails component expectations
  // The component expects TravelPackage type with SanityImage for mainImage
  const transformedData = {
    _id: packageData._id,
    title: packageData.title,
    slug: packageData.slug,
    description: packageData.description,
    mainImage: {
      _type: 'image' as const,
      asset: {
        _ref: 'placeholder',
        _type: 'reference' as const,
      },
    },
    gallery: packageData.gallery?.map(() => ({
      _type: 'image' as const,
      asset: {
        _ref: 'placeholder',
        _type: 'reference' as const,
      },
    })),
    duration: packageData.duration,
    destinations: packageData.destinations,
    highlights: packageData.highlights,
    inclusions: packageData.inclusions,
    exclusions: packageData.exclusions,
    itinerary: packageData.itinerary,
    featured: true,
    seo: packageData.seo,
    // Additional props expected by PackageDetails
    rating: 4.8,
    reviewCount: 120,
    locations: packageData.destinations?.map((d: any) => d.name) || [],
    groupSize: 'Max 12',
    guideLanguages: ['English', 'Hindi'],
    transport: 'Private AC Sedan/SUV',
  };

  return (
    <div>
      <PackageDetails packageData={transformedData} />
    </div>
  );
}


import { getPackageBySlug, getAllPackages, getSiteContent } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
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
  const packageData = await getPackageBySlug(slug);

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
              url: urlFor(packageData.mainImage).url(),
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
      images: packageData.mainImage ? [urlFor(packageData.mainImage).url()] : undefined,
    },
    alternates: {
      canonical: `https://shivankshatravels.in/packages/${slug}`,
    },
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  console.log("Params slug:", slug);
  const packageData = await getPackageBySlug(slug);
  const siteContent = await getSiteContent();
  const whatsappNumber = siteContent?.contactDetails?.whatsappNumber || '917668842928';

  if (!packageData) {
    notFound();
  }

  // Transform data to match PackageDetails component expectations
  // The component expects TravelPackage type with SanityImage for mainImage
  return (
    <div>
      <PackageDetails packageData={packageData} whatsappNumber={whatsappNumber} />
    </div>
  );
}
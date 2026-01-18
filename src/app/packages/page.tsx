import { getPackages } from '@/lib/data';
import { PackageCard } from '@/components/home/PackageCard';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Packages | Shivanksha Travels',
  description:
    'Explore our curated collection of travel packages. From spiritual pilgrimages to adventure tours in Uttarakhand and beyond.',
  openGraph: {
    title: 'Travel Packages | Shivanksha Travels',
    description:
      'Explore our curated collection of travel packages. From spiritual pilgrimages to adventure tours in Uttarakhand and beyond.',
    type: 'website',
    url: 'https://shivankshatravels.in/packages',
  },
  alternates: {
    canonical: 'https://shivankshatravels.in/packages',
  },
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <main className="flex flex-col min-h-screen pt-20">
      <section className="py-24 bg-surface dark:bg-surface-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-main dark:text-white mb-6">
              Our Travel Packages
            </h1>
            <p className="text-lg text-text-sub dark:text-gray-300 max-w-2xl mx-auto">
              Discover handcrafted journeys designed to create unforgettable
              memories. Each package is carefully curated to deliver authentic
              experiences.
            </p>
          </div>

          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <Link
                  href={`/packages/${pkg.slug}`}
                  key={pkg.id}
                  className="block h-full"
                >
                  <PackageCard pkg={pkg} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-sub dark:text-gray-400">
                No packages available at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

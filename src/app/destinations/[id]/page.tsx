import React from 'react';
import { getDestination, getPackages } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PackageCard } from '@/components/home/PackageCard';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PackageListingPage(props: Props) {
  const params = await props.params;
  const destination = await getDestination(params.id);

  console.log(destination);

  if (!destination) {
    notFound();
  }

  const packages = await getPackages(destination.id);

  return (
    <main className="min-h-screen bg-surface dark:bg-surface-dark pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-surface dark:to-surface-dark z-10" />
            <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            />
        </div>
        
        <div className="relative z-20 h-full max-w-[1200px] mx-auto px-6 flex flex-col justify-end pb-24">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-4 font-medium uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#destinations" className="hover:text-white transition-colors">Destinations</Link>
            <span>/</span>
            <span className="text-white">{destination.name} Packages</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
            Exploring {destination.name}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl leading-relaxed">
            {destination.description}
            </p>
        </div>
      </section>

      {/* Filter & Sort Section (Simple version) */}
      <div className="sticky top-20 z-30 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div>
            <h2 className="text-xl font-bold text-text-main dark:text-white">
                Curated Tour Packages
            </h2>
            <p className="text-sm text-text-sub">
                Found {packages.length} hand-picked experiences for you
            </p>
            </div>
            
            <div className="flex gap-3">
                {/* Placeholder filters for visual completeness */}
                <button className="px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm font-medium text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                    Duration <Icon name="expand_more" size={16} />
                </button>
                <button className="px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm font-medium text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                    Price <Icon name="expand_more" size={16} />
                </button>
                    <button className="px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm font-medium text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                    Popularity <Icon name="expand_more" size={16} />
                </button>
            </div>
        </div>
      </div>

      {/* Packages Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
            {packages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <Link href="/package-demo" key={pkg.id} className="block h-full">
                    <PackageCard pkg={pkg} />
                    </Link>
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                    <Icon name="travel_explore" size={48} className="mx-auto mb-4 text-text-sub opacity-50" />
                    <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">No packages found</h3>
                    <p className="text-text-sub max-w-md mx-auto">
                        We are currently updating our packages for {destination.name}. Please check back soon or contact us for custom itineraries.
                    </p>
                </div>
            )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/5 dark:bg-primary/10 border-t border-primary/10">
         <div className="max-w-[800px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-text-main dark:text-white mb-4">
                Can't find what you're looking for?
            </h2>
            <p className="text-text-sub mb-8 text-lg">
                Let our travel experts craft a personalized itinerary just for you. We specialize in custom experiences.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
                Request Custom Plan
            </button>
         </div>
      </section>

    </main>
  );
}

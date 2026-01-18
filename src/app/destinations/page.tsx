
import React from 'react';
import { getDestinations } from '@/lib/data';
import { DestinationCard } from '@/components/home/DestinationCard';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';


export default async function DestinationListingPage() {
  const destinations = await getDestinations();

  const categories = ['All Destinations', 'Pilgrimage', 'Trekking', 'Luxury Stays', 'Wildlife'];

  return (
    <main className="min-h-screen bg-surface dark:bg-surface-dark pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-surface dark:bg-surface-dark flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-main dark:text-white mb-4">
          Discover Dev Bhoomi
        </h1>
        <p className="text-lg md:text-xl text-text-sub max-w-2xl mx-auto mb-10">
          Curated spiritual and adventure journeys through the heart of Uttarakhand's sacred landscapes.
        </p>
        
        {/* Placeholder Categories - Visual Only for now as client filtering requires client component */}
        <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category, index) => (
                <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    index === 0 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/10'
                }`}
                >
                {category}
                </button>
            ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 bg-surface dark:bg-surface-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((destination) => (
                // Reusing DestinationCard but overriding styles for grid layout if needed via wrapper
                // The current DestinationCard has fixed width/height for slider, so we might need a modified version or wrapper override.
                // Let's check DestinationCard styles again. It has w-[85vw] md:w-[400px].
                // We need it to be w-full in the grid.
                // Since I can't easily pass className to override internal fixed width without modifying component,
                // I will modify DestinationCard to accept className or create a local wrapper.
                // Checking DestinationCard again... it has className prop? No.
                // I will simply modify DestinationCard to accept className and allow overriding width.
               
               // For now, I'll assume I'll update DestinationCard to be flexible or wrap it.
               // Actually, let's look at the verification step.
               // I'll update DestinationCard first to accept className for width overrides.
                <div key={destination.slug.current} className="w-full aspect-[4/3] [&>a]:w-full [&>a]:h-full">
                     <DestinationCard destination={destination} />
                </div>
            ))}
          </div>
        </div>
      </section>
      
       <div className="text-center pb-20">
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                View More Destinations <Icon name="arrow_forward" size={18} />
            </Link>
       </div>

    </main>
  );
}

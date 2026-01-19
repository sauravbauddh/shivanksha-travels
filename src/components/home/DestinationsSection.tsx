import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { getDestinations } from '@/lib/data';
import { DestinationCard } from './DestinationCard';
import Link from 'next/link';

export const DestinationsSection = async () => {
  const destinations = await getDestinations();

  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-main dark:text-white mb-2">
            Destinations.
          </h2>
          <p className="text-xl text-text-sub">Places that touch your soul.</p>
        </div>

        <Link
          href="/destinations"
          className="hidden md:flex items-center gap-1 text-primary hover:text-primary-dark font-semibold transition-colors group"
        >
          View All{' '}
          <Icon
            name="arrow_forward_ios"
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory no-scrollbar md:px-[calc((100vw-1200px)/2+24px)]">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug.current} destination={destination} />
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import { Destination } from '@/types/home.types';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Link
      href={`/destinations/${destination.id}`}
      className="snap-center shrink-0 w-[85vw] md:w-[400px] h-[500px] relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 block"
    >
      <img
        alt={destination.name}
        src={destination.image}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

      <div className="absolute bottom-0 left-0 p-8 w-full">
        <Badge variant="primary" className="mb-2 inline-block">
          {destination.category}
        </Badge>
        <h3 className="text-3xl font-bold text-white mb-1">
          {destination.name}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2">
          {destination.description}
        </p>
      </div>
    </Link>
  );
};

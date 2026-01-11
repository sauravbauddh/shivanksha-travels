import React from 'react';
import { Package } from '@/types/home.types';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Card } from '@/components/ui/Card';

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard = ({ pkg }: PackageCardProps) => {
  return (
    <Card
      variant="white"
      className="p-0 overflow-hidden h-full flex flex-col group hover:shadow-xl border border-gray-100 dark:border-white/10"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          alt={pkg.title}
          src={pkg.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="light" className="backdrop-blur-md">
            {pkg.duration}
          </Badge>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-4">
          <Rating rating={pkg.rating} className="mb-2" />
          <h3 className="text-2xl font-bold text-text-main dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
            {pkg.title}
          </h3>
          <p className="text-text-sub text-sm leading-relaxed line-clamp-2">
            {pkg.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between pt-6 border-t border-gray-100 dark:border-white/10">
          <div>
            <p className="text-xs text-text-sub uppercase tracking-wider">
              From
            </p>
            <p className="text-xl font-bold text-text-main dark:text-white">
              ₹{pkg.price.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-primary hover:text-primary-dark font-bold text-sm transition-colors cursor-pointer">
            Details
          </div>
        </div>
      </div>
    </Card>
  );
};

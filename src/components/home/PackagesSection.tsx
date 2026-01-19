import React from 'react';
import { getPackages } from '@/lib/data';
import { PackageCard } from './PackageCard';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';

export const PackagesSection = async () => {
  const packages = await getPackages();

  return (
    <section className="py-24 bg-surface dark:bg-surface-dark">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main dark:text-white mb-12 text-center">
          Curated Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <Link href={`/packages/${pkg.slug}`} key={pkg.id} className="block h-full">
              <PackageCard pkg={pkg} />
            </Link>
          ))}
        </div>

        {/*<div className="text-center">*/}
        {/*  <Link*/}
        {/*    href="#"*/}
        {/*    className="inline-flex items-center gap-2 text-text-main dark:text-white font-semibold hover:text-primary transition-colors hover:gap-3"*/}
        {/*  >*/}
        {/*    Compare All Packages <Icon name="arrow_forward" size={20} />*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

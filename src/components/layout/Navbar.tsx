import React from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getSiteContent } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

export const Navbar = async () => {
  const data = await getSiteContent();
  const logoUrl = data?.logo ? urlFor(data.logo).url() : null;

  return (
    <nav className="fixed top-0 w-full z-50 apple-glass transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
        <Link href="/">
          <Logo logoUrl={logoUrl} />
        </Link>

        {/* Desktop Links */}
        {/* <div className="hidden md:flex items-center gap-8 text-xs font-medium text-text-main/80 dark:text-gray-300">
          <Link
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Destinations
          </Link>
          <Link
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Packages
          </Link>
          <Link
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Journal
          </Link>
        </div> */}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a href="#contact">
            <Button variant="primary" size="sm">
              Contact Us
            </Button>
          </a>
          {/* <Icon
            name="search"
            size={20}
            className="text-text-main dark:text-white cursor-pointer hover:opacity-70 transition-opacity"
          /> */}

          {/* <button className="md:hidden p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Icon
              name="menu"
              size={20}
              className="text-text-main dark:text-white"
            />
          </button> */}

          {/* <ThemeToggle /> */}

          {/* <button className="hidden md:block bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-xs font-semibold hover:scale-105 transition-transform">
            Plan Trip
          </button> */}
        </div>
      </div>
    </nav>
  );
};

import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';
import { getSiteContent } from '@/lib/sanity/queries';

export const TemporaryFooter = async () => {
  const data = await getSiteContent();
  const contact = data?.contactDetails || {};
  const social = contact?.socialLinks || {};

  return (
    <footer className="bg-white dark:bg-black pt-20 pb-10 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="col-span-1">
            <Logo className="mb-6" />
            <p className="text-text-sub text-sm leading-relaxed max-w-xs mb-6">
              Crafting unforgettable spiritual and adventure journeys in the
              heart of the Himalayas.
            </p>
            {/* Dynamic Address */}
            <div className="space-y-2 text-sm text-text-sub">
              {contact.address && (
                <p className="whitespace-pre-line">{contact.address}</p>
              )}
              {contact.email && (
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && (
                <p>
                  Phone:{' '}
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-start md:items-end">
            <h4 className="font-bold text-sm mb-6 text-text-main dark:text-white">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              {social.instagram && (
                <Link
                  href={social.instagram}
                  target="_blank"
                  className="text-text-sub hover:text-text-main dark:hover:text-white transition-colors"
                >
                  Instagram
                </Link>
              )}
              {social.facebook && (
                <Link
                  href={social.facebook}
                  target="_blank"
                  className="text-text-sub hover:text-text-main dark:hover:text-white transition-colors"
                >
                  Facebook
                </Link>
              )}
              {social.twitter && (
                <Link
                  href={social.twitter}
                  target="_blank"
                  className="text-text-sub hover:text-text-main dark:hover:text-white transition-colors"
                >
                  Twitter
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-white/5 gap-4">
          <p className="text-xs text-text-sub">
            © {new Date().getFullYear()} Shivanksha Travels. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

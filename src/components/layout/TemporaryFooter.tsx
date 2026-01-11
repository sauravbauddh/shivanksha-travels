import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';
import { getSiteContent } from '@/lib/data';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const TemporaryFooter = async () => {
  const data = await getSiteContent();
  const contact = data?.contactDetails || {};
  const social = contact?.socialLinks || {};
  const logoUrl = data?.logo || null;

  // Use the address from CMS for the map, fallback to a default if missing
  const mapAddress = contact.address || 'Rishikesh, Uttarakhand, India';
  const encodedAddress = encodeURIComponent(mapAddress);

  return (
    <footer
      id="contact"
      className="bg-white dark:bg-black pt-20 pb-10 border-t border-gray-100 dark:border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="col-span-1">
            <Logo className="mb-6" logoUrl={logoUrl} />
            <p className="text-text-sub text-sm leading-relaxed max-w-xs mb-6">
              Crafting unforgettable spiritual and adventure journeys in the
              heart of Dev Bhoomi.
            </p>
            {/* Dynamic Address */}
            <div className="space-y-4 text-sm text-text-sub">
              {contact.address && (
                <p className="whitespace-pre-line">{contact.address}</p>
              )}
              <div className="space-y-2">
                {contact.email && (
                  <p>
                    <span className="font-medium text-text-main dark:text-white">
                      Email:
                    </span>{' '}
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
                    <span className="font-medium text-text-main dark:text-white">
                      Phone:
                    </span>{' '}
                    {contact.phone
                      .split(',')
                      .map((phone: string, index: number) => {
                        const cleanPhone = phone.trim();
                        return (
                          <React.Fragment key={index}>
                            {index > 0 && ', '}
                            <a
                              href={`tel:${cleanPhone}`}
                              className="text-primary hover:underline"
                            >
                              {cleanPhone}
                            </a>
                          </React.Fragment>
                        );
                      })}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <h4 className="font-bold text-sm mb-3 text-text-main dark:text-white">
                  Connect With Us
                </h4>
                <div className="flex gap-4">
                  {social.instagram && (
                    <Link
                      href={social.instagram}
                      target="_blank"
                      className="text-text-sub hover:text-primary transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </Link>
                  )}
                  {social.facebook && (
                    <Link
                      href={social.facebook}
                      target="_blank"
                      className="text-text-sub hover:text-primary transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </Link>
                  )}
                  {social.twitter && (
                    <Link
                      href={social.twitter}
                      target="_blank"
                      className="text-text-sub hover:text-primary transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex flex-col h-full min-h-[300px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              title="Office Location"
            />
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

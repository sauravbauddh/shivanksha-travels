import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';
import { getSiteContent } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const TemporaryFooter = async () => {
  const data = await getSiteContent();
  const contact = data?.contactDetails || {};
  const social = contact?.socialLinks || {};
  const bankDetails = data?.bankDetails;
  const logoUrl = data?.logo ? urlFor(data.logo).url() : null;
  const whatsappNumber = contact?.whatsappNumber || '917668842928';

  // Use the address from CMS for the map, fallback to a default if missing
  const mapAddress = contact.address || 'Rishikesh, Uttarakhand, India';
  const encodedAddress = encodeURIComponent(mapAddress);

  return (
    <footer
      id="contact"
      className="bg-white dark:bg-black pt-20 pb-10 border-t border-gray-100 dark:border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {/* Company Details Column */}
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
                  <Link
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    className="text-text-sub hover:text-green-500 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </Link>
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

          {/* Bank Details Column */}
          <div className="col-span-1">
            {bankDetails && (
              <div>
                <h4 className="font-bold text-sm mb-4 text-text-main dark:text-white">
                  Bank Details
                </h4>
                <div className="space-y-2 text-sm text-text-sub">
                  {bankDetails.bankName && (
                    <p className="font-medium text-text-main dark:text-gray-200">
                      {bankDetails.bankName}
                    </p>
                  )}
                  {bankDetails.accountHolderName && (
                    <p className="text-text-main dark:text-gray-200">{bankDetails.accountHolderName}</p>
                  )}
                  {bankDetails.accountNumber && (
                    <p>
                      <span className="font-medium text-text-main dark:text-white">A/C No:</span>{' '}
                      <span className="font-mono text-primary">{bankDetails.accountNumber}</span>
                    </p>
                  )}
                  {bankDetails.ifscCode && (
                    <p>
                      <span className="font-medium text-text-main dark:text-white">IFSC:</span>{' '}
                      <span className="font-mono text-primary">{bankDetails.ifscCode}</span>
                    </p>
                  )}
                  {bankDetails.branchAddress && (
                    <p className="text-xs text-text-sub/80 mt-2">
                      {bankDetails.branchAddress}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Map Column */}
          <div className="col-span-1 flex flex-col h-full min-h-[250px] md:min-h-[300px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '250px' }}
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

import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';
import { getSiteContent } from '@/lib/sanity/queries';

interface BankDetails {
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branchAddress?: string;
}

export const Footer = async () => {
  const data = await getSiteContent();
  const bankDetails: BankDetails | undefined = data?.bankDetails;

  return (
    <footer className="bg-white dark:bg-black pt-20 pb-10 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Logo & Bank Details Column */}
          <div className="col-span-2 md:col-span-2">
            <Logo className="mb-6" />
            <p className="text-text-sub text-sm leading-relaxed max-w-xs mb-6">
              Crafting unforgettable spiritual and adventure journeys in the
              heart of Dev Bhoomi.
            </p>

            {/* Bank Account Details */}
            {bankDetails && (
              <div className="mt-4">
                <h4 className="font-bold text-sm mb-3 text-text-main dark:text-white">
                  Bank Details
                </h4>
                <div className="text-sm text-text-sub space-y-1.5">
                  {bankDetails.bankName && (
                    <p className="font-medium text-text-main dark:text-gray-200">
                      {bankDetails.bankName}
                    </p>
                  )}
                  {bankDetails.accountHolderName && (
                    <p>{bankDetails.accountHolderName}</p>
                  )}
                  {bankDetails.accountNumber && (
                    <p>
                      <span className="text-text-sub/70">A/C No:</span>{' '}
                      <span className="font-mono">{bankDetails.accountNumber}</span>
                    </p>
                  )}
                  {bankDetails.ifscCode && (
                    <p>
                      <span className="text-text-sub/70">IFSC:</span>{' '}
                      <span className="font-mono">{bankDetails.ifscCode}</span>
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

          <div className="col-span-1">
            <h4 className="font-bold text-sm mb-6 text-text-main dark:text-white">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-text-sub">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Spiritual Tours
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Adventure
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-sm mb-6 text-text-main dark:text-white">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-text-sub">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-sm mb-6 text-text-main dark:text-white">
              Legal
            </h4>
            <ul className="space-y-4 text-sm text-text-sub">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-white/5 gap-4">
          <p className="text-xs text-text-sub">
            © 2024 Dev Bhoomi Tours. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-text-sub hover:text-text-main dark:hover:text-white transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-text-sub hover:text-text-main dark:hover:text-white transition-colors"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="text-text-sub hover:text-text-main dark:hover:text-white transition-colors"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

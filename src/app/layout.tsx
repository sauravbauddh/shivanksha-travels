import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/config/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Shivanksha Travels',
              url: 'https://shivankshatravels.in',
              logo: 'https://shivankshatravels.in/logo.png',
              description:
                'Discover unforgettable travel experiences with Shivanksha Travels. We offer customized tour packages, destination guides, and expert travel planning services.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
              sameAs: [
                'https://facebook.com/shivankshatravels',
                'https://instagram.com/shivankshatravels',
                'https://twitter.com/shivankshatravels',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

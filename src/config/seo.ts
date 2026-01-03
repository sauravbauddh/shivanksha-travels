import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Shivanksha Travels',
  description:
    'Discover unforgettable travel experiences with Shivanksha Travels. We offer customized tour packages, destination guides, and expert travel planning services.',
  url: 'https://shivankshatravels.in',
  ogImage: 'https://shivankshatravels.in/og-image.jpg',
  links: {
    facebook: 'https://facebook.com/shivankshatravels',
    instagram: 'https://instagram.com/shivankshatravels',
    twitter: 'https://twitter.com/shivankshatravels',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'travel',
    'tours',
    'travel packages',
    'vacation',
    'holiday',
    'destinations',
    'travel agency',
    'tour operator',
  ],
  authors: [{ name: 'Shivanksha Travels' }],
  creator: 'Shivanksha Travels',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@shivankshatravels',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

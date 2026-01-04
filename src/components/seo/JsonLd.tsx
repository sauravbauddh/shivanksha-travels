import { getSiteContent } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

export const JsonLd = async () => {
  const data = await getSiteContent();
  const contact = data?.contactDetails || {};
  const social = contact?.socialLinks || {};
  const logoUrl = data?.logo ? urlFor(data.logo).url() : null;

  const sameAs = [social.instagram].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Shivanksha Travels',
    url: 'https://shivankshatravels.in',
    logo: logoUrl || 'https://shivankshatravels.in/logo.png',
    image: logoUrl || 'https://shivankshatravels.in/og-image.jpg',
    description:
      'Crafting unforgettable spiritual and adventure journeys in the heart of Dev Bhoomi.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      streetAddress: contact.address || '',
      addressRegion: 'Uttarakhand',
    },
    contactPoint: contact.phone
      ? {
          '@type': 'ContactPoint',
          telephone: contact.phone.split(',')[0].trim(),
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
        }
      : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    founder: {
      '@type': 'Person',
      name: 'Vidhya Nishad',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

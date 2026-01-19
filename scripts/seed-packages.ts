import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read .env.local file manually
const envPath = join(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = Object.fromEntries(
  envContent
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split('=').map((part) => part.trim()))
);

const client = createClient({
  projectId:
    envVars.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:
    envVars.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: envVars.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Dummy package data matching actual destinations
const dummyPackages = [
  {
    _type: 'travelPackage',
    title: '2 Dham Yatra Package (6 Days) - Haridwar to Haridwar',
    slug: {
      _type: 'slug',
      current: '2-dham-yatra-package-6-days-haridwar-to-haridwar',
    },
    description:
      'A 6-day 2 Dham Yatra package covering Kedarnath and Badrinath with a complete round trip from Haridwar. This itinerary is designed for a smooth pilgrimage experience with essential trek planning for Kedarnath, scenic Himalayan routes, and key stopovers including Guptkashi, Joshimath, and Rudraprayag.',

    // You will add this
    mainImage: undefined,

    // You will add these
    gallery: [],

    duration: '6 Days / 5 Nights',

    rating: 4.6,

    price: 17999,

    // You will add destination references
    destinations: [],

    highlights: [
      '2 Dham pilgrimage covering Kedarnath and Badrinath',
      'Round trip itinerary from Haridwar to Haridwar',
      'Kedarnath trek (approx. 18 km) included with proper scheduling',
      'Badrinath Temple darshan with return via Joshimath and Rudraprayag',
      'Scenic Himalayan routes through Guptkashi and major hill towns',
      'Balanced pacing with comfortable travel halts',
    ],

    inclusions: [
      'All transfers and travel as per the itinerary (point-to-point basis)',
      'Driver allowance, toll taxes, parking charges, and applicable road taxes',
      'Pickup and drop as per itinerary schedule',
      'Basic on-ground assistance during the tour (operator level)',
    ],

    exclusions: [
      'Meals unless specifically included in the final booking',
      'Accommodation unless explicitly included in the final booking',
      'Any kind of personal expenses (laundry, tips, shopping, etc.)',
      'Pony, palki, porter charges, and trekking assistance costs',
      'Helicopter tickets (if applicable) and additional local transfers',
      'Entry fees, camera fees, guide charges, or local activity costs',
      'Travel insurance, medical costs, and emergency evacuation expenses',
      'Any additional services not mentioned under inclusions',
    ],

    itinerary: [
      {
        _type: 'itineraryDay',
        dayNumber: 1,
        title: 'Haridwar to Guptkashi',
        description:
          'Begin your journey with a drive from Haridwar to Guptkashi. Enjoy scenic views of river valleys and mountain terrain en route. On arrival, check in and relax. Evening free for acclimatization and preparation for the Kedarnath trek.',
        meals: [],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 2,
        title: 'Guptkashi to Kedarnath',
        description:
          'Depart early and proceed to the Kedarnath trek starting point. Begin the trek to Kedarnath (approx. 18 km). On arrival, complete check-in and proceed for Kedarnath Temple darshan subject to time, weather, and queue conditions. Overnight stay at Kedarnath.',
        meals: [],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 3,
        title: 'Kedarnath to Guptkashi',
        description:
          'After early morning darshan (optional, subject to time), begin the trek back to the base point. Continue the drive to Guptkashi. On arrival, check in and rest after the trek. Evening at leisure.',
        meals: [],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 4,
        title: 'Guptkashi to Badrinath',
        description:
          'After breakfast, drive towards Badrinath. The route offers scenic Himalayan landscapes and passes through major hill towns. On arrival, check in and relax. Evening darshan at Badrinath Temple is optional, subject to time availability.',
        meals: [],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 5,
        title: 'Badrinath to Joshimath to Rudraprayag',
        description:
          'Post breakfast, depart from Badrinath and proceed towards Rudraprayag via Joshimath. Enjoy panoramic mountain views and river confluences en route. On arrival, check in and relax. Evening at leisure.',
        meals: [],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 6,
        title: 'Rudraprayag to Haridwar (Departure)',
        description:
          'After breakfast, check out and drive back to Haridwar. Arrival in Haridwar concludes the pilgrimage journey. Drop-off at the designated location as per schedule.',
        meals: [],
        accommodation: '',
      },
    ],

    destinationRefs: ['do-dham'],

    featured: false,

    seo: {
      metaTitle:
        '2 Dham Yatra Package (6 Days) | Kedarnath Badrinath | Haridwar Round Trip',
      metaDescription:
        'Book a 6-day 2 Dham Yatra package from Haridwar covering Kedarnath and Badrinath. Includes Kedarnath trek planning, scenic routes and key stopovers via Guptkashi, Joshimath and Rudraprayag.',
    },
  },
];

async function getDestinationId(slug: string) {
  const query = `*[_type == "destination" && slug.current == $slug][0]._id`;

  return await client.fetch(query, { slug });
}

async function seedPackages() {
  console.log('🌱 Starting to seed dummy packages...\n');

  for (const pkg of dummyPackages) {
    try {
      const { destinationRefs, ...packageData } = pkg;

      // Get destination IDs from slugs
      const destinationIds = [];

      for (const slug of destinationRefs) {
        const id = await getDestinationId(slug);
        if (id) {
          destinationIds.push({ _type: 'reference', _ref: id });
        } else {
          console.log(
            `⚠️  Warning: Destination "${slug}" not found for package "${pkg.title}"`
          );
        }
      }

      if (destinationIds.length === 0) {
        console.log(`❌ Skipping "${pkg.title}" - no valid destinations found`);
        continue;
      }

      // Create package document with destination references
      const doc = {
        ...packageData,
        destinations: destinationIds,
      };

      const result = await client.create(doc);
      console.log(`✅ Created: ${pkg.title} (ID: ${result._id})`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error creating "${pkg.title}":`, error.message);
      } else {
        console.error(`❌ Error creating "${pkg.title}":`, error);
      }
    }
  }

  console.log('\n🎉 Seeding complete!');
}

// Run the seeding function
seedPackages().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

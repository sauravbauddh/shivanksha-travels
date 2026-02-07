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
    title: 'Kedarnath Yatra From Haridwar',
    slug: {
      _type: 'slug',
      current: 'kedarnath-yatra-from-haridwar',
    },
    description:
      'Kedarnath Dham is one of the most sacred Hindu pilgrimage destinations and among the 12 Jyotirlingas of Lord Shiva in India. Located at an altitude of approximately 3580 meters in Uttarakhand, the shrine holds deep spiritual significance. This tour covers the Kedarnath trek, darshan at the holy temple, and key spiritual stopovers including Guptkashi, Panch Prayag confluences, and Rishikesh sightseeing.',

    // You will add
    mainImage: undefined,

    // You will add
    gallery: [],

    duration: '4 Days / 3 Nights',
    rating: 0,
    price: 200,

    destinations: [],

    highlights: [
      'Kedarnath Temple darshan (one of the 12 Jyotirlingas of Lord Shiva)',
      'Drive via Devprayag and Rudraprayag confluences',
      'Visit Ardh Narishwar Temple in Guptkashi',
      'Trek from Gaurikund to Kedarnath (options: pony/doli/helicopter at own cost)',
      'Buffer day planning for weather variability in Kedarnath region',
      'Visit Panch Prayag confluences (spiritual significance of river sangams)',
      'Rishikesh sightseeing: Ram Jhula and Laxman Jhula',
      'Optional visit to Triyugi Narayan Temple (extra cost)',
    ],

    inclusions: [
      'Accommodation',
      'Breakfast',
      'Welcome Drinks',
      'Lunch',
      'Transport',
    ],

    exclusions: [
      'Airport Transfer',
      'BBQ Night',
      'Guide',
      'Insurance',
      'Outing Ticket',
      'Activities',
      'Pony / Doli / Helicopter charges (trek support)',
      'Local taxi from Sonprayag to Gaurikund (if required)',
      'Any optional sightseeing / temple visits not mentioned in inclusions',
    ],

    itinerary: [
      {
        _type: 'itineraryDay',
        dayNumber: 1,
        title:
          'Haridwar to Guptkashi (220 km / 8–9 hrs) | Devprayag & Rudraprayag',
        description:
          'Drive from Haridwar to Guptkashi via Devprayag and Rudraprayag. Upon arrival, visit the Ardh Narishwar Temple in Guptkashi. Check in at the hotel and relax. Overnight stay in Guptkashi.',
        meals: ['dinner'],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 2,
        title:
          'Guptkashi to Gaurikund to Kedarnath (30 km drive + 19 km trek one way)',
        description:
          'After breakfast, drive to Gaurikund and begin the trek to Kedarnath (options: pony/doli/helicopter at own cost). Visit Kedarnath Temple for darshan. Overnight stay in Kedarnath.\n\nNote: Private and commercial vehicles are not allowed in the Gaurikund area. Travelers may need to hire a local taxi from Sonprayag to Gaurikund at their own cost. Also, due to limited accommodation availability in Kedarnath, stay may be provided on per-bed basis in shared dormitory rooms.',
        meals: ['breakfast', 'dinner'],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 3,
        title: 'Kedarnath to Gaurikund to Guptkashi (19 km trek + 30 km drive)',
        description:
          'After morning darshan and puja at Kedarnath Temple, trek down to Gaurikund and drive back to Guptkashi. This day is considered as a buffer due to unpredictable weather conditions in the Kedarnath region. Optional visit to Triyugi Narayan Temple (Shiv Shakti Temple) is possible at an additional cost. Overnight stay in Guptkashi.',
        meals: ['breakfast', 'dinner'],
        accommodation: '',
      },
      {
        _type: 'itineraryDay',
        dayNumber: 4,
        title:
          'Guptkashi to Rudraprayag to Rishikesh / Haridwar | Panch Prayag & Dhari Devi',
        description:
          'After breakfast, check out and proceed via Rudraprayag towards Rishikesh/Haridwar. En route, visit the Panch Prayag confluences (where applicable) and Dhari Devi Shaktipeeth for darshan. On arrival, visit prominent Rishikesh sightseeing spots such as Laxman Jhula and Ram Jhula. Drop-off at Dehradun airport/station or the planned drop location. Tour ends.',
        meals: ['breakfast'],
        accommodation: '',
      },
    ],

    featured: false,

    destinationRefs: ['ek-dham'],

    seo: {
      metaTitle:
        'Kedarnath Yatra From Haridwar | 4 Days Kedarnath Tour Package',
      metaDescription:
        'Book a 4-day Kedarnath Yatra from Haridwar including Guptkashi stay, Kedarnath trek and temple darshan, Panch Prayag confluences and Rishikesh sightseeing.',
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

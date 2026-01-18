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
    title: 'Divine Char Dham Yatra - 10 Days',
    slug: { _type: 'slug', current: 'divine-char-dham-yatra-10-days' },
    description:
      'Complete spiritual journey covering all four sacred Dhams - Yamunotri, Gangotri, Kedarnath, and Badrinath. Experience the ultimate pilgrimage.',
    duration: '10 Days / 9 Nights',
    rating: 4.9,
    featured: true,
    highlights: [
      'Visit all 4 sacred Char Dham sites',
      'VIP darshan arrangements',
      'Comfortable hotel stays',
      'Experienced pilgrimage guide',
    ],
    inclusions: [
      'All accommodation',
      'All meals',
      'Transportation (AC vehicle)',
      'Guide services',
    ],
    exclusions: [
      'Helicopter charges (optional)',
      'Personal expenses',
      'Tips & donations',
    ],
    destinationRefs: ['char-dham'],
  },
  {
    _type: 'travelPackage',
    title: 'Kedarnath & Badrinath Sacred Journey - 6 Days',
    slug: {
      _type: 'slug',
      current: 'kedarnath-badrinath-sacred-journey-6-days',
    },
    description:
      'Visit two of the most revered Jyotirlingas - Kedarnath and Badrinath. Perfect for devotees seeking divine blessings.',
    duration: '6 Days / 5 Nights',
    rating: 4.8,
    featured: true,
    highlights: [
      'Kedarnath Temple darshan',
      'Badrinath Temple visit',
      'Scenic Himalayan views',
      'Holy bath in Alaknanda',
    ],
    inclusions: [
      'Hotel accommodation',
      'Meals (breakfast & dinner)',
      'Transportation',
      'Guide assistance',
    ],
    exclusions: ['Lunch', 'Personal expenses', 'Helicopter services'],
    destinationRefs: ['kedarnath-and-badrinath'],
  },
  {
    _type: 'travelPackage',
    title: 'Do Dham Pilgrimage - Budget Package - 4 Days',
    slug: { _type: 'slug', current: 'do-dham-pilgrimage-budget-4-days' },
    description:
      'Economical pilgrimage package covering two sacred dhams. Ideal for those on a budget seeking spiritual fulfillment.',
    duration: '4 Days / 3 Nights',
    rating: 4.5,
    featured: false,
    highlights: [
      'Two dham darshan',
      'Budget-friendly',
      'Basic comfortable stays',
    ],
    inclusions: ['Basic accommodation', 'Transportation', 'Guide'],
    exclusions: ['Meals', 'Personal expenses'],
    destinationRefs: ['do-dham'],
  },
  {
    _type: 'travelPackage',
    title: 'Nainital Lake City Escape - 3 Days',
    slug: { _type: 'slug', current: 'nainital-lake-city-escape-3-days' },
    description:
      'Rejuvenating getaway to the beautiful lake city of Nainital. Enjoy boating, shopping, and scenic viewpoints.',
    duration: '3 Days / 2 Nights',
    rating: 4.6,
    featured: true,
    highlights: [
      'Naini Lake boating',
      'Naina Devi Temple',
      'Mall Road shopping',
      'Snow View Point',
    ],
    inclusions: ['Hotel stay with lake view', 'Breakfast', 'Local sightseeing'],
    exclusions: ['Lunch & dinner', 'Boating charges', 'Shopping'],
    destinationRefs: ['nainital'],
  },
  {
    _type: 'travelPackage',
    title: 'Mussoorie Queen of Hills - Weekend Getaway',
    slug: { _type: 'slug', current: 'mussoorie-queen-hills-weekend' },
    description:
      'Perfect weekend escape to Mussoorie, the Queen of Hills. Enjoy cable car rides, waterfalls, and colonial charm.',
    duration: '2 Days / 1 Night',
    rating: 4.5,
    featured: true,
    highlights: [
      'Gun Hill cable car',
      'Kempty Falls visit',
      'Mall Road stroll',
      'Lal Tibba viewpoint',
    ],
    inclusions: ['Hotel accommodation', 'Breakfast', 'Local transport'],
    exclusions: [
      'Meals (except breakfast)',
      'Cable car tickets',
      'Personal expenses',
    ],
    destinationRefs: ['mussoorie'],
  },
  {
    _type: 'travelPackage',
    title: 'Bhimtal Serene Lakes Tour - 2 Days',
    slug: { _type: 'slug', current: 'bhimtal-serene-lakes-tour-2-days' },
    description:
      'Peaceful retreat to Bhimtal, known for its beautiful lake and island. Perfect for nature lovers.',
    duration: '2 Days / 1 Night',
    rating: 4.4,
    featured: false,
    highlights: [
      'Bhimtal Lake boating',
      'Island aquarium visit',
      'Nature walks',
      'Bird watching',
    ],
    inclusions: ['Accommodation', 'Breakfast', 'Boat ride'],
    exclusions: ['Other meals', 'Personal expenses'],
    destinationRefs: ['bhimtal'],
  },
  {
    _type: 'travelPackage',
    title: 'Haridwar Spiritual Retreat - 3 Days',
    slug: { _type: 'slug', current: 'haridwar-spiritual-retreat-3-days' },
    description:
      'Immerse yourself in spirituality with Ganga Aarti, temple visits, and yoga sessions in the holy city of Haridwar.',
    duration: '3 Days / 2 Nights',
    rating: 4.7,
    featured: true,
    highlights: [
      'Evening Ganga Aarti at Har Ki Pauri',
      'Temple tour (Mansa Devi, Chandi Devi)',
      'Yoga & meditation sessions',
      'Holy dip in Ganges',
    ],
    inclusions: [
      'Hotel stay',
      'Breakfast & dinner',
      'Temple transportation',
      'Yoga instructor',
    ],
    exclusions: ['Lunch', 'Cable car tickets', 'Personal expenses'],
    destinationRefs: ['haridwar'],
  },
  {
    _type: 'travelPackage',
    title: 'Ramayana Yatra - Epic Journey - 7 Days',
    slug: { _type: 'slug', current: 'ramayana-yatra-epic-journey-7-days' },
    description:
      'Follow the footsteps of Lord Rama through sacred sites. A spiritual journey through Ramayana landmarks.',
    duration: '7 Days / 6 Nights',
    rating: 4.8,
    featured: true,
    highlights: [
      'Visit Ramayana circuit sites',
      'Ayodhya, Chitrakoot, Rameshwaram',
      'Expert guide narrating epics',
      'Special puja arrangements',
    ],
    inclusions: [
      'All accommodation',
      'All meals',
      'Transportation',
      'Guide services',
      'Temple entry fees',
    ],
    exclusions: ['Flight tickets', 'Personal shopping', 'Tips'],
    destinationRefs: ['ramayana-yatra'],
  },
  {
    _type: 'travelPackage',
    title: 'Ek Dham Special Darshan - 2 Days',
    slug: { _type: 'slug', current: 'ek-dham-special-darshan-2-days' },
    description:
      'Quick pilgrimage to one sacred dham of your choice. Ideal for time-constrained devotees.',
    duration: '2 Days / 1 Night',
    rating: 4.3,
    featured: false,
    highlights: ['Single dham darshan', 'Quick turnaround', 'Basic comfort'],
    inclusions: ['Accommodation', 'Transportation', 'Basic meals'],
    exclusions: ['Extra meals', 'Personal expenses'],
    destinationRefs: ['ek-dham'],
  },
  {
    _type: 'travelPackage',
    title: 'Nainital-Mussoorie Hills Combo - 5 Days',
    slug: { _type: 'slug', current: 'nainital-mussoorie-hills-combo-5-days' },
    description:
      'Experience the best of both hill stations in one package. Lakes, mountains, and colonial charm.',
    duration: '5 Days / 4 Nights',
    rating: 4.7,
    featured: true,
    highlights: [
      'Nainital lake activities',
      'Mussoorie sightseeing',
      'Scenic drives',
      'Shopping at both places',
    ],
    inclusions: [
      'All hotels',
      'Breakfast',
      'Inter-city transfers',
      'Local sightseeing',
    ],
    exclusions: ['Lunch & dinner', 'Activity tickets', 'Shopping'],
    destinationRefs: ['nainital', 'mussoorie'],
  },
];

async function getDestinationId(slug: string) {
  const query = `*[_type == "destination" && slug.current == $slug][0]._id`;
  const destinationId = await client.fetch(query, { slug });
  return destinationId;
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

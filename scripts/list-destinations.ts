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

async function listDestinations() {
  console.log('📍 Fetching all destinations from Sanity...\n');

  const query = `*[_type == "destination"] {
    _id,
    name,
    "slug": slug.current
  }`;

  const destinations = await client.fetch(query);

  console.log(`Found ${destinations.length} destination(s):\n`);
  destinations.forEach((dest: any) => {
    console.log(`  - ${dest.name} (slug: ${dest.slug}, id: ${dest._id})`);
  });

  return destinations;
}

// Run the function
listDestinations().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

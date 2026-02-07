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

async function deleteAllPackages() {
  console.log('🗑️  Fetching all packages from Sanity...\n');

  // Query all travelPackage documents
  const query = `*[_type == "travelPackage"]{ _id, title }`;
  const packages = await client.fetch(query);

  if (packages.length === 0) {
    console.log('ℹ️  No packages found in Sanity.');
    return;
  }

  console.log(`📦 Found ${packages.length} package(s) to delete:\n`);

  for (const pkg of packages) {
    console.log(`  - ${pkg.title} (${pkg._id})`);
  }

  console.log('\n🗑️  Deleting packages...\n');

  let deletedCount = 0;
  let errorCount = 0;

  for (const pkg of packages) {
    try {
      await client.delete(pkg._id);
      console.log(`✅ Deleted: ${pkg.title}`);
      deletedCount++;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error deleting "${pkg.title}":`, error.message);
      } else {
        console.error(`❌ Error deleting "${pkg.title}":`, error);
      }
      errorCount++;
    }
  }

  console.log(`\n🎉 Deletion complete!`);
  console.log(`   ✅ Successfully deleted: ${deletedCount}`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
  }
}

// Run the deletion function
deleteAllPackages().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

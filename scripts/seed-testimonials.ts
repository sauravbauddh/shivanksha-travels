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

// Reviews data from CSV
const reviewsData = [
  {
    customerName: 'Muskan Rajput',
    location: 'Maharashtra',
    rating: 5,
    testimonial:
      'Very good experience with Shivanksha Travels for Chardham Yatra. Well-planned tour, supportive staff, clean vehicles, and safe driving in hilly areas.',
  },
  {
    customerName: 'Lakshmi',
    location: 'Mumbai',
    rating: 5,
    testimonial:
      'हमारा चोपता और औली की यात्रा बहुत ही शानदार रही। होटल, ट्रांसपोर्ट और पूरा टूर बहुत अच्छे से मैनेज किया गया था। बर्फ़ से ढकी वादियाँ और प्राकृतिक सुंदरता दिल जीत लेने वाली थी। बहुत ही बढ़िया अनुभव रहा 🙏',
  },
  {
    customerName: 'Ganesh',
    location: 'Joshimath',
    rating: 5,
    testimonial:
      'Amazing experience with this travel company! Everything was well planned, from booking to the end of the trip. Friendly staff, comfortable transport, and great coordination. Highly recommended for a stress-free journey.',
  },
  {
    customerName: 'Lucky Sharma',
    location: 'Haripur kalan',
    rating: 5,
    testimonial: 'Nice service and well organized trip.',
  },
  {
    customerName: 'Nishu Chaudhary',
    location: 'Haridwar',
    rating: 5,
    testimonial:
      'Really happy with their service. The staff was friendly, timings were well managed, and the whole trip went without any issues. Will surely book again in the future.',
  },
  {
    customerName: 'Yashika',
    location: 'Uttar Pradesh',
    rating: 5,
    testimonial:
      'Everything was managed well and there were no problems during the trip. The team did a good job and made our journey easy and enjoyable.',
  },
  {
    customerName: 'Mukesh',
    location: 'Mumbai',
    rating: 5,
    testimonial:
      'Went on a group tour with this company and the experience was really good. Everything was managed properly and the coordination was smooth. Everyone in the group was happy.',
  },
  {
    customerName: 'Chetan Joshi',
    location: 'Ujjain',
    rating: 5,
    testimonial:
      'Vidhya madam ke sath char dham ki yatra ka anand liya. Bahut achi facility, helping staff, best hotel. Sab kuch bahut acha raha. Budget bhi bahut kam tha. Us hisab se bahut achi yatra rhi. Sabhi log bina kisi tension ke mem ke sath char dham yatra plan kr skte hai. Thank you vidhya mem.',
  },
  {
    customerName: 'Alvina',
    location: 'Bahadarpur Jatt',
    rating: 5,
    testimonial:
      'The service was really nice and the staff was friendly. They were always available whenever we needed help. Overall, a smooth and enjoyable trip.',
  },
  {
    customerName: 'Devraj Panwar',
    location: 'Yamunotri',
    rating: 5,
    testimonial:
      'Very nice service and polite staff. They took care of all the details so we could just enjoy our trip. No stress at all. Thank you for making it so memorable!',
  },
  {
    customerName: 'Yogendra Kumar',
    location: 'UP',
    rating: 5,
    testimonial:
      'Really happy with their service. The staff was friendly, timings were well managed, and the whole trip went without any issues. Will surely book again in the future.',
  },
  {
    customerName: 'Prahlad Singh',
    location: 'UP',
    rating: 5,
    testimonial:
      'चोपता ट्रेक (तुंगनाथ–चंद्रशिला) का अनुभव हमारे लिए बेहद यादगार रहा। ट्रिप की शुरुआत से लेकर अंत तक सब कुछ बहुत अच्छे से मैनेज किया गया था। गाइड और स्टाफ का व्यवहार काफी अच्छा और सहयोगी था। रास्ते की खूबसूरती और सही गाइडेंस ने इस ट्रेक को और भी खास बना दिया।',
  },
  {
    customerName: 'Alekh Dubey',
    location: 'Indore, M.P.',
    rating: 5,
    testimonial:
      'We got an extremely pleasant service and smooth cooperation with this travel management company at budget-friendly package.',
  },
  {
    customerName: 'Lucky',
    location: 'Hyderabad',
    rating: 5,
    testimonial:
      'A beautiful and comfortable Mussoorie trip. Clean hotels, smooth transportation, and breathtaking views made the journey enjoyable. The staff was very supportive and managed everything efficiently.',
  },
  {
    customerName: 'Jhanvi',
    location: 'Mumbai',
    rating: 5,
    testimonial:
      'Had a lovely time in Nainital. The arrangements were well taken care of and the trip went exactly as planned. The team was supportive and always available when needed.',
  },
  {
    customerName: 'Narendra Rawat',
    location: 'MP',
    rating: 5,
    testimonial:
      'Our Kedarnath Yatra was well planned and smooth. The staff was supportive throughout the journey making the experience comfortable and peaceful. Thank you.',
  },
  {
    customerName: 'Yoga from Rishikesh',
    location: 'Madawra',
    rating: 5,
    testimonial:
      'I was going to Haridwar then I suddenly wanted to go back but there was not any travel suddenly. I found this travels on Google map - Shivanksha travels. Highly recommended for you, you should try at least one time to go with them anywhere, mostly Haridwar and Char Dham Yatra. They have so many good people.',
  },
  {
    customerName: 'Abhishek',
    location: 'Kotdwar',
    rating: 5,
    testimonial: 'Good service and well managed trip. 👍👍',
  },
  {
    customerName: 'Amar Malakar',
    location: 'Assam',
    rating: 5,
    testimonial: 'Very good service and experience.',
  },
  {
    customerName: 'Arti',
    location: 'Faridabad',
    rating: 5,
    testimonial:
      "It's was great communication with Vidhya ma'am, I feel lucky to meet her or I say thankx again and again Shivanksha travel. My yatra was so memorable 💖",
  },
];

async function seedTestimonials() {
  console.log('🌱 Starting to seed testimonials...\n');

  for (let i = 0; i < reviewsData.length; i++) {
    const review = reviewsData[i];
    try {
      // Create testimonial document
      const doc = {
        _type: 'testimonial',
        customerName: review.customerName,
        location: review.location,
        rating: review.rating,
        testimonial: review.testimonial,
        featured: true,
      };

      const result = await client.create(doc);
      console.log(
        `✅ Created: ${review.customerName} from ${review.location} (ID: ${result._id})`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `❌ Error creating testimonial for "${review.customerName}":`,
          error.message
        );
      } else {
        console.error(
          `❌ Error creating testimonial for "${review.customerName}":`,
          error
        );
      }
    }
  }

  console.log('\n🎉 Testimonial seeding complete!');
}

// Run the seeding function
seedTestimonials().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

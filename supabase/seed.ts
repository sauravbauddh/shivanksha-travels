
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DESTINATIONS = [
  {
    id: 'd0000000-0000-0000-0000-000000000001',
    slug: 'kedarnath',
    name: 'Kedarnath',
    description: 'The holiest shrine of Lord Shiva amidst the snow-capped peaks.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Vutf79P1JbferUB1rSGpd69m8ljjjv6zsEvJp_dmufWeKRxkU8lHtFbFBr85UejtCJt6nYoBi_KVfsArxdYP6ZDGVkwN5dtIpk9yTTiS63d1biIlebMeRddsTV6HtP-bJtpZILMtSQnkCFtPsu1Wb3PQ-dGb1eU3QOMT0bJp0wzeyAB6a-8f3UxGByD73msQgTr0RUq82C9C02Kr5GRv378feujSbKww0kR2QcToaGUzLxfnEfnMr-OPSsT4KG1S1tvQhcD-vwDW',
    category: 'Pilgrimage',
    country: 'India'
  },
  {
    id: 'd0000000-0000-0000-0000-000000000002',
    slug: 'rishikesh',
    name: 'Rishikesh',
    description: 'Yoga capital of the world and hub for river rafting.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcHk-IZe8S_A1csjn3jaAw7Tf8JlZQNdkytOB_scux1xdp4UL4yKO79wfodsp0hAFjfxBv_M_p7--A8CnPoFvOqi1U9A-WTR4ZTqAiWAWUNX3QNvgmCAvLrL3o46wTuuvAdNs9OQQKv0i3Q3oHM2GAVwtPbS95fYyZsnycY8RxJQzCZ0nGWhSLGahCE0UC7jsrrhAb3IMPIYx4L1qFQ5VlILcIcEBVPK02Qxo5nk9CDlBaw2SsEiPsixVcBt_mQB8MKZC7MwFr1hRA',
    category: 'Adventure',
    country: 'India'
  },
  {
    id: 'd0000000-0000-0000-0000-000000000003',
    slug: 'valley-of-flowers',
    name: 'Valley of Flowers',
    description: 'A UNESCO World Heritage site known for its meadows of endemic alpine flowers.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk8w9qbyjTBUHrYEBr3ZiUU1NfKgMGI8EJW42U4B7b8Pq3YWdIK8U5skTa6hud6Fl7skZph-Y44gCU0kIFb4eu7kHwRyvOs-KV7zrSZU5ao4UL7N6PB_PSUEHo5O2bJTbHgotk6_v1HLq9AreCB7AaGtBA2WkOsgtdcl4qUVgCDAXiyL44r7GJ_Z5xKM5wLbLcyA8gUp0BH90k8sHd7cQOO5TUyyn_RJX5w0ZxbgLjmdZgZLbyQenvoXY_M64_2YL54w2je0KhRtCT',
    category: 'Nature',
    country: 'India'
  },
  {
    id: 'd0000000-0000-0000-0000-000000000004',
    slug: 'nainital',
    name: 'Nainital',
    description: 'The city of lakes, offering serene boat rides and colonial charm.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzt2icQrPH0hYRJ3Gvbpz5nfDxrg4UeDc-6sQtnvIrarVLmOmM3pnsjhUTl8iOGC0JhZUu_J1wQH1Fjo-EJeoI1RrK8ccsEz7c31gVdo2TEhtg--aV15JHKfYbcMsTB4WWM-6P1F3zoEBSGtcCH4GKxW9pBgW6QKILuD4HdlSQKbtw6CM1EZOCl9S0t_UxCz8fAW2XhN9ZZPzAnQ33q-X4wWtSc3OYwky_Mj3Nz99cljYBiOtF5EyEgPhuPehtu0ZG4mABUxv5ELv8',
    category: 'Leisure',
    country: 'India'
  },
];

const PACKAGES = [
  {
    id: 'a0000000-0000-0000-0000-000000000001',
    slug: 'char-dham-heli',
    title: 'Char Dham by Heli',
    description: 'The ultimate pilgrimage experience with VIP darshan and luxury stays.',
    main_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyPfT_FiLu-0CzyElzSPeCx7zMVi_Ti_l4ciJtTO3iaHuk65dIqYQ25DJZ6UDLdXZO57fFfyjFVWy1GDd53ktHogU6Lc-MWKz0yEhbl4Zk3PDdeSuyun7Gkqcx-ZRI5bnJ7uyFMo1Gbc58AD1riDWMk3f_hGu6ReEIR4IlUbpi04NhzQxQ5yf_94LnAO5rlQtz6CJUpG4xUUCcmbtjzvrQTHM6a8hPCGpsMxYd4ZHMg85wbjZUAUs9bHzSN6oP5zPEPxCFMw30IbME',
    duration: '6 Days',
    price: 145000,
    rating: 4.5,
    featured: true,
  },
  {
    id: 'a0000000-0000-0000-0000-000000000002',
    slug: 'rishikesh-rafting',
    title: 'Rishikesh Rafting',
    description: 'Adrenaline pumping white water rafting and serene camping by the Ganges.',
    main_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChG8DAmK1qZVtlgpeoKZpfJ7Zq33rPKpU9K_xMOdyjhqQNGz9meyacwEHOqprISScWIJIH5P1EL-ghrPByHl5XCNFJ3ezUL17wGM3JbyygXQ8a48h4w2Dcg1JA-Z_CoDL8p3z_7_X2dUK0repguyIVSKEG2-sdHykiQwU93fasZQKMsl4fi8bURSYgMkEIiRnnLYNJglYkw8jeQTDiJtx1-AlE--ueOAW-UZZLzhfb3H5TXlsKthEB8a0BBMX-rnI22gMKUv4NnahB',
    duration: '3 Days',
    price: 4999,
    rating: 5,
    featured: true,
  },
  {
    id: 'a0000000-0000-0000-0000-000000000003',
    slug: 'jim-corbett-safari',
    title: 'Jim Corbett Safari',
    description: "Explore India's oldest national park and spot the majestic Bengal Tiger.",
    main_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoGsxCe6_BipHgcHSqRFfstv83zh5EK9Lo2CWfTsG5xUbVT9NtCT0u45U3H3hWbZadCwKlvzh6GmmfCNMMCaZAa3MYErTcFxgZHJCh3-YWcopavLa1uw1afhPJDv5uv12opdd9B7dViF7O981cLi-GuwawMwm-S3On2xOrZ0licJFedbW4AMTDd7wM-LeuQJPWbYR4aaoM9uEk4RKx40e1MHbHnWDnUG472xAXHe128cQjzg7ZGD6UKXx5HHMgs4hYZ4AGX_MEIUyZ',
    duration: '4 Days',
    price: 12500,
    rating: 4,
    featured: true,
  },
];

const TESTIMONIALS = [
  {
    id: 'e0000000-0000-0000-0000-000000000001',
    customer_name: 'Rahul Sharma',
    location: 'Delhi, India',
    customer_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmoP83Hoz7XzHMbOXO7OZbNaFi8mq6k5He9pe52wTr6yoJeUpG3eMU0sQn3Hcj_GQCIYD-OlfXsbzIziDDGKTeC2gCk3Q5lQDTMHEMAlg44wAXXc_S2DOR22Y6lY0yKwcJUzWm4PVx9OXK7BR1S-WpPrXgm4a7Cc91uKegKzFmfP__oftY-v7rykP5HHINsIjtSMhXWDqFtrmJComvJijISpdsUHM0Vbn0f0CzqnzzRKRq3ZJ5lDzz-DrZ4dC-8wAjt5vR4sDBm0Je',
    testimonial: 'The trip to Kedarnath was magical. Everything from the helicopter booking to the stay was perfectly handled.',
    rating: 4,
    featured: true,
  },
  {
    id: 'e0000000-0000-0000-0000-000000000002',
    customer_name: 'Priya Verma',
    location: 'Mumbai, India',
    customer_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtLP2OJUw9JiX0U_VdcWAwCFn3_N72uU5dY5RzF_kbViXI0lbxO8BM8omnfYdq69A5PEQNoX_--fs6UWnJXW4fVp4y6sATFttXTdhgGER3pQWzjG51otvtl06Zm5mg4eTS98zqI-8gEEuRKpKSQTWXZ9DksCikFhNH8-ZzODGZ2lLrcQV2qCp7IF5-svD0L7OaCxLEGZyjmWVZs9nVDqhCiqAI46_M0QNTh60-WOKkVorZiLyTpr6dt77oBtuEC6idaB6zGFLTASy',
    testimonial: 'Camping in Rishikesh was the best weekend getaway. The rafting guides were very professional.',
    rating: 5,
    featured: true,
  },
];

const BLOG_POSTS = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    slug: 'best-time-to-visit-kedarnath',
    title: 'Best Time to Visit Kedarnath',
    excerpt: 'Planning your pilgrimage? Here is a complete guide on the best time to visit Kedarnath temple.',
    content: 'Kedarnath temple opens its doors to pilgrims on the auspicious day of Akshaya Tritiya...',
    main_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Vutf79P1JbferUB1rSGpd69m8ljjjv6zsEvJp_dmufWeKRxkU8lHtFbFBr85UejtCJt6nYoBi_KVfsArxdYP6ZDGVkwN5dtIpk9yTTiS63d1biIlebMeRddsTV6HtP-bJtpZILMtSQnkCFtPsu1Wb3PQ-dGb1eU3QOMT0bJp0wzeyAB6a-8f3UxGByD73msQgTr0RUq82C9C02Kr5GRv378feujSbKww0kR2QcToaGUzLxfnEfnMr-OPSsT4KG1S1tvQhcD-vwDW',
    published_at: new Date().toISOString(),
    categories: ['Pilgrimage', 'Guide'],
    author: 'Shivanksha Travels'
  }
];

const SITE_CONTENT = [
  {
    key: 'global',
    content: {
      logo: 'Shivanksha Travels',
      heroSection: {
        heroTitle: "Discover the Divine Himalayas",
        heroSubtitle: "Experience spiritual journeys and thrilling adventures in Uttarakhand",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk8w9qbyjTBUHrYEBr3ZiUU1NfKgMGI8EJW42U4B7b8Pq3YWdIK8U5skTa6hud6Fl7skZph-Y44gCU0kIFb4eu7kHwRyvOs-KV7zrSZU5ao4UL7N6PB_PSUEHo5O2bJTbHgotk6_v1HLq9AreCB7AaGtBA2WkOsgtdcl4qUVgCDAXiyL44r7GJ_Z5xKM5wLbLcyA8gUp0BH90k8sHd7cQOO5TUyyn_RJX5w0ZxbgLjmdZgZLbyQenvoXY_M64_2YL54w2je0KhRtCT",
      },
      contactDetails: {
        address: "Rishikesh, Uttarakhand, India",
        email: "info@shivankshatravels.com",
        phone: "+91 98765 43210",
        socialLinks: {
          instagram: "https://instagram.com",
          facebook: "https://facebook.com",
          twitter: "https://twitter.com"
        }
      },
      gallerySection: {
        title: "Moments from the Mountains",
        subtitle: "Glimpses of our recent expeditions",
        galleryItems: [
           {
             _key: 'g1',
             mediaType: 'image',
             image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzt2icQrPH0hYRJ3Gvbpz5nfDxrg4UeDc-6sQtnvIrarVLmOmM3pnsjhUTl8iOGC0JhZUu_J1wQH1Fjo-EJeoI1RrK8ccsEz7c31gVdo2TEhtg--aV15JHKfYbcMsTB4WWM-6P1F3zoEBSGtcCH4GKxW9pBgW6QKILuD4HdlSQKbtw6CM1EZOCl9S0t_UxCz8fAW2XhN9ZZPzAnQ33q-X4wWtSc3OYwky_Mj3Nz99cljYBiOtF5EyEgPhuPehtu0ZG4mABUxv5ELv8',
             alt: 'Nainital Lake'
           }
        ]
      }
    }
  }
];

async function seed() {
  console.log('Seeding destinations...');
  const { error: destError } = await supabase.from('destinations').upsert(DESTINATIONS, { onConflict: 'id' });
  if (destError) console.error('Error seeding destinations:', destError);
  else console.log('Destinations seeded.');

  console.log('Seeding packages...');
  const { error: pkgError } = await supabase.from('packages').upsert(PACKAGES, { onConflict: 'id' });
  if (pkgError) console.error('Error seeding packages:', pkgError);
  else console.log('Packages seeded.');

  console.log('Seeding testimonials...');
  const { error: testError } = await supabase.from('testimonials').upsert(TESTIMONIALS, { onConflict: 'id' });
  if (testError) console.error('Error seeding testimonials:', testError);
  else console.log('Testimonials seeded.');

  console.log('Seeding blog posts...');
  const { error: blogError } = await supabase.from('blog_posts').upsert(BLOG_POSTS, { onConflict: 'id' });
  if (blogError) console.error('Error seeding blog posts:', blogError);
  else console.log('Blog posts seeded.');

  console.log('Seeding site content...');
  const { error: contentError } = await supabase.from('site_content').upsert(SITE_CONTENT, { onConflict: 'key' });
  if (contentError) console.error('Error seeding site content:', contentError);
  else console.log('Site content seeded.');
}

seed();

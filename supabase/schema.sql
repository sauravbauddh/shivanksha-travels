-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Destinations Table
create table public.destinations (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description text,
  image_url text,
  country text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Packages Table
create table public.packages (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  description text,
  main_image_url text,
  duration text,
  price numeric,
  rating numeric default 0,
  featured boolean default false,
  highlights text[],
  inclusions text[],
  exclusions text[],
  itinerary jsonb, -- Array of objects {day: 1, title: "", description: ""}
  seo jsonb, -- {title: "", description: "", keywords: []}
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Package Destinations Junction Table
create table public.package_destinations (
  package_id uuid references public.packages(id) on delete cascade,
  destination_id uuid references public.destinations(id) on delete cascade,
  primary key (package_id, destination_id)
);

-- Testimonials Table
create table public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  customer_name text not null,
  customer_image_url text,
  rating numeric default 5,
  testimonial text not null,
  location text,
  travel_date date,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog Posts Table
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text, -- Markdown or HTML
  main_image_url text,
  author text,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  categories text[],
  seo jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site Content Table (Key-Value for singleton content)
create table public.site_content (
  key text primary key,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.destinations enable row level security;
alter table public.packages enable row level security;
alter table public.package_destinations enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_content enable row level security;

-- Create policies (Public Read, Authenticated Write - simplified for now, usually you want admin-only write)
create policy "Public and Authenticated Read" on public.destinations for select using (true);
create policy "Public and Authenticated Read" on public.packages for select using (true);
create policy "Public and Authenticated Read" on public.package_destinations for select using (true);
create policy "Public and Authenticated Read" on public.testimonials for select using (true);
create policy "Public and Authenticated Read" on public.blog_posts for select using (true);
create policy "Public and Authenticated Read" on public.site_content for select using (true);

-- Storage Buckets Configuration (Needs to be done in Dashboard for now, or via API)
-- insert into storage.buckets (id, name, public) values ('images', 'images', true);

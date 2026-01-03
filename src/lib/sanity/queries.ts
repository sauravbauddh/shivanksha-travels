import { client } from './client';

// Fetch all featured travel packages
export async function getFeaturedPackages() {
  return client.fetch(
    `*[_type == "travelPackage" && featured == true] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      duration,
      price,
      rating,
      highlights
    }`
  );
}

// Fetch all travel packages
export async function getAllPackages() {
  return client.fetch(
    `*[_type == "travelPackage"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      duration,
      price,
      rating,
      featured
    }`
  );
}

// Fetch single package by slug
export async function getPackageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "travelPackage" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      mainImage,
      gallery,
      duration,
      price,
      rating,
      destinations[]-> {
        name,
        slug,
        image
      },
      highlights,
      inclusions,
      exclusions,
      itinerary,
      seo
    }`,
    { slug }
  );
}

// Fetch all destinations
export async function getAllDestinations() {
  return client.fetch(
    `*[_type == "destination"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      image,
      country,
      category
    }`
  );
}

// Fetch featured testimonials
export async function getFeaturedTestimonials() {
  return client.fetch(
    // Assuming fields exist in schema based on current query
    `*[_type == "testimonial" && featured == true] | order(_createdAt desc) {
      _id,
      customerName,
      customerImage,
      rating,
      testimonial,
      location,
      travelDate
    }`
  );
}

// Fetch all blog posts
export async function getAllBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author,
      publishedAt,
      categories
    }`
  );
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      content,
      author,
      publishedAt,
      categories,
      seo
    }`,
    { slug }
  );
}

// Fetch global site content (Hero, Footer, Contact)
export async function getSiteContent() {
  return client.fetch(
    `*[_type == "siteContent"][0] {
      _id,
      heroSection,
      contactDetails
    }`
  );
}

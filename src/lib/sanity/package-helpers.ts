import { getPackageBySlug as sanityGetPackageBySlug } from './queries';
import { urlFor } from './image';

/**
 * Fetches a single package by its slug and transforms the data
 * for use in the package details page
 */
export async function getPackageDetailsBySlug(slug: string) {
  try {
    console.log(`getPackageDetailsBySlug: ${slug}`);
    const data = await sanityGetPackageBySlug(slug);

    if (!data) {
      return null;
    }

    return {
      _id: data._id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      mainImage: data.mainImage ? urlFor(data.mainImage).url() : '',
      gallery: data.gallery?.map((img: any) => urlFor(img).url()) || [],
      duration: data.duration,
      destinations:
        data.destinations?.map((dest: any) => ({
          name: dest.name,
          slug: dest.slug?.current,
          image: dest.image ? urlFor(dest.image).url() : '',
        })) || [],
      highlights: data.highlights || [],
      inclusions: data.inclusions || [],
      exclusions: data.exclusions || [],
      itinerary: data.itinerary || [],
      seo: data.seo,
    };
  } catch (error) {
    console.error('Error fetching package details:', error);
    return null;
  }
}

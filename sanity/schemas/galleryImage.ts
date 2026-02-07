import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A title or caption for this gallery item',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType === 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description:
        'Direct URL to the video file (e.g., mp4) or supported video link.',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      description: 'Poster image for the video (Required for video items)',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text / Description',
      type: 'string',
      description: 'Describe the image for accessibility and SEO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Width Class',
      type: 'string',
      description:
        'Tailwind width class (e.g., w-64, w-80, w-96). Default is auto/flexible.',
      options: {
        list: [
          { title: 'Small (w-64)', value: 'w-64' },
          { title: 'Medium (w-80)', value: 'w-80' },
          { title: 'Large (w-96)', value: 'w-96' },
          { title: 'Extra Large (w-[500px])', value: 'w-[500px]' },
          { title: 'Video Wide (aspect-video)', value: 'aspect-video' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the gallery',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      alt: 'alt',
      mediaType: 'mediaType',
      image: 'image',
      thumbnail: 'thumbnail',
    },
    prepare({ title, alt, mediaType, image, thumbnail }) {
      return {
        title: title || alt || (mediaType === 'video' ? 'Video' : 'Image'),
        subtitle: mediaType === 'video' ? '🎬 Video' : '🖼️ Image',
        media: mediaType === 'video' ? thumbnail : image,
      };
    },
  },
});

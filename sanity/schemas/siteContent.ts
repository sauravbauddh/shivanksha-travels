import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteContent',
  title: 'Site Content (Global)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Internal title for this document (e.g., "Main Site Settings")',
      initialValue: 'Main Site Settings',
    }),

    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'Upload the site logo here.',
      options: { hotspot: true },
    }),

    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'heroTitle',
          title: 'Hero Title',
          type: 'string',
          description:
            'Main heading on the homepage (e.g., Divine. Unexplored.)',
        }),
        defineField({
          name: 'heroSubtitle',
          title: 'Hero Subtitle',
          type: 'text',
          rows: 2,
          description: 'Subtitle text below the main heading.',
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'heroVideo',
          title: 'Hero Video URL',
          type: 'url',
          description:
            'URL for the "Watch the Film" button (e.g., YouTube link).',
        }),
      ],
    }),

    // Gallery Section
    defineField({
      name: 'gallerySection',
      title: 'Gallery Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Gallery.',
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          initialValue: 'Moments that take your breath away.',
        }),
        defineField({
          name: 'galleryItems',
          title: 'Gallery Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
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
                  description:
                    'Poster image for the video (Required for video items)',
                  options: { hotspot: true },
                  hidden: ({ parent }) => parent?.mediaType !== 'video',
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text / Description',
                  type: 'string',
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
                      {
                        title: 'Video Wide (aspect-video)',
                        value: 'aspect-video',
                      },
                    ],
                  },
                }),
              ],
              preview: {
                select: {
                  title: 'alt',
                  mediaType: 'mediaType',
                  image: 'image',
                  thumbnail: 'thumbnail',
                },
                prepare({ title, mediaType, image, thumbnail }) {
                  return {
                    title: title || (mediaType === 'video' ? 'Video' : 'Image'),
                    subtitle: mediaType,
                    media: mediaType === 'video' ? thumbnail : image,
                  };
                },
              },
            },
          ],
        }),
      ],
    }),

    // Contact/Footer Details
    defineField({
      name: 'contactDetails',
      title: 'Contact & Footer',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'address',
          title: 'Physical Address',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'object',
          fields: [
            defineField({
              name: 'instagram',
              type: 'url',
              title: 'Instagram URL',
            }),
            defineField({
              name: 'facebook',
              type: 'url',
              title: 'Facebook URL',
            }),
            defineField({
              name: 'twitter',
              type: 'url',
              title: 'Twitter/X URL',
            }),
          ],
        }),
      ],
    }),
  ],
});

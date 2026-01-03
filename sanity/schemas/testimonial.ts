import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerImage',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'packageReference',
      title: 'Related Package',
      type: 'reference',
      to: [{ type: 'travelPackage' }],
    }),
    defineField({
      name: 'location',
      title: 'Customer Location',
      type: 'string',
    }),
    defineField({
      name: 'travelDate',
      title: 'Travel Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Display on homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      media: 'customerImage',
      subtitle: 'rating',
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title,
        media,
        subtitle: `${subtitle} stars`,
      };
    },
  },
});

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
          name: 'whatsappNumber',
          title: 'WhatsApp Number',
          type: 'string',
          description: 'WhatsApp number with country code (e.g., 917668842928)',
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

    // Bank Account Details
    defineField({
      name: 'bankDetails',
      title: 'Bank Account Details',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'bankName',
          title: 'Bank Name',
          type: 'string',
          description: 'Name of the bank (e.g., PUNJAB NATIONAL BANK)',
        }),
        defineField({
          name: 'accountHolderName',
          title: 'Account Holder Name',
          type: 'string',
          description: 'Name on the bank account',
        }),
        defineField({
          name: 'accountNumber',
          title: 'Account Number',
          type: 'string',
          description: 'Bank account number',
        }),
        defineField({
          name: 'ifscCode',
          title: 'IFSC Code',
          type: 'string',
          description: 'IFSC code of the bank branch',
        }),
        defineField({
          name: 'branchAddress',
          title: 'Branch Address',
          type: 'text',
          rows: 2,
          description: 'Address of the bank branch',
        }),
      ],
    }),
  ],
});

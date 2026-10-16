import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const projectCategories = [
  { label: 'Work', value: 'work' },
  { label: 'Side project', value: 'side-project' },
  { label: 'Open source', value: 'open-source' },
  { label: 'Web app', value: 'web-app' },
  { label: 'Experiment', value: 'experiment' },
] as const

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'sortOrder'],
    description: 'Things you have built. Featured projects show on the home page.',
  },
  defaultSort: 'sortOrder',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          defaultValue: 'side-project',
          options: [...projectCategories],
        },
        {
          name: 'eyebrow',
          type: 'text',
          admin: {
            description: 'Small label above the title, like "IBM · Carbon". Defaults to the category.',
          },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
    {
      type: 'collapsible',
      label: 'Card preview',
      fields: [
        {
          name: 'preview',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Chat bubbles', value: 'chat' },
            { label: 'Code snippet', value: 'code' },
          ],
          admin: {
            description: 'What shows at the top of the card.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.preview === 'image',
          },
        },
        {
          name: 'previewCode',
          type: 'code',
          admin: {
            language: 'json',
            condition: (_, siblingData) => siblingData?.preview === 'code',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Links',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Project URL',
          admin: { placeholder: 'https://…' },
        },
        {
          name: 'post',
          type: 'relationship',
          relationTo: 'posts',
          label: 'Write-up',
          admin: {
            description: 'A blog post about this project.',
          },
        },
      ],
    },
    slugField('title'),
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Show on the home page.' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers show first.' },
    },
  ],
}

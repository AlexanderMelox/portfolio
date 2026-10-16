import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { CodeBlock } from '@/blocks/Code'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
  },
  defaultSort: '-publishedAt',
  // Drafts: you can save a post without publishing it.
  versions: {
    drafts: true,
  },
  access: {
    // Logged-in users see everything. Visitors only see published posts.
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'dek',
      type: 'text',
      label: 'Subtitle',
      admin: { description: 'One line under the title, shown in italics.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary for the post list.' },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          HorizontalRuleFeature(),
          BlocksFeature({ blocks: [CodeBlock] }),
        ],
      }),
    },
    slugField('title'),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
      hooks: {
        // Set the date the first time a post is published.
        beforeChange: [
          ({ value, siblingData }) => {
            if (!value && siblingData?._status === 'published') return new Date().toISOString()
            return value
          },
        ],
      },
    },
    {
      name: 'topics',
      type: 'text',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Lower case, like "engineering" or "design". Used for the filters.',
      },
    },
  ],
}

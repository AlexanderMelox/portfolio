import type { GlobalConfig } from 'payload'

/**
 * Everything about you that shows across the site.
 * A "global" is a single document, unlike a collection which holds many.
 */
export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Intro',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true, defaultValue: 'Alexander Melo' },
                {
                  name: 'monogram',
                  type: 'text',
                  defaultValue: 'am/',
                  admin: { description: 'The small badge in the header.' },
                },
              ],
            },
            {
              name: 'status',
              type: 'text',
              defaultValue: 'software engineer',
              admin: { description: 'Shown as "$ whoami → …" above the headline.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '40%', description: 'Shown next to the greeting. A square image works best.' },
                },
                {
                  name: 'greeting',
                  type: 'text',
                  defaultValue: "Hi, I'm Alex 👋",
                  admin: { width: '60%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                  defaultValue: 'I create human interfaces in an age of AI.',
                  admin: { width: '70%' },
                },
                {
                  name: 'headlineEmphasis',
                  type: 'text',
                  defaultValue: 'human',
                  admin: {
                    width: '30%',
                    description: 'A word from the headline to show in the accent color.',
                  },
                },
              ],
            },
            {
              name: 'intro',
              type: 'textarea',
              admin: { description: 'Optional paragraph under the headline.' },
            },
            {
              name: 'codeCard',
              type: 'group',
              admin: { description: 'The little code window next to the headline.' },
              fields: [
                {
                  name: 'variable',
                  type: 'text',
                  defaultValue: 'alex',
                  admin: { description: 'Shown as "export const alex" and "alex.config.ts".' },
                },
                { name: 'role', type: 'text', defaultValue: 'Software engineer' },
                { name: 'basedIn', type: 'text', defaultValue: 'NYC' },
                { name: 'currently', type: 'text', defaultValue: 'IBM · Carbon' },
                { name: 'interests', type: 'text', hasMany: true },
                { name: 'stack', type: 'text', hasMany: true },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            { name: 'workTitle', type: 'text', defaultValue: "Things I've built" },
            { name: 'workIntro', type: 'textarea' },
            { name: 'experienceTitle', type: 'text', defaultValue: "Where I've been" },
            { name: 'writingTitle', type: 'text', defaultValue: 'Notes from the workbench' },
            { name: 'blogIntro', type: 'textarea' },
          ],
        },
        {
          label: 'Experience',
          fields: [
            {
              name: 'experience',
              type: 'array',
              labels: { singular: 'Role', plural: 'Roles' },
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'dates', type: 'text', required: true, admin: { placeholder: '2023 — now' } },
                    { name: 'role', type: 'text', required: true },
                    { name: 'org', type: 'text' },
                  ],
                },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'resume',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'A PDF of your résumé.' },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'contactBlurb', type: 'textarea' },
            { name: 'email', type: 'email' },
            {
              name: 'socials',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'siteDescription',
              type: 'textarea',
              admin: { description: 'Shown in search results and link previews.' },
            },
          ],
        },
      ],
    },
  ],
}

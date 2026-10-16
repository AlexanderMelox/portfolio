import type { Block } from 'payload'

export const languages = ['ts', 'tsx', 'js', 'jsx', 'json', 'css', 'html', 'bash'] as const

/**
 * A code snippet you can drop into a blog post.
 */
export const CodeBlock: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  labels: { singular: 'Code', plural: 'Code' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'filename',
          type: 'text',
          admin: { width: '60%', placeholder: 'button.json' },
        },
        {
          name: 'language',
          type: 'select',
          defaultValue: 'ts',
          options: languages.map((l) => ({ label: l, value: l })),
          admin: { width: '40%' },
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

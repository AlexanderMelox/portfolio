import type { Field, FieldHook } from 'payload'

/**
 * Turns "Hello, World!" into "hello-world".
 */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * If the slug is empty, build it from another field (usually the title).
 * Runs before validation, so `required` and `unique` checks see the final value.
 */
const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === 'string' && value.length > 0) return slugify(value)
    const fallback = data?.[fallbackField]
    if (typeof fallback === 'string') return slugify(fallback)
    return value
  }

/**
 * A reusable slug field. Use it in any collection that needs a URL.
 */
export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    description: `Used in the URL. Leave empty to build it from the ${fallbackField}.`,
  },
  hooks: {
    beforeValidate: [formatSlug(fallbackField)],
  },
})

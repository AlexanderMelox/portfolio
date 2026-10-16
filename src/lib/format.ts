/**
 * Small helpers for showing data on the page.
 */

import type { Media } from '@/payload-types'

/**
 * A route param that matches nothing. `output: 'export'` needs at least one
 * page per dynamic route, so an empty list builds this one, which renders 404.
 */
export const EMPTY_PARAM = '_empty'

/** Link to the list of posts on one topic. */
export const topicHref = (topic: string): string => `/writing/topic/${encodeURIComponent(topic)}`

/**
 * Where an upload lives. Locally Payload serves it from /api/media/file/...
 * The static build has no API, so scripts/prepare-static.mjs copies uploads
 * to /media/ instead.
 */
export const mediaUrl = (media: Pick<Media, 'url' | 'filename'>): string => {
  if (process.env.STATIC_EXPORT === '1' && media.filename) {
    return `/media/${encodeURIComponent(media.filename)}`
  }
  return media.url ?? ''
}

export const formatDate = (iso?: string | null): string => {
  if (!iso) return 'Draft'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

type LexicalNode = { text?: unknown; children?: LexicalNode[]; fields?: { code?: unknown } }

/**
 * Walk the rich text tree and count words. Code blocks count too,
 * since people still read them.
 */
const countWords = (node: LexicalNode | undefined): number => {
  if (!node) return 0
  let words = 0
  if (typeof node.text === 'string') words += node.text.split(/\s+/).filter(Boolean).length
  if (typeof node.fields?.code === 'string') words += node.fields.code.split(/\s+/).filter(Boolean).length
  for (const child of node.children ?? []) words += countWords(child)
  return words
}

/** Minutes to read, at about 230 words per minute. Never less than 1. */
export const readingTime = (content: unknown): number => {
  const root = (content as { root?: LexicalNode } | null)?.root
  return Math.max(1, Math.round(countWords(root) / 230))
}

/**
 * Split a headline around one word so it can be styled differently.
 * splitHeadline("I build human things", "human") → ["I build ", "human", " things"]
 */
export const splitHeadline = (
  headline: string,
  emphasis?: string | null,
): [string, string, string] => {
  if (!emphasis) return [headline, '', '']
  const index = headline.toLowerCase().indexOf(emphasis.toLowerCase())
  if (index === -1) return [headline, '', '']
  return [
    headline.slice(0, index),
    headline.slice(index, index + emphasis.length),
    headline.slice(index + emphasis.length),
  ]
}

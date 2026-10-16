import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { readSiteContent } from '@/lib/content'
import type { Post, Profile, Project } from '@/payload-types'

/**
 * All data fetching for the site lives here, so pages stay simple.
 *
 * Locally we use Payload's Local API: it talks to the database directly, on
 * the server, with no HTTP request in between.
 *
 * The static build (STATIC_EXPORT=1) has no database. It reads
 * content/site.json instead, which `pnpm export-content` writes from the
 * same queries. Each function below answers from whichever source applies.
 *
 * `cache` from React makes repeat calls in the same request free. The layout
 * and the page can both call getProfile() and it only runs once.
 */

const fromFile = process.env.STATIC_EXPORT === '1'

const payload = () => getPayload({ config })

type PostSummary = Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'publishedAt' | 'topics'>

const summarize = ({ id, title, slug, excerpt, publishedAt, topics }: Post): PostSummary => ({
  id,
  title,
  slug,
  excerpt,
  publishedAt,
  topics,
})

export const getProfile = cache(async (): Promise<Profile> => {
  if (fromFile) return readSiteContent().profile
  return (await payload()).findGlobal({ slug: 'profile', depth: 1 })
})

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  if (fromFile) return readSiteContent().projects
  const result = await (await payload()).find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'sortOrder',
    depth: 1,
    limit: 12,
  })
  return result.docs
})

type PostListOptions = { topic?: string; limit?: number }

export const getPosts = cache(async ({ topic, limit = 50 }: PostListOptions = {}): Promise<PostSummary[]> => {
  if (fromFile) {
    return readSiteContent()
      .posts.filter((p) => !topic || p.topics?.includes(topic))
      .slice(0, limit)
      .map(summarize)
  }
  const result = await (await payload()).find({
    collection: 'posts',
    where: {
      _status: { equals: 'published' },
      ...(topic ? { topics: { in: [topic] } } : {}),
    },
    sort: '-publishedAt',
    depth: 0,
    limit,
    // Only fetch the fields a list needs. The full content can be large.
    select: { title: true, slug: true, excerpt: true, publishedAt: true, topics: true },
  })
  return result.docs as PostSummary[]
})

/** Every topic used by a published post, most used first (ties A to Z). */
export const getTopics = cache(async (): Promise<string[]> => {
  const posts = await getPosts()
  const counts = new Map<string, number>()
  for (const topic of posts.flatMap((p) => p.topics ?? [])) {
    counts.set(topic, (counts.get(topic) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
    .map(([topic]) => topic)
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  if (fromFile) return readSiteContent().posts.find((p) => p.slug === slug) ?? null
  const result = await (await payload()).find({
    collection: 'posts',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    depth: 1,
    limit: 1,
  })
  return result.docs[0] ?? null
})

/** The post published just before this one, for the "Next" link. */
export const getNextPost = cache(async (post: Post) => {
  if (!post.publishedAt) return null
  if (fromFile) {
    // Posts in the file are newest first, so the first older one is next.
    const next = readSiteContent().posts.find((p) => p.publishedAt && p.publishedAt < post.publishedAt!)
    return next ? { id: next.id, title: next.title, slug: next.slug } : null
  }
  const result = await (await payload()).find({
    collection: 'posts',
    where: {
      _status: { equals: 'published' },
      publishedAt: { less_than: post.publishedAt },
    },
    sort: '-publishedAt',
    depth: 0,
    limit: 1,
    select: { title: true, slug: true },
  })
  return result.docs[0] ?? null
})

export const getPostSlugs = async (): Promise<string[]> => {
  const posts = await getPosts({ limit: 1000 })
  return posts.map((p) => p.slug)
}

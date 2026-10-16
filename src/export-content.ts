/**
 * Writes the site's published content to content/site.json.
 *
 *   pnpm export-content
 *
 * The static build (GitHub Pages) reads that file instead of the database,
 * so portfolio.db never has to leave your machine. Only published posts go
 * in, plus the profile and featured projects. No drafts, users or logins.
 *
 * Run it after editing in the admin, then commit content/site.json.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { SiteContent } from './lib/content'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const outFile = path.resolve(dirname, '../content/site.json')

const payload = await getPayload({ config })

// The same queries src/lib/data.ts makes, minus the per-page filters,
// which it applies to this file in memory.
const [profile, projects, posts] = await Promise.all([
  payload.findGlobal({ slug: 'profile', depth: 1 }),
  payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'sortOrder',
    depth: 1,
    limit: 12,
  }),
  payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    pagination: false,
  }),
])

const content: SiteContent = { profile, projects: projects.docs, posts: posts.docs }

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, `${JSON.stringify(content, null, 2)}\n`)

payload.logger.info(
  `Wrote ${posts.docs.length} posts and ${projects.docs.length} projects to ${path.relative(process.cwd(), outFile)}`,
)
process.exit(0)

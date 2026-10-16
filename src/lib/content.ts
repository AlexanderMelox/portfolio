import fs from 'fs'
import path from 'path'

import type { Post, Profile, Project } from '@/payload-types'

/**
 * The shape of content/site.json, written by `pnpm export-content`.
 * Posts are published only, newest first. Projects are featured only, in
 * sortOrder.
 */
export type SiteContent = {
  profile: Profile
  projects: Project[]
  posts: Post[]
}

let cached: SiteContent | null = null

/** Read content/site.json once per build. */
export const readSiteContent = (): SiteContent => {
  if (!cached) {
    const file = path.join(process.cwd(), 'content', 'site.json')
    if (!fs.existsSync(file)) {
      throw new Error('content/site.json is missing. Run `pnpm export-content` and commit the file.')
    }
    cached = JSON.parse(fs.readFileSync(file, 'utf8')) as SiteContent
  }
  return cached
}

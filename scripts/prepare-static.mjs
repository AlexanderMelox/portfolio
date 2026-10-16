/**
 * Runs before `next build` in `pnpm build:static`.
 *
 * - Copies uploads from media/ to public/media/ so they ship with the site.
 * - Writes public/CNAME so GitHub Pages serves the custom domain.
 * - On CI only, deletes the Payload admin/API routes. They need a server,
 *   and `output: 'export'` refuses to build them. Locally we never delete
 *   them, so your admin keeps working.
 */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const domain = 'melo.codes'

mkdirSync(publicDir, { recursive: true })

const mediaDir = path.join(root, 'media')
if (existsSync(mediaDir)) {
  cpSync(mediaDir, path.join(publicDir, 'media'), { recursive: true })
}

writeFileSync(path.join(publicDir, 'CNAME'), `${domain}\n`)

const payloadRoutes = path.join(root, 'src', 'app', '(payload)')
if (process.env.CI) {
  rmSync(payloadRoutes, { recursive: true, force: true })
} else if (existsSync(payloadRoutes)) {
  console.error(
    'prepare-static: src/app/(payload) still exists and the static export cannot build it.\n' +
      'This script only deletes it on CI. To test locally, run the build in a copy with CI=1.',
  )
  process.exit(1)
}

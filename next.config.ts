import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// `pnpm build:static` sets this to build plain HTML files for GitHub Pages.
// `pnpm dev` leaves it unset, so the admin and API keep working locally.
const isStaticExport = process.env.STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  // trailingSlash writes writing/index.html instead of writing.html, which
  // GitHub Pages serves reliably next to the writing/ folder.
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  images: {
    // GitHub Pages has no server to resize images, so serve the originals.
    unoptimized: isStaticExport,
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

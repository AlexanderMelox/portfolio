import { getPosts, getProfile } from '@/lib/data'

/**
 * RSS feed at /feed.xml, so people can follow the blog in a feed reader.
 *
 * A Route Handler: a file that returns a raw Response instead of a page.
 * RSS is plain XML, so we build the string by hand. Anything that comes from
 * the CMS goes through escapeXml first, or a title with "&" in it would
 * break the whole feed.
 */

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// Built once at build time into a plain feed.xml file.
export const dynamic = 'force-static'

export async function GET() {
  // The static build sets this to https://melo.codes. Links need a full address.
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const [profile, posts] = await Promise.all([getProfile(), getPosts({ limit: 30 })])

  const items = posts
    .map((post) => {
      const link = `${origin}/writing/${post.slug}`
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ''}
      ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ''}
      ${(post.topics ?? []).map((t) => `<category>${escapeXml(t)}</category>`).join('')}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${profile.name} — Writing`)}</title>
    <link>${origin}/writing</link>
    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(profile.blogIntro || profile.siteDescription || 'Notes and posts')}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono, Newsreader } from 'next/font/google'
import React from 'react'

import { AsciiField } from '@/components/AsciiField'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getProfile } from '@/lib/data'

import './styles.css'

// next/font downloads the fonts at build time and serves them from your own
// site. No request to Google from the visitor's browser, and no layout jump.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
})
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile()
  return {
    title: { default: profile.name, template: `%s · ${profile.name}` },
    description: profile.siteDescription ?? undefined,
    // Lets browsers and feed readers find the RSS feed automatically.
    alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile()

  return (
    <html lang="en" className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AsciiField />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SiteHeader
            name={profile.name}
            monogram={profile.monogram}
            avatar={typeof profile.avatar === 'object' ? profile.avatar : null}
          />
          <main id="main">{children}</main>
          <SiteFooter name={profile.name} />
        </div>
      </body>
    </html>
  )
}

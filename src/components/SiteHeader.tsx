import Image from 'next/image'
import Link from 'next/link'

import { mediaUrl } from '@/lib/format'
import type { Media } from '@/payload-types'

import { NavLink } from './NavLink'
import styles from './SiteHeader.module.css'

type Props = {
  name: string
  monogram?: string | null
  avatar?: Media | null
}

const links = [
  { href: '/#work', label: 'work' },
  { href: '/#experience', label: 'experience' },
  { href: '/writing', label: 'writing' },
  { href: '/#contact', label: 'contact' },
]

export function SiteHeader({ name, monogram, avatar }: Props) {
  return (
    <header className={`container ${styles.header}`}>
      <Link href="/" className={styles.brand}>
        {monogram ? <span className={styles.monogram}>{monogram}</span> : null}
        <span className={styles.name}>{name}</span>
      </Link>

      {avatar?.url ? (
        <Link href="/" className={styles.avatarLink}>
          {/* priority: it's at the very top of every page, so load it right away. */}
          <Image
            src={mediaUrl(avatar)}
            alt={`Home — ${avatar.alt}`}
            width={112}
            height={112}
            priority
            className={styles.avatar}
          />
        </Link>
      ) : null}

      <nav aria-label="Primary" className={styles.nav}>
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} className={styles.link} activeClassName={styles.active}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

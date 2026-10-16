'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type Props = {
  href: string
  className: string
  activeClassName: string
  children: ReactNode
}

/**
 * A link that knows when you're on its page.
 *
 * This is the only part of the header that needs the browser (to read the
 * current URL), so it's the only part marked 'use client'. The rest of the
 * header stays a server component and ships no JavaScript.
 */
export function NavLink({ href, className, activeClassName, children }: Props) {
  const pathname = usePathname()
  const isActive = !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <Link
      href={href}
      className={isActive ? `${className} ${activeClassName}` : className}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

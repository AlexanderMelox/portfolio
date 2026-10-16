import Link from 'next/link'

import { formatDate } from '@/lib/format'
import type { Post } from '@/payload-types'

import styles from './PostRow.module.css'

type Props = {
  post: Pick<Post, 'title' | 'slug' | 'excerpt' | 'publishedAt' | 'topics'>
  /** Compact rows (home page) hide the excerpt. */
  compact?: boolean
}

export function PostRow({ post, compact = false }: Props) {
  return (
    <Link href={`/writing/${post.slug}`} className={compact ? `${styles.row} ${styles.compact}` : styles.row}>
      <time className={styles.date} dateTime={post.publishedAt ?? undefined}>
        {formatDate(post.publishedAt)}
      </time>
      <span className={styles.main}>
        <span className={styles.title}>{post.title}</span>
        {!compact && post.excerpt ? <span className={styles.excerpt}>{post.excerpt}</span> : null}
      </span>
      <span className={styles.topics}>
        {post.topics?.join(' · ')} <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

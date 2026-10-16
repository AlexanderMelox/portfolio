import Link from 'next/link'

import { PostRow } from '@/components/PostRow'
import { SubscribeForm } from '@/components/SubscribeForm'
import { topicHref } from '@/lib/format'
import type { Post } from '@/payload-types'

import styles from './PostList.module.css'

type Props = {
  intro?: string | null
  topics: string[]
  activeTopic?: string
  posts: Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'publishedAt' | 'topics'>[]
}

/**
 * The blog list, shared by /writing and /writing/topic/[topic].
 *
 * The topic filter is a set of plain links (/writing/topic/design), not
 * buttons with React state. That means:
 * - every view is a prebuilt HTML page, so no JavaScript is needed
 * - every filtered view has its own URL you can share or bookmark
 * - the back button works the way people expect
 */
export function PostList({ intro, topics, activeTopic, posts }: Props) {
  const filters = [{ label: 'all', href: '/writing', active: !activeTopic }].concat(
    topics.map((t) => ({ label: t, href: topicHref(t), active: t === activeTopic })),
  )

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.path}>~/writing</p>
      <h1 className={styles.title}>Writing</h1>
      {intro ? <p className={styles.intro}>{intro}</p> : null}

      <nav aria-label="Filter posts by topic" className={styles.filters}>
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.href}
            scroll={false}
            className={f.active ? `${styles.filter} ${styles.filterActive}` : styles.filter}
            aria-current={f.active ? 'page' : undefined}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      <div className={styles.list}>
        {posts.length ? (
          posts.map((post) => <PostRow key={post.id} post={post} />)
        ) : (
          <p className={styles.empty}>Nothing here yet. Check back soon.</p>
        )}
      </div>

      <SubscribeForm />
    </div>
  )
}

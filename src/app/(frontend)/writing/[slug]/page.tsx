import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import { getNextPost, getPostBySlug, getPostSlugs, getProfile } from '@/lib/data'
import { EMPTY_PARAM, formatDate, readingTime, topicHref } from '@/lib/format'

import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

// Build one page per published post. Any other slug is a 404.
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  // The static build needs at least one page. With no posts yet, build a
  // placeholder that renders the 404 page.
  return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: EMPTY_PARAM }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt ?? post.dek ?? undefined }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const [profile, next] = await Promise.all([getProfile(), getNextPost(post)])
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={`container ${styles.page}`}>
      <article className={styles.article}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/writing">← writing</Link>
          {post.topics?.[0] ? (
            <>
              <span aria-hidden="true"> / </span>
              <Link href={topicHref(post.topics[0])}>{post.topics[0]}</Link>
            </>
          ) : null}
        </nav>

        <h1 className={styles.title}>{post.title}</h1>
        {post.dek ? <p className={styles.dek}>{post.dek}</p> : null}

        <div className={styles.meta}>
          <span className={styles.author}>
            <span className={styles.avatar} aria-hidden="true">
              {initials}
            </span>
            {profile.name}
          </span>
          <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
          <span>{readingTime(post.content)} min read</span>
        </div>

        <div className={styles.body}>{post.content ? <RichText data={post.content} /> : null}</div>

        {post.topics?.length ? (
          <ul className={styles.tags} aria-label="Topics">
            {post.topics.map((topic) => (
              <li key={topic}>
                <Link href={topicHref(topic)} className="pill">
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <aside className={styles.authorCard}>
          <span className={styles.avatarLarge} aria-hidden="true">
            {initials}
          </span>
          <div>
            <p className={styles.authorName}>{profile.name}</p>
            {profile.siteDescription ? <p className={styles.authorBio}>{profile.siteDescription}</p> : null}
          </div>
        </aside>

        <nav aria-label="More posts" className={styles.more}>
          <Link href="/writing" className={styles.moreLink}>
            <span className={styles.moreLabel}>← All posts</span>
            <span className={styles.moreTitle}>Back to writing</span>
          </Link>
          {next ? (
            <Link href={`/writing/${next.slug}`} className={`${styles.moreLink} ${styles.moreNext}`}>
              <span className={styles.moreLabel}>Next →</span>
              <span className={styles.moreTitle}>{next.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </div>
  )
}

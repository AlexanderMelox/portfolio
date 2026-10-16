import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { projectCategories } from '@/collections/Projects'
import { mediaUrl } from '@/lib/format'
import type { Media, Post, Project } from '@/payload-types'

import styles from './ProjectCard.module.css'

const categoryLabel = (value: Project['category']) =>
  projectCategories.find((c) => c.value === value)?.label ?? value

/**
 * A tiny JSON highlighter: keys in one color, string values in another.
 * A full library (like Shiki) would be overkill for a 6-line preview.
 * The regex finds every "quoted string"; a string followed by ":" is a key.
 */
function HighlightedJson({ source }: { source: string }) {
  const parts: React.ReactNode[] = []
  const pattern = /"(?:[^"\\]|\\.)*"(\s*:)?/g
  let last = 0
  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > last) parts.push(source.slice(last, index))
    const isKey = Boolean(match[1])
    const text = isKey ? match[0].slice(0, -match[1].length) : match[0]
    parts.push(
      <span key={index} className={isKey ? styles.jsonKey : styles.jsonString}>
        {text}
      </span>,
    )
    if (isKey) parts.push(match[1])
    last = index + match[0].length
  }
  parts.push(source.slice(last))
  return <>{parts}</>
}

function Preview({ project }: { project: Project }) {
  if (project.preview === 'chat') {
    return (
      <div className={styles.chat} aria-hidden="true">
        <div className={styles.bubbleThem}>How do I add a date picker?</div>
        <div className={styles.bubbleMe}>Here’s the component and a working example…</div>
        <div className={styles.typing}>
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }

  if (project.preview === 'code' && project.previewCode) {
    return (
      <pre className={styles.code} aria-hidden="true">
        <HighlightedJson source={project.previewCode} />
      </pre>
    )
  }

  // With depth: 1 the upload comes back as a full Media object, not an id.
  const image = typeof project.image === 'object' ? (project.image as Media | null) : null
  if (image?.url) {
    return (
      <div className={styles.imageWrap}>
        <Image
          src={mediaUrl(image)}
          alt={image.alt}
          fill
          sizes="(max-width: 720px) 100vw, 400px"
          className={styles.image}
        />
      </div>
    )
  }

  return (
    <div className={styles.placeholder} aria-hidden="true">
      [project image]
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const post = typeof project.post === 'object' ? (project.post as Post | null) : null

  return (
    <article className={styles.card}>
      <Preview project={project} />
      <div className={styles.body}>
        <p className={styles.eyebrow}>{project.eyebrow || categoryLabel(project.category)}</p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        {post || project.url ? (
          <div className={styles.links}>
            {post ? (
              <Link href={`/writing/${post.slug}`} className="text-link">
                Read the write-up <span aria-hidden="true">→</span>
              </Link>
            ) : null}
            {project.url ? (
              <a href={project.url} className="text-link" target="_blank" rel="noreferrer">
                Visit <span className="visually-hidden">{project.title}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        ) : null}

        {project.tags?.length ? (
          <ul className={styles.tags} aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag} className="pill">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

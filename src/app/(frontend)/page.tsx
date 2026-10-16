import Link from 'next/link'

import { CodeWindow } from '@/components/CodeWindow'
import { PostRow } from '@/components/PostRow'
import { ProjectCard } from '@/components/ProjectCard'
import { getFeaturedProjects, getPosts, getProfile } from '@/lib/data'
import { mediaUrl, splitHeadline } from '@/lib/format'
import type { Media } from '@/payload-types'

import styles from './page.module.css'

export default async function HomePage() {
  // These three don't depend on each other, so run them at the same time.
  const [profile, projects, posts] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getPosts({ limit: 3 }),
  ])

  const [before, emphasis, after] = splitHeadline(profile.headline, profile.headlineEmphasis)
  const resume = typeof profile.resume === 'object' ? (profile.resume as Media | null) : null
  const codeVariable = profile.codeCard?.variable || profile.name.split(' ')[0]?.toLowerCase() || 'me'

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroText}>
          {profile.status ? (
            <p className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              <span>$ whoami → {profile.status}</span>
            </p>
          ) : null}
          <h1 className={styles.headline}>
            {profile.greeting ? <span className={styles.greeting}>{profile.greeting}</span> : null}
            {before}
            {emphasis ? <em className={styles.emphasis}>{emphasis}</em> : null}
            {after}
          </h1>
          {profile.intro ? <p className={styles.intro}>{profile.intro}</p> : null}
          <div className={styles.actions}>
            <Link href="#work" className="button button--primary">
              See the work
            </Link>
            <Link href="/writing" className="button button--secondary">
              Read the blog <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className={styles.heroCode}>
          <CodeWindow card={profile.codeCard} variable={codeVariable} />
        </div>
      </section>

      {/* ---------- Work ---------- */}
      <section id="work" className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div>
            <p className="eyebrow">01 — Selected work</p>
            <h2 className="section-title">{profile.workTitle}</h2>
          </div>
          {profile.workIntro ? <p className={styles.sectionIntro}>{profile.workIntro}</p> : null}
        </div>
        {projects.length ? (
          <div className={styles.projects}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No projects yet. Add one in the admin panel.</p>
        )}
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experience" className={`container ${styles.section} ${styles.experience}`}>
        <div className={styles.experienceHead}>
          <p className="eyebrow">02 — Experience</p>
          <h2 className="section-title">{profile.experienceTitle}</h2>
          {resume?.url ? (
            <a href={mediaUrl(resume)}className={`text-link mono ${styles.resume}`} download>
              résumé.pdf <span aria-hidden="true">↓</span>
            </a>
          ) : null}
        </div>
        <ol className={styles.timeline}>
          {profile.experience?.map((item) => (
            <li key={item.id} className={styles.timelineItem}>
              <span className={styles.dates}>{item.dates}</span>
              <div className={styles.role}>
                <h3>
                  {item.role}
                  {item.org ? ` · ${item.org}` : ''}
                </h3>
                {item.description ? <p>{item.description}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Writing ---------- */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div>
            <p className="eyebrow">03 — Writing</p>
            <h2 className="section-title">{profile.writingTitle}</h2>
          </div>
          <Link href="/writing" className="text-link">
            All posts <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className={styles.posts}>
          {posts.map((post) => (
            <PostRow key={post.id} post={post} compact />
          ))}
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className={`container ${styles.contactWrap}`}>
        <div className={styles.contact}>
          <div className={styles.contactCopy}>
            <h2 className={styles.contactTitle}>
              Say <em>hello.</em>
            </h2>
            {profile.contactBlurb ? <p className={styles.contactBlurb}>{profile.contactBlurb}</p> : null}
          </div>
          <div className={styles.contactLinks}>
            {profile.email ? (
              <a href={`mailto:${profile.email}`} className={styles.email}>
                {profile.email}
              </a>
            ) : null}
            {profile.socials?.length ? (
              <ul className={styles.socials}>
                {profile.socials.map((social) => (
                  <li key={social.id}>
                    <a href={social.url} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}

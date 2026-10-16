import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostList } from '@/components/PostList'
import { getPosts, getProfile, getTopics } from '@/lib/data'
import { EMPTY_PARAM } from '@/lib/format'

type Props = { params: Promise<{ topic: string }> }

// Build one page per topic. Any other topic is a 404.
export const dynamicParams = false

export async function generateStaticParams() {
  const topics = await getTopics()
  // The static build needs at least one page. With no topics yet, build a
  // placeholder that renders the 404 page.
  return topics.length ? topics.map((topic) => ({ topic })) : [{ topic: EMPTY_PARAM }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = decodeURIComponent((await params).topic)
  return { title: `Writing on ${topic}` }
}

export default async function TopicPage({ params }: Props) {
  const topic = decodeURIComponent((await params).topic)
  const [profile, topics, posts] = await Promise.all([getProfile(), getTopics(), getPosts({ topic })])
  if (!topics.includes(topic)) notFound()

  return <PostList intro={profile.blogIntro} topics={topics} activeTopic={topic} posts={posts} />
}

import type { Metadata } from 'next'

import { PostList } from '@/components/PostList'
import { getPosts, getProfile, getTopics } from '@/lib/data'

export const metadata: Metadata = { title: 'Writing' }

export default async function WritingPage() {
  const [profile, topics, posts] = await Promise.all([getProfile(), getTopics(), getPosts()])
  return <PostList intro={profile.blogIntro} topics={topics} posts={posts} />
}

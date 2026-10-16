/**
 * Fills an empty database with starter content that matches the design.
 *
 *   pnpm seed          # only runs if there are no posts or projects yet
 *   pnpm seed --force  # wipes posts + projects first, then seeds
 *
 * Text in [square brackets] is a placeholder for you to replace in the admin.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

import { slugify } from './fields/slug'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// ---------- Tiny helpers to build Lexical rich text JSON ----------

const text = (value: string) => ({
  type: 'text',
  text: value,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const element = (type: string, children: object[], extra: object = {}) => ({
  type,
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  ...extra,
})

const p = (value: string) => element('paragraph', [text(value)], { textFormat: 0 })
const h2 = (value: string) => element('heading', [text(value)], { tag: 'h2' })
const quote = (value: string) => element('quote', [text(value)])
const code = (fields: { code: string; language: string; filename?: string; caption?: string }) => ({
  type: 'block',
  version: 2,
  format: '',
  fields: { blockName: '', blockType: 'code', ...fields },
})

// Loose type on purpose: the seed builds plain JSON and Payload validates it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doc = (...children: object[]): any => ({ root: element('root', children) })

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()

// ---------- Content ----------

const posts = [
  {
    title: 'Making 100+ components readable by AI',
    dek: 'Design systems used to have two audiences. Now they have three.',
    excerpt:
      'What it took to turn a design system into structured data an MCP server could serve, and what I would do differently.',
    topics: ['design', 'ai'],
    publishedAt: daysAgo(18),
    content: doc(
      p(
        'For years, a design system served the designers who used it and the developers who built with it. Now there’s a third reader: AI tools that write interface code on someone’s behalf.',
      ),
      p(
        'On the Carbon team, I helped convert more than 100 components into structured data, so an MCP server could hand them to those tools. This post covers what that looked like and what I’d tell anyone starting the same job.',
      ),
      h2('Start with what a component promises'),
      p('[Your words here: why props, variants and usage guidance matter more to a model than a pretty docs page.]'),
      code({
        filename: 'button.json',
        language: 'json',
        caption: 'A simplified example of one component’s structured record.',
        code: JSON.stringify(
          {
            name: 'Button',
            package: '@carbon/react',
            props: {
              kind: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
              size: ['sm', 'md', 'lg', 'xl', '2xl'],
            },
            guidance: 'Use one primary button per view.',
          },
          null,
          2,
        ),
      }),
      quote('[A one-line takeaway worth quoting.]'),
      h2('What I’d do differently'),
      p('[Your three lessons go here.]'),
    ),
  },
  {
    title: '[Your side project]: what I built and why',
    excerpt: '[The idea, the stack, and what surprised you along the way.]',
    topics: ['side projects', 'engineering'],
    publishedAt: daysAgo(4),
    content: doc(p('[Draft. Write this post in the admin panel.]')),
  },
  {
    title: 'Learning in public on the way to senior',
    excerpt: 'Why I started this blog, and the habits I am building as an engineer.',
    topics: ['career'],
    publishedAt: daysAgo(11),
    content: doc(p('[Draft. Write this post in the admin panel.]')),
  },
  {
    title: 'Design tokens are an API — treat them like one',
    excerpt: 'Naming, versioning and deprecating tokens with the same care as any public interface.',
    topics: ['design', 'engineering'],
    publishedAt: daysAgo(30),
    content: doc(p('[Draft. Write this post in the admin panel.]')),
  },
  {
    title: 'The quiet craft of focus states',
    excerpt: 'Small details that make an interface feel considered for everyone who uses it.',
    topics: ['design'],
    publishedAt: daysAgo(45),
    content: doc(p('[Draft. Write this post in the admin panel.]')),
  },
  {
    title: 'What building a chat UI taught me about loading states',
    excerpt: 'Streaming text changes the rules for spinners, skeletons and scroll position.',
    topics: ['engineering', 'ai'],
    publishedAt: daysAgo(60),
    content: doc(p('[Draft. Write this post in the admin panel.]')),
  },
  {
    title: '[A tool or library I keep coming back to]',
    excerpt: '[Why it earns a place in your toolbox.]',
    topics: ['engineering'],
    publishedAt: daysAgo(75),
    content: doc(p('[Draft. Write this post in the admin panel.]')),
  },
]

const projects = (designPostId: number) => [
  {
    title: 'Carbon AI Chat',
    category: 'work' as const,
    eyebrow: 'IBM · Carbon',
    summary:
      'IBM’s chat interface for AI assistants: streaming messages, loading and typing states, and the components that make up a conversation.',
    tags: ['react', 'web components', 'chat ui'],
    preview: 'chat' as const,
    sortOrder: 1,
  },
  {
    title: 'An AI-ready design system',
    category: 'work' as const,
    eyebrow: 'IBM · Design system',
    summary:
      'Converted 100+ components into structured data so AI assistants, including the ones people chat with, can build with the design system accurately.',
    tags: ['mcp', 'json schema', 'docs'],
    preview: 'code' as const,
    previewCode: [
      '{',
      '  "name": "Button",',
      '  "props": {',
      '    "kind": ["primary", "ghost", …],',
      '    "size": ["sm", "md", "lg"]',
      '  }',
      '}',
    ].join('\n'),
    post: designPostId,
    sortOrder: 2,
  },
  {
    title: '[Your side project]',
    category: 'side-project' as const,
    summary: '[One or two sentences on what it is, who it’s for, and what you learned building it.]',
    tags: ['[tag]'],
    sortOrder: 3,
  },
  {
    title: '[A library, tool or contribution]',
    category: 'open-source' as const,
    summary: '[What problem it solves and how people use it.]',
    tags: ['[tag]'],
    sortOrder: 4,
  },
  {
    title: '[A full-stack project]',
    category: 'web-app' as const,
    summary: '[The idea, the stack front to back, and one hard problem you solved.]',
    tags: ['[tag]'],
    sortOrder: 5,
  },
  {
    title: '[Something you built for fun]',
    category: 'experiment' as const,
    summary: '[A small idea you tried out, like an animation, a game or a tool.]',
    tags: ['[tag]'],
    sortOrder: 6,
  },
]

// ---------- Run ----------

const force = process.argv.includes('--force')
const payload = await getPayload({ config })

const [postCount, projectCount] = await Promise.all([
  payload.count({ collection: 'posts' }),
  payload.count({ collection: 'projects' }),
])

if ((postCount.totalDocs > 0 || projectCount.totalDocs > 0) && !force) {
  payload.logger.warn('You already have posts or projects. Run `pnpm seed --force` to replace them.')
  process.exit(0)
}

if (force) {
  await payload.delete({ collection: 'projects', where: { id: { exists: true } } })
  await payload.delete({ collection: 'posts', where: { id: { exists: true } } })
}

payload.logger.info('Uploading avatar…')
// Reuse the avatar if it's already there, so re-seeding doesn't pile up copies.
const existingAvatar = await payload.find({
  collection: 'media',
  where: { filename: { like: 'memoji' } },
  limit: 1,
})
const avatar =
  existingAvatar.docs[0] ??
  (await payload.create({
    collection: 'media',
    data: { alt: 'Alex’s memoji: brown hair, a beard and yellow glasses' },
    filePath: path.resolve(dirname, 'seed-assets/memoji.webp'),
  }))

payload.logger.info('Seeding profile…')
await payload.updateGlobal({
  slug: 'profile',
  data: {
    name: 'Alexander Melo',
    avatar: avatar.id,
    monogram: 'am/',
    status: 'software engineer',
    greeting: 'Hi, I’m Alex 👋',
    headline: 'I create human interfaces in an age of AI.',
    headlineEmphasis: 'human',
    codeCard: {
      variable: 'alex',
      role: 'Software engineer',
      basedIn: 'NYC',
      currently: 'IBM · Carbon',
      interests: ['web apps', 'design systems', 'side projects'],
      stack: ['TypeScript', 'React', 'Web Components'],
    },
    workTitle: 'Things I’ve built',
    workIntro: 'A mix of day-job work, side projects and experiments, with notes on how they came together.',
    experienceTitle: 'Where I’ve been',
    writingTitle: 'Notes from the workbench',
    blogIntro: 'Notes on building software, design, side projects and the occasional tangent. Written slowly, shared openly.',
    experience: [
      {
        dates: '[YEAR] — now',
        role: 'Software engineer',
        org: 'IBM',
        description:
          'Carbon Experience Platform. Building Carbon AI Chat, IBM’s chat interface for AI assistants, and getting the design system ready for AI tools.',
      },
      { dates: '[YEAR] — [YEAR]', role: '[Role]', org: '[Company]', description: '[What you worked on and one thing you shipped.]' },
      { dates: '[YEAR]', role: '[School or program]', description: '[Degree, focus, or what got you into software.]' },
    ],
    contactBlurb: 'I’m always happy to talk shop about software, side projects, or whatever you’re building.',
    socials: [
      { label: 'github', url: 'https://github.com/' },
      { label: 'linkedin', url: 'https://www.linkedin.com/' },
      { label: 'rss', url: '/feed.xml' },
    ],
    siteDescription:
      'Software engineer at IBM, working on Carbon. I write about building software, design systems and UI for people and AI.',
  },
})

payload.logger.info('Seeding posts…')
const created = []
for (const post of posts) {
  created.push(await payload.create({ collection: 'posts', data: { ...post, slug: slugify(post.title), _status: 'published' } }))
}

payload.logger.info('Seeding projects…')
for (const project of projects(created[0].id)) {
  await payload.create({ collection: 'projects', data: { ...project, slug: slugify(project.title), featured: true } })
}

payload.logger.info('Done! Run `pnpm dev` and open http://localhost:3000')
process.exit(0)

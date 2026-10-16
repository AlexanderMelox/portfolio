# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is pnpm (Node >= 20.18.1). Scripts wrap everything in `cross-env NODE_OPTIONS=--no-deprecation`.

```bash
pnpm dev                  # Next.js + Payload at http://localhost:3000 (admin at /admin)
pnpm devsafe              # same, but wipes .next first
pnpm build                # production build (server mode)
pnpm build:static         # static export to out/ for GitHub Pages; only runs on CI (it deletes src/app/(payload))
pnpm lint                 # eslint .
pnpm export-content       # write published content to content/site.json (what the live site is built from)
pnpm seed                 # payload run src/seed.ts (add -- --force to replace posts/projects)
pnpm generate:types       # rebuild src/payload-types.ts after changing a collection/global
pnpm generate:importmap   # rebuild src/app/(payload)/admin/importMap.js after adding admin components
pnpm test:int             # vitest (tests/int/**/*.int.spec.ts)
pnpm test:e2e             # playwright (tests/e2e); starts `pnpm dev` itself; run `pnpm seed` first
```

Single tests:

```bash
pnpm test:int -- tests/int/api.int.spec.ts -t "name"
pnpm test:e2e -- tests/e2e/frontend.e2e.spec.ts
```

Env: `.env` needs `PAYLOAD_SECRET` and `DATABASE_URL` (`file:./portfolio.db`). `NEXT_PUBLIC_BUTTONDOWN_USER` is optional; the subscribe form hides itself without it.

To try the static build locally, copy the repo somewhere and run `CI=1 pnpm build:static` in the copy. Without `CI`, `scripts/prepare-static.mjs` refuses to delete the admin routes. The static build only needs `content/site.json`, not the db or `PAYLOAD_SECRET`.

## Deployment model

The live site (melo.codes) is a **static export on GitHub Pages**. Payload is a local-only CMS and `portfolio.db` is gitignored. Publishing means running `pnpm export-content` (`src/export-content.ts`), committing `content/site.json` and `media/`, and pushing to `main`. `.github/workflows/deploy.yml` then runs `pnpm build:static` with no database, which:
- copies `media/` to `public/media/` and writes `public/CNAME` (`scripts/prepare-static.mjs`)
- sets `STATIC_EXPORT=1`, which turns on `output: 'export'`, `trailingSlash` and unoptimized images in `next.config.ts`, and makes every function in `src/lib/data.ts` read `content/site.json` (`src/lib/content.ts`) instead of Payload

A new query in `data.ts` needs both branches. If it needs data the export doesn't include, extend `src/export-content.ts` and the `SiteContent` type too.

So frontend code must stay statically renderable:
- no `searchParams`, `cookies()`/`headers()`, Server Actions or `force-dynamic`
- dynamic routes need `generateStaticParams` + `dynamicParams = false`
- route handlers use `dynamic = 'force-static'`
- link uploads with `mediaUrl()` from `src/lib/format.ts`, never `media.url` directly

## Architecture

Payload CMS 3 runs inside the Next.js app (single process) with SQLite (`@payloadcms/db-sqlite`) and CSS modules (no Tailwind/UI library).

- `src/payload.config.ts` is the single CMS config: collections (`Posts`, `Projects`, `Media`, `Users`), the `Profile` global, Lexical rich text, SQLite. It is imported elsewhere as `@payload-config`.
- `src/payload-types.ts` is generated; never hand-edit it. Re-run `pnpm generate:types` after schema changes.
- `src/app/(payload)/` is Payload-generated admin/API routes (don't edit, except `custom.scss`). `src/app/(frontend)/` is the public site: home, `writing/` (list, `[slug]`, `topic/[topic]`) and the `feed.xml` RSS route. The list UI is shared through `components/PostList.tsx`.
- `src/lib/data.ts` is the only place the site reads content: Payload's Local API in dev, or `content/site.json` in the static build. In dev it uses the Local API (`getPayload({ config })`, no HTTP). Functions are wrapped in React `cache` for per-request dedupe. Pages only read `_status: 'published'` posts; draft/access rules are enforced in the collection definitions (e.g. `Posts.ts`), not in each query.
- The `/writing` topic filter is plain links to prebuilt `/writing/topic/<topic>` pages (`topicHref()`), not client state.
- The subscribe form (`SubscribeForm.tsx`) is a plain HTML form that posts to Buttondown. There is no subscribers collection.
- Server components by default; only the background animation (`AsciiField`) and `NavLink` are `'use client'`. Keep new client components to a minimum.
- Design tokens (colors, fonts, spacing) are CSS variables in `src/app/(frontend)/styles.css`; each component has its own `.module.css`.
- Reusable Payload pieces: `src/fields/slug.ts` (slug auto-built from title), `src/blocks/Code.ts` (code block used in post rich text, rendered by `RichText.tsx`/`CodeWindow.tsx`).

Anything in `[square brackets]` in seed/content is a placeholder meant to be edited in the admin.

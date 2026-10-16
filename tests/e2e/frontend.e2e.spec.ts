import { test, expect } from '@playwright/test'

// Run `pnpm seed` first so there is content to check.
test.describe('Frontend', () => {
  test('home page shows the intro and projects', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('h1')).toContainText('Alex')
    await expect(page.locator('#work article').first()).toBeVisible()
  })

  test('topic filter narrows the post list', async ({ page }) => {
    await page.goto('http://localhost:3000/writing')
    // Post links only, not the topic filter links.
    const postLinks = 'main a[href^="/writing/"]:not([href^="/writing/topic/"])'
    const all = await page.locator(postLinks).count()
    await page.getByRole('link', { name: 'career', exact: true }).click()
    await expect(page).toHaveURL(/\/writing\/topic\/career$/)
    const filtered = await page.locator(postLinks).count()
    expect(filtered).toBeLessThan(all)
  })

  test('unknown posts show the 404 page', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/writing/does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('RSS feed lists published posts', async ({ request }) => {
    const response = await request.get('http://localhost:3000/feed.xml')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/rss+xml')
    const body = await response.text()
    expect(body).toContain('<rss')
    expect(body).toContain('Making 100+ components readable by AI')
  })
})

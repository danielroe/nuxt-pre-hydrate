import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, createPage, url } from '@nuxt/test-utils'

await setup({
  server: true,
  browser: true,
  rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
})

describe('nuxt-pre-hydrate', async () => {
  it('ssr', async () => {
    const html = await $fetch('/')
    expect(html).toContain(
      '<div data-pre-hydratable="test"><!--[-->server rendered<!--]--><script>__PREHYDRATE()</script></div>'
    )
    expect(html).toContain('window.__PREHYDRATE =')
    expect(html.replace(/ data-h-[^=]+=""/g, '')).toContain(`<script>window.__PREHYDRATE['test'] =`)
  })

  it('has no hydration errors on the client', async () => {
    const page = await createPage(undefined, { locale: 'en-GB' })
    const logs: string[] = []

    page.on('console', event => {
      if (!event.text().includes('<Suspense>')) {
        logs.push(event.text())
      }
    })

    await page.goto(url('/'), { waitUntil: 'networkidle' })
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10)))

    // No hydration errors
    expect(logs.join('')).toMatchInlineSnapshot('""')
  })
})

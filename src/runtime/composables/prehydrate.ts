import { hash } from 'ohash'

const ATTR_KEY = 'data-prehydrate-id'

/**
 * `onPrehydrate` is a composable that allows you to run a callback on the client immediately before
 * Nuxt hydrates the page. This is an advanced feature.
 *
 * The callback will be stringified and inlined in the HTML so it should not have any external
 * dependencies (such as auto-imports). It also runs before Nuxt runtime initializes so it should
 * not or rely on the Nuxt or Vue context.
 */
export function onPrehydrate (callback: (el: HTMLElement) => void): { [ATTR_KEY]?: string } {
  if (import.meta.client) { return {} }
  const vm = getCurrentInstance()
  if (!vm) {
    throw new TypeError('[nuxt] `onPrehydrate` must be called within the setup function of a Vue component.')
  }
  const stringifiedCallback = callback.toString()
  const id = hash(stringifiedCallback)
  vm.attrs[ATTR_KEY] = id
  useHead({
    script: [
      {
        key: stringifiedCallback,
        tagPosition: 'bodyClose',
        tagPriority: -19,
        innerHTML: () => `document.querySelectorAll('[${ATTR_KEY}="${id}"]').forEach(${stringifiedCallback})`
      }
    ]
  })

  return {
    [ATTR_KEY]: id
  }
}


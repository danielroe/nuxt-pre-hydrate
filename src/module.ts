import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-pre-hydrate',
  },
  async setup() {
    const resolver = createResolver(import.meta.url)

    // Add <PreHydrate> component
    addComponentsDir({ path: resolver.resolve('./runtime/components') })
  },
})

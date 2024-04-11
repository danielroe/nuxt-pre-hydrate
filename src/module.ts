import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

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

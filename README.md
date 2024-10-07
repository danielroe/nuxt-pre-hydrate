> [!IMPORTANT]  
> A new `onPrehydrate` hook was added to Nuxt core in v3.12.0 which replaces this module - see https://github.com/nuxt/nuxt/pull/27037.

---

# Nuxt Pre-Hydrate

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> Safely run pre-hydration steps on the client with [Nuxt 3](https://nuxt.com)

- [✨ &nbsp;Changelog](https://github.com/danielroe/nuxt-pre-hydrate/blob/main/CHANGELOG.md)
- [▶️ &nbsp;Online playground](https://stackblitz.com/github/danielroe/nuxt-pre-hydrate/tree/main/playground)

## Features

- 💪 Prevents hydration mismatch on client
- 🏁 Fully configurable
- ⚠️ Experimental and under developemnt

## Installation

Install and add `nuxt-pre-hydrate` to your `nuxt.config`.

```bash
# Whichever matches your package manager
pnpm add -D nuxt-pre-hydrate
npm install -D nuxt-pre-hydrate
yarn add -D nuxt-pre-hydrate
```

```js
export default defineNuxtConfig({
  modules: ['nuxt-pre-hydrate'],
})
```

## Usage

To use, you can use the `<PreHydrate>` component anywhere in your app.

```vue
<script setup lang="ts">
const contentRenderer = (renderProps) => /* return a string of the HTML meant to be rendered on the client */
</script>

<template>
  <PreHydrate tag="div" :renderContent="contentRenderer" strategy-name="test" v-bind="renderProps">
    {{ contentRenderer() }}
  </PreHydrate>
</template>

```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## License

Made with ❤️

Published under the [MIT License](./LICENCE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-pre-hydrate?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-pre-hydrate
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-pre-hydrate?style=flat-square
[npm-downloads-href]: https://npm.chart.dev/nuxt-pre-hydrate
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/danielroe/nuxt-pre-hydrate/ci.yml?branch=main
[github-actions-href]: https://github.com/danielroe/nuxt-pre-hydrate/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/danielroe/nuxt-pre-hydrate/main?style=flat-square
[codecov-href]: https://codecov.io/gh/danielroe/nuxt-pre-hydrate

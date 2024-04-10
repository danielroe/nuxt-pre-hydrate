<script setup lang="ts">
const contentRenderer = () => typeof globalThis.document !== 'undefined' ? 'replaced content on client-side' : 'server rendered'
</script>

<template>
  <PreHydrate
    tag="div"
    :render-content="contentRenderer"
    strategy-name="test"
  >
    {{ contentRenderer() }}
  </PreHydrate>
</template>

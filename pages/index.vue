<script setup lang="ts">
definePageMeta({
  name: 'Introduce',
  layout: 'sessionless',
  auth: false,
})

const { data } = await useFetch('/api/_content/query')
const doc = (data.value as any)[0]
</script>

<template>
  <main v-if="data">
    <ContentRenderer :value="doc" />
  </main>
</template>

<style scoped>
main {
  @apply prose relative mx-auto;
}
</style>

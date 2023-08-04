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
    <div class="mt-12">
      <ContentRenderer :value="doc" />
    </div>
  </main>
</template>

<style scoped>
main {
  @apply prose relative mx-auto;
}
</style>

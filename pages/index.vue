<script setup lang="ts">
definePageMeta({
  name: 'Home',
  layout: 'default',
})

const { data } = await useFetch('/api/hello')
</script>

<template>
  <article>
    <p>
      {{ data }}
    </p>
  </article>
</template>

<style scoped>

</style>

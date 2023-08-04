<script setup lang="ts">
import Footer from '~/components/organisms/Footer.vue'
</script>

<template>
  <div id="app">
    <main>
      <NuxtPage class="h-full" />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
main {
  @apply container mx-auto max-w-3xl md:max-w-6xl px-6 mt-2 relative h-full;
  min-height: calc(100vh + 64px);
}
</style>

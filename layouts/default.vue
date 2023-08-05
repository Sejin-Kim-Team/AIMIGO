<script setup lang="ts">
import Header from '~/components/organisms/Header.vue'
import Footer from '~/components/organisms/Footer.vue'
</script>

<template>
  <div class="app">
    <Header />

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

.app {
  min-width: 320px;
}
</style>

<script setup lang="ts">
import Header from '~/components/organisms/Header.vue'
import Footer from '~/components/organisms/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
main {
  @apply container mx-auto max-w-3xl px-6;
  min-height: calc(100vh + 220px);
}
</style>

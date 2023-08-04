<script setup lang="ts">
definePageMeta({
  name: 'Home',
  layout: 'sessionless',
  auth: false,
})
</script>

<template>
  <article>
    Hello World
    <NuxtLink to="chat">
      Chat
    </NuxtLink>
  </article>
</template>

<style scoped>
article {
  position: relative;
}

.chat-wrapper {
  height: calc(100vh - 280px);
  overflow-y: scroll;
}
</style>

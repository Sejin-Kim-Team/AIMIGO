<script setup lang="ts">

</script>

<template>
  <div class="chat-wrapper">
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-wrapper {
  @apply card bg-base-200 shadow-xl h-full;
}
</style>

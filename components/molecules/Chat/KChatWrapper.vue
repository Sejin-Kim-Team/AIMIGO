<script setup lang="ts">
defineOptions({
  inheritAttrs: true,
})

const el = ref<HTMLDivElement>()

function scrollBottom() {
  el.value?.scrollTo({
    top: el.value?.scrollHeight ?? 0,
  })
}

defineExpose({
  scrollBottom,
})
</script>

<template>
  <div ref="el" class="chat-wrapper">
    <div class="lg:p-8 p-3">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-wrapper {
  @apply card bg-base-200 shadow-xl h-full;
}
</style>

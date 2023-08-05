<script setup lang="ts">
import { debounce } from '~/utils/async-utils'

defineOptions({
  inheritAttrs: true,
})

const emits = defineEmits(['updated'])

const el = ref<HTMLDivElement>()

const debouncedUpdate = debounce(() => emits('updated'), 1000)

onUpdated(debouncedUpdate)

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

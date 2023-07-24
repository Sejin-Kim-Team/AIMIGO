<script lang="ts" setup>
import type { AvatarOption } from '~/types/widget.types'

interface BackgroundProps {
  color: AvatarOption['background']['color']
}

const props = defineProps<BackgroundProps>()

const computedStyle = computed(() => {
  return {
    background: props.color,
  }
})
</script>

<template>
  <div
    class="avatar-background"
    :style="computedStyle"
  />
</template>

<style lang="scss" scoped>
.avatar-background {
  @apply absolute top-0 left-0 w-full h-full transition-colors duration-100;
}
</style>

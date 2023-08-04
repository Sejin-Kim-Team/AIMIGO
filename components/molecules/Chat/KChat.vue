<script setup lang="ts">
import { formatDateString } from '~/utils/dates'

const props = withDefaults(defineProps<{
  end?: boolean
  time?: string
  sender?: string
}>(), {
  end: false,
})

const computedClass = computed(() => {
  return [
    'chat',
    props.end ? 'chat-end' : 'chat-start',
  ]
})
</script>

<template>
  <div :class="computedClass">
    <div class="chat-header">
      {{ sender }}
      <time class="text-xs opacity-50">
        {{ formatDateString(time) }}
      </time>
    </div>
    <div class="chat-bubble">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

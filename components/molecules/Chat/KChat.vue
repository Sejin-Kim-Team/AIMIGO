<script setup lang="ts">
import { elapsedTime } from '~/utils/date'

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
    <slot name="avatar" />

    <div class="chat-header">
      {{ sender }}
      <time v-if="time" class="text-xs opacity-50">
        {{ elapsedTime(time) }}
      </time>
    </div>
    <div class="chat-bubble">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

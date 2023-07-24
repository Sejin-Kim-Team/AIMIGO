<script setup lang="ts">
import type { Brand } from '~/types/daisy.types'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit'
  square?: boolean
  brand?: Brand
}>(), {
  type: 'button',
  square: false,
})

const computedClass = computed(() => {
  const result = []
  if (props.square)
    result.push('btn-square')

  if (props.brand)
    result.push(`btn-${props.brand}`)

  return result.join(' ')
})
</script>

<template>
  <button class="k-btn" :type="type" :class="computedClass" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.k-btn {
  @apply btn;
}
</style>

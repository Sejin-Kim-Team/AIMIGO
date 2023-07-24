<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: any
  type?: 'text' | 'number'
  placeholder?: string
  disabled?: boolean
}>(), {
  type: 'text',
})
const emits = defineEmits(['update:modelValue'])

const vModel = useVModel(props, 'modelValue', emits)
</script>

<template>
  <input
    v-model="vModel"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    class="input input-bordered"
    autofocus
    v-bind="$attrs"
  >
</template>

<style scoped lang="scss">

</style>

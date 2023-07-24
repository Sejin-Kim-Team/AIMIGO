<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: any
  type?: 'text' | 'number'
  playceholder?: string
}>(), {
  type: 'text',
})
const emits = defineEmits<{
  'update:modelValue': (value: any) => void
}>()

const vModel = useVModel(props, emits, 'modelValue')
</script>

<template>
  <input
    v-model="vModel"
    :type="type"
    :placeholder="playceholder"
    class="input input-bordered w-full max-w-xs"
  >
</template>

<style scoped lang="scss">

</style>

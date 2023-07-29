<script setup lang="ts">
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import type { AvatarOption } from '~/types/widget.types'

interface VueColorAvatarProps {
  option: AvatarOption
  size?: number
}

const props = withDefaults(defineProps<VueColorAvatarProps>(), {
  size: 280,
})
</script>

<template>
  <Avatar :option="option" />
</template>

<style scoped lang="scss">

</style>

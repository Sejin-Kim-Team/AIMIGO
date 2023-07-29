<script setup lang="ts">
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import { PlaygroundAvatar } from '~/constants/charactor.constants'
import type { AvatarOption } from '~/types/widget.types'

const avatar = ref<AvatarOption>(PlaygroundAvatar)
</script>

<template>
  <div>
    <h1>
      Hello Playground
    </h1>

    <Avatar :option="avatar" />
  </div>
</template>

<style scoped lang="scss">

</style>

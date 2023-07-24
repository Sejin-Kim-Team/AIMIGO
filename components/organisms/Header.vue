<script setup lang="ts">
import Avatar01 from '~/assets/images/avatar-01.png'
import Avatar02 from '~/assets/images/avatar-02.png'
import { useElementHover } from '#imports'

const iconRef = ref<HTMLElement>()
const iconIsHovered = useElementHover(iconRef)

const iconSrc = computed(() => iconIsHovered.value ? Avatar02 : Avatar01)
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-start">
        <NuxtLink ref="iconRef" class="link-btn link-btn--square" to="/">
          <img :src="iconSrc" alt="avatar" class="w-8 h-8">
        </NuxtLink>
      </div>

      <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-xl text-base-content">AIMIGO!</a>
      </div>
      <div class="navbar-end" />
    </nav>
  </header>
</template>

<style scoped lang="scss">
.link-btn {
  @apply btn btn-ghost normal-case;
}

.link-btn--square {
  @apply btn-square;
}
</style>

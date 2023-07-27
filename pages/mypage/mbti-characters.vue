<script setup lang="ts">
import { CharacterImages, IMAGE_DIRECTORY } from '~/constants/characters.constants'

const focusedCharacter = ref(null)

function onClickCharacter(mbti) {
  focusedCharacter.value = mbti
}
</script>

<template>
  <span class="text-xl text-gray-400">Choose Your AIMIGO</span>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div v-for="(character, index) in CharacterImages" :key="index">
      <div class="character" @click="onClickCharacter(index)">
        <div class="character-image">
          <img :src="`${IMAGE_DIRECTORY}${character[0]}`" alt="character">
        </div>
        <div class="character-name" :class="index === focusedCharacter ? 'focused-character' : ''">
          {{ index.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.character {
  @apply text-center rounded-t-3xl cursor-pointer;
}

.character-image {
  @apply rounded-3xl hover:shadow-xl;
}

.focused-character {
  @apply bg-base-200 rounded-full text-accent;
}

.character-name {
  @apply drop-shadow-xl font-bold;
}
</style>

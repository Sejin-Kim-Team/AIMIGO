<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import KButton from '~/components/atoms/KButton.vue'
import type { Aimigo } from '~/constants/characters.constants'
import { MBTIItems } from '~/constants/characters.constants'
import { useAimigoStore } from '~/store/aimigo.store'

const aimigoStore = useAimigoStore()
const { aimigo } = storeToRefs(aimigoStore)
const selected = ref<Aimigo | null>(null)
const items = ref(MBTIItems)
function onClickCharacter(item: any) {
  selected.value = item
}

function onClickSubmit() {
  aimigo.value = toRaw(selected.value)
  navigateTo('/mypage/my-aimigo')
}
</script>

<template>
  <main class="mb-8">
    <div class="mb-8 w-full h-[68px] pb-2 flex items-end justify-between align-baseline sticky top-[-1px] z-10 bg-base-100" style="vertical-align: baseline;">
      <span class="text-xl content-baseline text-gray-400">당신이 대화하고 싶은 AIMIGO 를 골라주세요!</span>
      <div v-if="selected" class="flex justify-end">
        <KButton class="btn-primary" @click="onClickSubmit">
          다음
        </KButton>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(mbti, index) in items" :key="index">
        <div class="character" @click="onClickCharacter(mbti)">
          <div class="character-image">
            <Avatar :option="mbti.avatar" :size="250" />
          </div>
          <div class="character-name" :class="selected?.type === mbti.type ? 'focused-character' : ''">
            {{ mbti.type }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.character {
  @apply text-center rounded-t-3xl cursor-pointer;
}

.character-image {
  @apply rounded-3xl hover:shadow-xl text-center mx-auto flex justify-center;
}

.focused-character {
  @apply bg-accent/25 rounded-full text-accent-focus;
}

.character-name {
  @apply drop-shadow-xl font-bold py-2 mt-4 text-accent-content transition-all;
}
</style>

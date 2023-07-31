<script setup lang="ts">
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import ENFJ_JSON from '~/assets/json/enfj-avatar-01.json'
import ENFP_JSON from '~/assets/json/enfp-avatar-01.json'
import ENTJ_JSON from '~/assets/json/entj-avatar-01.json'
import ENTP_JSON from '~/assets/json/entp-avatar-01.json'

import ESFJ_JSON from '~/assets/json/esfj-avatar-01.json'
import ESFP_JSON from '~/assets/json/esfp-avatar-01.json'
import ESTJ_JSON from '~/assets/json/estj-avatar-01.json'
import ESTP_JSON from '~/assets/json/estp-avatar-01.json'

import INFJ_JSON from '~/assets/json/infj-avatar-01.json'
import INFP_JSON from '~/assets/json/infp-avatar-01.json'
import INTJ_JSON from '~/assets/json/intj-avatar-01.json'
import INTP_JSON from '~/assets/json/intp-avatar-01.json'

import ISFJ_JSON from '~/assets/json/isfj-avatar-01.json'
import ISFP_JSON from '~/assets/json/isfp-avatar-01.json'
import ISTJ_JSON from '~/assets/json/istj-avatar-01.json'
import ISTP_JSON from '~/assets/json/istp-avatar-01.json'
import { MBTI_LIST } from '~/constants/characters.constants'
import KButton from '~/components/atoms/KButton.vue'

const focusedCharacter = ref(null)

const mbtiJsons = [
  ENFJ_JSON,
  ENFP_JSON,
  ENTJ_JSON,
  ENTP_JSON,
  ESFJ_JSON,
  ESFP_JSON,
  ESTJ_JSON,
  ESTP_JSON,
  INFJ_JSON,
  INFP_JSON,
  INTJ_JSON,
  INTP_JSON,
  ISFJ_JSON,
  ISFP_JSON,
  ISTJ_JSON,
  ISTP_JSON,
]

function onClickCharacter(index: any) {
  focusedCharacter.value = index
}

async function onClickSubmit(mbti: any) {
  // TODO: mbti 저장 -> session storage

  await navigateTo(`/mypage/my-aimigo?mbti=${mbti}`)
}
</script>

<template>
  <span class="text-xl text-gray-400">Choose Your AIMIGO</span>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div v-for="(mbti, index) in mbtiJsons" :key="index">
      <div class="character" @click="onClickCharacter(index)">
        <div class="character-image">
          <Avatar :option="mbti" />
        </div>
        <div class="character-name" :class="index === focusedCharacter ? 'focused-character' : ''">
          {{ MBTI_LIST[index] }}
        </div>
      </div>
    </div>
  </div>
  <div v-if="focusedCharacter" class="flex justify-end">
    <KButton @click="onClickSubmit(MBTI_LIST[focusedCharacter])">
      다음
    </KButton>
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
  @apply bg-accent/25 rounded-full text-accent-focus;
}

.character-name {
  @apply drop-shadow-xl font-bold;
}
</style>

<script setup lang="ts">
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

import Avatar from '~/components/atoms/widgets/Avatar.vue'
import KInput from '~/components/atoms/KInput.vue'
import { MBTI } from '~/constants/characters.constants'
import KButton from '~/components/atoms/KButton.vue'

const route = useRouter()
const query = route.currentRoute.value.query
const aimigoName = ref<string>('')
const mbti = ref<string>(query.mbti as string)

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

const computedJson = (mbtiJsons[MBTI[mbti.value as keyof MBTI]])
const isNamed = computed(() => aimigoName.value.length > 0)

async function onClickSubmit() {
  await navigateTo('/')
}
</script>

<template>
  <div class="flex justify-center">
    <div class="card w-[800px] h-[600px] py-20 bg-base-200 shadow-xl place-items-center">
      <div class="character-image">
        <Avatar :option="computedJson" />
      </div>
      <div class="card-body items-center text-center">
        <div class="text-xl font-light w-full">
          <div class="my-8">
            AIMIGO의 이름을 정해주세요.
          </div>
          <KInput
            v-model="aimigoName"
            class="w-full"
            placeholder=""
          />
        </div>
      </div>
    </div>
  </div>

  <div v-if="isNamed" class="flex justify-end">
    <KButton @click="onClickSubmit()">
      시작하기
    </KButton>
  </div>
</template>

<style scoped lang="scss">

</style>

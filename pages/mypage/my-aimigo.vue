<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import KInput from '~/components/atoms/KInput.vue'
import KButton from '~/components/atoms/KButton.vue'
import { useAimigoStore } from '~/store/aimigo.store'

const aimigoStore = useAimigoStore()
const { aimigo } = storeToRefs(aimigoStore)

const name = ref(aimigo.value.name ?? 'AIMIGO')

function onClickSubmit() {
  aimigo.value = {
    ...aimigo.value,
    name: name.value,
  }

  localStorage.setItem('aimigo', JSON.stringify(toRaw(aimigo.value)))

  await useFetch('/api/users/aimigo', {
    method: 'PUT',
    body: {
      aimigoMbti: aimigo.value?.type,
      aimigoName: aimigo.value?.name,
    },
  })

  navigateTo('/chat')
}
</script>

<template>
  <div v-if="aimigo" class="flex justify-center">
    <div class="card w-[800px] h-[600px] py-20 bg-base-200 shadow-xl place-items-center">
      <div class="character-image">
        <Avatar :option="aimigo.avatar" />
      </div>
      <div class="card-body items-center text-center">
        <div class="text-xl font-light w-full">
          <div class="my-8">
            AIMIGO의 이름을 정해주세요.
          </div>
          <form class="w-full flex justify-center gap-4" @submit.prevent="onClickSubmit">
            <KInput
              v-model="name"
              class="w-full"
              placeholder=""
            />

            <KButton type="submit" class="btn-primary">
              시작하기
            </KButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

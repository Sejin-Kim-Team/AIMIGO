<script setup lang="ts">
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import KInput from '~/components/atoms/KInput.vue'
import type { Aimigo } from '~/constants/characters.constants'
import KButton from '~/components/atoms/KButton.vue'

const aimigo = ref<Aimigo | null>(null)
const name = ref('')

tryOnMounted(() => {
  aimigo.value = JSON.parse(localStorage.getItem('aimigo') || 'null')
  name.value = aimigo.value?.name || 'AIMIGO'
})

async function onClickSubmit() {
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

  await navigateTo('/chat')
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

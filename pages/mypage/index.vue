<script setup lang="ts">
import KButton from '~/components/atoms/KButton.vue'
import { useAimigoStore } from '~/store/aimigo.store'
import { useKSnackbar } from '~/composables/useKSnackbar'

const aimigoStore = useAimigoStore()
const snackbar = useKSnackbar()
const { getSession } = useAuth()
const { requestToken } = useFirebase()
const myName = ref<string>('')
const pushToken = ref<string>('')
const pushEnabled = ref<boolean>(false)
const startTime = ref<number>(9)
const endTime = ref<number>(18)
const user = computed(() => aimigoStore.user)

function onChangeMyName(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value

  myName.value = value
}
function onChangePushEnabled(e: Event) {
  const target = e.target as HTMLInputElement
  const checked = target.checked

  pushEnabled.value = checked
}
function onChangeStartTime(e: Event) {
  const target = e.target as HTMLSelectElement
  const value = target.value
  const hour = Number(value.replace('시', ''))

  startTime.value = hour
}

function onChangeEndTime(e: Event) {
  const target = e.target as HTMLSelectElement
  const value = target.value
  const hour = Number(value.replace('시', ''))

  endTime.value = hour
}

tryOnMounted(async () => {
  await aimigoStore.fetchUser()

  myName.value = user.value?.name ?? ''
  pushToken.value = user.value?.pushToken ?? ''
  pushEnabled.value = user.value?.pushEnabled ?? false
  startTime.value = user.value?.pushPermitStartTime ?? 9
  endTime.value = user.value?.pushPermitEndTime ?? 18
})

async function handleSave() {
  try {
    let token = ''
    if (pushEnabled.value && pushToken.value === '') {
      token = toRaw(requestToken.value) ?? ''
      console.log('Token is : ', token)
    }

    await useFetch('/api/users/push', {
      params: { id: user.value?.id },
      method: 'PUT',
      body: {
        name: myName.value,
        pushToken: token,
        pushEnabled: pushEnabled.value,
        pushPermitStartTime: startTime.value,
        pushPermitEndTime: endTime.value,
      },
    })

    alert('저장되었습니다 😀')
  }
  catch (e) {
    console.error(e)
    alert('내 정보 수정에 실패했습니다 🥲')
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="handleSave">
      <div class="flex justify-center">
        <div class="card w-[800px] h-[600px] py-20 flex flex-col gap-12 items-center">
          <div class="text-xl w-full">
            내 정보 수정
          </div>

          <div class="w-full flex justify-between items-baseline">
            이름
            <input type="text" class="input input-success" :value="myName" @change="onChangeMyName">
          </div>

          <div class="w-full flex justify-between items-baseline">
            알림 설정
            <input type="checkbox" class="toggle toggle-success" :checked="pushEnabled" @change="onChangePushEnabled">
          </div>

          <div class="w-full flex justify-between items-baseline">
            알림 허용 시간
            <div class="flex gap-4">
              <select class="select select-success w-full max-w-xs" @change="onChangeStartTime">
                <template v-for="hour in 24" :key="`s-${hour}`">
                  <option v-if="startTime === hour" :value="`${hour}시`" selected>
                    {{ hour }}시
                  </option>
                  <option v-else-if="hour > endTime" :value="`${hour}시`" disabled>
                    {{ hour }}시
                  </option>
                  <option v-else :value="`${hour}시`">
                    {{ hour }}시
                  </option>
                </template>
              </select>
              <select class="select select-success w-full max-w-xs" @change="onChangeEndTime">
                <template v-for="hour in 24" :key="`e-${hour}`">
                  <option v-if="endTime === hour" :value="`${hour}시`" selected>
                    {{ hour }}시
                  </option>
                  <option v-else-if="hour < startTime" :value="`${hour}시`" disabled>
                    {{ hour }}시
                  </option>
                  <option v-else :value="`${hour}시`">
                    {{ hour }}시
                  </option>
                </template>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <KButton @click="$router.go(-1)">
          돌아가기
        </KButton>
        <KButton type="submit" brand="primary">
          저장하기
        </KButton>
      </div>
    </form>
  </main>
</template>

<style scoped lang="scss">

</style>

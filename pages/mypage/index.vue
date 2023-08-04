<script setup lang="ts">
import KButton from '~/components/atoms/KButton.vue'
import type { User } from '~/server/types/types'

const { getSession } = useAuth()
const myName = ref<string>('')
const pushToken = ref<string>('')
const pushEnabled = ref<boolean>(false)
const startTime = ref<number>(9)
const endTime = ref<number>(18)
const thisUser = ref<User | null>(null)
const { requestToken } = useFirebase()

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

async function getUser() {
  const session = await getSession()
  if (!session)
    throw new Error('Session is null')

  const email = session.user?.email ?? ''
  const { data } = await useFetch('/api/users', {
    method: 'GET',
    params: { email },
  })

  thisUser.value = data.value?.body ?? null

  myName.value = thisUser.value?.name ?? ''
  pushToken.value = thisUser.value?.pushToken ?? ''
  pushEnabled.value = thisUser.value?.pushEnabled ?? false
  startTime.value = thisUser.value?.pushPermitStartTime ?? 9
  endTime.value = thisUser.value?.pushPermitEndTime ?? 18
}

getUser()

async function onSaveMyPage() {
  // users/push
  let token = ''
  if (pushEnabled.value && pushToken.value === '') {
    token = toRaw(await requestToken.value) ?? ''
    console.log('Token is : ', token)
  }

  await useFetch('/api/users/push', {
    params: { id: thisUser.value?.id },
    method: 'PUT',
    body: {
      name: myName.value,
      pushToken: token,
      pushEnabled: pushEnabled.value,
      pushPermitStartTime: startTime.value,
      pushPermitEndTime: endTime.value,
    },
  })
}
</script>

<template>
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
    <KButton @click="navigateTo('/')">
      돌아가기
    </KButton>
    <KButton brand="primary" @click="onSaveMyPage">
      저장하기
    </KButton>
  </div>
</template>

<style scoped lang="scss">

</style>

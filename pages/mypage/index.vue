<script setup lang="ts">
import KButton from '~/components/atoms/KButton.vue'

const startTime = ref<number>(9)
const endTime = ref<number>(18)

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
</script>

<template>
  <div class="flex justify-center">
    <div class="card w-[800px] h-[600px] py-20 flex flex-col gap-12 items-center">
      <div class="w-full flex justify-between">
        알림 설정
        <input type="checkbox" class="toggle toggle-success" checked>
      </div>

      <div class="w-full flex justify-between">
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
    <KButton brand="primary">
      저장하기
    </KButton>
  </div>
</template>

<style scoped lang="scss">

</style>

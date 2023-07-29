<script setup lang="ts">
import { PlaygroundAvatar } from '~/constants/charactor.constants'
import type { AvatarOption } from '~/types/widget.types'
import Typing from '~/components/atoms/Typing.vue'
import KAvatar from '~/components/molecules/widgets/KAvatar.vue'

const charactor = ref<AvatarOption>(PlaygroundAvatar)

const emotion = ref<'Normal' | 'Positive' | 'Negative'>('Normal')
const count = ref(0)
const texts = ref([
  'Hello, my name kim sejin. nice to meet you.',
])

function handleTyping() {
  count.value += 1
}

function handledTyped() {
  count.value = 0
}

async function handleRestart() {
  count.value = 0
  texts.value = []
  await nextTick()
  texts.value = ['Hello, my name kim sejin. nice to meet you.']
}
</script>

<template>
  <div>
    <h1>
      Hello Playground
    </h1>

    <div class="mt-4 flex gap-4">
      <div class="join">
        <input v-model="emotion" class="join-item btn" type="radio" name="options" aria-label="Normal" value="Normal">
        <input v-model="emotion" class="join-item btn" type="radio" name="options" aria-label="Positive" value="Positive">
        <input v-model="emotion" class="join-item btn" type="radio" name="options" aria-label="Negative" value="Negative">
      </div>

      <button type="button" class="btn btn-warning" @click="handleRestart">
        Restart
      </button>
    </div>

    <KAvatar
      class="mt-4"
      :avatar="charactor"
      :current-index="count"
      :emotion="emotion"
    />

    <div class="mt-4">
      <Typing
        class="badge badge-primary"
        :items="texts"
        :type-speed="66"
        @typing="handleTyping"
        @typed="handledTyped"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

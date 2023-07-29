<script setup lang="ts">
import { PlaygroundAvatar } from '~/constants/charactor.constants'
import type { AvatarOption } from '~/types/widget.types'
import { MouthShape, WidgetType } from '~/enums/widget.enums'
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import Typing from '~/components/atoms/Typing.vue'

const charactor = ref<AvatarOption>(PlaygroundAvatar)

function updateAvatar(option: AvatarOption, shape: MouthShape) {
  charactor.value = {
    ...option,
    widgets: {
      ...option.widgets,
      [WidgetType.Mouth]: {
        ...option.widgets[WidgetType.Mouth],
        shape,
      },
    },
  }
}

const count = ref(0)

watch(count, (v) => {
  updateAvatar(toRaw(charactor.value), v % 3 === 0 ? MouthShape.Smirk : MouthShape.Laughing)
})

function handleTyping(typedString: string) {
  count.value += 1
}

function handledTyped(typedString: string) {
  count.value = 0
  console.count('fucking!')
}
</script>

<template>
  <div>
    <h1>
      Hello Playground
    </h1>

    <Avatar :option="charactor" />

    <div>
      <Typing
        :items="[
          'Hello, my name kim sejin. nice to meet you.',
        ]"
        :type-speed="66"
        @typing="handleTyping"
        @typed="handledTyped"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

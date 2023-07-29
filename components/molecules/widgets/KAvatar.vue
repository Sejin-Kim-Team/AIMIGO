<script setup lang="ts">
import Avatar from '~/components/atoms/widgets/Avatar.vue'
import type { AvatarOption } from '~/types/widget.types'
import type { EmotionType } from '~/types/emotion.type'
import { WidgetType } from '~/enums/widget.enums'
import {
  NegativeEmotionalAvatarStates,
  NormalEmotionalAvatarStates,
  PositiveEmotionalAvatarStates,
} from '~/constants/emotion.constants'

interface VueColorAvatarProps {
  avatar: AvatarOption
  currentIndex?: number
  emotion?: EmotionType
  size?: number
}

const props = withDefaults(defineProps<VueColorAvatarProps>(), {
  size: 280,
  currentIndex: 0,
  emotion: 'Normal',
})

const currentAvatar = computed(() => {
  const itemIndex = props.currentIndex % 3 === 0 ? 0 : 1
  let emotionalFace = NormalEmotionalAvatarStates[itemIndex]

  if (props.emotion === 'Normal')
    emotionalFace = NormalEmotionalAvatarStates[itemIndex]
  else if (props.emotion === 'Positive')
    emotionalFace = PositiveEmotionalAvatarStates[itemIndex]
  else if (props.emotion === 'Negative')
    emotionalFace = NegativeEmotionalAvatarStates[itemIndex]

  console.log('fucking', props.currentIndex, emotionalFace)

  const shapes = {
    mouth: emotionalFace.widgets.mouth,
    eyes: emotionalFace.widgets.eyes,
    eyebrows: emotionalFace.widgets.eyebrows,
  }

  return {
    ...props.avatar,
    widgets: {
      ...props.avatar.widgets,
      [WidgetType.Mouth]: {
        ...props.avatar.widgets[WidgetType.Mouth],
        shape: shapes.mouth.shape,
      },
      [WidgetType.Eyes]: {
        ...props.avatar.widgets[WidgetType.Eyes],
        shape: shapes.eyes.shape,
      },
      [WidgetType.Eyebrows]: {
        ...props.avatar.widgets[WidgetType.Eyebrows],
        shape: shapes.eyebrows.shape,
      },
    },
  }
})
</script>

<template>
  <Avatar :option="currentAvatar" />
</template>

<style scoped lang="scss">

</style>

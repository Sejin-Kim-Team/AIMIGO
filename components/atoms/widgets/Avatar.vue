<script lang="ts" setup>
import { ref, toRefs, watchEffect } from 'vue'

import Background from '~/components/atoms/widgets/Background.vue'
import { widgetData } from '@/utils/dynamic-data'
import type { AvatarOption } from '~/types/widget.types'
import { WidgetType, WrapperShape } from '~/enums/widget.enums'
import { AVATAR_LAYER, NONE } from '~/constants/widget.constants'

interface VueColorAvatarRef {
  avatarRef: HTMLDivElement
}

interface VueColorAvatarProps {
  option: AvatarOption
  size?: number
}

const props = withDefaults(defineProps<VueColorAvatarProps>(), {
  size: 280,
})

const { option: avatarOption, size: avatarSize } = toRefs(props)

const avatarRef = ref<VueColorAvatarRef['avatarRef']>()

defineExpose({ avatarRef })

function getWrapperShapeClassName() {
  return {
    [WrapperShape.Circle]:
      avatarOption.value.wrapperShape === WrapperShape.Circle,
    [WrapperShape.Square]:
      avatarOption.value.wrapperShape === WrapperShape.Square,
    [WrapperShape.Squircle]:
      avatarOption.value.wrapperShape === WrapperShape.Squircle,
  }
}

const svgContent = ref('')

watchEffect(async () => {
  const sortedList = Object.entries(avatarOption.value.widgets).sort(
    ([prevShape, prev], [nextShape, next]) => {
      const ix = prev.zIndex ?? AVATAR_LAYER[prevShape]?.zIndex ?? 0
      const iix = next.zIndex ?? AVATAR_LAYER[nextShape]?.zIndex ?? 0
      return ix - iix
    },
  )

  const promises: Promise<string>[] = sortedList.map(
    async ([widgetType, opt]) => {
      if (opt.shape !== NONE && widgetData?.[widgetType]?.[opt.shape])
        return (await widgetData[widgetType][opt.shape]()).default

      return ''
    },
  )

  let skinColor: string | undefined

  const svgRawList = await Promise.all(promises).then((raw) => {
    return raw.map((svgRaw, i) => {
      const [widgetType, widget] = sortedList[i]
      let widgetFillColor = widget.fillColor

      if (widgetType === WidgetType.Face)
        skinColor = widgetFillColor

      if (skinColor && widgetType === WidgetType.Ear)
        widgetFillColor = skinColor

      const content = svgRaw
        .slice(svgRaw.indexOf('>', svgRaw.indexOf('<svg')) + 1)
        .replace('</svg>', '')
        .replaceAll('$fillColor', widgetFillColor || 'transparent')

      return `
        <g id="vue-color-avatar-${sortedList[i][0]}">
          ${content}
        </g>
      `
    })
  })

  svgContent.value = `
    <svg
      width="${avatarSize.value}"
      height="${avatarSize.value}"
      viewBox="0 0 ${avatarSize.value / 0.7} ${avatarSize.value / 0.7}"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 65)">
        ${svgRawList.join('')}
      </g>
    </svg>
  `
})

const computedStyle = computed(() => {
  return {
    width: `${avatarSize.value}px`,
    height: `${avatarSize.value}px`,
  }
})
</script>

<template>
  <div
    ref="avatarRef"
    class="vue-color-avatar"
    :style="computedStyle"
    :class="getWrapperShapeClassName()"
  >
    <Background :color="avatarOption.background.color" />

    <div class="avatar-payload" v-html="svgContent" />
  </div>
</template>

<style lang="scss" scoped>
.vue-color-avatar {
  position: relative;
  overflow: hidden;

  &.circle {
    border-radius: 50%;
  }

  &.squircle {
    // TODO: Radius should adapt to the avatar size
    border-radius: 25px;
  }

  .avatar-payload {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
}
</style>

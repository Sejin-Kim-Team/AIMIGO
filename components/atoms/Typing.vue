<script setup lang="ts">
defineOptions({
  inheritAttrs: true,
})

const props = withDefaults(defineProps<{
  items: string[]
  eraseSpeed?: number
  typeSpeed?: number
  delay?: number
  intervals?: number
  start?: number
  caret?: string
  iterations?: number
  once?: boolean
}>(), {
  eraseSpeed: 100,
  typeSpeed: 200,
  delay: 2000,
  intervals: 500,
  start: 0,
  caret: 'cursor',
  iterations: 0,
  once: true,
})

const emits = defineEmits<{
  (e: 'typed', typedString: string): void
  (e: 'typing', typedString: string): void
}>()

const data = reactive({
  typeValue: '',
  count: 0,
  typeStatus: false,
  currentIndex: 0,
  charIndex: 0,
})

let timer = 0

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = 0
  }
}

function typeWriter() {
  let loop = 0
  if (data.charIndex < props.items[data.currentIndex].length) {
    if (!data.typeStatus)
      data.typeStatus = true

    data.typeValue += props.items[data.currentIndex].charAt(data.charIndex)
    data.charIndex += 1
    emits('typing', data.typeValue)

    clearTimer()
    timer = window.setTimeout(typeWriter, props.typeSpeed)
  }
  else {
    data.count += 1

    onTyped(props.items[data.currentIndex])

    if (data.count === props.items.length) {
      loop += 1
      if (loop === props.iterations)
        return (data.typeStatus = false)
    }

    data.typeStatus = false
  }
}

function onTyped(typedString: string) {
  emits('typed', typedString)
}

watch(() => props.items, () => {
  data.typeValue = ''
  data.count = 0
  data.typeStatus = false
  data.currentIndex = props.start
  data.charIndex = 0

  clearTimer()
  setTimeout(typeWriter, props.start)
}, {
  immediate: true,
})
</script>

<template>
  <div class="is-typed">
    <slot />
    <span class="typed">{{ data.typeValue }}</span>
    <span :class="`${caret} ${{ typing: data.typeStatus }}`">&nbsp;</span>
  </div>
</template>

<style scoped lang="scss">
.is-typed span.typed {
  colour: black;
}

.is-typed span.cursor {
  display: inline-block;
  width: 3px;
  background-color: black;
  animation: blink 1s infinite;
}

.is-typed span.underscore {
  display: inline-flex;
  width: 10px;
  height: 1px;
  align-items: flex-end;
  background-color: black;
  animation: blink 1s infinite;
}

.is-typed span.cursor.typing {
  animation: none;
}

@keyframes blink {
  49% {
    background-color: black;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}
</style>

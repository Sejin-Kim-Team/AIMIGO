<script setup lang="ts">
import { tryOnMounted } from '@vueuse/shared'
import { useFirebase } from '~/composables/useFirebase'

definePageMeta({
  name: 'Introduce',
  layout: 'sessionless',
  auth: false,
})

const { data } = await useFetch('/api/_content/query')
const doc = (data.value as any)[0]

const { requestToken, tryRequestToken } = useFirebase()

watchEffect(() => {
  console.log('fucking', toRaw(requestToken.value))
})

tryOnMounted(() => tryRequestToken())
</script>

<template>
  <main v-if="data">
    <ContentRenderer :value="doc" />
  </main>
</template>

<style scoped>
main {
  @apply prose relative mx-auto;
}
</style>

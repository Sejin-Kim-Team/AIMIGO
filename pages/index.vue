<script setup lang="ts">
import Avator01 from '@/assets/images/avatar-01.png'
import KChatWrapper from '~/components/molecules/Chat/KChatWrapper.vue'

definePageMeta({
  name: 'Home',
  layout: 'default',
})

const { data } = await useFetch('/api/chat')
const chat = ref<string>('')

interface Chat {
  sender: string
  time: string
  message: string
}
</script>

<template>
  <article>
    <div class="grid grid-cols-6 md:gap-8 gap-4 h-full">
      <!-- Avatar Layer -->
      <div class="md:col-span-2 col-span-6">
        <div class="card w-full bg-base-200 shadow-xl">
          <figure class="px-10 pt-10">
            <img :src="Avator01" alt="avatar" class="rounded-xl">
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">
              Sejin Kim
            </h2>
          </div>
        </div>
      </div>

      <!-- Chat Layer -->
      <div class="md:col-span-4 col-span-6 h-full">
        <KChatWrapper>
          Hello World
        </KChatWrapper>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  position: relative;
}
</style>

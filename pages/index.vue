<script setup lang="ts">
import Avator01 from '@/assets/images/avatar-01.png'
import KChatWrapper from '~/components/molecules/Chat/KChatWrapper.vue'
import KInput from '~/components/atoms/KInput.vue'
import KButton from '~/components/atoms/KButton.vue'
import { CHAT_MESSAGE_SENDING, SEND_MESSAGE, SETTING } from '~/constants/icon.constants'
import KChat from '~/components/molecules/Chat/KChat.vue'

definePageMeta({
  name: 'Home',
  layout: 'default',
  middleware: ['auth'],
})

interface Chat {
  sender: string
  time: string
  message: string
}

const { status, getSession } = useAuth()

const loading = ref<boolean>(false)
const message = ref<string>('')
const chats = ref<Chat[]>([])
const chatRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()

const { width, left } = useElementBounding(chatRef)
const { focused: inputFocused } = useFocus(inputRef)

const senderId = ref('SeongHwa Kim')

async function handleSubmit() {
  const chat: Chat = {
    sender: senderId.value,
    time: new Date().toISOString(),
    message: message.value,
  }

  chats.value.push(chat)

  loading.value = true
  await requestMessage(message.value)
  loading.value = false

  message.value = ''
  inputFocused.value = true
}

async function requestMessage(message: string) {
  const { data } = await useFetch<{
    message: string
  }>('/api/chat', {
    method: 'post',
    body: {
      message,
    },
  })

  if (data.value === null)
    return

  const chat: Chat = {
    sender: 'Sejin Kim',
    time: new Date().toISOString(),
    message: data.value.message,
  }

  chats.value.push(chat)
}
const { user } = await getSession()
const sessionUserInfo = computed(() => user)
</script>

<template>
  <article>
    <div class="grid grid-cols-6 md:gap-8 gap-4 h-full">
      <!-- Avatar Layer -->
      <div class="md:col-span-2 col-span-6">
        <div class="card w-full bg-base-200 shadow-xl">
          <div class="flex justify-end">
            <KButton @click="navigateTo('/mypage/mbti-characters')">
              <Icon :name="SETTING" />
            </KButton>
          </div>
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
      <div class="md:col-span-4 col-span-6 h-full relative">
        <KChatWrapper ref="chatRef" class="chat-wrapper mb-4">
          <template v-for="(chat, index) in chats" :key="index">
            <KChat
              :sender="chat.sender"
              :time="chat.time"
              :end="chat.sender === senderId"
            >
              {{ chat.message }}
            </KChat>
          </template>
        </KChatWrapper>

        <form
          class="sticky bottom-0 left-0 w-full bg-base-200 shadow-xl rounded-box p-4 flex gap-4"
          @submit.prevent="handleSubmit"
        >
          <div class="join w-full">
            <KInput
              ref="inputRef"
              v-model="message"
              :disabled="loading"
              class="w-full join-item"
            />

            <KButton class="join-item rounded-r-full" type="submit">
              <Icon :name="loading ? CHAT_MESSAGE_SENDING : SEND_MESSAGE" />
            </KButton>
          </div>
        </form>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  position: relative;
}

.chat-wrapper {
  height: calc(100vh - 280px);
  overflow-y: scroll;
}
</style>

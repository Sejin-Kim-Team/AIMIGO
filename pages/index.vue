<script setup lang="ts">
import KChatWrapper from '~/components/molecules/Chat/KChatWrapper.vue'
import KInput from '~/components/atoms/KInput.vue'
import KButton from '~/components/atoms/KButton.vue'
import { CHAT_MESSAGE_SENDING, SEND_MESSAGE, SETTING } from '~/constants/icon.constants'
import KChat from '~/components/molecules/Chat/KChat.vue'
import Typing from '~/components/atoms/Typing.vue'
import type { AvatarOption } from '~/types/widget.types'
import { PlaygroundAvatar } from '~/constants/charactor.constants'
import KAvatar from '~/components/molecules/widgets/KAvatar.vue'

definePageMeta({
  name: 'Home',
  layout: 'default',
})

interface Chat {
  sender: string
  time: string
  message: string
}

const { status, getSession } = useAuth()

const loading = ref<boolean>(false)
const message = ref<string>('')
const currentIndex = ref<number>(0)
const character = ref<AvatarOption>(PlaygroundAvatar)
const emotion = ref<'Normal' | 'Positive' | 'Negative'>('Normal')

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

function handleTyping() {
  currentIndex.value += 1
}

function handleTyped() {
  currentIndex.value = 0
}

async function requestMessage(message: string) {
  const [_chat, _emotional] = await Promise.all([
    useFetch<{
      message: string
      body: string
    }>('/api/chat', {
      method: 'post',
      body: {
        message,
        name: 'Sejin Kim',
        mbti: 'INFP',
      },
    }),
    useFetch<{
      body: {
        sentiment: 'positive' | 'negative' | 'netural'
      }
    }>('/api/emotion', {
      method: 'post',
      body: {
        message,
      },
    }),
  ])
  const data = _chat.data
  const emotionalData = _emotional.data

  if (data.value === null)
    return

  const chat: Chat = {
    sender: 'Sejin Kim',
    time: new Date().toISOString(),
    message: data.value.body,
  }

  const sentiment = emotionalData.value!.body.sentiment

  if (sentiment === 'netural')
    emotion.value = 'Normal'
  else if (sentiment === 'positive')
    emotion.value = 'Positive'
  else if (sentiment === 'negative')
    emotion.value = 'Negative'

  chats.value.push(chat)
}

const { user } = await getSession()
const sessionUserInfo = computed(() => user)

// TODO: aimigo 정보가 없으면 생성 페이지로 이동
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
            <KAvatar
              :avatar="character"
              :current-index="currentIndex"
              :emotion="emotion"
            />
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
              <template v-if="index === chats.length - 1 && chat.sender !== senderId">
                <Typing
                  :items="[chat.message]"
                  :type-speed="60"
                  @typing="handleTyping"
                  @typed="handleTyped"
                />
              </template>
              <template v-else>
                {{ chat.message }}
              </template>
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

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
import type { Aimigo } from '~/constants/characters.constants'

definePageMeta({
  name: 'Chat',
  layout: 'default',
})

interface Chat {
  sender: string
  time: string
  message: string
}

const { status, getSession } = useAuth()

const session = await getSession()
const aimigo = ref<Aimigo | null>(null)

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

const senderId = ref(session.user!.name as string)

async function handleSubmit() {
  const _message = `${message.value}`
  message.value = ''

  const chat: Chat = {
    sender: senderId.value,
    time: new Date().toISOString(),
    message: _message,
  }

  chats.value.push(chat)

  loading.value = true
  await requestMessage(_message)
  loading.value = false

  inputFocused.value = true
}

function handleTyping() {
  currentIndex.value += 1
}

function handleTyped() {
  currentIndex.value = 0
}

async function requestMessage(message: string) {
  const { data } = await useFetch<{
    body: {
      text: string
      heart: number
      emotion: {
        sentiment: 'netural' | 'positive' | 'negative'
        confidence: {
          negative: number
          positive: number
          neutral: number
        }
      }
    }
  }>('/api/chat', {
    method: 'post',
    body: {
      message,
      name: aimigo.value!.name,
      mbti: `${aimigo.value!.type}`,
    },
  })

  if (data.value === null)
    return

  const chat: Chat = {
    sender: aimigo.value!.name,
    time: new Date().toISOString(),
    message: data.value.body.text,
  }

  const sentiment = data.value.body.emotion.sentiment

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

tryOnMounted(() => {
  aimigo.value = JSON.parse(localStorage.getItem('aimigo') || 'null') as Aimigo | null

  if (aimigo.value === null)
    navigateTo('/mypage/mbti-characters')
})
</script>

<template>
  <article>
    <div v-if="aimigo" class="grid grid-cols-6 md:gap-8 gap-4 h-full">
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
              :avatar="aimigo.avatar"
              :current-index="currentIndex"
              :emotion="emotion"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">
              {{ aimigo.name }}
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
                <ClientOnly>
                  <Typing
                    :items="[chat.message]"
                    :type-speed="60"
                    @typing="handleTyping"
                    @typed="handleTyped"
                  />
                </ClientOnly>
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

            <KButton class="join-item rounded-r-full" type="submit" :disabled="loading">
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

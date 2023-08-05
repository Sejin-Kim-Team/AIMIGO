<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { debouncedWatch } from '@vueuse/shared'
import KChatWrapper from '~/components/molecules/Chat/KChatWrapper.vue'
import KInput from '~/components/atoms/KInput.vue'
import KButton from '~/components/atoms/KButton.vue'
import { CHAT_MESSAGE_SENDING, SEND_MESSAGE, SETTING } from '~/constants/icon.constants'
import KChat from '~/components/molecules/Chat/KChat.vue'
import Typing from '~/components/atoms/Typing.vue'
import KAvatar from '~/components/molecules/widgets/KAvatar.vue'
import { useAimigoStore } from '~/store/aimigo.store'
import { useKSnackbar } from '~/composables/useKSnackbar'

definePageMeta({
  name: 'Chat',
  layout: 'default',
})
useFirebase()
const aimigoStore = useAimigoStore()

const {
  chats,
  aimigo,
  senderId,
  emotion,
  heart,
  user,
} = storeToRefs(aimigoStore)

const snackbar = useKSnackbar()
const message = ref<string>('')
const currentIndex = ref<number>(0)
const loading = ref<boolean>(false)

const chatRef = ref<{ scrollBottom: () => void } | null>()
const inputRef = ref<HTMLInputElement>()

async function handleSubmit() {
  if (heart.value < 0)
    return snackbar.error('하트가 부족합니다 🥲')

  if (!message.value)
    return

  const _message = `${message.value}`
  message.value = ''

  loading.value = true
  await aimigoStore.sendMessage(_message, async () => {
    await nextTick()
    chatRef.value?.scrollBottom()
  })
  loading.value = false
}

function handleTyping() {
  currentIndex.value += 1
}

function handleTyped() {
  currentIndex.value = 0
}

debouncedWatch(currentIndex, () => {
  chatRef.value?.scrollBottom()
}, { debounce: 100, maxWait: 200 })

tryOnMounted(async () => {
  await nextTick()
  if (aimigo.value === null)
    navigateTo('/mypage/mbti-characters')

  const recentDate = localStorage.getItem('aimigo-recent-date') ?? null
  let message = `안녕 ${user.value?.name ?? ''}! 반가워, 나는 ${aimigo.value.name} 이라고해! 잘부탁해 😉`

  if (recentDate) {
    message = `${user.value?.name ?? ''} 오랜만이네! 요즘 어떻게 지내? 😙`
    localStorage.setItem('aimigo-recent-date', new Date().toLocaleTimeString())
  }

  chats.value = [{
    sender: aimigo.value.name,
    time: new Date().toLocaleTimeString(),
    message,
  }]
})
</script>

<template>
  <article>
    <div v-if="aimigo" class="grid grid-cols-6 md:gap-8 gap-4 h-full">
      <!-- Avatar Layer -->
      <div class="md:col-span-2 col-span-6">
        <div class="card w-full bg-base-200 shadow-xl">
          <div class="flex justify-end">
            <KButton class="btn-ghost text-primary" @click="navigateTo('/mypage/mbti-characters')">
              <Icon size="24" :name="SETTING" />
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
        <KChatWrapper
          ref="chatRef"
          class="chat-wrapper mb-4"
        >
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
                    :type-speed="33"
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

            <KButton class="join-item rounded-r-full btn-primary" type="submit" :disabled="loading || heart === 0">
              <Icon size="28" :name="loading ? CHAT_MESSAGE_SENDING : SEND_MESSAGE" />
            </KButton>
          </div>
        </form>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  @apply relative;
}

.chat-wrapper {
  height: calc(100vh - 280px);
  overflow-y: scroll;
}
</style>

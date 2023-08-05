import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Session } from 'next-auth'
import { useStorage } from '@vueuse/core'
import type { EmotionType } from '~/types/emotion.type'
import type { User } from '~/server/types/types'

interface Chat {
  sender: string
  time: string
  message: string
}

interface ResponseData {
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
}

export const useAimigoStore = defineStore('aimigo', () => {
  const { getSession } = useAuth()
  const chats = ref([]) as Ref<Chat[]>
  const session = ref(null) as Ref<Session | null>
  const aimigo = useStorage('aimigo', null, undefined, {
    serializer: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
  })
  const data = ref<ResponseData | null>(null)
  const user = ref<User | null>(null)
  const heart = ref(0)

  const emotion = computed<EmotionType>(() => {
    if (data.value === null)
      return 'Normal'

    const sentiment = data.value.body.emotion.sentiment

    if (sentiment === 'netural')
      return 'Normal'
    else if (sentiment === 'positive')
      return 'Positive'
    else if (sentiment === 'negative')
      return 'Negative'

    return 'Normal'
  })

  const senderId = computed<string | null>(() => session.value?.user?.name ?? null)

  async function sendMessage(message: string, beforeSendCallback?: () => void) {
    if (!senderId.value)
      throw new Error('Sender ID is not defined')

    const chat: Chat = {
      sender: senderId.value,
      time: new Date().toLocaleTimeString(),
      message,
    }

    chats.value.push(chat)
    beforeSendCallback && beforeSendCallback()
    const aimigoChat = await callAPI(chat.message)
    chats.value.push(aimigoChat)
  }

  async function callAPI(message: string) {
    if (!aimigo.value)
      throw new Error('Aimigo is not defined')

    const { data: _data, pending } = await useFetch<ResponseData>('/api/chat', {
      method: 'post',
      body: {
        message,
        name: aimigo.value.name,
        mbti: aimigo.value.type,
      },
    })

    if (_data.value === null)
      throw new Error('No data returned')

    data.value = _data.value

    const chat: Chat = {
      sender: aimigo.value.name,
      time: new Date().toLocaleTimeString(),
      message: _data.value.body.text,
    }

    return chat
  }

  async function fetchUser() {
    const session = await getSession()

    if (!session)
      throw new Error('Unauthenticated')

    if (!session.user)
      throw new Error('User is not defined')

    const email = session.user.email!

    const { data: _data } = await useFetch<{
      body: User
    }>('/api/users', {
      method: 'get',
      params: { email },
    })

    if (_data.value === null)
      throw new Error('No data returned')

    user.value = _data.value.body
    heart.value = _data.value.body.remainedHeart
  }

  watch(data, () => {
    if (data.value === null)
      return

    heart.value = data.value.body.heart
  })

  tryOnMounted(async () => {
    console.log('😀 aimigo store mounted')
    session.value = await getSession()
  })

  return {
    chats,
    emotion,
    heart,
    senderId,
    aimigo,
    user,
    sendMessage,
    fetchUser,
  }
})

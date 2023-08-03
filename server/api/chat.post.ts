import { $fetch } from 'ofetch'
import { getServerSession } from '#auth'
import { getUserByEmail, updateUserHeart } from '~/server/data/users'
import type { User } from '~/server/types/types'
import { StatusCode } from '~/server/types/types'
import { getSingleSuccessResponse } from '~/server/utils/CommonResult'
import { ChatClient } from '~/server/utils/ChatClient'

interface Body {
  message: string
  name: string
  mbti: string
}

interface Result {
  text: string
  heart: number
  emotion: Emotion
}

interface SentimentResponse {
  document: Emotion
}
interface Emotion {
  sentiment: 'netural' | 'positive' | 'negative'
  confidence: {
    negative: number
    positive: number
    neutral: number
  }
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const email = session?.user?.email ?? ''
  const user = await getUserByEmail(email)

  if (!user)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')

  const { remainedHeart } = user

  if (remainedHeart <= 0)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'No heart')

  const body = await readBody<Body>(event)

  const text = await handleChatApi(user, body)
  const emotion = await handleEmotionApi(text)

  const changedUser = await updateUserHeart(user.id, remainedHeart - 1)
  const result: Result = {
    text,
    heart: changedUser.remainedHeart,
    emotion,
  }

  return getSingleSuccessResponse(result)
})

async function handleChatApi(user: User, body: Body) {
  const param = {
    userId: user.email,
    message: body.message,
    userName: user.name,
    aimigoName: body.name,
    mbti: body.mbti,
  }

  return await ChatClient
    .getInstance()
    .setMBTI(body.mbti as any)
    .chat(param)
}

async function handleEmotionApi(message: string) {
  const config = useRuntimeConfig()
  const clientId = config.api.sentimentClientId as string
  const clientSecret = config.api.sentimentClientSecret as string
  const url = config.api.sentimentUrl as string

  const { document } = await $fetch<SentimentResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-NCP-APIGW-API-KEY-ID': clientId,
      'X-NCP-APIGW-API-KEY': clientSecret,
    },
    body: {
      content: message,
    },
  })
  return document
}

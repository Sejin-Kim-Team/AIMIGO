import { $fetch } from 'ofetch'

interface Body {
  message: string
}

interface SentimentResponse {
  document: {
    sentiment: string
    confidence: {
      negative: number
      positive: number
      neutral: number
    }
  }
}
export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const message = body.message

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
})

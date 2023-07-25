import { ChatGPTBuilder } from '~/server/utils/ChatGPT'
import { getSingleSuccessResponse } from '~/server/utils/CommonResult'

interface Body {
  message: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const message = body.message

  const config = useRuntimeConfig()
  const gptAPiKey = config.api.chatGptApiKey

  const gptClient = new ChatGPTBuilder(gptAPiKey)
    .build()

  const response = await gptClient.chat([message])

  return getSingleSuccessResponse(response.join('\n'))
})

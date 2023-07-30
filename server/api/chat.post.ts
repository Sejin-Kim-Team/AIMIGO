import { getSingleSuccessResponse } from '~/server/utils/CommonResult'
import { ChatClient } from '~/server/utils/ChatClient'

interface Body {
  message: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const message = body.message

  const text = await ChatClient.getInstance().chat({ userId: 'test', message })

  return getSingleSuccessResponse(text)
})

import { createAimigo } from '~/server/data/aimigos'
import { getCreatedResponse } from '~/server/utils/CommonResult'

interface Body {
  userId: string
  name: string
  mbti: string
}

export default defineEventHandler(async (event) => {
  const { userId, name, mbti } = await readBody<Body>(event)
  const result = await createAimigo(userId, name, mbti)
  return getCreatedResponse(result)
})

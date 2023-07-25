import { createAimigo } from '~/server/data/aimigos'

interface Body {
  userId: string
  name: string
  mbti: string
}

export default defineEventHandler(async (event) => {
  const { userId, name, mbti } = await readBody<Body>(event)
  return await createAimigo(userId, name, mbti)
})

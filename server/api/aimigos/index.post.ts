import { getServerSession } from '#auth'
import { createAimigo } from '~/server/data/aimigos'
import { StatusCode } from '~/server/types/types'
import { getCreatedResponse } from '~/server/utils/CommonResult'

interface Body {
  name: string
  mbti: string
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')
  const email = session.user?.email ?? ''
  const { name, mbti } = await readBody<Body>(event)
  const result = await createAimigo(email, name, mbti)
  return getCreatedResponse(result)
})

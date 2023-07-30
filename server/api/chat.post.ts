import { getServerSession } from '#auth'
import { getUserByEmail, updateUserHeart } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getSingleSuccessResponse } from '~/server/utils/CommonResult'
import { ChatClient } from '~/server/utils/ChatClient'

interface Body {
  message: string
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')

  const email = session.user?.email ?? ''

  const user = await getUserByEmail(email)
  if (!user)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')

  const { remainedHeart, aimigos } = user
  if (aimigos.length === 0)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'No aimigos')
  if (remainedHeart <= 0)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'No heart')

  const { name: aimigoName, mbti } = aimigos[0]

  const body = await readBody<Body>(event)
  const message = body.message
  const param = {
    userId: email,
    message,
    userName: user.name,
    aimigoName,
    mbti,
  }

  const text = await ChatClient.getInstance().chat(param)

  await updateUserHeart(user.id, remainedHeart - 1)

  return getSingleSuccessResponse(text)
})

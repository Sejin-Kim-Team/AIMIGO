import { getServerSession } from '#auth'
import { getUserByEmail, updateUserHeart } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getSingleSuccessResponse } from '~/server/utils/CommonResult'
import { ChatClient } from '~/server/utils/ChatClient'

interface Body {
  message: string
  name: string
  mbti: string
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')

  const email = session.user?.email ?? ''

  const user = await getUserByEmail(email)
  if (!user)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')

  const { remainedHeart } = user

  if (remainedHeart <= 0)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'No heart')

  const body = await readBody<Body>(event)
  const param = {
    userId: email,
    message: body.message,
    userName: user.name,
    aimigoName: body.name,
    mbti: body.mbti,
  }

  console.log('fucking', param)

  const text = await ChatClient
    .getInstance()
    .setMBTI(body.mbti as any)
    .chat(param)

  await updateUserHeart(user.id, remainedHeart - 1)

  return getSingleSuccessResponse(text)
})

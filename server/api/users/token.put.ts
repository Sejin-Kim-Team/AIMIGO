import { getServerSession } from '#auth'
import { getUserByEmail, updateUserPushToken } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')

  const email = session.user?.email ?? ''

  const userResult = await getUserByEmail(email)
  if (!userResult)
    return getErrorResponse(StatusCode.NOT_FOUND, null)

  const { pushToken } = await readBody<{ pushToken: string }>(event)
  const pushTokenResult = await updateUserPushToken(userResult.id, pushToken)
  return getSingleSuccessResponse(pushTokenResult)
})

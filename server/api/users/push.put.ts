import { getServerSession } from '#auth'
import { getUserByEmail, updateUserPushTime, updateUserPushToken } from '~/server/data/users'
import type { UserPushUpdateRequest } from '~/server/types/types'
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

  const body = await readBody<UserPushUpdateRequest>(event)
  const result = await updateUserPushTime(userResult.id, body)
  if (body.pushToken !== null && body.pushToken !== undefined && body.pushToken !== '') {
    const pushToken = body.pushToken
    const pushTokenResult = await updateUserPushToken(result.id, pushToken)
    return getSingleSuccessResponse(pushTokenResult)
  }
  return getSingleSuccessResponse(result)
})

import { getServerSession } from '#auth'
import { getUserByEmail } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session)
    return getErrorResponse(StatusCode.FORBIDDEN, 'Unauthenticated')

  const email = session.user?.email ?? ''

  const result = await getUserByEmail(email)
  if (result)
    return getSingleSuccessResponse(result)
  else
    return getErrorResponse(StatusCode.NOT_FOUND, null)
})

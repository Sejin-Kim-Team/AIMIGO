import { updateUserPushTime } from '~/server/data/users'
import type { UserPushUpdateRequest } from '~/server/types/types'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'id is required')

  const body = await readBody<UserPushUpdateRequest>(event)
  const result = await updateUserPushTime(id, body)
  return getSingleSuccessResponse(result)
})

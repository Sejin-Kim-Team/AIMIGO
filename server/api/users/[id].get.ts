import { getUser } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'id is required')

  const result = await getUser(id)
  if (result)
    return getSingleSuccessResponse(result)
  else
    return getErrorResponse(StatusCode.NOT_FOUND)
})

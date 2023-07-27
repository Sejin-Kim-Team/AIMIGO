import { deleteAimigo } from '~/server/data/aimigos'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id)
    return getErrorResponse(400, 'id is required')

  const result = await deleteAimigo(Number.parseInt(id))
  if (result)
    return getSuccessResponse()

  return getErrorResponse(StatusCode.NOT_FOUND)
})

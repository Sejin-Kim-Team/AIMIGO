import { getAimigo } from '~/server/data/aimigos'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'id is required')

  const result = await getAimigo(Number.parseInt(id))

  return getSingleSuccessResponse(result)
})

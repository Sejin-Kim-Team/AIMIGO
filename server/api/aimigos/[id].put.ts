import { updateAimigoName } from '~/server/data/aimigos'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

interface Body {
  name: string
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'id is required')

  const body = await readBody<Body>(event)

  const result = await updateAimigoName(Number.parseInt(id), body.name)
  if (result)
    return getSingleSuccessResponse(result)

  return getErrorResponse(StatusCode.NOT_FOUND)
})

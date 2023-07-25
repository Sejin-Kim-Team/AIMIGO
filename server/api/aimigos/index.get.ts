import { getAimigos } from '~/server/data/aimigos'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getListSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const queryParams = event.node.req.url?.split('?')[1].split('&').map((param) => {
    const [key, value] = param.split('=')
    return { key, value }
  })

  const userId = queryParams?.find(param => param.key === 'userId')?.value

  if (!userId)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'userId is required')

  const aimigos = await getAimigos(userId)
  return getListSuccessResponse(aimigos)
})

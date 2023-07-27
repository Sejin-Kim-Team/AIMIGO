import { getUser, updateUserHeart } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

interface Body {
  id: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const { remainedHeart } = await getUser(body.id)
  if (remainedHeart <= 0)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'no heart')

  const result = await updateUserHeart(body.id, remainedHeart - 1)
  const resultData = {
    remainedHeart: result.remainedHeart,
  }
  return getSingleSuccessResponse(resultData)
})

import { getUser, updateUserHeart } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

interface Body {
  id: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const userInfo = await getUser(body.id)
  if (!userInfo)
    return getErrorResponse(StatusCode.NOT_FOUND, 'user not found')

  const result = await updateUserHeart(body.id, userInfo?.remainedHeart + 1)
  const resultData = {
    remainedHeart: result.remainedHeart,
  }

  return getSingleSuccessResponse(resultData)
})

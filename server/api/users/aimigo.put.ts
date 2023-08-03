import { getServerSession } from '#auth'
import { getUserByEmail, updateAimigoInfo } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getSingleSuccessResponse } from '~/server/utils/CommonResult'

interface Body {
  aimigoName: string
  aimigoMbti: string
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const email = session?.user?.email ?? ''
  const user = await getUserByEmail(email)
  if (!user)
    return getErrorResponse(StatusCode.NOT_FOUND, null)

  const { aimigoName, aimigoMbti } = await readBody<Body>(event)
  const result = await updateAimigoInfo(user.id, aimigoName, aimigoMbti)
  return getSingleSuccessResponse(result)
})

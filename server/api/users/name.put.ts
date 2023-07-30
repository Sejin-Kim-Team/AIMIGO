import { getServerSession } from '#auth'
import { getUserByEmail, updateUserName } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getSingleSuccessResponse } from '~/server/utils/CommonResult'

interface Body {
  id: string
  name: string
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const email = session?.user?.email ?? ''
  const user = await getUserByEmail(email)
  if (!user)
    return getErrorResponse(StatusCode.NOT_FOUND, null)

  const body = await readBody<Body>(event)
  const result = await updateUserName(user.id, body.name)
  return getSingleSuccessResponse(result)
})

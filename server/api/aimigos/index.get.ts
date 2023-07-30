import { getServerSession } from '#auth'
import { getAimigos } from '~/server/data/aimigos'
import { getUserByEmail } from '~/server/data/users'
import { getListSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const email = session.user?.email ?? ''

  const user = await getUserByEmail(email)
  const aimigos = await getAimigos(user?.id)
  return getListSuccessResponse(aimigos)
})

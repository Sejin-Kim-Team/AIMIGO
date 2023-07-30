import { getServerSession } from '#auth'
import { getAimigos } from '~/server/data/aimigos'
import { getListSuccessResponse } from '~/server/utils/CommonResult'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const email = session.user?.email ?? ''

  const aimigos = await getAimigos(userId)
  return getListSuccessResponse(aimigos)
})

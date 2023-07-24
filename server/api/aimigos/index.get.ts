import { getAimigos } from '~/server/data/aimigos'

export default defineEventHandler(async () => {
  return getAimigos()
})

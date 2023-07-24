import { getUsers } from '~/server/data/users'

export default defineEventHandler(async () => {
  return await getUsers()
})

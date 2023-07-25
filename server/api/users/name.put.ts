import { updateUser } from '~/server/data/users'

interface Body {
  id: string
  name: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  return await updateUser(body.id, body.name)
})

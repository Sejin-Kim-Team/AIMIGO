import { getUser } from '~/server/data/users'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) {
    return {
      status: 400,
      body: {
        message: 'id is required',
      },
    }
  }

  return await getUser(id)
})

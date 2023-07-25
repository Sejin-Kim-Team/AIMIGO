import { getAimigo } from '~/server/data/aimigos'

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

  return getAimigo(Number.parseInt(id))
})

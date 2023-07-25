import { deleteAimigo } from '~/server/data/aimigos'

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
  const result = await deleteAimigo(Number.parseInt(id))
  if (result) {
    return {
      status: 200,
      body: {
        message: 'deleted',
      },
    }
  }
  return {
    status: 404,
  }
})

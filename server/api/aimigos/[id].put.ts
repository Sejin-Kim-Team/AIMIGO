import { updateAimigoName } from '~/server/data/aimigos'

interface Body {
  name: string
}

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
  const body = await readBody<Body>(event)

  return await updateAimigoName(Number.parseInt(id), body.name)
})

import { getAimigos } from '~/server/data/aimigos'

export default defineEventHandler(async (event) => {
  const queryParams = event.node.req.url?.split('?')[1].split('&').map((param) => {
    const [key, value] = param.split('=')
    return { key, value }
  })

  const userId = queryParams?.find(param => param.key === 'userId')?.value

  if (!userId) {
    return {
      status: 400,
      body: {
        message: 'userId is required',
      },
    }
  }

  const aimigos = await getAimigos(userId)
  return {
    aimigos,
  }
})

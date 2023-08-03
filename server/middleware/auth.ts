import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
  const session = await getServerSession(event)

  const uri = getRequestURL(event).pathname

  if (!uri.includes('/login') && !uri.includes('/auth') && !session)
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
})

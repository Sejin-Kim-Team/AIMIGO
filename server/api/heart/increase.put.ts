import { getUser, updateUserHeart } from '~/server/data/users'

interface Body {
  id: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const userInfo = await getUser(body.id)
  if (!userInfo) {
    return {
      status: 400,
      body: {
        message: 'user not found',
      },
    }
  }

  const result = await updateUserHeart(body.id, userInfo?.remainedHeart + 1)

  return {
    remainedHeart: result.remainedHeart,
  }
})

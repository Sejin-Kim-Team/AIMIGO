import { getUser, updateUserHeart } from '~/server/data/users'

interface Body {
  id: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const { remainedHeart } = await getUser(body.id)
  if (remainedHeart <= 0) {
    return {
      status: 400,
      body: {
        message: 'heart is not enough',
      },
    }
  }

  const result = await updateUserHeart(body.id, remainedHeart - 1)
  return {
    remainedHeart: result.remainedHeart,
  }
})

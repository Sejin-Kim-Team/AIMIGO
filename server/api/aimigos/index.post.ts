import { createAimigo } from '~/server/data/aimigos'

export default defineEventHandler(async (event) => {
  let oauthId: string, name: string, mbti: string;
  ({
    oauthId,
    name,
    mbti,
  } = await readBody(event))
  return await createAimigo(oauthId, name, mbti)
})

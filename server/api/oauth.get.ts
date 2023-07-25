import { $fetch } from 'ofetch'
import { createUser, getUser } from '~/server/data/users'
import { StatusCode } from '~/server/types/types'
import { getCreatedResponse, getErrorResponse, getSingleSuccessResponse } from '~/server/utils/CommonResult'

// TODO : FE와 함께 개발 후 테스트 해보면서 수정 필요.
interface TokenResponse {
  token_type: string
  access_token: string
  id_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: string
  scope: string
}

interface TokenPayload {
  iss: string
  aud: string
  sub: string
  nickname: string
  iat: number
  exp: number
  auth_time: number
}

export default defineEventHandler(async (event) => {
  const code = event.context.params?.code
  if (!code)
    return getErrorResponse(StatusCode.BAD_REQUEST, 'code is required')

  const config = useRuntimeConfig()

  const oauthTokenUrl = config.auth.tokenUrl
  const oauthRedirectUrl = config.auth.redirectUrl
  const clientId = config.auth.clientId

  const body = {
    grant_type: 'authorization_code',
    client_id: clientId,
    redirect_uri: oauthRedirectUrl,
    code,
  }
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  }
  const response = await $fetch<TokenResponse>(oauthTokenUrl, {
    method: 'POST',
    headers,
    body,
  })

  const tokenPayload = JSON.parse(response.id_token) as TokenPayload

  const oauthId = tokenPayload.sub

  const user = await getUser(oauthId)
  if (!user) {
    const name = tokenPayload.nickname
    const result = await createUser(oauthId, name)
    return getCreatedResponse(result)
  }
  return getSingleSuccessResponse(user)
})

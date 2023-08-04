import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'

import { NuxtAuthHandler } from '#auth'

const config = useRuntimeConfig()
const { clientId, clientSecret } = config.auth
const { clientId: kakakClientId, clientSecret: kakaoClientSecret } = config.kakao

export default NuxtAuthHandler({
  pages: {
    signIn: '/login',
  },
  secret: clientSecret ?? 'test-123',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'secret',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId,
      clientSecret,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile https://www.googleapis.com/auth/cloud-platform',
        },
      },
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?prompt=consent&response_type=code',
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KakaoProvider.default({
      clientId: kakakClientId,
      clientSecret: kakaoClientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
})

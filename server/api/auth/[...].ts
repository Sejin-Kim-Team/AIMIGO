import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'

const config = useRuntimeConfig()
const { clientId, clientSecret, secret } = config.auth
export default NuxtAuthHandler({
  secret,
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider.default({
      clientId,
      clientSecret,
      authorization: { params: { scope: 'openid email profile https://www.googleapis.com/auth/cloud-platform', access_type: 'offline' } },
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?prompt=consent&response_type=code',
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
})

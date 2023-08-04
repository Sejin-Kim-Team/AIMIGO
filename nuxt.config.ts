// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'AIMIGO!',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-snackbar',
    'nuxt-scheduler',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
  ],
  css: [
    '~/assets/styles/main.scss',
  ],
  auth: {
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://aimigo.eggp.io',
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  tailwindcss: {
    // Options
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  snackbar: {
    top: true,
    right: true,
    duration: 5000,
  },
  runtimeConfig: {
    api: {
      chatGptApiKey: process.env.NUXT_API_CHAT_GPT_API_KEY ?? '',
      sentimentClientId: process.env.NUXT_API_SENTIMENT_API_CLIENT_ID ?? '',
      sentimentClientSecret: process.env.NUXT_API_SENTIMENT_API_CLIENT_SECRET ?? '',
      sentimentUrl: process.env.NUXT_API_SENTIMENT_URL ?? '',
    },
    auth: {
      clientId: process.env.NUXT_AUTH_CLIENT_ID ?? '',
      clientSecret: process.env.NUXT_AUTH_CLIENT_SECRET ?? '',
    },
    kakao: {
      clientId: process.env.NUXT_KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.NUXT_KAKAO_CLIENT_SECRET ?? '',
    },
    fcm: {
      projectId: process.env.NUXT_FCM_PROJECT_ID ?? '',
      privateKeyId: process.env.NUXT_FCM_PRIVATE_KEY_ID ?? '',
      privateKey: process.env.NUXT_FCM_PRIVATE_KEY ?? '',
      clientEmail: process.env.NUXT_FCM_CLIENT_EMAIL ?? '',
      clientId: process.env.NUXT_FCM_CLIENT_ID ?? '',
      certUrl: process.env.NUXT_FCM_CERT_URL ?? '',
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['openai'],
      },
    },
  },
})

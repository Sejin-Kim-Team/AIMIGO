// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'AIMIGO!',
      script: [
        {
          src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js',
        },
      ],
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-snackbar',
  ],
  css: [
    '~/assets/styles/main.scss',
  ],
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
      tokenUrl: process.env.NUXT_AUTH_TOKEN_URL ?? '',
      redirectUrl: process.env.NUXT_AUTH_REDIRECT_URL ?? '',
      clientId: process.env.NUXT_AUTH_CLIENT_ID ?? '',
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

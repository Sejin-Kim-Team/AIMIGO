// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'AIMIGO!',
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

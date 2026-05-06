import process from 'node:process'

export default defineNuxtConfig({
  extends: ['@nextorders/ui', '@nextorders/core'],
  runtimeConfig: {
    public: {
      channelId: 'web-app',
      vkLink: process.env.VK_LINK || 'https://vk.com/',
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  compatibilityDate: '2025-07-15',
})

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    // eslint-disable-next-line node/prefer-global/process
    dbFileName: process.env.DB_FILE_NAME || './server/db/sqlite.db',
  },
})

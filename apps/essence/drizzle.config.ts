import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './server/db/migrations', // меняем на правильный путь
  schema: './server/db/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: './server/db/sqlite.db',
  },
})

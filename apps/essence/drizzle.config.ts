import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './server/db/migrations',
  schema: './server/db/schema/index.ts',
  dialect: 'postgresql', // меняем с 'sqlite' на 'postgresql'
  dbCredentials: {
    url: process.env.POSTGRES_URL!, // используем переменную окружения
  },
})

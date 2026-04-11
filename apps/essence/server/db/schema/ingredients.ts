import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const ingredients = pgTable('ingredients', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(), // например, 'plavleniy-syr'
  title: text().notNull(),
  createdAt: timestamp().defaultNow(),
})

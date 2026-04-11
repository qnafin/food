import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  icon: text(),
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
})

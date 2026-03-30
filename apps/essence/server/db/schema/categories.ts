// server/db/schema/categories.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  icon: text('icon'),
  sortOrder: integer('sort_order').notNull().default(0),
})

// Экспортируем тип для использования в других схемах
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert

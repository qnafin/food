import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(), // на русском, пока без локализации
  icon: text('icon'),
  sortOrder: integer('sort_order').notNull().default(0),
})

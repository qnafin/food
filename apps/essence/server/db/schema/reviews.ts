import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const reviews = pgTable('reviews', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  author: text(),
  text: text().notNull(),
  rating: integer(), // 1-5
  source: text().notNull(), // 'Авито', 'Яндекс' и т.д.
  imageUrl: text(), // путь к скриншоту
  isActive: boolean().default(true).notNull(),
  showOnMain: boolean().default(false).notNull(),
  sortOrder: integer().default(0).notNull(), // глобальный порядок (для главной)
  createdAt: timestamp().defaultNow().notNull(),
})

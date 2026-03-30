import { createId } from '@paralleldrive/cuid2'
// server/db/schema/badges.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { products } from './products'

// Таблица бейджей
export const badges = sqliteTable('badges', {
  id: text('id').primaryKey(), // произвольный id, например 'new'
  title: text('title').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

// Связь продукта с бейджем (многие ко многим)
export const productBadges = sqliteTable('product_badges', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  productId: text('product_id').references(() => products.id).notNull(),
  badgeId: text('badge_id').references(() => badges.id).notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

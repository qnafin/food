import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { products } from './products'

export const badges = pgTable('badges', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(), // например, 'new', 'hit'
  title: text().notNull(),
  createdAt: timestamp().defaultNow(),
})

export const productBadges = pgTable('product_badges', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer().notNull().references(() => products.id),
  badgeId: integer().notNull().references(() => badges.id),
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
})

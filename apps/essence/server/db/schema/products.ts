import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { categories } from './categories'

export const products = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  categoryId: integer().notNull().references(() => categories.id),
  title: text().notNull(),
  description: text(),
  isAvailableForPurchase: boolean().notNull().default(true),
  isShownInCatalog: boolean().notNull().default(true),
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})

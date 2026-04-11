import { integer, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core'
import { products } from './products'

export const productVariants = pgTable('product_variants', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer().notNull().references(() => products.id),
  slug: text().notNull(),
  title: text().notNull(),
  price: real().notNull(),
  originalPrice: real(),
  weightUnit: text().default('g'),
  weightValue: real(),
  sku: text(),
  images: text(), // JSON строка
  video: text(),
  nutritionFacts: text(),
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
})

import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { products } from './products'
import { productVariants } from './productVariants'

export const recommendedProducts = pgTable('recommended_products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer().notNull().references(() => products.id),
  recommendedProductId: integer().notNull().references(() => products.id),
  recommendedVariantId: integer().references(() => productVariants.id),
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
})

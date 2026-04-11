import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { products, productVariants } from './index'

export const productComposition = pgTable('product_composition', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  parentProductId: integer().notNull().references(() => products.id),
  childProductId: integer().notNull().references(() => products.id),
  childVariantId: integer().references(() => productVariants.id),
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
})

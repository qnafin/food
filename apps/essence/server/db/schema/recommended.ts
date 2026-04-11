import { createId } from '@paralleldrive/cuid2'
// server/db/schema/recommended.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { products, productVariants } from './index'

export const recommendedProducts = sqliteTable('recommended_products', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  productId: text('product_id').references(() => products.id).notNull(),
  recommendedProductId: text('recommended_product_id').references(() => products.id).notNull(),
  recommendedVariantId: text('recommended_variant_id').references(() => productVariants.id),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

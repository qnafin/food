// server/db/schema/products.ts
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { categories } from './categories'

export const products = sqliteTable('products', {
  id: text('id').primaryKey(), // произвольный id, например 'wild-west-burger'
  slug: text('slug').notNull().unique(),
  categoryId: text('category_id').references(() => categories.id).notNull(),
  title: text('title').notNull(), // обычный текст, без локализации
  description: text('description'), // обычный текст, без локализации
  isAvailableForPurchase: integer('is_available_for_purchase', { mode: 'boolean' }).notNull().default(true),
  isShownInCatalog: integer('is_shown_in_catalog', { mode: 'boolean' }).notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export const productVariants = sqliteTable('product_variants', {
  id: text('id').primaryKey(), // произвольный id, например 'wild-west-burger-standard'
  productId: text('product_id').references(() => products.id).notNull(),
  slug: text('slug').notNull(), // можно дублировать id
  title: text('title').notNull(), // обычный текст, без локализации
  price: real('price').notNull(),
  originalPrice: real('original_price'),
  weightUnit: text('weight_unit'), // 'g', 'kg', 'ml', 'l'
  weightValue: real('weight_value'),
  sku: text('sku'),
  images: text('images', { mode: 'json' }), // JSON: массив объектов Image
  video: text('video', { mode: 'json' }), // JSON: объект Video (опционально)
  nutritionFacts: text('nutrition_facts', { mode: 'json' }), // JSON: NutritionFacts
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

import { createId } from '@paralleldrive/cuid2'
// server/db/schema/composition.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { products, productVariants } from './index'

// Ингредиенты (уникальные названия)
export const ingredients = sqliteTable('ingredients', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

// Связь продукта с ингредиентами (многие ко многим)
export const productIngredients = sqliteTable('product_ingredients', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  productId: text('product_id').references(() => products.id).notNull(),
  ingredientId: text('ingredient_id').references(() => ingredients.id).notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

// Состав продукта из других продуктов (один продукт может состоять из нескольких)
export const productComposition = sqliteTable('product_composition', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  parentProductId: text('parent_product_id').references(() => products.id).notNull(),
  childProductId: text('child_product_id').references(() => products.id).notNull(),
  childVariantId: text('child_variant_id').references(() => productVariants.id), // опционально
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

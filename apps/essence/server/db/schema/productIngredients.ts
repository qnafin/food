import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { ingredients, products } from './index'

export const productIngredients = pgTable('product_ingredients', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer().notNull().references(() => products.id),
  ingredientId: integer().notNull().references(() => ingredients.id),
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
})

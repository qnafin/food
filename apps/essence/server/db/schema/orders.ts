import { integer, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core'
import { categories, products, productVariants } from './index'

export const orders = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  status: text().notNull(), // 'draft', 'created', 'ready', 'delivered'
  createdAt: timestamp().defaultNow().notNull(),
  readyBy: timestamp().notNull(), // когда будет готов (ISO timestamp)
  readyType: text().notNull(), // 'asap' | 'scheduled'
  deliveryMethod: text().notNull(), // 'deliveryByCourier' | 'selfPickup'
  address: text().notNull(), // JSON строка (соответствует Order['address'])
  paymentMethodId: text().notNull(), // 'cash', 'card' и т.д.
  changeFrom: real(),
  totalPrice: real().notNull(),
  name: text().notNull(),
  phone: text().notNull(),
  note: text(),
  updatedAt: timestamp().defaultNow().notNull(),
})

export const orderItems = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer('orderId').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: integer().notNull().references(() => products.id),
  productSlug: text().notNull(),
  categoryId: integer().notNull().references(() => categories.id),
  categorySlug: text().notNull(),
  variantId: integer().references(() => productVariants.id), // опционально, если вариант не указан
  quantity: integer().notNull(),
  unitPrice: real().notNull(),
  totalPrice: real().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})

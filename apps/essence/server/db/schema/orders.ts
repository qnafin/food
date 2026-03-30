import { createId } from '@paralleldrive/cuid2'
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  status: text('status').notNull(), // 'draft', 'created', 'ready', 'delivered'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  readyBy: integer('ready_by', { mode: 'timestamp' }).notNull(), // timestamp
  readyType: text('ready_type').notNull(), // 'asap' | 'scheduled'

  // Доставка
  deliveryMethod: text('delivery_method').notNull(), // 'deliveryByCourier' | 'selfPickup'

  // Адрес (универсальное поле JSON для простоты)
  address: text('address', { mode: 'json' }).notNull(), // соответствует типу Order['address']

  // Оплата
  paymentMethodId: text('payment_method_id').notNull(), // например, 'cash'
  changeFrom: real('change_from'),

  totalPrice: real('total_price').notNull(),

  // Клиент
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  note: text('note'),

  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export const orderItems = sqliteTable('order_items', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  orderId: text('order_id').references(() => orders.id).notNull(),
  productId: text('product_id').notNull(),
  productSlug: text('product_slug').notNull(),
  categoryId: text('category_id').notNull(),
  categorySlug: text('category_slug').notNull(),
  variantId: text('variant_id').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: real('unit_price').notNull(),
  totalPrice: real('total_price').notNull(), // quantity * unitPrice
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

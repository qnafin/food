import { createId } from '@paralleldrive/cuid2'
// /Users/qnafin/projects/food/apps/essence/server/db/schema/channels.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Основная таблица каналов
export const channels = sqliteTable('channels', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  slug: text('slug').notNull().unique(),
  url: text('url').notNull(),
  timeZone: text('time_zone').notNull(), // '+03:00' и т.д.
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

// Локализованные поля каналов
export const channelSelectorTitles = sqliteTable('channel_selector_titles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull(),
  locale: text('locale').notNull(),
  value: text('value').notNull(),
})

export const channelTitles = sqliteTable('channel_titles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull(),
  locale: text('locale').notNull(),
  value: text('value').notNull(),
})

export const channelDescriptions = sqliteTable('channel_descriptions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull(),
  locale: text('locale').notNull(),
  value: text('value').notNull(),
})

// Доставка курьером
export const deliverySettings = sqliteTable('delivery_settings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull().unique(),
  isAvailable: integer('is_available', { mode: 'boolean' }).notNull().default(true),
  minAmountForDelivery: integer('min_amount_for_delivery'),
  conditions: text('conditions'), // JSON строка с LocaleValueSchema.array()
  schedule: text('schedule'), // JSON строка с ScheduleSchema
  paymentMethods: text('payment_methods'), // JSON строка с PaymentMethodSchema.array()
})

// Самовывоз
export const selfPickupSettings = sqliteTable('self_pickup_settings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull().unique(),
  isAvailable: integer('is_available', { mode: 'boolean' }).notNull().default(true),
  conditions: text('conditions'), // JSON строка с LocaleValueSchema.array()
  schedule: text('schedule'), // JSON строка с ScheduleSchema
  paymentMethods: text('payment_methods'), // JSON строка с PaymentMethodSchema.array()
})

// Точки самовывоза (warehouses)
export const warehouses = sqliteTable('warehouses', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull(),
  slug: text('slug').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const warehouseTitles = sqliteTable('warehouse_titles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  warehouseId: text('warehouse_id').references(() => warehouses.id).notNull(),
  locale: text('locale').notNull(),
  value: text('value').notNull(),
})

export const warehouseAddressStreets = sqliteTable('warehouse_address_streets', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  warehouseId: text('warehouse_id').references(() => warehouses.id).notNull(),
  locale: text('locale').notNull(),
  value: text('value').notNull(),
})

// Ссылки
export const links = sqliteTable('links', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull(),
  type: text('type').notNull(), // 'aside', 'footer', 'social'
  to: text('to').notNull(),
  icon: text('icon'),
  target: text('target'), // '_blank', '_self', '_parent', '_top'
  sortOrder: integer('sort_order').notNull().default(0),
})

export const linkLabels = sqliteTable('link_labels', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  linkId: text('link_id').references(() => links.id).notNull(),
  locale: text('locale').notNull(),
  value: text('value').notNull(),
})

// Копирайт
export const copyrights = sqliteTable('copyrights', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channelId: text('channel_id').references(() => channels.id).notNull(),
  locale: text('locale').notNull(),
  value: text('value').notNull(),
})

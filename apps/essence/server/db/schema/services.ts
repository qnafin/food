import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const services = pgTable('services', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  category: text().notNull(),
  title: text().notNull(),
  subtitle: text().notNull(),
  description: text().notNull(),
  price: text().notNull(),
  features: text().notNull(), // JSON array
  problems: text().notNull(), // JSON array
  steps: text().notNull(), // JSON array
  brands: text().notNull(), // JSON array
  images: text().notNull(), // JSON array (ServiceImageSchema)
  isLocalOnly: boolean().default(false),
  isPopular: boolean().default(false),
  sortOrder: integer().default(0).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})

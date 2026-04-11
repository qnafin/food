import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const menus = pgTable('menus', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().defaultNow(),
})

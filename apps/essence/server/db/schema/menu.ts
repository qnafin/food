// /Users/qnafin/projects/food/apps/essence/server/db/schema/menu.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const menus = sqliteTable('menus', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
})

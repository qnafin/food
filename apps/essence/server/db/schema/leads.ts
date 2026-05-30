// server/db/schema/leads.ts
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const leads = pgTable('leads', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: text().notNull(), // 'battery_estimate', 'scooter_repair', 'general' и т.д.
  message: text().notNull(), // полный текст заявки (имя, телефон, модель, проблема)
  phone: text(), // отдельно сохраняем телефон для удобного поиска
  createdAt: timestamp().defaultNow().notNull(),
})

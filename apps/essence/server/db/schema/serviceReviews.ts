// server/db/schema/serviceReviews.ts
import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { reviews } from './reviews'
import { services } from './services'

export const serviceReviews = pgTable('service_reviews', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  serviceId: integer().notNull().references(() => services.id, { onDelete: 'cascade' }),
  reviewId: integer().notNull().references(() => reviews.id, { onDelete: 'cascade' }),
  sortOrder: integer().default(0).notNull(), // порядок в рамках конкретной услуги
  createdAt: timestamp().defaultNow().notNull(),
})

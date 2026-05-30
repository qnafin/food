// apps/essence/server/services/review.ts
import type { GatewayGetReviewsResponse, Review } from '@nextorders/food-schema'
import { and, asc, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { reviews as reviewsTable, serviceReviews } from '~/server/db/schema'
import { useLogger } from '~/server/utils/logger'

const logger = useLogger('review-service')

export async function handleGetReviews(params?: { place?: 'main' | 'service', serviceId?: string }): Promise<GatewayGetReviewsResponse> {
  try {
    let rows: any[] = []

    if (params?.place === 'main') {
      // Отзывы для главной страницы
      rows = await db
        .select()
        .from(reviewsTable)
        .where(and(eq(reviewsTable.isActive, true), eq(reviewsTable.showOnMain, true)))
        .orderBy(asc(reviewsTable.sortOrder))
    } else if (params?.place === 'service' && params?.serviceId) {
      const numericServiceId = Number.parseInt(params.serviceId, 10)
      if (Number.isNaN(numericServiceId)) {
        throw new TypeError('Invalid serviceId')
      }
      // Отзывы, привязанные к услуге через serviceReviews
      rows = await db
        .select({
          id: reviewsTable.id,
          author: reviewsTable.author,
          text: reviewsTable.text,
          rating: reviewsTable.rating,
          source: reviewsTable.source,
          imageUrl: reviewsTable.imageUrl,
          isActive: reviewsTable.isActive,
          showOnMain: reviewsTable.showOnMain,
          sortOrder: serviceReviews.sortOrder, // порядок внутри услуги
          createdAt: reviewsTable.createdAt,
        })
        .from(serviceReviews)
        .innerJoin(reviewsTable, eq(serviceReviews.reviewId, reviewsTable.id))
        .where(and(eq(serviceReviews.serviceId, numericServiceId), eq(reviewsTable.isActive, true)))
        .orderBy(asc(serviceReviews.sortOrder))
    } else {
      // Если параметры не заданы – просто все активные
      rows = await db
        .select()
        .from(reviewsTable)
        .where(eq(reviewsTable.isActive, true))
        .orderBy(asc(reviewsTable.sortOrder))
    }

    const result: Review[] = rows.map((row) => ({
      id: String(row.id),
      author: row.author ?? null,
      text: row.text,
      rating: row.rating ?? null,
      source: row.source,
      imageUrl: row.imageUrl ?? null,
      isActive: row.isActive,
      showOnMain: row.showOnMain,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt.toISOString(),
    }))

    logger.info(`Reviews loaded: ${result.length} (place=${params?.place}, serviceId=${params?.serviceId})`)
    return { ok: true, type: 'getReviews', result }
  } catch (err) {
    const error = err as Error
    logger.error('Error fetching reviews:', error.message)
    throw createError({ statusCode: 500, message: 'Failed to fetch reviews' })
  }
}

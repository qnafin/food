import type { GatewayGetServicesResponse, Service } from '@nextorders/food-schema'
import { db } from '~/server/db'
import { services } from '~/server/db/schema'
import { useLogger } from '~/server/utils/logger'

const logger = useLogger('service-service')

export async function handleGetServices(): Promise<GatewayGetServicesResponse> {
  try {
    const rows = await db.select().from(services).orderBy(services.id)

    const result: Service[] = rows.map((row) => ({
      id: String(row.id),
      slug: row.slug,
      category: row.category,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      price: row.price,
      features: JSON.parse(row.features),
      problems: JSON.parse(row.problems),
      steps: JSON.parse(row.steps),
      brands: JSON.parse(row.brands),
      images: JSON.parse(row.images), // ✅ новое поле
      isLocalOnly: row.isLocalOnly ?? false,
      isPopular: row.isPopular ?? false,
    }))

    logger.info(`Services loaded from DB: ${result.length}`)

    return {
      ok: true,
      type: 'getServices',
      result,
    }
  } catch (err) {
    const error = err as Error
    logger.error('Error fetching services:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch services',
    })
  }
}

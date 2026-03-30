import process from 'node:process'
import { drizzle } from 'drizzle-orm/libsql'
// Импортируем статические данные (все продукты)
import { burgers } from '../../services/data/products/burgers'
import { desserts } from '../../services/data/products/desserts'
import { hotMeals } from '../../services/data/products/hotMeals'

import { salads } from '../../services/data/products/salads'
import { snacks } from '../../services/data/products/snacks'
import { soups } from '../../services/data/products/soups'
import { useLogger } from '../../utils/logger'
import * as schema from '../schema'
// server/db/seed/recommended.ts
import 'dotenv/config'

const logger = useLogger('seed-recommended')
const db = drizzle(process.env.DB_FILE_NAME!, { schema })

const allProducts = [...burgers, ...desserts, ...hotMeals, ...salads, ...snacks, ...soups]

async function seedRecommended() {
  logger.info('🌱 Seeding recommended products...')

  try {
    const existing = await db.select().from(schema.recommendedProducts).limit(1)
    if (existing.length > 0) {
      logger.warn('Recommended products already exist, skipping...')
      return
    }

    let insertedCount = 0

    for (const product of allProducts) {
      if (product.recommendedProducts?.length) {
        for (let i = 0; i < product.recommendedProducts.length; i++) {
          const rec = product.recommendedProducts[i]
          if (!rec) {
            continue
          } // защита от undefined

          await db.insert(schema.recommendedProducts).values({
            productId: product.id,
            recommendedProductId: rec.productId,
            recommendedVariantId: rec.productVariantId,
            sortOrder: i,
          })
          insertedCount++
        }
      }
    }

    logger.success(`✅ Seeded ${insertedCount} recommended product relations.`)
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    console.error(error)
    throw error
  }
}

seedRecommended().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

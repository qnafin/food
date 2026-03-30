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
// server/db/seed/badges.ts
import 'dotenv/config'

const logger = useLogger('seed-badges')
const db = drizzle(process.env.DB_FILE_NAME!, { schema })

// Все продукты из статики
const allProducts = [...burgers, ...desserts, ...hotMeals, ...salads, ...snacks, ...soups]

// Вспомогательная функция для извлечения русского текста из локализованного массива
function getRuText(localizedArray: Array<{ locale: string, value: string }>): string {
  const ru = localizedArray.find((item) => item.locale === 'ru')
  return ru ? ru.value : ''
}

async function seedBadges() {
  logger.info('🌱 Seeding badges...')

  try {
    // Сначала проверим, есть ли уже бейджи
    const existingBadges = await db.select().from(schema.badges).limit(1)
    if (existingBadges.length > 0) {
      logger.warn('Badges already exist, skipping...')
      return
    }

    // Собираем уникальные бейджи
    const badgesMap = new Map<string, string>() // key = badge.id, value = title
    const productBadgesData: Array<{ productId: string, badgeId: string, sortOrder: number }> = []

    for (const product of allProducts) {
      if (product.badges && product.badges.length) {
        for (let i = 0; i < product.badges.length; i++) {
          const badge = product.badges[i]

          if (!badge) {
            continue
          }
          const badgeTitle = getRuText(badge.title)
          if (!badgesMap.has(badge.id)) {
            badgesMap.set(badge.id, badgeTitle)
          }
          productBadgesData.push({
            productId: product.id,
            badgeId: badge.id,
            sortOrder: i,
          })
        }
      }
    }

    if (badgesMap.size === 0) {
      logger.info('No badges found in static data, skipping...')
      return
    }

    // Вставляем бейджи
    for (const [id, title] of badgesMap.entries()) {
      await db.insert(schema.badges).values({ id, title })
      logger.info(`  Added badge: ${id} (${title})`)
    }

    // Вставляем связи продукт-бейдж
    for (const pb of productBadgesData) {
      await db.insert(schema.productBadges).values(pb)
    }

    logger.success(`✅ Seeded ${badgesMap.size} badges and ${productBadgesData.length} product-badge relations.`)
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    console.error(error)
    throw error
  }
}

seedBadges().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

import process from 'node:process'
import { burgers } from '../../services/data/products/burgers'
import { desserts } from '../../services/data/products/desserts'
import { hotMeals } from '../../services/data/products/hotMeals'
import { salads } from '../../services/data/products/salads'
import { snacks } from '../../services/data/products/snacks'
import { soups } from '../../services/data/products/soups'

import { useLogger } from '../../utils/logger'
import { db } from '../index'
import { badges, productBadges, products } from '../schema'
import 'dotenv/config'

const logger = useLogger('seed-badges')

const allProducts = [...burgers, ...desserts, ...hotMeals, ...salads, ...snacks, ...soups]

function getRuText(localizedArray: Array<{ locale: string, value: string }>): string {
  return localizedArray.find((item) => item.locale === 'ru')?.value ?? ''
}

async function seedBadges() {
  logger.info('🌱 Seeding badges...')

  try {
    // Проверяем, есть ли уже бейджи
    const existing = await db.select().from(badges).limit(1)
    if (existing.length) {
      logger.warn('Badges already exist, skipping...')
      return
    }

    // 1. Собираем уникальные бейджи из статики
    const badgesMap = new Map<string, string>() // code -> title
    const rawProductBadges: Array<{ productSlug: string, badgeCode: string, sortOrder: number }> = []

    for (const product of allProducts) {
      if (product.badges?.length) {
        for (let i = 0; i < product.badges.length; i++) {
          const badge = product.badges[i]
          if (!badge) {
            continue
          }
          const title = getRuText(badge.title)
          if (!badgesMap.has(badge.id)) {
            badgesMap.set(badge.id, title)
          }
          rawProductBadges.push({
            productSlug: product.slug, // используем slug продукта (уникален)
            badgeCode: badge.id,
            sortOrder: i,
          })
        }
      }
    }

    if (badgesMap.size === 0) {
      logger.info('No badges found, skipping...')
      return
    }

    // 2. Вставляем бейджи (без явного id) и запоминаем маппинг code -> новый id
    const slugToId = new Map<string, number>()
    for (const [slug, title] of badgesMap) {
      const [inserted] = await db.insert(badges).values({ slug, title }).returning({ id: badges.id })
      slugToId.set(slug, inserted.id)
    }

    // 3. Получаем маппинг slug продукта → его id (из уже заполненной таблицы products)
    const allProductsDb = await db.select().from(products)
    const slugToProductId = new Map(allProductsDb.map((p) => [p.slug, p.id]))

    // 4. Готовим данные для вставки связей
    const productBadgesData: Array<{ productId: number, badgeId: number, sortOrder: number }> = []
    for (const { productSlug, badgeCode, sortOrder } of rawProductBadges) {
      const productId = slugToProductId.get(productSlug)
      const badgeId = slugToId.get(badgeCode)
      if (!productId) {
        logger.warn(`Product not found for slug: ${productSlug}`)
        continue
      }
      if (!badgeId) {
        logger.warn(`Badge not found for code: ${badgeCode}`)
        continue
      }
      productBadgesData.push({ productId, badgeId, sortOrder })
    }

    // 5. Вставляем связи
    if (productBadgesData.length) {
      await db.insert(productBadges).values(productBadgesData)
      logger.info(`  Added ${productBadgesData.length} product-badge relations.`)
    }

    logger.success(`✅ Seeded ${badgesMap.size} badges and ${productBadgesData.length} relations.`)
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    throw error
  }
}

seedBadges().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

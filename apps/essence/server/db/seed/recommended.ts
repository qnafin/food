import process from 'node:process'
import { burgers } from '../../services/data/products/burgers'
import { desserts } from '../../services/data/products/desserts'
import { hotMeals } from '../../services/data/products/hotMeals'
import { salads } from '../../services/data/products/salads'
import { snacks } from '../../services/data/products/snacks'
import { soups } from '../../services/data/products/soups'
import { useLogger } from '../../utils/logger'
import { db } from '../index'
import { products, productVariants, recommendedProducts } from '../schema'
import 'dotenv/config'

const logger = useLogger('seed-recommended')

const allProducts = [...burgers, ...desserts, ...hotMeals, ...salads, ...snacks, ...soups]

async function seedRecommended() {
  logger.info('🌱 Seeding recommended products...')

  try {
    const existing = await db.select().from(recommendedProducts).limit(1)
    if (existing.length) {
      logger.warn('Recommended products already exist, skipping...')
      return
    }

    // 1. Получаем маппинг slug → id для продуктов
    const allProductsDb = await db.select().from(products)
    const productSlugToId = new Map(allProductsDb.map((p) => [p.slug, p.id]))

    // 2. Получаем маппинг slug → id для вариантов (если нужны конкретные варианты)
    const allVariantsDb = await db.select().from(productVariants)
    const variantSlugToId = new Map(allVariantsDb.map((v) => [v.slug, v.id]))

    const recommendedData: Array<{
      productId: number
      recommendedProductId: number
      recommendedVariantId: number | null
      sortOrder: number
    }> = []

    for (const product of allProducts) {
      if (product.recommendedProducts?.length) {
        for (let i = 0; i < product.recommendedProducts.length; i++) {
          const rec = product.recommendedProducts[i]
          if (!rec) {
            continue
          }

          const productId = productSlugToId.get(product.slug)
          const recommendedProductId = productSlugToId.get(rec.productId)
          let recommendedVariantId: number | null = null
          if (rec.productVariantId) {
            recommendedVariantId = variantSlugToId.get(rec.productVariantId) ?? null
          }

          if (!productId || !recommendedProductId) {
            logger.warn(`Skipping recommendation: product ${product.slug} -> ${rec.productId}`)
            continue
          }

          recommendedData.push({
            productId,
            recommendedProductId,
            recommendedVariantId,
            sortOrder: i,
          })
        }
      }
    }

    if (recommendedData.length) {
      await db.insert(recommendedProducts).values(recommendedData)
      logger.success(`✅ Seeded ${recommendedData.length} recommended product relations.`)
    } else {
      logger.info('No recommended products found in static data.')
    }
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    throw error
  }
}

seedRecommended().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

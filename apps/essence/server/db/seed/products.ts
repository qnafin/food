import process from 'node:process'
import { drizzle } from 'drizzle-orm/libsql'
// Импортируем статические данные (убедитесь, что пути правильные)
import { burgers } from '../../services/data/products/burgers'
import { desserts } from '../../services/data/products/desserts'
import { hotMeals } from '../../services/data/products/hotMeals'

import { salads } from '../../services/data/products/salads'
import { snacks } from '../../services/data/products/snacks'
import { soups } from '../../services/data/products/soups'
import { useLogger } from '../../utils/logger'
import * as schema from '../schema'
// server/db/seed/products.ts
import 'dotenv/config'

const logger = useLogger('seed-products')
const db = drizzle(process.env.DB_FILE_NAME!, { schema })

// Вспомогательная функция для извлечения текста из локализованного массива
function getRuText(localizedArray: Array<{ locale: string, value: string }>): string {
  const ru = localizedArray.find((item) => item.locale === 'ru')
  return ru ? ru.value : ''
}

// Маппинг slug категории → массив продуктов
const productsMap: Record<string, any[]> = {
  'burgers': burgers,
  'hot-meals': hotMeals,
  'salads': salads,
  'soups': soups,
  'snacks': snacks,
  'desserts': desserts,
}

async function seedProducts() {
  logger.info('🌱 Seeding products...')

  try {
    const categoriesFromDb = await db.select().from(schema.categories)
    if (categoriesFromDb.length === 0) {
      logger.error('No categories found! Run menu seed first.')
      return
    }

    const existing = await db.select().from(schema.products).limit(1)
    if (existing.length > 0) {
      logger.warn('Products already exist, skipping...')
      return
    }

    for (const category of categoriesFromDb) {
      const productsData = productsMap[category.slug]
      if (!productsData) {
        logger.warn(`No products for category: ${category.slug}`)
        continue
      }

      logger.info(`  Seeding ${productsData.length} products for ${category.title}`)

      for (const productData of productsData) {
        // Извлекаем простой текст из локализованных полей
        const titleRu = getRuText(productData.title)
        const descriptionRu = productData.description ? getRuText(productData.description) : null

        const inserted = await db.insert(schema.products).values({
          id: productData.id,
          slug: productData.slug,
          categoryId: category.id,
          title: titleRu,
          description: descriptionRu,
          isAvailableForPurchase: productData.isAvailableForPurchase,
          isShownInCatalog: productData.isShownInCatalog,
        }).returning()

        if (!inserted?.length) {
          logger.error(`Failed to insert product: ${productData.id}`)
          continue
        }

        logger.info(`    Product: ${productData.id} — ${titleRu}`)

        // Варианты
        for (let i = 0; i < productData.variants.length; i++) {
          const v = productData.variants[i]
          const variantTitleRu = getRuText(v.title)

          const insertedV = await db.insert(schema.productVariants).values({
            id: v.id,
            productId: productData.id,
            slug: v.id,
            title: variantTitleRu,
            price: v.price,
            originalPrice: v.originalPrice,
            weightUnit: v.weightUnit,
            weightValue: v.weightValue,
            sku: v.sku,
            images: v.images ? JSON.stringify(v.images) : null,
            video: v.video ? JSON.stringify(v.video) : null,
            nutritionFacts: v.nutritionFacts ? JSON.stringify(v.nutritionFacts) : null,
            sortOrder: i,
          }).returning()

          if (!insertedV?.length) {
            logger.error(`Failed to insert variant: ${v.id}`)
            continue
          }
          logger.info(`      Variant: ${v.id} — ${variantTitleRu}`)
        }
      }
    }

    logger.success('✅ Products seeded successfully')
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    console.error(error)
    throw error
  }
}

seedProducts().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

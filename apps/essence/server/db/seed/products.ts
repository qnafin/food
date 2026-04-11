import process from 'node:process'
import { burgers } from '../../services/data/products/burgers'
import { desserts } from '../../services/data/products/desserts'
import { hotMeals } from '../../services/data/products/hotMeals'
import { salads } from '../../services/data/products/salads'
import { snacks } from '../../services/data/products/snacks'
import { soups } from '../../services/data/products/soups'

import { useLogger } from '../../utils/logger'
import { db } from '../index'
import { categories, products, productVariants } from '../schema'
import 'dotenv/config'

const logger = useLogger('seed-products')

function getRuText(localizedArray: Array<{ locale: string, value: string }>): string {
  return localizedArray.find((item) => item.locale === 'ru')?.value ?? ''
}

const productsMap: Record<string, any[]> = {
  burgers, 'hot-meals': hotMeals, salads, soups, snacks, desserts,
}

async function seedProducts() {
  logger.info('🌱 Seeding products...')
  try {
    // Получаем все категории и создаём Map slug → id
    const allCategories = await db.select().from(categories)
    const categoryMap = new Map(allCategories.map((c) => [c.slug, c.id]))

    const existing = await db.select().from(products).limit(1)
    if (existing.length) {
      logger.warn('Products already exist, skipping...')
      return
    }

    for (const [categorySlug, productsData] of Object.entries(productsMap)) {
      const categoryId = categoryMap.get(categorySlug)
      if (!categoryId) {
        logger.warn(`Category not found: ${categorySlug}`)
        continue
      }

      logger.info(`  Seeding ${productsData.length} products for ${categorySlug}`)

      for (const productData of productsData) {
        const titleRu = getRuText(productData.title)
        const descriptionRu = productData.description ? getRuText(productData.description) : null

        // Вставка продукта – id генерируется автоматически
        const [insertedProduct] = await db.insert(products).values({
          slug: productData.slug,
          categoryId,
          title: titleRu,
          description: descriptionRu,
          isAvailableForPurchase: productData.isAvailableForPurchase,
          isShownInCatalog: productData.isShownInCatalog,
          sortOrder: productData.sortOrder ?? 0,
        }).returning({ id: products.id })
        if (!insertedProduct) {
          logger.error(`Failed to insert product: ${productData.slug}`)
          continue
        }
        logger.info(`    Product: ${productData.slug} (id ${insertedProduct.id})`)

        // Вставка вариантов
        for (let i = 0; i < productData.variants.length; i++) {
          const v = productData.variants[i]
          const variantTitleRu = getRuText(v.title)

          await db.insert(productVariants).values({
            productId: insertedProduct.id,
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
          })
          logger.info(`      Variant: ${v.id} — ${variantTitleRu}`)
        }
      }
    }
    logger.success('✅ Products seeded successfully')
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    throw error
  }
}

seedProducts().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

import process from 'node:process'
import { burgers } from '../../services/data/products/burgers'
import { desserts } from '../../services/data/products/desserts'
import { hotMeals } from '../../services/data/products/hotMeals'

import { salads } from '../../services/data/products/salads'
import { snacks } from '../../services/data/products/snacks'
import { soups } from '../../services/data/products/soups'
import { useLogger } from '../../utils/logger'
import { slugify } from '../../utils/slugify'
import { db } from '../index'

import { ingredients, productComposition, productIngredients, products, productVariants } from '../schema'
import 'dotenv/config'

const logger = useLogger('seed-composition')

const allProducts = [...burgers, ...desserts, ...hotMeals, ...salads, ...snacks, ...soups]

function getRuText(localizedArray: Array<{ locale: string, value: string }>): string {
  return localizedArray.find((item) => item.locale === 'ru')?.value ?? ''
}

async function seedComposition() {
  logger.info('🌱 Seeding composition...')

  try {
    // Проверяем, есть ли уже данные
    const existing = await db.select().from(ingredients).limit(1)
    if (existing.length) {
      logger.warn('Ingredients already exist, skipping...')
      return
    }

    // 1. Маппинг slug продукта → id (продукты уже засеяны)
    const allProductsDb = await db.select().from(products)
    const productSlugToId = new Map(allProductsDb.map((p) => [p.slug, p.id]))

    // 2. Маппинг slug варианта → id (поиск по slug варианта)
    const allVariantsDb = await db.select().from(productVariants)
    const variantSlugToId = new Map(allVariantsDb.map((v) => [v.slug, v.id]))

    // 3. Собираем уникальные ингредиенты и связи
    const ingredientsMap = new Map<string, { slug: string, title: string }>() // title -> {slug, title}
    const rawProductIngredients: Array<{ productSlug: string, ingredientTitle: string, sortOrder: number }> = []
    const rawComposition: Array<{ parentSlug: string, childSlug: string, childVariantSlug?: string, sortOrder: number }> = []

    for (const product of allProducts) {
      const composition = product.composition
      // Ингредиенты
      if (composition?.ingredients) {
        for (let i = 0; i < composition.ingredients.length; i++) {
          const ing = composition.ingredients[i]
          if (!ing) {
            continue
          }
          const title = getRuText(ing.title)
          if (!ingredientsMap.has(title)) {
            const slug = slugify(title)
            ingredientsMap.set(title, { slug, title })
          }
          rawProductIngredients.push({
            productSlug: product.slug,
            ingredientTitle: title,
            sortOrder: i,
          })
        }
      }
      // Состав из продуктов
      if (composition?.products) {
        for (let i = 0; i < composition.products.length; i++) {
          const item = composition.products[i]
          if (!item) {
            continue
          }
          rawComposition.push({
            parentSlug: product.slug,
            childSlug: item.productId,
            childVariantSlug: item.productVariantId,
            sortOrder: i,
          })
        }
      }
    }

    // 4. Вставляем ингредиенты и получаем маппинг title → id
    const ingredientTitleToId = new Map<string, number>()
    for (const { slug, title } of ingredientsMap.values()) {
      const [inserted] = await db.insert(ingredients).values({ slug, title }).returning({ id: ingredients.id })
      ingredientTitleToId.set(title, inserted.id)
      logger.info(`  Added ingredient: ${title} → slug: ${slug}, id: ${inserted.id}`)
    }

    // 5. Вставляем связи product_ingredients
    const productIngredientsData = []
    for (const { productSlug, ingredientTitle, sortOrder } of rawProductIngredients) {
      const productId = productSlugToId.get(productSlug)
      const ingredientId = ingredientTitleToId.get(ingredientTitle)
      if (productId && ingredientId) {
        productIngredientsData.push({ productId, ingredientId, sortOrder })
      } else {
        logger.warn(`Skipping product-ingredient: productSlug=${productSlug}, ingredient=${ingredientTitle}`)
      }
    }
    if (productIngredientsData.length) {
      await db.insert(productIngredients).values(productIngredientsData)
      logger.info(`  Added ${productIngredientsData.length} product-ingredient relations.`)
    }

    // 6. Вставляем связи product_composition
    const compositionData = []
    for (const { parentSlug, childSlug, childVariantSlug, sortOrder } of rawComposition) {
      const parentId = productSlugToId.get(parentSlug)
      const childId = productSlugToId.get(childSlug)
      if (!parentId || !childId) {
        logger.warn(`Skipping composition: parent=${parentSlug}, child=${childSlug}`)
        continue
      }
      let childVariantId = null
      if (childVariantSlug) {
        childVariantId = variantSlugToId.get(childVariantSlug) || null
        if (!childVariantId) {
          logger.warn(`Variant not found: ${childVariantSlug}`)
        }
      }
      compositionData.push({ parentProductId: parentId, childProductId: childId, childVariantId, sortOrder })
    }
    if (compositionData.length) {
      await db.insert(productComposition).values(compositionData)
      logger.info(`  Added ${compositionData.length} product composition relations.`)
    }

    logger.success(`✅ Composition seeded: ${ingredientsMap.size} unique ingredients.`)
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    throw error
  }
}

seedComposition().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

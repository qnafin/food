// server/db/seed/composition.ts
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
import 'dotenv/config'

const logger = useLogger('seed-composition')
const db = drizzle(process.env.DB_FILE_NAME!, { schema })

const allProducts = [...burgers, ...desserts, ...hotMeals, ...salads, ...snacks, ...soups]

function getRuText(localizedArray: Array<{ locale: string, value: string }>): string {
  const ru = localizedArray.find((item) => item.locale === 'ru')
  return ru ? ru.value : ''
}

async function seedComposition() {
  logger.info('🌱 Seeding composition...')

  try {
    // Проверяем, есть ли уже ингредиенты
    const existingIngredients = await db.select().from(schema.ingredients).limit(1)
    if (existingIngredients.length > 0) {
      logger.warn('Ingredients already exist, skipping...')
      return
    }

    const ingredientsMap = new Map<string, string>() // title -> id
    const productIngredientsData: Array<{ productId: string, ingredientId: string, sortOrder: number }> = []
    const compositionData: Array<{ parentProductId: string, childProductId: string, childVariantId: string | null, sortOrder: number }> = []

    for (const product of allProducts) {
      const composition = product.composition

      // Ингредиенты
      if (composition?.ingredients) {
        for (let i = 0; i < composition.ingredients.length; i++) {
          const ing = composition.ingredients[i]
          if (!ing) {
            continue
          } // добавим проверку
          const title = getRuText(ing.title)
          if (!ingredientsMap.has(title)) {
            // Вставляем ингредиент, если его ещё нет
            const [inserted] = await db.insert(schema.ingredients).values({ title }).returning()

            if (!inserted) {
              continue
            }
            ingredientsMap.set(title, inserted.id)
          }
          productIngredientsData.push({
            productId: product.id,
            ingredientId: ingredientsMap.get(title)!,
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
          } // добавим проверку
          compositionData.push({
            parentProductId: product.id,
            childProductId: item.productId,
            childVariantId: item.productVariantId || null,
            sortOrder: i,
          })
        }
      }
    }

    // Вставляем связи ингредиентов
    if (productIngredientsData.length > 0) {
      await db.insert(schema.productIngredients).values(productIngredientsData)
      logger.info(`  Added ${productIngredientsData.length} product-ingredient relations.`)
    }

    // Вставляем состав
    if (compositionData.length > 0) {
      await db.insert(schema.productComposition).values(compositionData)
      logger.info(`  Added ${compositionData.length} product composition relations.`)
    }

    logger.success(`✅ Composition seeded: ${ingredientsMap.size} unique ingredients.`)
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    console.error(error)
    throw error
  }
}

seedComposition().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

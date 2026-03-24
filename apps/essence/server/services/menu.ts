// /Users/qnafin/projects/food/apps/essence/server/services/menu.ts
import type { GatewayGetMenuResponse, Menu, MenuCategory } from '@nextorders/food-schema'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '~/server/db/schema'

// Импортируем продукты из статики
import { burgers } from './data/products/burgers'
import { desserts } from './data/products/desserts'
import { hotMeals } from './data/products/hotMeals'
import { salads } from './data/products/salads'
import { snacks } from './data/products/snacks'
import { soups } from './data/products/soups'

const logger = useLogger('menu-service')

// Маппинг slug категории к статическим продуктам
const productsMap: Record<string, any[]> = {
  'burgers': burgers,
  'hot-meals': hotMeals,
  'salads': salads,
  'soups': soups,
  'snacks': snacks,
  'desserts': desserts,
}

// Получаем переменную окружения

const config = useRuntimeConfig()
const dbUrl = config.dbFileName

export async function handleGetMenu(): Promise<GatewayGetMenuResponse> {
  try {
    const db = drizzle(dbUrl, { schema })

    // Получаем активное меню
    const menusList = await db.select()
      .from(schema.menus)
      .where(eq(schema.menus.isActive, true))
      .limit(1)

    const activeMenu = menusList[0]

    if (!activeMenu) {
      logger.warn('No active menu found')
      return {
        ok: true,
        type: 'getMenu',
        result: null as any,
      }
    }

    // Получаем все категории
    const categoriesFromDb = await db.select()
      .from(schema.categories)
      .orderBy(schema.categories.sortOrder)

    // Формируем категории с продуктами из статики
    const menuCategories: MenuCategory[] = categoriesFromDb.map((category) => ({
      id: category.id,
      slug: category.slug,
      title: [
        {
          locale: 'ru' as const,
          value: category.title,
        },
      ],
      icon: category.icon || undefined,
      products: productsMap[category.slug] || [],
    }))

    const menu: Menu = {
      id: activeMenu.id,
      title: [
        {
          locale: 'ru' as const,
          value: activeMenu.title,
        },
      ],
      slug: activeMenu.slug,
      isActive: activeMenu.isActive,
      categories: menuCategories,
    }

    logger.info(`Menu loaded: ${menu.id} with ${menuCategories.length} categories`)

    return {
      ok: true,
      type: 'getMenu',
      result: menu,
    }
  } catch (err) {
    const error = err as Error
    logger.error('Error fetching menu:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch menu',
    })
  }
}

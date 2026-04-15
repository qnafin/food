// server/services/menu.ts
import type { GatewayGetMenuResponse, Menu, MenuCategory } from '@nextorders/food-schema'
import { asc, eq } from 'drizzle-orm'
import { db } from '~/server/db' // единый экземпляр PostgreSQL
import * as schema from '~/server/db/schema'
import { useLogger } from '~/server/utils/logger'
import { getProduct } from './product'

const logger = useLogger('menu-service')

export async function handleGetMenu(): Promise<GatewayGetMenuResponse> {
  try {
    // Активное меню
    const menusList = await db
      .select()
      .from(schema.menus)
      .where(eq(schema.menus.isActive, true))
      .limit(1)
    const activeMenu = menusList[0]
    if (!activeMenu) {
      logger.warn('No active menu found')
      return { ok: true, type: 'getMenu', result: null as any }
    }

    // Категории
    const categoriesFromDb = await db
      .select()
      .from(schema.categories)
      .orderBy(asc(schema.categories.sortOrder))

    // Собираем категории с продуктами
    const menuCategories: MenuCategory[] = []
    for (const category of categoriesFromDb) {
      const productsInCategory = await db
        .select()
        .from(schema.products)
        .where(eq(schema.products.categoryId, category.id))
        .orderBy(asc(schema.products.sortOrder))

      const products = await Promise.all(
        productsInCategory.map((productRow) => getProduct(productRow, true)), // включаем рекомендации
      )

      menuCategories.push({
        id: category.id.toString(), // если API ожидает строку, преобразуем
        slug: category.slug,
        title: [{ locale: 'ru', value: category.title }],
        icon: category.icon ?? undefined,
        products,
      })
    }

    const menu: Menu = {
      id: activeMenu.id.toString(),
      title: [{ locale: 'ru', value: activeMenu.title }],
      slug: activeMenu.slug,
      isActive: activeMenu.isActive,
      categories: menuCategories,
    }

    logger.info(`Menu loaded: ${menu.id} with ${menuCategories.length} categories`)
    return { ok: true, type: 'getMenu', result: menu }
  } catch (err) {
    const error = err as Error
    logger.error('Error fetching menu:', error.message)
    throw createError({ statusCode: 500, message: 'Failed to fetch menu' })
  }
}

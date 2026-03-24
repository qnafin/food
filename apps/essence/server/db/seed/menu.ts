import { useLogger } from '@nextorders/core/server/utils/logger'
import { drizzle } from 'drizzle-orm/libsql'
import { categories, menus } from '../schema'
// /Users/qnafin/projects/food/apps/essence/server/db/seed/menu.ts
import 'dotenv/config'

const logger = useLogger('seed-menu')

// eslint-disable-next-line node/prefer-global/process
const db = drizzle(process.env.DB_FILE_NAME!)

async function seedMenu() {
  logger.info('🌱 Seeding menu...')

  try {
    // Создаем меню
    const menu = {
      id: 'default-menu',
      slug: 'default-menu',
      title: 'Обычное меню',
      isActive: true,
    }

    await db.insert(menus).values(menu)
    logger.info('✓ Menu created')

    // Создаем категории
    const categoriesData = [
      { id: 'burgers', slug: 'burgers', title: 'Бургеры', icon: 'i-fluent-emoji-flat:hamburger', sortOrder: 0 },
      { id: 'hot-meals', slug: 'hot-meals', title: 'Горячие блюда', icon: 'i-fluent-emoji-flat:spaghetti', sortOrder: 1 },
      { id: 'salads', slug: 'salads', title: 'Салаты', icon: 'i-fluent-emoji-flat:green-salad', sortOrder: 2 },
      { id: 'soups', slug: 'soups', title: 'Супы', icon: 'i-fluent-emoji-flat:pot-of-food', sortOrder: 3 },
      { id: 'snacks', slug: 'snacks', title: 'Закуски', icon: 'i-fluent-emoji-flat:sandwich', sortOrder: 4 },
      { id: 'desserts', slug: 'desserts', title: 'Десерты', icon: 'i-fluent-emoji-flat:shortcake', sortOrder: 5 },
    ]

    for (const category of categoriesData) {
      await db.insert(categories).values(category)
      logger.info(`  ✓ Category: ${category.title}`)
    }

    logger.success('✅ Menu seeded successfully')
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    if (error.message?.includes('UNIQUE constraint failed')) {
      logger.warn('Data already exists, skipping...')
    }
    throw error
  }
}

seedMenu().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1)
})

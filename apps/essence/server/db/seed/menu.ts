import process from 'node:process'
import { useLogger } from '@nextorders/core/server/utils/logger' // уточните путь
import { db } from '../index'
import { categories, menus } from '../schema'
// npx tsx server/db/seed/menu.ts
// server/db/seed/menu.ts
import 'dotenv/config'

const logger = useLogger('seed-menu')

async function seedMenu() {
  logger.info('🌱 Seeding menu...')
  try {
    // Вставка меню – id генерируется автоматически
    const [menu] = await db.insert(menus).values({
      slug: 'default-menu',
      title: 'Обычное меню',
      isActive: true,
    }).returning({ id: menus.id })
    logger.info(`✓ Menu created with id ${menu.id}`)

    // Данные категорий (без явных id)
    const categoriesData = [
      { slug: 'burgers', title: 'Бургеры', icon: 'i-fluent-emoji-flat:hamburger', sortOrder: 0 },
      { slug: 'hot-meals', title: 'Горячие блюда', icon: 'i-fluent-emoji-flat:spaghetti', sortOrder: 1 },
      { slug: 'salads', title: 'Салаты', icon: 'i-fluent-emoji-flat:green-salad', sortOrder: 2 },
      { slug: 'soups', title: 'Супы', icon: 'i-fluent-emoji-flat:pot-of-food', sortOrder: 3 },
      { slug: 'snacks', title: 'Закуски', icon: 'i-fluent-emoji-flat:sandwich', sortOrder: 4 },
      { slug: 'desserts', title: 'Десерты', icon: 'i-fluent-emoji-flat:shortcake', sortOrder: 5 },
    ]

    // Вставка категорий – возвращаем id и slug для дальнейшего использования
    const insertedCategories = await db.insert(categories).values(categoriesData).returning({ id: categories.id, slug: categories.slug })
    for (const cat of insertedCategories) {
      logger.info(`  ✓ Category: ${cat.slug} (id ${cat.id})`)
    }

    logger.success('✅ Menu seeded successfully')
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    if (error.message?.includes('duplicate key')) {
      logger.warn('Data already exists, skipping...')
    }
    throw error
  }
}

seedMenu().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

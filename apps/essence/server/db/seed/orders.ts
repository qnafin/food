import process from 'node:process'
import { eq } from 'drizzle-orm'
import { useLogger } from '../../utils/logger'
import { db } from '../index'
import { categories, orderItems, orders, products, productVariants } from '../schema'
import 'dotenv/config'

const logger = useLogger('seed-orders')

async function seedOrders() {
  try {
    // Проверяем, есть ли уже заказы
    const existing = await db.select().from(orders).limit(1)
    if (existing.length) {
      logger.warn('Orders already exist, skipping...')
      return
    }

    // Получаем ID продукта по slug
    const productSlug = 'apple-extravaganza'
    const product = await db.select().from(products).where(eq(products.slug, productSlug)).limit(1)
    if (!product.length) {
      logger.error(`Product not found: ${productSlug}`)
      return
    }
    const productId = product[0].id

    // Получаем ID варианта по slug (если нужен)
    const variantSlug = 'apple-extravaganza-1'
    const variant = await db.select().from(productVariants).where(eq(productVariants.slug, variantSlug)).limit(1)
    let variantId: number | null = null
    if (variant.length) {
      variantId = variant[0].id
    }

    // Получаем ID категории по slug
    const categorySlug = 'desserts'
    const category = await db.select().from(categories).where(eq(categories.slug, categorySlug)).limit(1)
    if (!category.length) {
      logger.error(`Category not found: ${categorySlug}`)
      return
    }
    const categoryId = category[0].id

    // Данные адреса (JSON строка)
    const address = {
      type: 'warehouseAddress',
      id: 'kitchen-1',
    }

    // Вставка заказа
    const [order] = await db.insert(orders).values({
      status: 'draft',
      readyBy: new Date(Date.now() + 3600000), // timestamp
      readyType: 'asap',
      deliveryMethod: 'selfPickup',
      address: JSON.stringify(address),
      paymentMethodId: 'cash',
      totalPrice: 250,
      name: 'Тестовый клиент',
      phone: '+7 999 123-45-67',
    }).returning({ id: orders.id })

    if (!order) {
      logger.error('Failed to create order')
      return
    }

    // Вставка позиции заказа
    await db.insert(orderItems).values({
      orderId: order.id,
      productId,
      productSlug,
      categoryId,
      categorySlug,
      variantId: variantId ?? undefined, // если вариант не найден, передаём undefined (NULL в БД)
      quantity: 1,
      unitPrice: 250,
      totalPrice: 250,
    })

    logger.success(`Test order created with id ${order.id}`)
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    throw error
  }
}

seedOrders().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  process.exit(1)
})

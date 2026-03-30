import process from 'node:process'
import { drizzle } from 'drizzle-orm/libsql'
import { useLogger } from '../../utils/logger'
import * as schema from '../schema'
// server/db/seed/orders.ts
import 'dotenv/config'

const logger = useLogger('seed-orders')
const db = drizzle(process.env.DB_FILE_NAME!, { schema })

async function seedOrders() {
  // проверка наличия заказов
  const existing = await db.select().from(schema.orders).limit(1)
  if (existing.length > 0) {
    return
  }

  const address = {
    type: 'warehouseAddress',
    id: 'kitchen-1',
  }

  const [order] = await db.insert(schema.orders).values({
    status: 'draft',
    readyBy: new Date(Date.now() + 3600000),
    readyType: 'asap',
    deliveryMethod: 'selfPickup',
    address: JSON.stringify(address),
    paymentMethodId: 'cash',
    totalPrice: 250,
    name: 'Тестовый клиент',
    phone: '+7 999 123-45-67',
  }).returning()

  if (!order) {
    logger.error('Failed to create test order')
    return
  }

  await db.insert(schema.orderItems).values({
    orderId: order.id,
    productId: 'apple-extravaganza',
    productSlug: 'apple-extravaganza',
    categoryId: 'desserts',
    categorySlug: 'desserts',
    variantId: 'apple-extravaganza-1',
    quantity: 1,
    unitPrice: 250,
    totalPrice: 250,
  })

  logger.success('Test order created')
}

seedOrders().catch(logger.error)

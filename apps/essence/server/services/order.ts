// server/services/order.ts
import type {
  GatewayAddOrderItemRequest,
  GatewayAddOrderItemResponse,
  GatewayCompleteOrderRequest,
  GatewayCompleteOrderResponse,
  GatewayCreateOrderResponse,
  GatewayDecrementOrderItemQuantityRequest,
  GatewayDecrementOrderItemQuantityResponse,
  GatewayGetOrderRequest,
  GatewayGetOrderResponse,
  GatewayIncrementOrderItemQuantityRequest,
  GatewayIncrementOrderItemQuantityResponse,
  GatewayUpdateOrderRequest,
  GatewayUpdateOrderResponse,
  Order,
  OrderItem,
} from '@nextorders/food-schema'
import { and, eq } from 'drizzle-orm'
import { db } from '~/server/db' // единый экземпляр PostgreSQL
import * as schema from '~/server/db/schema'
import { handleGetMenu } from './menu'

const logger = useLogger('order')

// ========== Вспомогательные функции ==========

function dbOrderToOrder(order: typeof schema.orders.$inferSelect, items: OrderItem[]): Order {
  // Парсим address, если это строка
  let addressObj
  try {
    addressObj = typeof order.address === 'string' ? JSON.parse(order.address) : order.address
  } catch {
    addressObj = order.address // fallback
  }
  return {
    id: order.id.toString(),
    status: order.status as Order['status'],
    createdAt: order.createdAt.toISOString(),
    readyBy: order.readyBy.toISOString(),
    readyType: order.readyType as Order['readyType'],
    deliveryMethod: order.deliveryMethod as Order['deliveryMethod'],
    address: addressObj, // теперь объект
    paymentMethodId: order.paymentMethodId,
    changeFrom: order.changeFrom ?? undefined,
    items,
    totalPrice: order.totalPrice,
    note: order.note ?? '',
    name: order.name,
    phone: order.phone,
  }
}

async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const rows = await db
    .select()
    .from(schema.orderItems)
    .where(eq(schema.orderItems.orderId, orderId))
    .orderBy(schema.orderItems.createdAt)
  return rows.map((row) => ({
    id: row.id.toString(),
    orderId: row.orderId.toString(),
    productId: row.productId.toString(),
    productSlug: row.productSlug,
    categoryId: row.categoryId.toString(),
    categorySlug: row.categorySlug,
    variantId: row.variantId?.toString() ?? '',
    quantity: row.quantity,
    unitPrice: row.unitPrice,
    totalPrice: row.totalPrice,
  }))
}

async function recalculateOrderTotal(orderId: number): Promise<number> {
  const items = await getOrderItems(orderId)
  const total = items.reduce((sum, i) => sum + i.totalPrice, 0)
  await db.update(schema.orders).set({ totalPrice: total }).where(eq(schema.orders.id, orderId))
  return total
}

async function findOrderInDb(id: number): Promise<Order | null> {
  const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id)).limit(1)
  if (!order) {
    return null
  }
  const items = await getOrderItems(order.id)
  return dbOrderToOrder(order, items)
}

// ========== API handlers ==========

export async function handleCreateOrder(): Promise<GatewayCreateOrderResponse> {
  const [order] = await db.insert(schema.orders).values({
    status: 'draft',
    readyBy: new Date(Date.now() + 3600000),
    readyType: 'asap',
    deliveryMethod: 'deliveryByCourier',
    address: {
      type: 'deliveryAddress',
      street: '',
      flat: '',
      intercom: '',
      entrance: '',
      floor: '',
      addressNote: '',
    },
    paymentMethodId: '',
    totalPrice: 0,
    name: '',
    phone: '',
    note: '',
  }).returning()

  if (!order) {
    throw new Error('Failed to create order')
  }
  logger.success(`Order created: ${order.id}`)
  const result = dbOrderToOrder(order, [])
  return { ok: true, type: 'createOrder', result }
}

export async function handleGetOrder({ id }: GatewayGetOrderRequest['body']): Promise<GatewayGetOrderResponse> {
  if (!id) {
    return { ok: true, type: 'getOrder', result: null }
  }
  const numericId = Number.parseInt(id, 10)
  if (Number.isNaN(numericId)) {
    throw new TypeError('Invalid order id')
  }
  const order = await findOrderInDb(numericId)
  return { ok: true, type: 'getOrder', result: order ?? null }
}

export async function handleUpdateOrder(data: GatewayUpdateOrderRequest['body']): Promise<GatewayUpdateOrderResponse> {
  if (!data.id) {
    throw new Error('Order id is required')
  }
  const numericId = Number.parseInt(data.id, 10)
  if (Number.isNaN(numericId)) {
    throw new TypeError('Invalid order id')
  }

  const updateData: any = {}
  if (data.status !== undefined) {
    updateData.status = data.status
  }
  if (data.readyType !== undefined) {
    updateData.readyType = data.readyType
  }
  if (data.deliveryMethod !== undefined) {
    updateData.deliveryMethod = data.deliveryMethod
  }
  if (data.address !== undefined) {
    updateData.address = data.address
  }
  if (data.paymentMethodId !== undefined) {
    updateData.paymentMethodId = data.paymentMethodId
  }
  if (data.changeFrom !== undefined) {
    updateData.changeFrom = data.changeFrom
  }
  if (data.name !== undefined) {
    updateData.name = data.name
  }
  if (data.phone !== undefined) {
    updateData.phone = data.phone
  }
  if (data.note !== undefined) {
    updateData.note = data.note
  }
  if (data.readyBy !== undefined) {
    updateData.readyBy = new Date(data.readyBy)
  }

  if (Object.keys(updateData).length) {
    await db.update(schema.orders).set(updateData).where(eq(schema.orders.id, numericId))
  }

  const updatedOrder = await findOrderInDb(numericId)
  if (!updatedOrder) {
    throw new Error('Order not found')
  }
  return { ok: true, type: 'updateOrder', result: updatedOrder }
}

export async function handleCompleteOrder(data: GatewayCompleteOrderRequest['body']): Promise<GatewayCompleteOrderResponse> {
  if (!data.id) {
    throw new Error('Order id is required')
  }
  const numericId = Number.parseInt(data.id, 10)
  if (Number.isNaN(numericId)) {
    throw new TypeError('Invalid order id')
  }

  const order = await findOrderInDb(numericId)
  if (!order) {
    throw new Error('Order not found')
  }
  if (order.status !== 'draft') {
    throw new Error('Order is not in draft status')
  }

  await db
    .update(schema.orders)
    .set({ status: 'created' })
    .where(eq(schema.orders.id, numericId))

  const completedOrder = await findOrderInDb(numericId)
  if (!completedOrder) {
    throw new Error('Order not found')
  }
  logger.success(`Order completed: ${completedOrder.id}`, completedOrder)
  return { ok: true, type: 'completeOrder', result: completedOrder }
}

export async function handleAddOrderItem({ orderId, variantId }: GatewayAddOrderItemRequest['body']): Promise<GatewayAddOrderItemResponse> {
  // 1. Найти вариант товара через меню
  const menuResponse = await handleGetMenu()
  const menu = menuResponse.result
  if (!menu) {
    throw new Error('Menu not found')
  }

  let foundCategory = null
  let foundProduct = null
  let foundVariant = null

  for (const category of menu.categories) {
    for (const product of category.products) {
      const variant = product.variants.find((v) => v.id === variantId)
      if (variant) {
        foundCategory = category
        foundProduct = product
        foundVariant = variant
        break
      }
    }
    if (foundVariant) {
      break
    }
  }

  if (!foundCategory || !foundProduct || !foundVariant) {
    throw new Error('Product variant not found')
  }

  // 2. Проверить существование заказа (числовой ID)
  const numericOrderId = Number.parseInt(orderId, 10)
  if (Number.isNaN(numericOrderId)) {
    throw new TypeError('Invalid order id')
  }
  const order = await findOrderInDb(numericOrderId)
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Not found', message: `Order id ${orderId} not found` })
  }

  // 3. Добавить позицию в БД
  await db.insert(schema.orderItems).values({
    orderId: numericOrderId,
    productId: Number.parseInt(foundProduct.id, 10),
    productSlug: foundProduct.slug,
    categoryId: Number.parseInt(foundCategory.id, 10),
    categorySlug: foundCategory.slug,
    variantId: Number.parseInt(foundVariant.id, 10),
    quantity: 1,
    unitPrice: foundVariant.price,
    totalPrice: foundVariant.price,
  }).returning()

  // 4. Пересчитать общую стоимость
  await recalculateOrderTotal(numericOrderId)

  // 5. Вернуть обновлённый заказ
  const updatedOrder = await findOrderInDb(numericOrderId)
  if (!updatedOrder) {
    throw new Error('Order not found')
  }
  return { ok: true, type: 'addOrderItem', result: updatedOrder }
}

export async function handleChangeOrderItemQuantity(
  data: GatewayIncrementOrderItemQuantityRequest['body'] | GatewayDecrementOrderItemQuantityRequest['body'],
): Promise<GatewayIncrementOrderItemQuantityResponse | GatewayDecrementOrderItemQuantityResponse> {
  const { orderId, itemId, method } = data
  const delta = method === 'increment' ? 1 : -1

  const numericOrderId = Number.parseInt(orderId, 10)
  const numericItemId = Number.parseInt(itemId, 10)
  if (Number.isNaN(numericOrderId) || Number.isNaN(numericItemId)) {
    throw new TypeError('Invalid id format')
  }

  const [item] = await db
    .select()
    .from(schema.orderItems)
    .where(and(eq(schema.orderItems.orderId, numericOrderId), eq(schema.orderItems.id, numericItemId)))
    .limit(1)

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Not found', message: `Item id ${itemId} not found` })
  }

  const newQuantity = item.quantity + delta
  if (newQuantity <= 0) {
    await db.delete(schema.orderItems).where(eq(schema.orderItems.id, numericItemId))
  } else {
    await db
      .update(schema.orderItems)
      .set({
        quantity: newQuantity,
        totalPrice: item.unitPrice * newQuantity,
      })
      .where(eq(schema.orderItems.id, numericItemId))
  }

  await recalculateOrderTotal(numericOrderId)
  const updatedOrder = await findOrderInDb(numericOrderId)
  if (!updatedOrder) {
    throw new Error('Order not found')
  }
  return {
    ok: true,
    type: method === 'increment' ? 'incrementOrderItemQuantity' : 'decrementOrderItemQuantity',
    result: updatedOrder,
  }
}

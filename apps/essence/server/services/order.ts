import type { GatewayAddOrderItemRequest, GatewayAddOrderItemResponse, GatewayCompleteOrderRequest, GatewayCompleteOrderResponse, GatewayCreateOrderResponse, GatewayDecrementOrderItemQuantityRequest, GatewayDecrementOrderItemQuantityResponse, GatewayGetOrderRequest, GatewayGetOrderResponse, GatewayIncrementOrderItemQuantityRequest, GatewayIncrementOrderItemQuantityResponse, GatewayUpdateOrderRequest, GatewayUpdateOrderResponse, Order, OrderItem } from '@nextorders/food-schema'
import { createId } from '@paralleldrive/cuid2'
import { handleGetMenu } from './menu'

const logger = useLogger('order')

const orders = new Map<Order['id'], Order>()

function findOrder(id: string): Order | undefined {
  return orders.get(id)
}

function createOrder(): Order {
  const newOrder: Order = {
    id: createId(),
    status: 'draft',
    createdAt: new Date().toISOString(),
    readyBy: '',
    readyType: 'asap',
    deliveryMethod: 'deliveryByCourier',
    paymentMethodId: '',
    address: {
      type: 'deliveryAddress',
      street: '',
      flat: '',
      intercom: '',
      entrance: '',
      floor: '',
      addressNote: '',
    },
    items: [],
    totalPrice: 0,
    note: '',
    name: '',
    phone: '',
  }

  orders.set(newOrder.id, newOrder)

  logger.success(`Order created: ${newOrder.id}`)

  return newOrder
}

function updateOrder(id: string, data: Partial<Order>): Order | undefined {
  const order = findOrder(id)
  if (!order) {
    return
  }

  orders.set(id, {
    ...order,
    ...data,
  })

  logger.success(`Order updated: ${id}`)

  return orders.get(id) as Order
}

function recalculateOrder(order: Order): Order {
  // For each
  order.items = order.items.map((item) => ({
    ...item,
    totalPrice: item.unitPrice * item.quantity,
  }))

  // Total price
  order.totalPrice = order.items.reduce((total, item) => total + item.totalPrice, 0)

  return order
}

export function handleGetOrder({ id }: GatewayGetOrderRequest['body']): GatewayGetOrderResponse {
  if (!id) {
    return {
      ok: true,
      type: 'getOrder',
      result: null,
    }
  }

  const order = findOrder(id)
  if (!order) {
    return {
      ok: true,
      type: 'getOrder',
      result: null,
    }
  }

  return {
    ok: true,
    type: 'getOrder',
    result: order,
  }
}

export function handleCreateOrder(): GatewayCreateOrderResponse {
  const order = createOrder()
  return {
    ok: true,
    type: 'createOrder',
    result: order,
  }
}

export function handleUpdateOrder(data: GatewayUpdateOrderRequest['body']): GatewayUpdateOrderResponse {
  if (!data.id) {
    throw new Error('Order id is required')
  }

  const order = updateOrder(data.id, data)
  if (!order) {
    throw new Error('Order not found')
  }

  return {
    ok: true,
    type: 'updateOrder',
    result: order,
  }
}

export function handleCompleteOrder(data: GatewayCompleteOrderRequest['body']): GatewayCompleteOrderResponse {
  if (!data.id) {
    throw new Error('Order id is required')
  }

  const order = findOrder(data.id)
  if (!order) {
    throw new Error('Order not found')
  }

  // Guard: if order is not in status "draft" - can't complete it
  if (order.status !== 'draft') {
    throw new Error('Order is not in draft status')
  }

  const completedOrder = updateOrder(data.id, {
    ...data,
    status: 'created',
  })
  if (!completedOrder) {
    throw new Error('Order not found')
  }

  logger.success(`Order completed: ${completedOrder.id}`, completedOrder)

  return {
    ok: true,
    type: 'completeOrder',
    result: completedOrder,
  }
}
// /Users/qnafin/projects/food/apps/essence/server/services/order.ts

export async function handleAddOrderItem({ orderId, variantId }: GatewayAddOrderItemRequest['body']): Promise<GatewayAddOrderItemResponse> {
  // Получаем меню асинхронно
  const menuResponse = await handleGetMenu()
  const menu = menuResponse.result

  if (!menu) {
    throw new Error('Menu not found')
  }

  // Ищем категорию, продукт и вариант
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

  const newItem: OrderItem = {
    variantId,
    orderId,
    id: createId(),
    categoryId: foundCategory.id,
    categorySlug: foundCategory.slug,
    productId: foundProduct.id,
    productSlug: foundProduct.slug,
    quantity: 1,
    unitPrice: foundVariant.price,
    totalPrice: foundVariant.price,
  }

  const order = findOrder(orderId)
  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
      message: `Order id ${orderId} not found`,
    })
  }

  const updatedOrder = updateOrder(orderId, {
    ...order,
    items: [
      ...order.items,
      newItem,
    ],
  })
  if (!updatedOrder) {
    throw new Error('Order not found')
  }

  const recalculatedOrder = recalculateOrder(updatedOrder)

  return {
    ok: true,
    type: 'addOrderItem',
    result: recalculatedOrder,
  }
}

export function handleChangeOrderItemQuantity(data: GatewayIncrementOrderItemQuantityRequest['body'] | GatewayDecrementOrderItemQuantityRequest['body']): GatewayIncrementOrderItemQuantityResponse | GatewayDecrementOrderItemQuantityResponse {
  const order = findOrder(data.orderId)
  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
      message: `Order id ${data.orderId} not found`,
    })
  }

  const item = order.items.find((item) => item.id === data.itemId)
  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
      message: `Item id ${data.itemId} not found`,
    })
  }

  const newQuantity = item.quantity + (data.method === 'increment' ? 1 : -1)
  if (newQuantity <= 0) {
    // Remove item
    order.items = order.items.filter((item) => item.id !== data.itemId)
  } else {
    // Update quantity
    item.quantity = newQuantity
  }

  const updatedOrder = updateOrder(data.orderId, order)
  if (!updatedOrder) {
    throw new Error('Order not found')
  }

  const recalculatedOrder = recalculateOrder(updatedOrder)

  return {
    ok: true,
    type: data.method === 'increment' ? 'incrementOrderItemQuantity' : 'decrementOrderItemQuantity',
    result: recalculatedOrder,
  }
}

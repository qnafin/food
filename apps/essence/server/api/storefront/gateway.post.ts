import type { GatewayAddOrderItemRequest, GatewayCompleteOrderRequest, GatewayCreateLeadRequest, GatewayDecrementOrderItemQuantityRequest, GatewayGetDeliveryByCourierStatusRequest, GatewayGetOrderRequest, GatewayGetSelfPickupStatusRequest, GatewayGetTimeSlotsRequest, GatewayIncrementOrderItemQuantityRequest, GatewayRequest, GatewayUpdateOrderRequest } from '@nextorders/food-schema'
import { handleGetChannels, handleGetDeliveryByCourierStatus, handleGetSelfPickupStatus, handleGetTimeSlots } from '~/server/services/channel/index'
import { handleCreateLead } from '~/server/services/lead'
import { handleGetMenu } from '~/server/services/menu'
import { handleGetOptions } from '~/server/services/options'
import { handleAddOrderItem, handleChangeOrderItemQuantity, handleCompleteOrder, handleCreateOrder, handleGetOrder, handleUpdateOrder } from '~/server/services/order'
import { handleGetServices } from '~/server/services/service'

export default defineEventHandler(async (event) => {
  try {
    const request: GatewayRequest = await readBody(event)

    switch (request.type) {
      case 'getOptions':
        return handleGetOptions()
      case 'getChannels':
        return handleGetChannels()
      case 'getMenu':
        return handleGetMenu()
      case 'getServices':
        return handleGetServices()
      case 'getOrder':
        return handleGetOrder(request.body as GatewayGetOrderRequest['body'])
      case 'createOrder':
        return handleCreateOrder()
      case 'updateOrder':
        return handleUpdateOrder(request.body as GatewayUpdateOrderRequest['body'])
      case 'completeOrder':
        return handleCompleteOrder(request.body as GatewayCompleteOrderRequest['body'])
      case 'addOrderItem':
        return handleAddOrderItem(request.body as GatewayAddOrderItemRequest['body'])
      case 'incrementOrderItemQuantity':
      case 'decrementOrderItemQuantity':
        return handleChangeOrderItemQuantity(request.body as GatewayIncrementOrderItemQuantityRequest['body'] | GatewayDecrementOrderItemQuantityRequest['body'])
      case 'getDeliveryByCourierStatus':
        return handleGetDeliveryByCourierStatus(request.body as GatewayGetDeliveryByCourierStatusRequest['body'])
      case 'getSelfPickupStatus':
        return handleGetSelfPickupStatus(request.body as GatewayGetSelfPickupStatusRequest['body'])
      case 'getTimeSlots':
        return handleGetTimeSlots(request.body as GatewayGetTimeSlotsRequest['body'])
      case 'createLead':
      // Здесь важно учесть, что файл может приходить через FormData
      // В текущем gateway мы ожидаем JSON-тело, поэтому файл лучше отправлять отдельным эндпоинтом.
      // Либо расширить gateway для multipart.
      // Для простоты пока сделаем JSON без файла.
        return handleCreateLead(request.body as GatewayCreateLeadRequest['body'])

      default:
        throw createError({
          statusCode: 400,
          message: 'Invalid type',
        })
    }
  } catch (error) {
    throw errorResolver(error)
  }
})

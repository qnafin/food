import type {
  Channel,
  GatewayGetChannelsResponse,
  GatewayGetDeliveryByCourierStatusRequest,
  GatewayGetDeliveryByCourierStatusResponse,
  GatewayGetSelfPickupStatusRequest,
  GatewayGetSelfPickupStatusResponse,
  GatewayGetTimeSlotsRequest,
  GatewayGetTimeSlotsResponse,
} from '@nextorders/food-schema'
import { getOpeningStatus, getTimeSlotsFromNow } from '../time'
import { copyright } from './copyright'
import {
  deliveryConditions,
  deliverySchedule,
  selfPickupConditions,
  selfPickupSchedule,
  warehouses,
} from './delivery'
import { links } from './links'
import { paymentMethodsForDelivery, paymentMethodsForSelfPickup } from './payment'

// Канал
const channels: Channel[] = [
  {
    id: 'moscow',
    selectorTitle: [{ locale: 'ru', value: 'Москва' }],
    title: [{ locale: 'ru', value: 'Вкус на бегу в Москве' }],
    description: [{ locale: 'ru', value: 'Насладитесь уникальными вкусами и приятной атмосферой' }],
    url: 'https://demo.nextorders.space/moscow',
    timeZone: '+03:00',
    isActive: true,
    deliveryByCourier: {
      isAvailable: true,
      conditions: deliveryConditions,
      minAmountForDelivery: 800,
      schedule: deliverySchedule,
      paymentMethods: paymentMethodsForDelivery,
    },
    selfPickup: {
      isAvailable: true,
      conditions: selfPickupConditions,
      schedule: selfPickupSchedule,
      warehouses,
      paymentMethods: paymentMethodsForSelfPickup,
    },
    copyright,
    links,
  },
]

// Хелпер поиска канала
function findChannel(channelId: string) {
  return channels.find((channel) => channel.id === channelId)
}

// Экспорты обработчиков
export function handleGetChannels(): GatewayGetChannelsResponse {
  return {
    ok: true,
    type: 'getChannels',
    result: channels,
  }
}

export function handleGetDeliveryByCourierStatus({ channelId }: GatewayGetDeliveryByCourierStatusRequest['body']): GatewayGetDeliveryByCourierStatusResponse {
  const channel = findChannel(channelId)

  if (!channel || !channel.deliveryByCourier?.schedule) {
    throw createError({
      statusCode: 404,
      message: 'Channel not found',
    })
  }

  return {
    ok: true,
    type: 'getDeliveryByCourierStatus',
    result: getOpeningStatus(channel.deliveryByCourier.schedule, channel.timeZone),
  }
}

export function handleGetSelfPickupStatus({ channelId }: GatewayGetSelfPickupStatusRequest['body']): GatewayGetSelfPickupStatusResponse {
  const channel = findChannel(channelId)

  if (!channel || !channel.selfPickup?.schedule) {
    throw createError({
      statusCode: 404,
      message: 'Channel not found',
    })
  }

  return {
    ok: true,
    type: 'getSelfPickupStatus',
    result: getOpeningStatus(channel.selfPickup.schedule, channel.timeZone),
  }
}

export function handleGetTimeSlots(data: GatewayGetTimeSlotsRequest['body']): GatewayGetTimeSlotsResponse {
  const channel = findChannel(data.channelId)

  if (!channel) {
    throw createError({
      statusCode: 404,
      message: 'Channel not found',
    })
  }

  const schedule = data.deliveryMethod === 'deliveryByCourier'
    ? channel.deliveryByCourier.schedule
    : channel.selfPickup.schedule

  if (!schedule) {
    throw createError({
      statusCode: 404,
      message: 'Schedule not found',
    })
  }

  return {
    ok: true,
    type: 'getTimeSlots',
    result: getTimeSlotsFromNow(schedule, channel.timeZone),
  }
}

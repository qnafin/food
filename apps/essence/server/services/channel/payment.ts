import type { PaymentMethod } from '@nextorders/food-schema'

export const paymentMethodsForDelivery: PaymentMethod[] = [
  {
    id: 'cash',
    type: 'cash',
    title: [{ locale: 'ru', value: 'Наличные курьеру' }],
  },
  {
    id: 'card',
    type: 'card',
    title: [{ locale: 'ru', value: 'Картой курьеру' }],
  },
]

export const paymentMethodsForSelfPickup: PaymentMethod[] = [
  {
    id: 'cash',
    type: 'cash',
    title: [{ locale: 'ru', value: 'Наличные' }],
  },
]

import type { PaymentMethod } from '@nextorders/food-schema'

export const paymentMethodsForDelivery: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    title: [{ locale: 'ru', value: 'Оплата по реквизитам' }],
  },
]

export const paymentMethodsForSelfPickup: PaymentMethod[] = [
  {
    id: 'cash',
    type: 'cash',
    title: [{ locale: 'ru', value: 'Наличные' }],
  },
  {
    id: 'card',
    type: 'card',
    title: [{ locale: 'ru', value: 'Картой при получении' }],
  },
]

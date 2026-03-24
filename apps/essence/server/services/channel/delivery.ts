import type { Channel, Schedule } from '@nextorders/food-schema'

// Расписание доставки
export const deliverySchedule: Schedule = [
  { day: 'mon', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'tue', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'wed', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'thu', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'fri', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'sat', isClosed: false, hours: [{ start: '09:30', end: '21:45' }] },
  { day: 'sun', isClosed: false, hours: [{ start: '09:30', end: '21:45' }] },
]

// Расписание самовывоза
export const selfPickupSchedule: Schedule = [
  { day: 'mon', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'tue', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'wed', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'thu', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'fri', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'sat', isClosed: false, hours: [{ start: '09:15', end: '22:30' }] },
  { day: 'sun', isClosed: false, hours: [{ start: '09:15', end: '22:30' }] },
]

// Условия доставки
export const deliveryConditions: Channel['deliveryByCourier']['conditions'] = [
  {
    locale: 'ru',
    value: `Доставка осуществляется в течение 1-2 часов после оформления заказа.

Минимальная сумма заказа для бесплатной доставки составляет 1500 руб.

Стоимость доставки рассчитывается в зависимости от расстояния до пункта выдачи или адреса доставки и может составлять от 0 до 1000 руб.

Заказ может быть оплачен при получении наличными или картой.

В случае отмены заказа или изменения его условий доставка оплачивается в полном объеме.

Заведение оставляет за собой право отказать в доставке в случае большого количества заказов или технических проблем.`,
  },
]

// Условия самовывоза
export const selfPickupConditions: Channel['selfPickup']['conditions'] = [
  {
    locale: 'ru',
    value: `При самовывозе заказ будет готов к получению в течение 1–2 часов с момента оформления.

Для самовывоза нет требования к минимальной сумме заказа — вы можете оформить заказ на любую сумму. Самовынос осуществляется бесплатно, дополнительная плата за него не взимается.

Оплатить заказ вы можете при получении как наличными, так и банковской картой. В случае отмены заказа или внесения в него изменений предварительная оплата, если она была произведена, возвращается вам полностью.

Заведение вправе отказать в предоставлении услуги самовывоза при высокой загруженности или возникновении технических неполадок, влияющих на обработку заказов.`,
  },
]

// Точки самовывоза
export const warehouses: Channel['selfPickup']['warehouses'] = [
  {
    id: 'kitchen-1',
    title: [{ locale: 'ru', value: 'Колотушкина 12' }],
    address: { street: [{ locale: 'ru', value: 'ул. Колотушкина, 12' }] },
  },
  {
    id: 'kitchen-2',
    title: [{ locale: 'ru', value: 'Ленина 46' }],
    address: { street: [{ locale: 'ru', value: 'ул. Ленина, 46' }] },
  },
]

import type { Channel, GatewayGetChannelsResponse, GatewayGetDeliveryByCourierStatusRequest, GatewayGetDeliveryByCourierStatusResponse, GatewayGetSelfPickupStatusRequest, GatewayGetSelfPickupStatusResponse, GatewayGetTimeSlotsRequest, GatewayGetTimeSlotsResponse, PaymentMethod, Schedule } from '@nextorders/food-schema'
import { getOpeningStatus, getTimeSlotsFromNow } from './time'

const selfPickupConditions: Channel['selfPickup']['conditions'] = [
  {
    locale: 'ru',
    value: `При самовывозе заказ будет готов к получению в течение 1–2 часов с момента оформления.

Для самовывоза нет требования к минимальной сумме заказа — вы можете оформить заказ на любую сумму. Самовынос осуществляется бесплатно, дополнительная плата за него не взимается.

Оплатить заказ вы можете при получении как наличными, так и банковской картой. В случае отмены заказа или внесения в него изменений предварительная оплата, если она была произведена, возвращается вам полностью.

Заведение вправе отказать в предоставлении услуги самовывоза при высокой загруженности или возникновении технических неполадок, влияющих на обработку заказов.`,
  },
]

const deliveryByCourierConditions: Channel['deliveryByCourier']['conditions'] = [
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

const paymentMethodsForDelivery: PaymentMethod[] = [
  {
    id: 'cash',
    type: 'cash',
    title: [
      {
        locale: 'ru',
        value: 'Наличные курьеру',
      },
    ],
  },
  {
    id: 'card',
    type: 'card',
    title: [
      {
        locale: 'ru',
        value: 'Картой курьеру',
      },
    ],
  },
]

const paymentMethodsForSelfPickup: PaymentMethod[] = [
  {
    id: 'cash',
    type: 'cash',
    title: [
      {
        locale: 'ru',
        value: 'Наличные',
      },
    ],
  },
]

const deliverySchedule: Schedule = [
  {
    day: 'mon',
    isClosed: false,
    hours: [
      {
        start: '10:00',
        end: '21:00',
      },
    ],
  },
  {
    day: 'tue',
    isClosed: false,
    hours: [
      {
        start: '10:00',
        end: '21:00',
      },
    ],
  },
  {
    day: 'wed',
    isClosed: false,
    hours: [
      {
        start: '10:00',
        end: '21:00',
      },
    ],
  },
  {
    day: 'thu',
    isClosed: false,
    hours: [
      {
        start: '10:00',
        end: '21:00',
      },
    ],
  },
  {
    day: 'fri',
    isClosed: false,
    hours: [
      {
        start: '10:00',
        end: '21:00',
      },
    ],
  },
  {
    day: 'sat',
    isClosed: false,
    hours: [
      {
        start: '09:30',
        end: '21:45',
      },
    ],
  },
  {
    day: 'sun',
    isClosed: false,
    hours: [
      {
        start: '09:30',
        end: '21:45',
      },
    ],
  },
]

const selfPickupSchedule: Schedule = [
  {
    day: 'mon',
    isClosed: false,
    hours: [
      {
        start: '09:30',
        end: '22:00',
      },
    ],
  },
  {
    day: 'tue',
    isClosed: false,
    hours: [
      {
        start: '09:30',
        end: '22:00',
      },
    ],
  },
  {
    day: 'wed',
    isClosed: false,
    hours: [
      {
        start: '09:30',
        end: '22:00',
      },
    ],
  },
  {
    day: 'thu',
    isClosed: false,
    hours: [
      {
        start: '09:30',
        end: '22:00',
      },
    ],
  },
  {
    day: 'fri',
    isClosed: false,
    hours: [
      {
        start: '09:30',
        end: '22:00',
      },
    ],
  },
  {
    day: 'sat',
    isClosed: false,
    hours: [
      {
        start: '09:15',
        end: '22:30',
      },
    ],
  },
  {
    day: 'sun',
    isClosed: false,
    hours: [
      {
        start: '09:15',
        end: '22:30',
      },
    ],
  },
]

const links: Channel['links'] = {
  aside: [
    {
      label: [
        {
          locale: 'ru',
          value: '8 800 123-45-69',
        },
      ],
      to: 'tel:88001234569',
      icon: 'i-lucide-phone-call',
    },
  ],
  footer: [
    {
      label: [
        {
          locale: 'ru',
          value: 'Публичная оферта',
        },
      ],
      to: '#',
    },
    {
      label: [
        {
          locale: 'ru',
          value: 'Политика конфиденциальности',
        },
      ],
      to: '#',
    },
    {
      label: [
        {
          locale: 'ru',
          value: 'Софт для e-commerce',
        },
      ],
      to: 'https://startodel.ru/',
      target: '_blank',
    },
  ],
  social: [
    {
      to: 'https://github.com/hmbanan666',
      icon: 'i-simple-icons:github',
      target: '_blank',
    },
    {
      to: 'https://t.me/hmbanan666',
      icon: 'i-simple-icons:telegram',
      target: '_blank',
    },
  ],
}

const copyright: Channel['copyright'] = [
  {
    locale: 'ru',
    value: `© 2024—2026 ООО «Выдуманная компания»
ОГРН 12345, ИНН 12345
236000, Калининградская область, г. Калининград, ул. Театральная, д. 33А

Информация на сайте не является публичной офертой.
Изображения товаров могут отличаться от оригинала.`,
  },
]

const channels: Channel[] = [{
  id: 'moscow',
  selectorTitle: [
    {
      locale: 'ru',
      value: 'Москва',
    },
  ],
  title: [
    {
      locale: 'ru',
      value: 'Вкус на бегу в Москве',
    },
  ],
  description: [
    {
      locale: 'ru',
      value: 'Насладитесь уникальными вкусами и приятной атмосферой',
    },
  ],
  url: 'https://demo.nextorders.space/moscow',
  timeZone: '+03:00',
  isActive: true,
  deliveryByCourier: {
    isAvailable: true,
    conditions: deliveryByCourierConditions,
    minAmountForDelivery: 800,
    schedule: deliverySchedule,
    paymentMethods: paymentMethodsForDelivery,
  },
  selfPickup: {
    isAvailable: true,
    conditions: selfPickupConditions,
    schedule: selfPickupSchedule,
    warehouses: [
      {
        id: 'kitchen-1',
        title: [
          {
            locale: 'ru',
            value: 'Колотушкина 12',
          },
        ],
        address: {
          street: [
            {
              locale: 'ru',
              value: 'ул. Колотушкина, 12',
            },
          ],
        },
      },
      {
        id: 'kitchen-2',
        title: [
          {
            locale: 'ru',
            value: 'Ленина 46',
          },
        ],
        address: {
          street: [

            {
              locale: 'ru',
              value: 'ул. Ленина, 46',
            },

          ],
        },
      },
    ],
    paymentMethods: paymentMethodsForSelfPickup,
  },
  copyright,
  links,
}]

export function handleGetChannels(): GatewayGetChannelsResponse {
  return {
    ok: true,
    type: 'getChannels',
    result: channels,
  }
}

export function handleGetDeliveryByCourierStatus({ channelId }: GatewayGetDeliveryByCourierStatusRequest['body']): GatewayGetDeliveryByCourierStatusResponse {
  const channel = channels.find((channel) => channel.id === channelId)
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
  const channel = channels.find((channel) => channel.id === channelId)
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
  const channel = channels.find((channel) => channel.id === data.channelId)
  if (!channel) {
    throw createError({
      statusCode: 404,
      message: 'Channel not found',
    })
  }

  const schedule = data.deliveryMethod === 'deliveryByCourier' ? channel.deliveryByCourier.schedule : channel.selfPickup.schedule
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

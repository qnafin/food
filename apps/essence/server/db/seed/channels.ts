import { drizzle } from 'drizzle-orm/libsql'
import { useLogger } from '~/server/utils/logger'
import * as schema from '../schema'
// /Users/qnafin/projects/food/apps/essence/server/db/seed/channels.ts
import 'dotenv/config'

const logger = useLogger('seed-channels')
// eslint-disable-next-line node/prefer-global/process
const db = drizzle(process.env.DB_FILE_NAME!, { schema })

// Данные из channel.ts в правильном формате
const deliverySchedule = [
  { day: 'mon', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'tue', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'wed', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'thu', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'fri', isClosed: false, hours: [{ start: '10:00', end: '21:00' }] },
  { day: 'sat', isClosed: false, hours: [{ start: '09:30', end: '21:45' }] },
  { day: 'sun', isClosed: false, hours: [{ start: '09:30', end: '21:45' }] },
]

const selfPickupSchedule = [
  { day: 'mon', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'tue', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'wed', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'thu', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'fri', isClosed: false, hours: [{ start: '09:30', end: '22:00' }] },
  { day: 'sat', isClosed: false, hours: [{ start: '09:15', end: '22:30' }] },
  { day: 'sun', isClosed: false, hours: [{ start: '09:15', end: '22:30' }] },
]

const deliveryConditions = [
  { locale: 'ru', value: `Доставка осуществляется в течение 1-2 часов после оформления заказа.

Минимальная сумма заказа для бесплатной доставки составляет 1500 руб.

Стоимость доставки рассчитывается в зависимости от расстояния до пункта выдачи или адреса доставки и может составлять от 0 до 1000 руб.

Заказ может быть оплачен при получении наличными или картой.

В случае отмены заказа или изменения его условий доставка оплачивается в полном объеме.

Заведение оставляет за собой право отказать в доставке в случае большого количества заказов или технических проблем.` },
]

const selfPickupConditions = [
  { locale: 'ru', value: `При самовывозе заказ будет готов к получению в течение 1–2 часов с момента оформления.

Для самовывоза нет требования к минимальной сумме заказа — вы можете оформить заказ на любую сумму. Самовынос осуществляется бесплатно, дополнительная плата за него не взимается.

Оплатить заказ вы можете при получении как наличными, так и банковской картой. В случае отмены заказа или внесения в него изменений предварительная оплата, если она была произведена, возвращается вам полностью.

Заведение вправе отказать в предоставлении услуги самовывоза при высокой загруженности или возникновении технических неполадок, влияющих на обработку заказов.` },
]

const paymentMethodsForDelivery = [
  { id: 'cash', type: 'cash', title: [{ locale: 'ru', value: 'Наличные курьеру' }] },
  { id: 'card', type: 'card', title: [{ locale: 'ru', value: 'Картой курьеру' }] },
]

const paymentMethodsForSelfPickup = [
  { id: 'cash', type: 'cash', title: [{ locale: 'ru', value: 'Наличные' }] },
]

const linksData = {
  aside: [
    { to: 'tel:88001234569', label: [{ locale: 'ru', value: '8 800 123-45-69' }], icon: 'i-lucide-phone-call' },
  ],
  footer: [
    { to: '#', label: [{ locale: 'ru', value: 'Публичная оферта' }] },
    { to: '#', label: [{ locale: 'ru', value: 'Политика конфиденциальности' }] },
    { to: 'https://startodel.ru/', label: [{ locale: 'ru', value: 'Софт для e-commerce' }], target: '_blank' },
  ],
  social: [
    { to: 'https://github.com/hmbanan666', icon: 'i-simple-icons:github', target: '_blank' },
    { to: 'https://t.me/hmbanan666', icon: 'i-simple-icons:telegram', target: '_blank' },
  ],
}

const copyrightValue = [
  { locale: 'ru', value: `© 2024—2026 ООО «Выдуманная компания»
ОГРН 12345, ИНН 12345
236000, Калининградская область, г. Калининград, ул. Театральная, д. 33А

Информация на сайте не является публичной офертой.
Изображения товаров могут отличаться от оригинала.` },
]

async function seedChannels() {
  logger.info('🌱 Seeding channels...')

  try {
    const channelId = 'moscow'

    // Создаем канал
    await db.insert(schema.channels).values({
      id: channelId,
      slug: 'moscow',
      url: 'https://demo.nextorders.space/moscow',
      timeZone: '+03:00',
      isActive: true,
    })
    logger.info('✓ Channel created')

    // Локализованные поля
    await db.insert(schema.channelSelectorTitles).values({
      channelId,
      locale: 'ru',
      value: 'Москва',
    })

    await db.insert(schema.channelTitles).values({
      channelId,
      locale: 'ru',
      value: 'Вкус на бегу в Москве',
    })

    await db.insert(schema.channelDescriptions).values({
      channelId,
      locale: 'ru',
      value: 'Насладитесь уникальными вкусами и приятной атмосферой',
    })

    // Настройки доставки
    await db.insert(schema.deliverySettings).values({
      channelId,
      isAvailable: true,
      minAmountForDelivery: 800,
      conditions: JSON.stringify(deliveryConditions),
      schedule: JSON.stringify(deliverySchedule),
      paymentMethods: JSON.stringify(paymentMethodsForDelivery),
    })
    logger.info('✓ Delivery settings created')

    // Настройки самовывоза
    await db.insert(schema.selfPickupSettings).values({
      channelId,
      isAvailable: true,
      conditions: JSON.stringify(selfPickupConditions),
      schedule: JSON.stringify(selfPickupSchedule),
      paymentMethods: JSON.stringify(paymentMethodsForSelfPickup),
    })
    logger.info('✓ Self pickup settings created')

    // Точки самовывоза
    const warehousesData = [
      { slug: 'kitchen-1', title: 'Колотушкина 12', address: 'ул. Колотушкина, 12', sortOrder: 0 },
      { slug: 'kitchen-2', title: 'Ленина 46', address: 'ул. Ленина, 46', sortOrder: 1 },
    ]

    for (const w of warehousesData) {
      const [warehouse] = await db.insert(schema.warehouses).values({
        channelId,
        slug: w.slug,
        sortOrder: w.sortOrder,
      }).returning()

      await db.insert(schema.warehouseTitles).values({
        warehouseId: warehouse.id,
        locale: 'ru',
        value: w.title,
      })

      await db.insert(schema.warehouseAddressStreets).values({
        warehouseId: warehouse.id,
        locale: 'ru',
        value: w.address,
      })
    }
    logger.info('✓ Warehouses created')

    // Ссылки
    for (const [type, items] of Object.entries(linksData)) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const [link] = await db.insert(schema.links).values({
          channelId,
          type,
          to: item.to,
          icon: item.icon,
          target: item.target,
          sortOrder: i,
        }).returning()

        if (item.label) {
          for (const label of item.label) {
            await db.insert(schema.linkLabels).values({
              linkId: link.id,
              locale: label.locale,
              value: label.value,
            })
          }
        }
      }
    }
    logger.info('✓ Links created')

    // Копирайт
    for (const copyright of copyrightValue) {
      await db.insert(schema.copyrights).values({
        channelId,
        locale: copyright.locale,
        value: copyright.value,
      })
    }
    logger.info('✓ Copyright created')

    logger.success('✅ Channels seeded successfully')
  } catch (err) {
    const error = err as Error
    logger.error('Seeding failed:', error.message)
    if (error.message?.includes('UNIQUE constraint failed')) {
      logger.warn('Data already exists, skipping...')
    }
    throw error
  }
}

seedChannels().catch((err) => {
  const error = err as Error
  logger.error('Seed failed:', error.message)
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1)
})

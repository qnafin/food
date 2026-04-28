import type {
  GatewayGetServicesResponse,
  Service,
} from '@nextorders/food-schema'

import { useLogger } from '~/server/utils/logger'

const logger = useLogger('service-service')

export async function handleGetServices(): Promise<GatewayGetServicesResponse> {
  try {
    const services: Service[] = [
      {
        id: '1',

        slug: 'battery-repair',

        category: 'battery',

        title: 'Ремонт аккумуляторов',

        subtitle: 'Переделка, сборка и восстановление АКБ',

        description:
          'Ремонт аккумуляторов электросамокатов, шуруповёртов и электротранспорта.',

        price: 'от 1500 ₽',

        features: [
          'Бесплатная диагностика',
          'Гарантия до 6 месяцев',
          'Работа по РФ',
        ],

        problems: [
          'не держит заряд',
          'не заряжается',
          'просадка напряжения',
        ],

        steps: [
          'Отправляете фото',
          'Диагностика',
          'Согласование стоимости',
          'Ремонт',
          'Отправка',
        ],

        medias: [
          {
            id: '1',
            url: '/images/services/battery/1.jpg',
          },
          {
            id: '2',
            url: '/images/services/battery/2.jpg',
          },
        ],

        isPopular: true,
      },

      {
        id: '2',

        slug: 'scooter-repair',

        category: 'transport',

        title: 'Ремонт электросамокатов',

        subtitle: 'Ремонт контроллеров, мотор-колёс и проводки',

        description:
          'Ремонт любых моделей электросамокатов и электровелосипедов.',

        price: 'от 500 ₽',

        features: [
          'Диагностика',
          'Гарантия',
          'Оригинальные запчасти',
        ],

        problems: [
          'не включается',
          'рывки при езде',
          'ошибка дисплея',
        ],

        steps: [
          'Осмотр',
          'Диагностика',
          'Ремонт',
          'Тестирование',
        ],

        medias: [
          {
            id: '1',
            url: '/images/services/scooter/1.jpg',
          },
        ],
      },
    ]

    logger.info(`Services loaded: ${services.length}`)

    return {
      ok: true,
      type: 'getServices',
      result: services,
    }
  } catch (err) {
    const error = err as Error

    logger.error(
      'Error fetching services:',
      error.message,
    )

    throw createError({
      statusCode: 500,
      message: 'Failed to fetch services',
    })
  }
}

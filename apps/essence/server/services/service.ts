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
        slug: 'diagnostics',
        category: 'diagnostics',
        title: 'Диагностика электротранспорта',
        subtitle: 'Выявление любой неисправности за 30 минут',
        description: 'Полная компьютерная и ручная диагностика электросамокатов, электроскутеров, электромопедов и электровелосипедов. Выявление проблем с контроллером, мотор-колесом, проводкой, АКБ, дисплеем и механикой.',
        price: 'от 500 ₽',
        features: [
          'Бесплатно при последующем ремонте',
          'Точный вердикт по срокам и цене',
          'Подробный отчёт о состоянии',
        ],
        problems: [
          'не включается',
          'теряет мощность',
          'странные звуки',
        ],
        steps: [
          'Вы присылаете фото/видео проблемы',
          'Я провожу предварительную диагностику',
          'Согласовываем финальную стоимость',
          'Ремонт и тестирование',
        ],
        medias: [
          { id: 'diag1', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U' },
        ],

        isLocalOnly: false,
        isPopular: true,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
      },
      {
        id: 'custom-battery',
        slug: 'custom-battery',
        category: 'battery',
        title: 'Аккумуляторы',
        subtitle: 'Сборка под ваш запрос с доставкой по всей России',
        description: 'Изготовим аккумуляторную батарею любой формы, напряжения (12V–72V) и ёмкости на качественных ячейках (LG, Samsung, Sony, Eve). Подходит для электросамокатов, велосипедов, скутеров, инструмента, роботов и спецтехники. Отправляем СДЭКом, Почтой России или транспортной компанией в любой город РФ.',
        price: 'от 4000 ₽',
        features: [
          'Сборка в термоусадку',
          'Балансировка и тестирование',
          'Контроллер BMS в комплекте',
          'Гарантия 12 месяцев',
          'Отправка в любой регион РФ',
        ],
        problems: [
          'нет готового решения на рынке',
          'нужно увеличить ёмкость',
          'форма нестандартная',
        ],
        steps: [
          'Вы присылаете требования (фото места, размеры, напряжение)',
          'Я делаю расчёт и 3D-модель',
          'Одобряете макет',
          'Сборка и тест',
          'Отправка в ваш город',
        ],
        medias: [
          { id: 'cb1', url: 'https://60.img.avito.st/image/1/1.9WWFw7a4WYyzapuJ49DyJ7djW4o7YtuE82dbjjVqUYYz.bGU1J4Tf3Y43WqOG8zPO6Z8dYrIiyfqjo7cdKC-VxCY' },
        ],
        isPopular: true,
        isLocalOnly: false,
        brands: [], // опционально
      },
      {
        id: '2',
        slug: 'controller-wiring-repair',
        category: 'electrical',
        title: 'Ремонт проводки и контроллеров',
        subtitle: 'Электрика любой сложности',
        description: 'Ремонт/замена контроллера, восстановление проводки, поиск коротких замыканий. Работаем с любыми брендами: Xiaomi, Ninebot, Kugoo, Kaabo, Dualtron, Sur-Ron, Talaria и другие.',
        price: 'от 1000 ₽',
        features: [
          'Используем оригинальные контроллеры',
          'Герметизация проводки',
          'Гарантия 3 месяца',
        ],
        problems: [
          'рывки при разгоне',
          'не работает рекуперация',
          'ошибка на дисплее',
        ],
        steps: [
          'Диагностика',
          'Демонтаж и проверка компонентов',
          'Ремонт/замена',
          'Тест-драйв',
        ],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: true,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        isLocalOnly: true,
      },
      {
        id: '3',
        slug: 'motor-wheel-tyre',
        category: 'mechanical',
        title: 'Шиномонтаж мотор-колёс',
        subtitle: 'Бережный демонтаж и балансировка',
        description: 'Замена покрышек и камер на мотор-колёсах без повреждения проводов и магнитов. Установка бескамерных шин, герметизация обода.',
        price: 'от 800 ₽',
        features: [
          'Специальный станок для мотор-колёс',
          'Балансировка входит в стоимость',
          'Утилизация старой резины',
        ],
        problems: [
          'прокол',
          'износ протектора',
          'гвоздь или порез',
        ],
        steps: [
          'Снятие колеса',
          'Демонтаж шины',
          'Ремонт или замена',
          'Монтаж и балансировка',
        ],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: false,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        isLocalOnly: true,
      },
      {
        id: '4',
        slug: 'hydraulic-brakes',
        category: 'brakes',
        title: 'Ремонт и прокачка гидравлических тормозов',
        subtitle: 'Чёткое срабатывание без провалов',
        description: 'Прокачка тормозной системы, замена масла, ремонт главного/рабочего цилиндра, устранение люфтов, апгрейд до 4-поршневых суппортов.',
        price: 'от 1000 ₽',
        features: [
          'Используем только DOT 4 / минеральное масло',
          'Вакуумная прокачка',
          'Регулировка под ваш вес',
        ],
        problems: [
          'мягкая ручка тормоза',
          'тормоза свистят',
          'не держат на спуске',
        ],
        steps: [
          'Осмотр системы',
          'Прокачка и замена жидкости',
          'Ремонт (при необходимости)',
          'Тест на безопасность',
        ],
        medias: [],
        isPopular: false,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        isLocalOnly: true,
      },
      {
        id: '5',
        slug: 'display-repair',
        category: 'electrical',
        title: 'Ремонт дисплеев (бортовой компьютер)',
        subtitle: 'Замена экрана, шлейфа, прошивка',
        description: 'Восстановление неработающего дисплея: замена матрицы, контроллера, шлейфа, прошивка прошивки. Совместимость с большинством протоколов (UART, CAN).',
        price: 'от 1500 ₽',
        features: [
          'Ремонт вместо покупки нового',
          'Диагностика бесплатно',
          'Гарантия 1 месяц',
        ],
        problems: [
          'не загорается',
          'тусклый экран',
          'не реагирует на кнопки',
        ],
        steps: [
          'Приёмка и диагностика',
          'Поиск запчастей (или ремонт компонентов)',
          'Восстановление и прошивка',
          'Проверка работы всех режимов',
        ],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: false,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        isLocalOnly: true,
      },
      {
        id: '6',
        slug: 'mechanics-repair',
        category: 'mechanical',
        title: 'Ремонт механической части',
        subtitle: 'Люфты, сварка, амортизаторы, подвеска',
        description: 'Устранение люфта рулевой колонки, ремонт или замена амортизаторов, сварка рамы, замена втулок, подшипников. Восстановление геометрии.',
        price: 'от 1000 ₽',
        features: [
          'Сварка аргоном',
          'Запрессовка подшипников',
          'Регулировка под ваш рост',
        ],
        problems: [
          'скрип и люфт руля',
          'пробой амортизатора',
          'трещина на раме',
        ],
        steps: [
          'Визуальный осмотр',
          'Дефектовка',
          'Сварка/замена деталей',
          'Настройка и смазка',
        ],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: false,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        isLocalOnly: true,
      },
      {
        id: '7',
        slug: 'waterproofing',
        category: 'electrical',
        title: 'Гидроизоляция электроскутеров и мопедов',
        subtitle: 'Защита от луж и дождя',
        description: 'Герметизация разъёмов, контроллера, аккумулятора, дисплея. Нанесение влагозащитного лака и уплотнителей. Предотвращение коррозии и коротких замыканий.',
        price: 'от 1500 ₽',
        features: [
          'Специальные составы (Plastik 70, конформный лак)',
          'Обработка всех уязвимых мест',
          'Сохранение заводских разъёмов',
        ],
        problems: [
          'частые поездки под дождём',
          'окисление контактов',
          'потеря мощности после дождя',
        ],
        steps: [
          'Разборка и очистка',
          'Изоляция компонентов',
          'Сборка и тест',
        ],
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: false,
        isLocalOnly: true,
      },
      {
        id: '8',
        slug: 'assembly-tuning',
        category: 'assembly',
        title: 'Сборка и настройка из коробки',
        subtitle: 'Распаковка, сборка, прошивка, настройка подвески',
        description: 'Полная сборка нового электротранспорта: установка руля, колёс, калибровка дисплея, настройка тормозов, амортизаторов, обновление прошивки, тест-драйв.',
        price: 'от 1500 ₽',
        features: [
          'Экономия вашего времени',
          'Правильная обкатка',
          'Рекомендации по эксплуатации',
        ],
        problems: [
          'нет времени собирать',
          'боитесь что-то сломать',
        ],
        steps: [
          'Распаковка и сверка комплектации',
          'Сборка',
          'Настройка софта и механики',
          'Проверка на ходу',
        ],
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: false,
        isLocalOnly: true,
      },
      {
        id: '9',
        slug: 'motor-wheel-bearing',
        category: 'electrical',
        title: 'Ремонт мотор-колёс',
        subtitle: 'Замена подшипников, восстановление после залития',
        description: 'Ремонт мотор-колеса: замена подшипников, восстановление обмоток, удаление воды и коррозии, ремонт датчиков Холла, балансировка ротора.',
        price: 'от 2000 ₽',
        features: [
          'Сушка в термокамере',
          'Замена подшипников SKF',
          'Тест на стенде',
        ],
        problems: [
          'гул при движении',
          'мотор перегревается',
          'после лужи не едет',
        ],
        steps: [
          'Диагностика мотор-колеса',
          'Разборка и дефектовка',
          'Ремонт / замена деталей',
          'Сборка и прогон',
        ],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: true,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        isLocalOnly: true,
      },
      {
        id: '10',
        slug: 'tech-support',
        category: 'support',
        title: 'Техподдержка для моих клиентов',
        subtitle: 'Консультации по эксплуатации и удалённая помощь',
        description: 'После ремонта я остаюсь на связи. Отвечаю на вопросы по настройке, зарядке, хранению, замене расходников. Помогаю удалённо решить мелкие проблемы.',
        price: 'бесплатно для клиентов',
        features: [
          'WhatsApp / Telegram',
          'Видео-инструкции',
          'Напоминания о ТО',
        ],
        problems: [],
        steps: [],
        medias: [
          { id: 'ctrl1', url: 'https://10.img.avito.st/image/1/1.4EXtVra4TKzb4c6hoT3MCp33TqpT98662_pOrl3_RKZb.i--tTwyByKhzZWoZaK7k4i8_fv94K7qxgP1MU5y4_CQ?cqp=2.TSzMy-m0u9ojo94xoNTr4TIkcUBjMu1L_y5Z6Lr-VHA-3xfoRpsvf1jN4IBF36LEO13sxOCjYv9KRoXzpmAFvKTQ' },
        ],
        isPopular: false,
        brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria'],
        isLocalOnly: true,
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

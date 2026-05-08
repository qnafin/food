import type {
  Service,
} from '@nextorders/food-schema'
import { db } from '../../db' // путь к вашему db инстансу

import { services } from '../schema/services'
// apps/essence/server/db/seed/services.ts
import 'dotenv/config' // загружает .env

const staticServices: Service[] = [
  // 1. Диагностика (уже есть, оставляем)
  {
    id: '1',
    slug: 'diagnostics',
    category: 'diagnostics',
    title: 'Диагностика электротранспорта',
    subtitle: 'Выявление любой неисправности за 30 минут',
    description: 'Полная компьютерная и ручная диагностика электросамокатов, электроскутеров, электромопедов и электровелосипедов. Выявление проблем с контроллером, мотор-колесом, проводкой, АКБ, дисплеем и механикой.',
    price: 'от 500 ₽',
    features: ['Бесплатно при последующем ремонте', 'Точный вердикт по срокам и цене', 'Подробный отчёт о состоянии'],
    problems: ['не включается', 'теряет мощность', 'странные звуки'],
    steps: ['Вы присылаете фото/видео проблемы', 'Я провожу предварительную диагностику', 'Согласовываем финальную стоимость', 'Ремонт и тестирование'],
    images: [{
      id: 'diag1', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: true,
    isPopular: true,
    brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria', 'Minako', 'Wenbох', 'Titan', 'Monstr', 'Liming'],
  },
  // 2. Ремонт электровелосипедов (общий)
  {
    id: '2',
    slug: 'ebike-repair',
    category: 'ebike',
    title: 'Ремонт электровелосипедов',
    subtitle: 'Любые неисправности — механика, электрика, электроника',
    description: 'Ремонт мотор-колёс, контроллеров, проводки, дисплеев, тормозов, механической части. Работаю с любыми моделями: Minako, Kugoo, Wenbox, Titan, Monstr, Liming, Eltreco, Ciciba и другие.',
    price: 'от 500 ₽',
    features: ['Диагностика бесплатно', 'Гарантия до 6 месяцев', 'Срочный ремонт'],
    problems: ['не включается', 'шум при движении', 'не работает подсветка', 'ошибка на дисплее'],
    steps: ['Осмотр и диагностика', 'Согласование стоимости', 'Ремонт', 'Тест-драйв'],
    images: [{
      id: 'diag2', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: true,
    isPopular: true,
    brands: ['Minako', 'Kugoo', 'Wenbox', 'Titan', 'Monstr', 'Liming', 'Eltreco', 'Ciciba', 'SK8'],
  },
  // 3. Ремонт электросамокатов
  {
    id: '3',
    slug: 'scooter-repair',
    category: 'scooter',
    title: 'Ремонт электросамокатов',
    subtitle: 'Полный спектр работ — механика, электрика, электроника',
    description: 'Ремонт проводки и контроллеров, шиномонтаж мотор-колёс, прокачка гидравлических тормозов, замена дисплеев, восстановление после залития. Работаю со всеми марками: Xiaomi, Ninebot, Kugoo, Kaabo, Dualtron, Sur-Ron, Talaria и др.',
    price: 'от 500 ₽',
    features: ['Бесплатная диагностика', 'Гарантия 3-6 месяцев', 'Выезд на место'],
    problems: ['не заряжается', 'рывки при езде', 'скрип руля', 'тормоза не держат'],
    steps: ['Приём заявки', 'Диагностика', 'Ремонт', 'Проверка на ходу'],
    images: [{
      id: 'diag1', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: true,
    isPopular: true,
    brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria', 'Hiper', 'ZAXBOARD', 'IconBIT', 'Artway', 'Halter', 'Midway', 'White Siberia', 'Joyor', 'E-TWOW', 'Currus', 'Inokim', 'Ultrон', 'Minimotors', 'Starway', 'Speed Savage', 'Hunter', 'Neoline', 'Acer', 'Navee', 'Okai', 'Tribe', 'Yamato'],
  },
  // 4. Ремонт электроскутеров и мопедов
  {
    id: '4',
    slug: 'scooter-moped-repair',
    category: 'moped',
    title: 'Ремонт электроскутеров и мопедов',
    subtitle: 'Специализированный сервис — электрика, механика, гидроизоляция',
    description: 'Ремонт контроллеров, проводки, шиномонтаж мотор-колёс, ремонт тормозов, замена дисплеев, сборка из коробки, ремонт после залития. Работаю с моделями: Kugoo, Wenbox, Minako, Jetson, Monster, Green Camel, White Siberia Monstr, Liming, Eltreco, Ciciba и другие.',
    price: 'от 800 ₽',
    features: ['Диагностика бесплатно', 'Гарантия 6 месяцев', 'Оригинальные запчасти'],
    problems: ['не едет', 'быстро разряжается', 'гул из мотор-колеса', 'не работает дисплей'],
    steps: ['Выездная диагностика', 'Согласование', 'Ремонт', 'Тестирование'],
    images: [{
      id: 'diag4', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: true,
    isPopular: false,
    brands: ['Kugoo', 'Wenbox', 'Minako', 'Jetson', 'Monster', 'Green Camel', 'White Siberia Monstr', 'Liming', 'Eltreco', 'Ciciba', 'Yokamura', 'Hiper Engine', 'Smart Balance', 'GT', 'Truck', 'SK8'],
  },
  // 5. Ремонт аккумуляторов для инструмента (шуруповерты, ледобуры и т.д.)
  {
    id: '5',
    slug: 'power-tool-battery',
    category: 'battery',
    title: 'Ремонт аккумуляторов инструмента',
    subtitle: 'Замена элементов, переделка Ni-Cd на Li-ion, увеличение ёмкости',
    description: 'Ремонтирую и переделываю аккумуляторы для шуруповёртов, ледобуров, пылесосов, болгарок. Профессиональная точечная сварка без перегрева. Работаю с брендами: Makita, Bosch, Hitachi, Dewalt, Metabo, Интерскол, Зубр, Вихрь, Patriot, Ресанта и др.',
    price: 'от 1500 ₽',
    features: ['Бесплатная диагностика АКБ', 'Гарантия 6 месяцев', 'Увеличение ёмкости', 'Переделка Ni-Cd → Li-ion'],
    problems: ['быстро садится', 'не заряжается', 'потеря ёмкости', 'вздутие'],
    steps: ['Приносите шуруповерт+АКБ+зарядку', 'Диагностика', 'Согласование цены', 'Замена элементов', 'Тестирование'],
    images: [{
      id: 'diag5', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: false,
    isPopular: true,
    brands: ['Makita', 'Bosch', 'Hitachi', 'Dewalt', 'Metabo', 'Интерскол', 'Зубр', 'Вихрь', 'Patriot', 'Ресанта', 'Greenworks', 'Калибр', 'Энергомаш', 'Союз', 'Энкор', 'Nanwei', 'Hammerdinger'],
  },
  // 6. Ремонт мотор-колёс
  {
    id: '6',
    slug: 'motor-wheel-repair',
    category: 'mechanical',
    title: 'Ремонт мотор-колёс',
    subtitle: 'Замена подшипников, восстановление после залития, балансировка',
    description: 'Ремонт мотор-колёс электровелосипедов, самокатов, скутеров: замена подшипников, восстановление обмоток, удаление воды и коррозии, ремонт датчиков Холла, балансировка ротора.',
    price: 'от 1000 ₽',
    features: ['Сушка в термокамере', 'Замена подшипников SKF', 'Тест на стенде'],
    problems: ['гул при движении', 'мотор перегревается', 'после лужи не едет', 'вибрация'],
    steps: ['Диагностика', 'Разборка', 'Ремонт/замена деталей', 'Сборка и прогон'],
    images: [{
      id: 'diag6', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: true,
    isPopular: true,
    brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Minako', 'Wenbox', 'Titan', 'Monstr'],
  },
  // 7. Ремонт контроллеров и проводки
  {
    id: '7',
    slug: 'controller-wiring',
    category: 'electrical',
    title: 'Ремонт контроллеров и проводки',
    subtitle: 'Электрика любой сложности для любого электротранспорта',
    description: 'Восстановление проводки, замена/ремонт контроллера, диагностика коротких замыканий. Работаю с оригинальными и аналогами. Прошивка и настройка контроллеров.',
    price: 'от 1000 ₽',
    features: ['Использую оригинальные контроллеры', 'Герметизация проводки', 'Гарантия 3 месяца'],
    problems: ['рывки при разгоне', 'не работает рекуперация', 'ошибка на дисплее', 'перегрев контроллера'],
    steps: ['Диагностика', 'Демонтаж', 'Ремонт/замена', 'Тест-драйв'],
    images: [{
      id: 'diag7', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: true,
    isPopular: false,
    brands: ['Xiaomi', 'Ninebot', 'Kugoo', 'Kaabo', 'Dualtron', 'Sur-Ron', 'Talaria', 'Minako', 'Wenbox'],
  },
  // 8. Гидроизоляция и антикоррозийная обработка
  {
    id: '8',
    slug: 'waterproofing',
    category: 'electrical',
    title: 'Гидроизоляция электротранспорта',
    subtitle: 'Защита от влаги и коррозии с гарантией',
    description: 'Герметизация разъёмов, контроллера, аккумулятора, дисплея. Нанесение влагозащитного лака и уплотнителей. Предотвращение коротких замыканий и коррозии. Фотоотчёт.',
    price: 'от 1500 ₽',
    features: ['Спецсоставы (Plastik 70, конформный лак)', 'Обработка всех уязвимых мест', 'Сохранение заводских разъёмов'],
    problems: ['частые поездки под дождём', 'окисление контактов', 'потеря мощности после дождя'],
    steps: ['Разборка и очистка', 'Изоляция компонентов', 'Сборка', 'Тест'],
    images: [{
      id: 'diag8', url: 'https://70.img.avito.st/image/1/1.ElfQ3ba4vr7mdHy7-KVKFeJ9vLhufDy2pnm8vGB0trRm.ebNfDbp98EYHwzRNF8dng_uC2QzZu0MY0C2eM_Ba-0U', size: 'md',
      format: 'jpeg',
    }],
    isLocalOnly: true,
    isPopular: false,
    brands: ['Любые'],
  },
]

async function seed() {
  // преобразуем статический массив в формат таблицы
  for (const s of staticServices) {
    const images = s.images.map((m) => ({
      id: m.id,
      url: m.url,
      size: 'original',
      format: 'original',
    }))
    await db.insert(services).values({
      slug: s.slug,
      category: s.category,
      title: s.title,
      subtitle: s.subtitle,
      description: s.description,
      price: s.price,
      features: JSON.stringify(s.features),
      problems: JSON.stringify(s.problems),
      steps: JSON.stringify(s.steps),
      brands: JSON.stringify(s.brands),
      images: JSON.stringify(images),
      isLocalOnly: s.isLocalOnly ?? false,
      isPopular: s.isPopular ?? false,
    })
  }
}

seed().catch(console.error)

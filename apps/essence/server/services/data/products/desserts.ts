import type { Product } from '@nextorders/food-schema'

export const desserts: Product[] = [
  {
    id: 'apple-extravaganza',
    slug: 'apple-extravaganza',
    title: [

      {
        locale: 'ru',
        value: 'Яблочная феерия',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Вкуснейший пирог, который подарит вам незабываемое вкусовое путешествие! Нежное тесто, ароматные яблоки и хрустящая корочка - это сочетание непременно покорит ваше сердце. Окунитесь в атмосферу праздника с этим невероятным пирогом!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'apple-extravaganza-1',
        title: [

          {
            locale: 'ru',
            value: 'Кусок',
          },

        ],
        images: [
          {
            id: 'apple-extravaganza-1-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/apple/3edcaa4ae19111f0aec34e8fe71c43ee_1-min.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 200,
        price: 250,
        sku: null,
        nutritionFacts: {
          calories: 245.0,
          protein: 3.2,
          fat: 9.8,
          carbohydrate: 36.5,
        },
      },
      {
        id: 'apple-extravaganza-2',
        title: [

          {
            locale: 'ru',
            value: '2 куска',
          },

        ],
        images: [
          {
            id: 'apple-extravaganza-2-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/apple/81fdc62ee19111f0aec34e8fe71c43ee_1-min.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 400,
        price: 410,
        sku: null,
        nutritionFacts: {
          calories: 245.0,
          protein: 3.2,
          fat: 9.8,
          carbohydrate: 36.5,
        },
      },
      {
        id: 'apple-extravaganza-3',
        title: [

          {
            locale: 'ru',
            value: 'Весь пирог',
          },

        ],
        images: [
          {
            id: 'apple-extravaganza-3-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/apple/1b7ebd50e19111f0b1c6ee904fec9547_1-min.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 1000,
        price: 930,
        sku: null,
        nutritionFacts: {
          calories: 245.0,
          protein: 3.2,
          fat: 9.8,
          carbohydrate: 36.5,
        },
      },
    ],
  },
  {
    id: 'new-york-chic-cheesecake',
    slug: 'new-york-chic-cheesecake',
    title: [

      {
        locale: 'ru',
        value: 'Чизкейк "Нью-Йоркский шик"',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Ощутите неповторимый вкус настоящего нью-йоркского чизкейка! Нежное сочетание сливочного сыра, хрустящей основы и свежих фруктов подарит вам незабываемые вкусовые ощущения. Приготовленный с любовью, этот десерт станет прекрасным завершением вашего вечера или отличным дополнением к дружеской встрече.',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'new-york-chic-cheesecake-standard',
        title: [

          {
            locale: 'ru',
            value: 'Кусок',
          },

        ],
        images: [
          {
            id: 'new-york-chic-cheesecake-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ev9xnnyqkvvgaf7gho1kzb4j/ae7vq4eyx6s91d4b9t0ni3rr.webp',
          },
          {
            id: 'new-york-chic-cheesecake-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ev9xnnyqkvvgaf7gho1kzb4j/k84a651swcim7r7x8zii54hd.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 145,
        price: 290,
        sku: null,
        nutritionFacts: {
          calories: 320.0,
          protein: 5.8,
          fat: 22.4,
          carbohydrate: 26.7,
        },
      },
    ],
  },
  {
    id: 'mango-swirl',
    slug: 'mango-swirl',
    title: [

      {
        locale: 'ru',
        value: 'Манговый вихрь',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Испытайте настоящий тропический взрыв вкуса с нашим уникальным десертом! Нежное сочетание спелого манго, сливочного крема и хрустящего печенья подарит вам незабываемое удовольствие. Окунитесь в атмосферу тепла и солнечного света с каждым кусочком этого удивительного лакомства.',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'mango-swirl-standard',
        title: [

          {
            locale: 'ru',
            value: 'Кусок',
          },

        ],
        images: [
          {
            id: 'mango-swirl-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ukb4gwwienmjgddaqyoimxmz/g7v74j9dlwcss43t1nmsy5al.webp',
          },
          {
            id: 'mango-swirl-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ukb4gwwienmjgddaqyoimxmz/bm0xwtcu8y2qar1jsc4pyllm.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 230,
        price: 560,
        sku: null,
        nutritionFacts: {
          calories: 285.0,
          protein: 3.1,
          fat: 15.8,
          carbohydrate: 32.4,
        },
      },
    ],
  },
]

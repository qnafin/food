import type { Product } from '@nextorders/food-schema'

export const soups: Product[] = [
  {
    id: 'generous-borscht',
    slug: 'generous-borscht',
    title: [
      {
        locale: 'ru',
        value: 'Щедрый борщ',
      },

    ],
    description: [
      {
        locale: 'ru',
        value: 'Изысканное блюдо для истинных гурманов. Нежное мясо, ароматные овощи и густая сметана создают неповторимый вкус, который вы запомните надолго.',
      },
    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'generous-borscht-standard',
        title: [
          {
            locale: 'ru',
            value: 'Порция',
          },
        ],
        images: [
          {
            id: 'generous-borscht-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ubi2ox88o9u0n2b1kxarwdfp/qrq19yrxo82qdmnif3v3r7sf.webp',
          },
          {
            id: 'generous-borscht-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ubi2ox88o9u0n2b1kxarwdfp/nmtfpbblfwola52plc8h8g09.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 340,
        price: 410,
        sku: null,
        nutritionFacts: {
          calories: 215.0,
          protein: 12.4,
          fat: 14.8,
          carbohydrate: 6.3,
        },
      },
    ],
  },
  {
    id: 'the-charm-of-the-loire',
    slug: 'the-charm-of-the-loire',
    title: [

      {
        locale: 'ru',
        value: 'Очарование Луары',
      },

    ],
    description: [
      {
        locale: 'ru',
        value: 'Откройте для себя настоящий французский луковый суп в нашем ресторане! Нежный сливочный бульон, золотистый лук и пряный тимьян создают неповторимое вкусовое сочетание. Попробуйте этот изысканный суп и почувствуйте атмосферу Франции прямо здесь, в нашем уютном месте!',
      },
    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'the-charm-of-the-loire-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'the-charm-of-the-loire-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/b29mdjyu22mtbgsehn3r3aqd/ir8e66rc2n0hwqjqn314xxvy.webp',
          },
          {
            id: 'the-charm-of-the-loire-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/b29mdjyu22mtbgsehn3r3aqd/krp9ug06k8kifuhhyupzw8kj.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 290,
        price: 420,
        sku: null,
        nutritionFacts: {
          calories: 145.0,
          protein: 3.2,
          fat: 8.4,
          carbohydrate: 12.6,
        },
      },
    ],
  },
  {
    id: 'friendship-sandwich-club',
    slug: 'friendship-sandwich-club',
    title: [

      {
        locale: 'ru',
        value: 'Дружба! Сэндвич! Клуб!',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Попробуйте наш вкусный и сытный сэндвич с куриной лапшой и булочкой! Нежное куриное мясо, сочные овощи и хрустящая булочка - отличный выбор для вашего обеда или ужина. Ощутите неповторимый вкус домашней кухни в уютной атмосфере нашего ресторана!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'friendship-sandwich-club-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'friendship-sandwich-club-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/rjj61it54j5g36rwl80cwvnl/woypsv3ozra98ben43f9yrsm.webp',
          },
          {
            id: 'friendship-sandwich-club-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/rjj61it54j5g36rwl80cwvnl/qduq7sq0e5c0bvb1u81t814w.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 510,
        price: 570,
        sku: null,
        nutritionFacts: {
          calories: 265.0,
          protein: 10.8,
          fat: 11.4,
          carbohydrate: 29.2,
        },
      },
    ],
    badges: [
      {
        id: 'profit',
        title: [
          {
            locale: 'ru',
            value: 'Выгодно 🤑',
          },
        ],
      },
    ],
  },
]

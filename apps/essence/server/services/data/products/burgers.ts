import type { Product } from '@nextorders/food-schema'

export const burgers: Product[] = [
  {
    id: 'wild-west-burger',
    slug: 'wild-west-burger',
    title: [
      {
        locale: 'ru',
        value: 'Бургер "Приключения на Диком Западе"',
      },
    ],
    description: [
      {
        locale: 'ru',
        value: 'Приготовьтесь к путешествию на Дикий Запад с нашим невероятным бургером! Нежное мясо, сочные овощи и хрустящая булочка перенесут вас в мир ковбоев и индейцев. Окунитесь в атмосферу приключений и насладитесь настоящим вкусом Дикого Запада!',
      },
    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'wild-west-burger-standard',
        title: [
          {
            locale: 'ru',
            value: 'Стандарт',
          },
        ],
        images: [
          {
            id: 'wild-west-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/uwzbro4gxzhq462kul2fqy5d/iyov98wlym3mdi5sh1rvevk5.webp',
          },
          {
            id: 'wild-west-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/uwzbro4gxzhq462kul2fqy5d/zg1dmehb0la0424thhpd6s4z.jpg',
          },
        ],
        video: {
          id: 'wild-west-burger-standard-video',
          type: 'video/mp4',
          url: 'https://storage.yandexcloud.net/next-orders-food-demo/video/wild-west-burger-min.mp4',
        },
        weightUnit: 'g',
        weightValue: 370,
        price: 670,
        sku: null,
        nutritionFacts: {
          calories: 285.5,
          protein: 12.3,
          fat: 16.8,
          carbohydrate: 22.1,
        },
      },
    ],
    composition: {
      ingredients: [
        {
          title: [
            {
              locale: 'ru',
              value: 'Котлета из говядины',
            },
          ],
        },
        {
          title: [
            {
              locale: 'ru',
              value: 'Булочка с кунжутом',
            },
          ],
        },
        {
          title: [
            {
              locale: 'ru',
              value: 'Плавленый сыр',
            },
          ],
        },
        {
          title: [
            {
              locale: 'ru',
              value: 'Соус барбекю',
            },
          ],
        },
        {
          title: [
            {
              locale: 'ru',
              value: 'Маринованные огурцы',
            },
          ],
        },
        {
          title: [

            {
              locale: 'ru',
              value: 'Листья салата',
            },

          ],
        },
        {
          title: [

            {
              locale: 'ru',
              value: 'Помидор',
            },

          ],
        },
        {
          title: [

            {
              locale: 'ru',
              value: 'Лук репчатый',
            },

          ],
        },
        {
          title: [

            {
              locale: 'ru',
              value: 'Бекон',
            },

          ],
        },
      ],
    },
    badges: [
      {
        id: 'new',
        title: [

          {
            locale: 'ru',
            value: 'Новинка!',
          },

        ],
      },
    ],
    recommendedProducts: [
      {
        id: 'wild-west-burger-to-cobbs-chic-standard',
        productId: 'cobbs-chic',
        productVariantId: 'cobbs-chic-standard',
      },
      {
        id: 'wild-west-burger-to-mango-swirl-standard',
        productId: 'mango-swirl',
        productVariantId: 'mango-swirl-standard',
      },
      {
        id: 'wild-west-burger-to-cheese-adventures-standard',
        productId: 'cheese-adventures',
        productVariantId: 'cheese-adventures-standard',
      },
      {
        id: 'wild-west-burger-to-cosmic-explosion-of-flavor-standard',
        productId: 'cosmic-explosion-of-flavor',
        productVariantId: 'cosmic-explosion-of-flavor-standard',
      },
    ],
  },
  {
    id: 'tender-clouds-burger',
    slug: 'tender-clouds-burger',
    title: [

      {
        locale: 'ru',
        value: 'Бургер "Нежные облака"',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Почувствуйте нежность облаков с нашим специальным бургером! Сочетание воздушного голубого сыра, сочных овощей и ароматного мяса не оставит вас равнодушными. Идеальный баланс вкуса и удовольствия в каждом кусочке!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'tender-clouds-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'tender-clouds-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/spwe24ppe2n7ukxuc471zlrh/nu27ewqsbxdjdxbxwndbcjjz.webp',
          },
          {
            id: 'tender-clouds-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/spwe24ppe2n7ukxuc471zlrh/acy7mayab2kcg3h2308ptgjc.jpg',
          },
        ],
        video: {
          id: 'tender-clouds-burger-standard-video',
          type: 'video/mp4',
          url: 'https://storage.yandexcloud.net/next-orders-food-demo/video/tender-clouds-burger.mp4',
        },
        weightUnit: 'g',
        weightValue: 370,
        price: 690,
        sku: null,
        nutritionFacts: {
          calories: 265.2,
          protein: 10.8,
          fat: 14.5,
          carbohydrate: 23.7,
        },
      },
    ],
  },
  {
    id: 'veggie-burger',
    slug: 'veggie-burger',
    title: [

      {
        locale: 'ru',
        value: 'Рай для вегетарианцев: вегетарианский бургер',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Насладитесь вегетарианским раем с нашим специальным вегетарианским бургером! Восхитительное сочетание овощей, трав и питательных ингредиентов подарит вам незабываемые вкусовые ощущения. Почувствуйте свежесть природы в каждом кусочке нашего вегетарианского бургера!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'veggie-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'veggie-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/h061mthzlq23w3qsmzmdwmft/gue80i6e9u6g28mmbrlffhy4.webp',
          },
          {
            id: 'veggie-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/h061mthzlq23w3qsmzmdwmft/c17rc9duh6cvmnpdu3p9ctx0.jpg',
          },
        ],
        video: {
          id: 'veggie-burger-standard-video',
          type: 'video/mp4',
          url: 'https://storage.yandexcloud.net/next-orders-food-demo/video/veggie-burger.mp4',
        },
        weightUnit: 'g',
        weightValue: 360,
        price: 550,
        sku: null,
        nutritionFacts: {
          calories: 245.0,
          protein: 8.7,
          fat: 11.2,
          carbohydrate: 27.5,
        },
      },
    ],
  },
  {
    id: 'combo-burgers',
    slug: 'combo-burgers',
    title: [

      {
        locale: 'ru',
        value: 'Мощное комбо: три бургера',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Каждый бургер — это идеальная гармония хрустящей булочки, ароматной котлеты и свежих ингредиентов, собранных в неповторимую вкусовую симфонию. Такое комбо станет звездой любой встречи: будь то дружеский вечер, пикник или просто желание устроить праздник живота. Не отказывайте себе в удовольствии — закажите комбо прямо сейчас и получите тройную порцию гастрономического восторга!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'combo-burgers-combo',
        title: [
          {
            locale: 'ru',
            value: 'Комбо',
          },
        ],
        images: [
          {
            id: 'combo-burgers-combo-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/combo/4f736c6df14411f09c603256d845a97d_1.webp',
          },
          {
            id: 'combo-burgers-combo-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/combo/4f736c6df14411f09c603256d845a97d_1-min.jpg',
          },
        ],
        video: {
          id: 'combo-burgers-combo-video',
          type: 'video/mp4',
          url: 'https://storage.yandexcloud.net/next-orders-food-demo/video/a3e05a78f14611f08accbe6545623af7.mp4',
        },
        weightUnit: 'g',
        weightValue: 980,
        price: 1890,
        originalPrice: 2020,
        sku: null,
        nutritionFacts: {
          calories: 312.5,
          protein: 12.2,
          fat: 17.7,
          carbohydrate: 24.4,
        },
      },
    ],
    composition: {
      products: [
        {
          id: 'combo-burgers-to-delicious-onion-burger',
          productId: 'delicious-onion-burger',
          productVariantId: 'delicious-onion-burger-standard',
        },
        {
          id: 'combo-burgers-to-galactic-burger',
          productId: 'galactic-burger',
          productVariantId: 'galactic-burger-standard',
        },
        {
          id: 'combo-burgers-to-jardines-burger',
          productId: 'jardines-burger',
          productVariantId: 'jardines-burger-standard',
        },
      ],
    },
  },
  {
    id: 'delicious-onion-burger',
    slug: 'delicious-onion-burger',
    title: [

      {
        locale: 'ru',
        value: 'Вкуснейший бургер с луком',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Откройте для себя удивительный мир вкуса с нашим бургером, где нежное мясо, свежие овощи и ароматный жареный лук соединяются в уникальном сочетании. Смакуйте каждый кусочек и погрузитесь в атмосферу истинного гастрономического удовольствия!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'delicious-onion-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'delicious-onion-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/utrtpaw2kef8vwvgm82q2ze1/h29twuipkkp6xijo6osrfto9.webp',
          },
          {
            id: 'delicious-onion-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/utrtpaw2kef8vwvgm82q2ze1/at7i2q9dzqql3vzfdbiybb40.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 350,
        price: 690,
        sku: null,
        nutritionFacts: {
          calories: 295.0,
          protein: 11.8,
          fat: 17.3,
          carbohydrate: 24.2,
        },
      },
    ],
  },
  {
    id: 'galactic-burger',
    slug: 'galactic-burger',
    title: [

      {
        locale: 'ru',
        value: 'Галактический бургер',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Откройте для себя галактический бургер - невероятное сочетание сочных овощей, аппетитного мяса и хрустящей булочки. Ощутите неповторимый вкус далеких звезд и погрузитесь в мир космических приключений прямо за столом!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'galactic-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'galactic-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/f57p82y7lye27qgk7f1sp4g8/cy1p4ig7ifybqsjhpu12oalt.webp',
          },
          {
            id: 'galactic-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/f57p82y7lye27qgk7f1sp4g8/j07pe5ns3s6gcbzz3je5a2n1.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 290,
        price: 640,
        sku: null,
        nutritionFacts: {
          calories: 310.5,
          protein: 13.2,
          fat: 18.7,
          carbohydrate: 25.4,
        },
      },
    ],
  },
  {
    id: 'mushroom-boom-burger',
    slug: 'mushroom-boom-burger',
    title: [

      {
        locale: 'ru',
        value: 'Грибной бум: бургер с секретом',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Откройте для себя удивительный мир вкуса с нашим новым бургером! Нежное мясо, сочные грибы и хрустящая булочка - это сочетание непременно покорит ваше сердце. Ощутите неповторимый вкус настоящего грибного удовольствия!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'mushroom-boom-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'mushroom-boom-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/elprxmcw52e81pr5nfcz55sw/qwccjk40vpncji8exv0bdpjx.webp',
          },
          {
            id: 'mushroom-boom-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/elprxmcw52e81pr5nfcz55sw/musq7d68m6ogv6sg1eet19jh.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 370,
        price: 480,
        sku: null,
        nutritionFacts: {
          calories: 275.0,
          protein: 9.8,
          fat: 15.2,
          carbohydrate: 26.3,
        },
      },
    ],
    badges: [
      {
        id: 'boom',
        title: [

          {
            locale: 'ru',
            value: 'Бум!',
          },

        ],
      },
      {
        id: 'mushroom',
        title: [

          {
            locale: 'ru',
            value: '🍄‍🟫🍄‍🟫🍄‍🟫🤩',
          },

        ],
      },
    ],
  },
  {
    id: 'jardines-burger',
    slug: 'jardines-burger',
    title: [

      {
        locale: 'ru',
        value: 'Бургер "Жардин"',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Ощутите неповторимый вкус сочной котлеты из индейки, приготовленной на гриле, в сочетании с хрустящей булочкой и свежими овощами. Нежное мясо индейки, дополненное ароматными специями и пряностями, станет настоящим открытием для любителей мяса!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'jardines-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'jardines-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/vriq6id8ygb6t71ik19t8wc7/ofpte62xxzx5d0plv8ofy75u.webp',
          },
          {
            id: 'jardines-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/vriq6id8ygb6t71ik19t8wc7/zuqb9tbc2ahsf0dqyoxo5aw1.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 340,
        price: 690,
        sku: null,
        nutritionFacts: {
          calories: 255.0,
          protein: 10.2,
          fat: 12.8,
          carbohydrate: 26.5,
        },
      },
    ],
  },
  {
    id: 'hot-texas-burger',
    slug: 'hot-texas-burger',
    title: [

      {
        locale: 'ru',
        value: 'Горячий техасский бургер',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Ваш путь к настоящему техасскому вкусу! Нежное мясо, свежие овощи и аппетитная булочка - этот бургер точно не оставит вас равнодушным!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'hot-texas-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'hot-texas-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/nc9l7q5xp1y7d5hs520r7w4s/ckjoazoer49zyxxgcm3xc7ew.webp',
          },
          {
            id: 'hot-texas-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/nc9l7q5xp1y7d5hs520r7w4s/t4lzihp962zsut4fp4ixrg97.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 350,
        price: 720,
        sku: null,
        nutritionFacts: {
          calories: 325.0,
          protein: 14.5,
          fat: 20.1,
          carbohydrate: 23.8,
        },
      },
    ],
  },
  {
    id: 'tender-bacon-burger',
    slug: 'tender-bacon-burger',
    title: [

      {
        locale: 'ru',
        value: 'Нежный бургер с беконом',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Окунитесь в нежность бекона: попробуйте наш бургер! Ароматный бекон, сочная котлета и свежие овощи - взрыв вкуса для настоящих гурманов.',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'tender-bacon-burger-standard',
        title: [

          {
            locale: 'ru',
            value: 'Стандарт',
          },

        ],
        images: [
          {
            id: 'tender-bacon-burger-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/jnpl1k1ccqlenfcxh2ad47cx/jzi8p2px4qq5e5vcjyn4ybx0.webp',
          },
          {
            id: 'tender-bacon-burger-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/jnpl1k1ccqlenfcxh2ad47cx/nstzknrddtiql0708xiciaqb.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 340,
        price: 680,
        sku: null,
        nutritionFacts: {
          calories: 305.0,
          protein: 12.4,
          fat: 19.3,
          carbohydrate: 21.7,
        },
      },
    ],
  },
]

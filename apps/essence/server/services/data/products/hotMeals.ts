import type { Product } from '@nextorders/food-schema'

export const hotMeals: Product[] = [
  {
    id: 'chicken-and-shrimp',
    slug: 'chicken-and-shrimp',
    title: [

      {
        locale: 'ru',
        value: 'Тайная страсть: курица и креветки',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Курица и креветки - нежное и изысканное сочетание для настоящих гурманов. Обжаренное куриное филе и тигровые креветки в сливочном соусе станут прекрасным основным блюдом или дополнением к гарниру. Порадуйте себя и своих близких этим вкусным и ароматным горячим блюдом!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'chicken-and-shrimp-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'chicken-and-shrimp-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/o19jh34uh5djqhyra1r6ifhg/lcnxct0p6xj4ga65nhfx480p.webp',
          },
          {
            id: 'chicken-and-shrimp-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/o19jh34uh5djqhyra1r6ifhg/tatjctr8541nks6a1sj9ioku.jpg',
          },
        ],
        video: {
          id: 'chicken-and-shrimp-standard-video',
          type: 'video/mp4',
          url: 'https://storage.yandexcloud.net/next-orders-food-demo/video/chicken-and-shrimp.mp4',
        },
        weightUnit: 'g',
        weightValue: 560,
        price: 1100,
        sku: null,
        nutritionFacts: {
          calories: 215.0,
          protein: 18.2,
          fat: 12.4,
          carbohydrate: 2.1,
        },
      },
    ],
  },
  {
    id: 'triumphant-trio',
    slug: 'triumphant-trio',
    title: [

      {
        locale: 'ru',
        value: '"Триумфальное трио": блюдо из трех яиц',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Идеальное сочетание трех яиц, обжаренных до золотистой корочки, с ароматными травами и нежным кремом. Это блюдо станет настоящим открытием для вашего вкуса и подарит вам незабываемые впечатления!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'triumphant-trio-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'triumphant-trio-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/zbfk6ms85ra5zcb5dcg3jwkk/im312tvr3zh03v269dn33abu.webp',
          },
          {
            id: 'triumphant-trio-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/zbfk6ms85ra5zcb5dcg3jwkk/y3mfvavfhon6k9qaqaa48g6g.jpg',
          },
        ],
        video: {
          id: 'triumphant-trio-standard-video',
          type: 'video/mp4',
          url: 'https://storage.yandexcloud.net/next-orders-food-demo/video/triumphant-trio.mp4',
        },
        weightUnit: 'g',
        weightValue: 320,
        price: 460,
        sku: null,
        nutritionFacts: {
          calories: 245.0,
          protein: 13.8,
          fat: 20.1,
          carbohydrate: 1.2,
        },
      },
    ],
    badges: [
      {
        id: 'hit',
        title: [

          {
            locale: 'ru',
            value: 'Хит 🔥',
          },

        ],
      },
    ],
  },
  {
    id: 'firebird-fajitas',
    slug: 'firebird-fajitas',
    title: [

      {
        locale: 'ru',
        value: 'Фахитас "Жар-птица"',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Ощутите неповторимый вкус Мексики с нашими ароматными куриными фахитас! Нежное куриное мясо, обжаренное с овощами и специями, станет отличным дополнением к вашим любимым тортильям. Наслаждайтесь ярким вкусом и заряжайтесь энергией солнца!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'firebird-fajitas-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'firebird-fajitas-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/a85j7h0w2gag9vba1ueiqchg/yw4ju4247pctosszpjj7tuj7.webp',
          },
          {
            id: 'firebird-fajitas-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/a85j7h0w2gag9vba1ueiqchg/qu0j0eaf0qa6h0n3pp7womhh.jpg',
          },
        ],
        video: {
          id: 'firebird-fajitas-standard-video',
          type: 'video/mp4',
          url: 'https://storage.yandexcloud.net/next-orders-food-demo/video/firebird-fajitas.mp4',
        },
        weightUnit: 'g',
        weightValue: 680,
        price: 1290,
        sku: null,
        nutritionFacts: {
          calories: 185.0,
          protein: 14.2,
          fat: 9.8,
          carbohydrate: 10.5,
        },
      },
    ],
  },
  {
    id: 'grilled-salmon-with-chimichurri',
    slug: 'grilled-salmon-with-chimichurri',
    title: [

      {
        locale: 'ru',
        value: 'Лосось на гриле с чимичурри',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Испытайте взрыв вкуса с нашим горячим блюдом «Лосось на гриле с чимичурри»! Ароматный лосось со специями обжаривается на гриле до золотистого цвета, а затем подается с освежающим соусом чимичурри. Идеальный баланс вкуса и аромата для вашего удовольствия!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'grilled-salmon-with-chimichurri-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'grilled-salmon-with-chimichurri-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/w50416t27ia8mmtnv9c5tenf/rppbthi0yn3lkyrxo6gqfwpy.webp',
          },
          {
            id: 'grilled-salmon-with-chimichurri-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/w50416t27ia8mmtnv9c5tenf/peps6bmovg7lwima8ohltrnh.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 395,
        price: 1890,
        sku: null,
        nutritionFacts: {
          calories: 195.0,
          protein: 22.4,
          fat: 11.3,
          carbohydrate: 2.1,
        },
      },
    ],
  },
  {
    id: 'seafood-kingdom',
    slug: 'seafood-kingdom',
    title: [

      {
        locale: 'ru',
        value: 'Королевство морепродуктов',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Нежная соте из трески и креветок - изысканное сочетание вкусов морепродуктов в ароматном томатном соусе. Это горячее блюдо станет настоящим украшением вашего стола и приведет в восторг ваших гостей!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'seafood-kingdom-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'seafood-kingdom-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ops6nhjn1b64emyhjb2znkwt/be2qt63zw0lwuhgj97byth4p.webp',
          },
          {
            id: 'seafood-kingdom-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ops6nhjn1b64emyhjb2znkwt/rrr21lv093vnvvha1r0e234k.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 460,
        price: 1790,
        sku: null,
        nutritionFacts: {
          calories: 175.0,
          protein: 16.8,
          fat: 8.2,
          carbohydrate: 7.5,
        },
      },
    ],
  },
  {
    id: 'jambalaya-with-chicken',
    slug: 'jambalaya-with-chicken',
    title: [

      {
        locale: 'ru',
        value: 'Джамбалайя с курицей и креветками в стиле канжун',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Откройте для себя неповторимый вкус джамбалайи с курицей и креветками по-канжунски! Это горячее блюдо сочетает в себе французские и испанские кулинарные традиции и порадует даже самых требовательных гурманов. Попробуйте и убедитесь сами!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'jambalaya-with-chicken-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'jambalaya-with-chicken-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/shrnqlr0cfnob02tmv6ejtua/yodhwua24wy2g7arr5jm072q.webp',
          },
          {
            id: 'jambalaya-with-chicken-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/shrnqlr0cfnob02tmv6ejtua/muujn5i21dtldxplfu31ncyc.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 390,
        price: 990,
        sku: null,
        nutritionFacts: {
          calories: 210.0,
          protein: 12.5,
          fat: 9.8,
          carbohydrate: 18.3,
        },
      },
    ],
  },
]

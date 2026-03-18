import type { Product } from '@nextorders/food-schema'

export const snacks: Product[] = [
  {
    id: 'wings-of-happiness',
    slug: 'wings-of-happiness',
    title: [
      {
        locale: 'ru',
        value: 'Крылья счастья: Горячее дыхание Баффало',
      },
    ],
    description: [

      {
        locale: 'ru',
        value: 'Жареные крылышки «Баффало» - пряные, сочные и невероятно вкусные! Идеальный выбор для веселой вечеринки.',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'wings-of-happiness-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'wings-of-happiness-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/geoz5efvfrtpbku5myow8ot6/zlqgkzwsovvcj4bjdohob5q0.webp',
          },
          {
            id: 'wings-of-happiness-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/geoz5efvfrtpbku5myow8ot6/t515cd60u0wzjkdxed11htfu.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 380,
        price: 890,
        sku: null,
        nutritionFacts: {
          calories: 290.0,
          protein: 18.5,
          fat: 21.0,
          carbohydrate: 4.2,
        },
      },
    ],
    badges: [
      {
        id: 'hot',
        title: [

          {
            locale: 'ru',
            value: '🔥🥵',
          },

        ],
      },
    ],
  },
  {
    id: 'vegetable-bounty',
    slug: 'vegetable-bounty',
    title: [

      {
        locale: 'ru',
        value: 'Овощное изобилие',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Насладитесь вкусом свежих овощей в нашей овощной кесадилье! Это идеальное сочетание сочных ингредиентов, приправленных ароматными специями. Не упустите возможность попробовать нашу овощную кесадилью и зарядиться энергией ярких вкусов!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'vegetable-bounty-1',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'vegetable-bounty-1-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/o2s1qy9woevy5jlur0rjapge/qdjhb8ymm5ku7zkezzvwocbf.webp',
          },
          {
            id: 'vegetable-bounty-1-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/o2s1qy9woevy5jlur0rjapge/gc10ndq5xirqv8pmdh06pp7e.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 320,
        price: 760,
        sku: null,
        nutritionFacts: {
          calories: 215.0,
          protein: 6.8,
          fat: 10.2,
          carbohydrate: 24.5,
        },
      },
    ],
  },
  {
    id: 'cheeseburgerettes',
    slug: 'cheeseburgerettes',
    title: [

      {
        locale: 'ru',
        value: 'Чизбургерята',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Нежные мини-чизбургеры - идеальный перекус для всей семьи! Вкуснейшие мини-бургеры с настоящим американским сыром, сочной котлетой и свежими овощами. Почувствуйте атмосферу настоящего американского ресторана прямо здесь и сейчас!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'cheeseburgerettes-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'cheeseburgerettes-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/t1sxbe8qflit6m2l2r3wfr84/hffyl2ilqmwx3bgknenc8kic.webp',
          },
          {
            id: 'cheeseburgerettes-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/t1sxbe8qflit6m2l2r3wfr84/zv369hlyflc0cpj9v6fpkdxx.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 280,
        price: 670,
        sku: null,
        nutritionFacts: {
          calories: 290.0,
          protein: 11.5,
          fat: 17.0,
          carbohydrate: 22.0,
        },
      },
    ],
  },
  {
    id: 'hot-cheese-and-bacon',
    slug: 'hot-cheese-and-bacon',
    title: [

      {
        locale: 'ru',
        value: 'Горячий сыр с беконом',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Ощутите неповторимый вкус картофеля фри с сыром чеддер и беконом в нашем ресторане! Это идеальное сочетание для настоящих гурманов.',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'hot-cheese-and-bacon-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'hot-cheese-and-bacon-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/n9373apfpvv6nt1cy4syzhoz/bjr8xgxc8lqg8a8diccrqul9.webp',
          },
          {
            id: 'hot-cheese-and-bacon-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/n9373apfpvv6nt1cy4syzhoz/l2kw7dlw7vog3oebooy893np.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 260,
        price: 560,
        sku: null,
        nutritionFacts: {
          calories: 320.0,
          protein: 7.8,
          fat: 21.5,
          carbohydrate: 24.2,
        },
      },
    ],
  },
  {
    id: 'cheese-adventures',
    slug: 'cheese-adventures',
    title: [

      {
        locale: 'ru',
        value: 'Сырные приключения: начос с тремя видами сыра',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Приглашаем вас окунуться в атмосферу настоящего мексиканского праздника с нашими уникальными начос с сыром! Нежное сочетание трех видов сыра и хрустящей кукурузной тортильи не оставит равнодушным даже самого искушенного гурмана. Подавайте с острым соусом или сальсой - это идеальное сочетание для незабываемого вечера в кругу друзей и семьи.',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'cheese-adventures-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'cheese-adventures-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/qxnfnd0vnczdhqikk6hj1gjh/y7c5udk2g17ubqfwvkrx8knd.webp',
          },
          {
            id: 'cheese-adventures-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/qxnfnd0vnczdhqikk6hj1gjh/tt88a75qegorcugnj0snkifh.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 280,
        price: 620,
        sku: null,
        nutritionFacts: {
          calories: 310.0,
          protein: 9.2,
          fat: 18.5,
          carbohydrate: 26.8,
        },
      },
    ],
  },
  {
    id: 'bacon-extravaganza',
    slug: 'bacon-extravaganza',
    title: [

      {
        locale: 'ru',
        value: 'Беконная феерия',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Откройте для себя новый уровень удовольствия с нашей фирменной пиццадильей! Тонкое тесто, аппетитный бекон и сыр - это сочетание обязательно покорит ваше сердце. Не упустите возможность насладиться этим невероятным вкусом в уютной атмосфере нашего ресторана!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'bacon-extravaganza-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'bacon-extravaganza-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ebi7bbxm3je2ryojb08sxqse/ebsvezz9qwgax1bdrie4txvy.webp',
          },
          {
            id: 'bacon-extravaganza-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ebi7bbxm3je2ryojb08sxqse/n0u1vm4plva6izrmtp5ejd0a.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 330,
        price: 720,
        sku: null,
        nutritionFacts: {
          calories: 295.0,
          protein: 11.8,
          fat: 16.2,
          carbohydrate: 27.4,
        },
      },
    ],
  },
  {
    id: 'the-magic-threads-of-gouda',
    slug: 'the-magic-threads-of-gouda',
    title: [

      {
        locale: 'ru',
        value: 'Волшебные нити Гауды',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Откройте для себя удивительный мир вкусов с изысканными сырами, которые подарят вам незабываемые впечатления с каждым кусочком.',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'the-magic-threads-of-gouda-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'the-magic-threads-of-gouda-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ewpllhys5iiekvj8lg5r3129/kzo8aljfyyhlwbad72gn4ukt.webp',
          },
          {
            id: 'the-magic-threads-of-gouda-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/ewpllhys5iiekvj8lg5r3129/f3k614b3ekadn3a1i633thu9.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 160,
        price: 470,
        sku: null,
        nutritionFacts: {
          calories: 356.0,
          protein: 24.9,
          fat: 27.8,
          carbohydrate: 2.2,
        },
      },
    ],
  },
  {
    id: 'flaming-quesadilla',
    slug: 'flaming-quesadilla',
    title: [

      {
        locale: 'ru',
        value: '"Пламенная кесадилья": острые ломтики курицы',
      },

    ],
    description: [

      {
        locale: 'ru',
        value: 'Приглашаем вас насладиться изысканной куриной кесадильей в нашем ресторане! Нежное куриное филе, ароматные специи и золотистый сыр - это сочетание непременно покорит ваше сердце. Подается с овощами и соусом сальса. Почувствуйте неповторимый вкус настоящей мексиканской кухни в уютной атмосфере нашего ресторана!',
      },

    ],
    isAvailableForPurchase: true,
    isShownInCatalog: true,
    variants: [
      {
        id: 'flaming-quesadilla-standard',
        title: [

          {
            locale: 'ru',
            value: 'Порция',
          },

        ],
        images: [
          {
            id: 'flaming-quesadilla-standard-webp-md',
            size: 'md',
            format: 'webp',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/z6q4v581rc6yd59qgl49zorn/uisxyj3hm1te8559li54a6rl.webp',
          },
          {
            id: 'flaming-quesadilla-standard-jpeg-md',
            size: 'md',
            format: 'jpeg',
            url: 'https://storage.yandexcloud.net/next-orders-food-demo/products/z6q4v581rc6yd59qgl49zorn/kj5gd6bc8ml8crngyjqfgig1.jpg',
          },
        ],
        weightUnit: 'g',
        weightValue: 370,
        price: 760,
        sku: null,
        nutritionFacts: {
          calories: 285.0,
          protein: 16.3,
          fat: 14.8,
          carbohydrate: 21.5,
        },
      },
    ],
  },
]

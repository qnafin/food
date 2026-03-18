import type { GatewayGetMenuResponse, Menu } from '@nextorders/food-schema'
import { burgers } from './data/products/burgers'
import { desserts } from './data/products/desserts'
import { hotMeals } from './data/products/hotMeals'
import { salads } from './data/products/salads'
import { snacks } from './data/products/snacks'
import { soups } from './data/products/soups'

const categories: Menu['categories'] = [
  {
    id: 'burgers',
    slug: 'burgers',
    title: [
      {
        locale: 'ru',
        value: 'Бургеры',
      },
    ],
    icon: 'i-fluent-emoji-flat:hamburger',
    products: burgers,
  },
  {
    id: 'hot-meals',
    slug: 'hot-meals',
    title: [
      {
        locale: 'ru',
        value: 'Горячие блюда',
      },
    ],
    icon: 'i-fluent-emoji-flat:spaghetti',
    products: hotMeals,
  },
  {
    id: 'salads',
    slug: 'salads',
    title: [
      {
        locale: 'ru',
        value: 'Салаты',
      },
    ],
    icon: 'i-fluent-emoji-flat:green-salad',
    products: salads,
  },
  {
    id: 'soups',
    slug: 'soups',
    title: [
      {
        locale: 'ru',
        value: 'Супы',
      },
    ],
    icon: 'i-fluent-emoji-flat:pot-of-food',
    products: soups,
  },
  {
    id: 'snacks',
    slug: 'snacks',
    title: [
      {
        locale: 'ru',
        value: 'Закуски',
      },
    ],
    icon: 'i-fluent-emoji-flat:sandwich',
    products: snacks,
  },
  {
    id: 'desserts',
    slug: 'desserts',
    title: [
      {
        locale: 'ru',
        value: 'Десерты',
      },
    ],
    icon: 'i-fluent-emoji-flat:shortcake',
    products: desserts,
  },
]

const menu: Menu = {
  id: 'default-menu',
  title: [
    {
      locale: 'ru',
      value: 'Обычное меню',
    },
  ],
  slug: 'default-menu',
  isActive: true,
  categories,
}

export function handleGetMenu(): GatewayGetMenuResponse {
  return {
    ok: true,
    type: 'getMenu',
    result: menu,
  }
}

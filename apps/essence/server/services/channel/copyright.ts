import type { Channel } from '@nextorders/food-schema'
import process from 'node:process'

// Копирайт
export const copyright: Channel['copyright'] = [
  {
    locale: 'ru',
    value: `© 2024—${new Date().getFullYear()} ${process.env.YOUR_NAME || 'ООО Ваша компания'}. Все права защищены.
ИНН: ${process.env.INN || '9876543210'} ОГРН: ${process.env.OGRN || '123456789012345'}.
${process.env.LOCAL_ADDRESS || 'Ваш адрес'}

Информация на сайте не является публичной офертой.
Изображения товаров могут отличаться от оригинала.`,
  },
]

import type { Channel } from '@nextorders/food-schema'
import process from 'node:process'
// Ссылки
export const links: Channel['links'] = {
  aside: [
    {
      label: [{ locale: 'ru', value: process.env.PHONE_NUMBER || 'Номер телефона' }],
      to: process.env.PHONE_NUMBER ? `tel:${process.env.PHONE_NUMBER}` : '',
      icon: 'i-lucide-phone-call',
    },
  ],
  footer: [
    {
      label: [{ locale: 'ru', value: 'Публичная оферта' }],
      to: '/offer',
    },
    {
      label: [{ locale: 'ru', value: 'Политика конфиденциальности' }],
      to: '/privacy',
    },
  ],
  social: [
    {
      to: 'https://vk.com/club83968642',
      icon: 'i-simple-icons:vk',
      target: '_blank',
    },
    // {
    //   to: 'https://t.me/hmbanan666',
    //   icon: 'i-simple-icons:telegram',
    //   target: '_blank',
    // },
  ],
}

import type { Channel } from '@nextorders/food-schema'

// Ссылки
export const links: Channel['links'] = {
  aside: [
    {
      label: [{ locale: 'ru', value: '8 800 123-45-69' }],
      to: 'tel:88001234569',
      icon: 'i-lucide-phone-call',
    },
  ],
  footer: [
    {
      label: [{ locale: 'ru', value: 'Публичная оферта' }],
      to: '#',
    },
    {
      label: [{ locale: 'ru', value: 'Политика конфиденциальности' }],
      to: '#',
    },
    {
      label: [{ locale: 'ru', value: 'Софт для e-commerce' }],
      to: 'https://startodel.ru/',
      target: '_blank',
    },
  ],
  social: [
    {
      to: 'https://github.com/hmbanan666',
      icon: 'i-simple-icons:github',
      target: '_blank',
    },
    {
      to: 'https://t.me/hmbanan666',
      icon: 'i-simple-icons:telegram',
      target: '_blank',
    },
  ],
}

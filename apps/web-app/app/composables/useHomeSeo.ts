// composables/useHomeSeo.ts
export function useHomeSeo(
  siteTitle: string,
  siteDescription: string,
  siteUrl: string,
  siteImage?: string,
) {
  // Формируем обогащённое описание для SEO
  const enhanceDescription = () => {
    const base = siteDescription || 'Частный мастер по ремонту электросамокатов, электровелосипедов, скутеров. Изготовление и ремонт аккумуляторов 18650, переделка Ni-Cd на Li-ion.'
    // Добавляем ключевые слова и географию
    const additions = ' Работаю с брендами: Xiaomi, Ninebot, Kugoo, Kaabo, Dualtron и другие. Услуги в Магнитогорске, доставка аккумуляторов по всей России.'
    return base + additions
  }

  const fullDescription = enhanceDescription()
  const image = siteImage || '/images/hero-bg.jpg' // путь к изображению по умолчанию

  useSeoMeta({
    title: siteTitle,
    description: fullDescription,
    ogTitle: siteTitle,
    ogDescription: fullDescription,
    ogImage: image,
    ogUrl: siteUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: siteTitle,
    twitterDescription: fullDescription,
    twitterImage: image,
  })

  // Структурированные данные (LocalBusiness)
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': siteTitle,
    'description': fullDescription,
    'url': siteUrl,
    'image': image,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Магнитогорск',
      'addressRegion': 'Челябинская область',
      'addressCountry': 'RU',
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Магнитогорск',
      },
      {
        '@type': 'Country',
        'name': 'RU',
        'description': 'Доставка аккумуляторов по всей России',
      },
    ],
    'availableService': [
      { '@type': 'Service', 'name': 'Ремонт электросамокатов' },
      { '@type': 'Service', 'name': 'Ремонт электровелосипедов' },
      { '@type': 'Service', 'name': 'Ремонт аккумуляторов' },
      { '@type': 'Service', 'name': 'Изготовление аккумуляторов 18650' },
    ],
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(businessSchema),
      },
    ],
  })
}

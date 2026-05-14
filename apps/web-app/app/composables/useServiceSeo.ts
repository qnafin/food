// composables/useServiceSeo.ts
import type { Service } from '@nextorders/food-schema'

const NON_DIGIT_REGEX = /\D/g // ✅ вынесено в модульную константу

export function useServiceSeo(service: Service, siteName: string) {
  const getLocalized = (field: any) => {
    if (!field) {
      return ''
    }
    if (Array.isArray(field)) {
      const ru = field.find((f: any) => f.locale === 'ru')
      return ru?.value ?? field[0]?.value ?? ''
    }
    return field
  }

  const title = getLocalized(service.title)
  const subtitle = getLocalized(service.subtitle)
  const description = getLocalized(service.description)
  const price = service.price || ''
  const brands = service.brands || []

  // География
  let geographyText = ''
  if (service.isLocalOnly === false) {
    geographyText = 'с доставкой по всей России'
  } else {
    geographyText = 'в Магнитогорске (а также для клиентов из ближайших городов: Челябинск, Белорецк, Учалы, Сибай)'
  }

  // Формируем перечень брендов для описания (первые 5)
  let brandsText = ''
  if (brands.length) {
    const displayedBrands = brands.slice(0, 5)
    brandsText = `Работаю с брендами: ${displayedBrands.join(', ')}${brands.length > 5 ? ' и другие' : ''}. `
  }

  // Генерация описания (около 150-160 символов)
  const generateDescription = () => {
    const parts: string[] = []
    if (price) {
      parts.push(`Цена: ${price}`)
    }
    if (subtitle) {
      parts.push(subtitle)
    }
    if (service.features?.length) {
      parts.push(...service.features.slice(0, 2))
    }
    if (brandsText) {
      parts.push(brandsText.trim())
    }
    parts.push(geographyText)

    let fullDescription = parts.join('. ')
    if (!fullDescription && description) {
      fullDescription = description
    }
    // если нужно обрезать – раскомментировать
    // if (fullDescription.length > 160) {
    //   fullDescription = fullDescription.slice(0, 157) + '…'
    // }
    return fullDescription || `Ремонт электротранспорта в Магнитогорске. ${title} – качественно, с гарантией.`
  }

  const metaDescription = generateDescription()
  const imageUrl = service.images?.[0]?.url || '/images/placeholder-service.jpg'

  const titleWithRegion = service.isLocalOnly === false
    ? `${title} с доставкой по России | Ремонт электротранспорта`
    : `${title} в Магнитогорске | Ремонт электротранспорта`

  useSeoMeta({
    title: titleWithRegion,
    description: metaDescription,
    ogTitle: `${title} | ${siteName}`,
    ogDescription: metaDescription,
    ogImage: imageUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: metaDescription,
    twitterImage: imageUrl,
  })

  // Структурированные данные
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': title,
    'description': description || metaDescription,
    'provider': {
      '@type': 'Person',
      'name': 'Частный мастер',
      'areaServed': service.isLocalOnly === false
        ? 'RU'
        : {
            '@type': 'City',
            'name': 'Магнитогорск',
          },
    },
    ...(brands.length && { keywords: brands.join(', ') }),
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Услуги по ремонту электротранспорта',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': title,
          },
          'price': price.replace(NON_DIGIT_REGEX, '') || '0',
          'priceCurrency': 'RUB',
          'availability': 'https://schema.org/InStock',
        },
      ],
    },
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(serviceSchema),
      },
    ],
  })
}

// composables/useProductSeo.ts
import type { Product, ProductVariant } from '@nextorders/food-schema'

export function useProductSeo(
  product: Product,
  variant: ProductVariant | undefined,
  categoryTitle: string,
  siteName: string,
) {
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

  const productTitle = getLocalized(product.title)
  const variantTitle = variant ? getLocalized(variant.title) : ''
  const fullTitle = variantTitle ? `${productTitle} (${variantTitle})` : productTitle

  // Генерация описания из цены и всех характеристик (nutritionFacts)
  const generateDescription = () => {
    const parts: string[] = []

    // Цена
    if (variant?.price) {
      parts.push(`цена ${variant.price} ₽`)
    }

    // Все характеристики из nutritionFacts (кроме стандартных, если они уже есть)
    if (variant?.nutritionFacts && typeof variant.nutritionFacts === 'object') {
      const facts = variant.nutritionFacts as Record<string, any>
      // Перебираем все ключи, форматируем значение
      for (const [key, value] of Object.entries(facts)) {
        if (value === undefined || value === null || value === '') {
          continue
        }
        const formattedValue = String(value)
        // Для числовых характеристик можно добавить единицы, но проще оставить как есть
        parts.push(`${key}: ${formattedValue}`)
      }
    }

    // Если после характеристик описание получилось слишком длинным, обрежем (оставим ~140 символов)
    let description = parts.join(', ')
    if (description.length > 140) {
      description = `${description.slice(0, 140)}…`
    }

    // Если совсем пусто – используем описание товара или фразу по умолчанию
    if (!description && product.description) {
      const desc = getLocalized(product.description)
      description = desc ? desc.slice(0, 150) : ''
    }
    if (!description) {
      description = `Купить ${productTitle} с доставкой по России`
    }

    return description
  }

  const description = generateDescription()
  const imageUrl = variant?.images?.[0]?.url || product.images?.[0]?.url

  // Применяем мета-теги
  useSeoMeta({
    title: `${fullTitle} | ${siteName}`,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
  })

  // JSON-LD
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': fullTitle,
    'description': description,
    'image': imageUrl,
    'offers': {
      '@type': 'Offer',
      'price': variant?.price ?? 0,
      'priceCurrency': 'RUB',
      'availability': 'https://schema.org/InStock',
      'url': typeof window !== 'undefined' ? window.location.href : '',
    },
    'brand': {
      '@type': 'Brand',
      'name': variant?.nutritionFacts?.Производитель || 'Мастер',
    },
    'category': categoryTitle,
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(productSchema),
      },
    ],
  })
}

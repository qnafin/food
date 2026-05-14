// composables/useCategorySeo.ts
import type { MenuCategory, Product } from '@nextorders/food-schema'

export function useCategorySeo(
  category: MenuCategory,
  products: Product[],
  siteName: string,
  categoryDescription?: string,
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

  const categoryTitle = getLocalized(category.title)
  const description = categoryDescription || `Купить ${categoryTitle} с доставкой по России. В наличии: ${products.length} товаров.`

  // Формируем более богатое описание, если есть товары
  let productKeywords = ''
  if (products.length) {
    const productNames = products.slice(0, 3).map((p) => getLocalized(p.title)).filter(Boolean)
    if (productNames.length) {
      productKeywords = ` В ассортименте: ${productNames.join(', ')}${products.length > 3 ? ' и другие' : ''}.`
    }
  }

  const fullDescription = description + productKeywords
  const truncatedDescription = fullDescription.length > 160 ? `${fullDescription.slice(0, 157)}…` : fullDescription

  // Заголовок страницы
  const title = `${categoryTitle} | ${siteName}`

  useSeoMeta({
    title,
    description: truncatedDescription,
    ogTitle: title,
    ogDescription: truncatedDescription,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: truncatedDescription,
  })

  // Структурированные данные: список товаров (ItemList)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': categoryTitle,
    'description': truncatedDescription,
    'numberOfItems': products.length,
    'itemListElement': products.map((product, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'url': typeof window !== 'undefined' ? `${window.location.origin}/${category.slug}/${product.slug}` : '',
      'name': getLocalized(product.title),
    })),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(itemListSchema),
      },
    ],
  })
}

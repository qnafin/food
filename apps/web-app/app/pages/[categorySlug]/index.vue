<template>
  <CatalogBreadcrumb :items="breadcrumbs" />

  <h1 class="text-2xl md:text-3xl font-semibold">
    {{ optionsStore.getLocaleValue(category?.title) }}
  </h1>
  <!-- SEO-описание (динамическое) -->
  <div v-if="categoryDescription" class="text-base/5">
    {{ categoryDescription }}
  </div>
  <div v-else class="text-base/5 text-muted">
    {{ $dict('web-app.category-page-description') }}
  </div>

  <div class="mt-4 max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute()
const { dict } = useDictionary()

const channelStore = useChannelStore()
const optionsStore = useOptionsStore()
const menuStore = useMenuStore()

const category = menuStore.getCategoryBySlug(String(params.categorySlug))
if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

const products = menuStore.getProductsInCategory(category.id).filter((p) => p.isAvailableForPurchase && p.variants.length)

// Генерация динамического описания категории (можно брать из отдельного поля, но пока генерируем)
const categoryDescription = computed(() => {
  const title = optionsStore.getLocaleValue(category.title)
  const productCount = products.length
  let desc = `Широкий выбор ${title.toLowerCase()} в наличии. Доставка по России.`
  if (productCount) {
    desc = `В категории «${title}» представлено ${productCount} товаров. ${desc}`
  }
  return desc
})

// Применяем SEO
const siteName = optionsStore.getLocaleValue(channelStore.title) || 'Ремонт электротранспорта'
useCategorySeo(category, products, siteName, categoryDescription.value)

// Если у вас нет автоимпорта, импортируйте композабл:
// import { useCategorySeo } from '~/composables/useCategorySeo'

const breadcrumbs = computed(() => [
  { label: dict('common.home'), icon: 'lucide:house', to: '/' },
  { label: optionsStore.getLocaleValue(category?.title) },
])
</script>

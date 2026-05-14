<template>
  <CatalogBreadcrumb :items="breadcrumbs" />

  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-0 gap-y-4 sm:gap-4">
      <div class="col-span-1">
        <ProductMediaGallery :selected-variant="selectedVariant">
          <template #badges>
            <div v-if="product.badges?.length" class="absolute left-2.5 right-6 bottom-3.5">
              <div class="flex flex-col gap-1.5">
                <ProductBadge
                  v-for="badge in product.badges"
                  :key="badge.id"
                  :badge="badge"
                />
              </div>
            </div>
          </template>
        </ProductMediaGallery>
      </div>

      <div class="col-span-2">
        <h1 class="text-xl/6 md:text-2xl/7 font-semibold text-highlighted">
          {{ optionsStore.getLocaleValue(product?.title) }}
        </h1>
        <div class="mt-1 font-normal text-muted flex flex-row gap-3">
          <span>{{ weightValue }}{{ weightUnit }}</span>
          <span>{{ optionsStore.getLocaleValue(selectedVariant?.title) }}</span>
        </div>

        <div v-if="!withSingleVariant" class="mt-4 mb-6">
          <USelect
            v-model="selectedVariantId"
            :items="variantItems"
            size="xl"
            icon="lucide:bookmark-check"
            class="min-w-56"
          />
        </div>

        <div class="mt-4 min-h-12 flex flex-row gap-4 md:gap-6 items-center justify-between md:justify-start">
          <div class="flex flex-col gap-0.5">
            <ProductOriginalPrice
              v-if="selectedVariant?.originalPrice"
              :price="optionsStore.formatCurrency(selectedVariant.originalPrice)"
              class="w-fit"
            />

            <div class="text-2xl/6 font-medium tracking-tight">
              {{ optionsStore.formatCurrency(selectedVariant?.price ?? 0) }} <span class="text-xl">{{ optionsStore.currencySign }}</span>
            </div>
          </div>

          <template v-if="orderStore.isLoading">
            <UIcon name="i-lucide-loader-circle" class="size-10 text-dimmed/25 motion-preset-spin" />
          </template>
          <template v-else>
            <CartLineCounter v-if="line" :line="line" />
            <UButton
              v-else-if="selectedVariantId"
              size="xl"
              variant="solid"
              color="secondary"
              icon="lucide:shopping-basket"
              :label="$dict('web-app.cart.add-to-cart')"
              :ui="{
                leadingIcon: 'hidden md:block',
              }"
              class="md:px-6 font-medium"
              @click="orderStore.add(selectedVariantId)"
            />
          </template>
        </div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-6">
      <div v-if="product?.composition" class="col-span-full">
        <ProductCompositionBlock :composition="product.composition" />
      </div>

      <div v-if="product?.description?.length" class="col-span-3">
        <h2 class="mb-1 font-medium text-muted">
          {{ $dict('common.description') }}
        </h2>
        <div class="text-base/5">
          {{ optionsStore.getLocaleValue(product?.description) }}
        </div>
      </div>

      <div v-if="selectedVariant?.nutritionFacts && Object.keys(selectedVariant.nutritionFacts).length" class="col-span-2">
        <h2 class="mb-2 font-medium text-muted">
          Характеристики
        </h2>
        <div class="bg-elevated/50 rounded-lg overflow-hidden border border-gray-800">
          <table class="w-full text-sm">
            <tbody>
              <tr
                v-for="(value, key) in displayableNutritionFacts"
                :key="key"
                class="border-b border-gray-800 last:border-b-0"
              >
                <td class="py-3 px-4 font-medium text-white w-1/2">
                  {{ formatNutritionKey(key) }}
                </td>
                <td class="py-3 px-4 text-muted">
                  {{ formatNutritionValue(key, value) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="product.recommendedProducts?.length" class="mt-12">
      <h2 class="mb-2 font-medium text-muted">
        {{ $dict('web-app.most-often-added') }}
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 md:gap-6">
        <ProductRecommendedCard
          v-for="p in product.recommendedProducts"
          :key="p.productVariantId"
          :product="p"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { dict } = useDictionary()
const { params } = useRoute()

const orderStore = useOrderStore()
const channelStore = useChannelStore()
const optionsStore = useOptionsStore()
const menuStore = useMenuStore()

const product = menuStore.getProductBySlug(String(params.productSlug))

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

useHead({
  title: `${optionsStore.getLocaleValue(product.title)} | ${optionsStore.getLocaleValue(channelStore.title)}`,
})

const variantItems = computed(() => product.variants.map((variant) => ({ label: optionsStore.getLocaleValue(variant.title), value: variant.id })))
const withSingleVariant = computed<boolean>(() => product.variants.length === 1)
const selectedVariantId = ref(product.variants[0]?.id)
const selectedVariant = computed(() => product.variants.find(({ id }) => id === selectedVariantId.value))

const weightValue = computed(() => selectedVariant.value?.weightValue)
const weightUnit = computed(() => getWeightLocalizedUnit(selectedVariant.value?.weightUnit))
const line = computed(() => orderStore.items.find((l) => l.variantId === selectedVariant.value?.id))
const category = menuStore.getCategoryByProductId(product.id)

const breadcrumbs = computed(() => [
  { label: dict('common.home'), icon: 'lucide:house', to: '/' },
  { label: optionsStore.getLocaleValue(category?.title), to: `/${category?.slug}` },
])
const siteName = optionsStore.getLocaleValue(channelStore.title) // или явная строка
const categoryTitle = optionsStore.getLocaleValue(category?.title) || ''

// Применяем SEO
useProductSeo(product, selectedVariant.value, categoryTitle, siteName)

// Получаем объект характеристик (без пустых значений)
const displayableNutritionFacts = computed(() => {
  const facts = selectedVariant.value?.nutritionFacts
  if (!facts) {
    return {}
  }
  const result = {}
  for (const [key, val] of Object.entries(facts)) {
    // пропускаем null, undefined, пустые строки
    if (val === undefined || val === null || val === '') {
      continue
    }
    result[key] = val
  }
  return result
})

// Форматирование названия характеристики
function formatNutritionKey(key: string): string {
  // Маппинг стандартных полей на русские названия
  const map: Record<string, string> = {
    calories: 'Энергетическая ценность',
    protein: 'Белки',
    fat: 'Жиры',
    carbohydrate: 'Углеводы',
  }
  if (map[key]) {
    return map[key]
  }
  // Для остальных ключей: первая буква заглавная, остальные строчные
  return key.charAt(0).toUpperCase() + key.slice(1)
}

// Форматирование значения (добавляет единицы измерения для стандартных числовых полей)
function formatNutritionValue(key: string, value: any): string {
  if (typeof value === 'number') {
    if (key === 'calories') {
      return `${value} ккал`
    }
    if (['protein', 'fat', 'carbohydrate'].includes(key)) {
      return `${value} г`
    }
  }
  return String(value)
}
</script>

<template>
  <CatalogBreadcrumb :items="breadcrumbs" />

  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-0 gap-y-4 sm:gap-4">
      <!-- Изображение (левая колонка) -->
      <div class="col-span-1">
        <div class="relative">
          <img
            :src="service?.medias[0]?.url || '/images/placeholder-service.jpg'"
            :alt="service?.title"
            class="w-full rounded-lg object-cover aspect-square"
          >
          <!-- Бейджи как в товаре -->
          <div v-if="service?.isPopular" class="absolute left-2.5 bottom-3.5">
            <UBadge color="orange" size="sm">
              Популярная услуга
            </UBadge>
          </div>
        </div>
      </div>

      <!-- Контент (правая колонка) -->
      <div class="col-span-2">
        <h1 class="text-xl/6 md:text-2xl/7 font-semibold text-highlighted">
          {{ service?.title }}
        </h1>
        <div class="mt-1 font-normal text-muted">
          {{ service?.subtitle }}
        </div>

        <!-- Цена -->
        <div class="mt-4 flex flex-col gap-0.5">
          <div class="text-2xl/6 font-medium tracking-tight">
            {{ formatPrice(service?.price) }}
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="mt-6 flex flex-wrap gap-4">
          <ButtonLead size="lg" :lead-type="service?.title || 'general'" />
          <ButtonVk size="lg" />
        </div>
      </div>
    </div>

    <!-- Блоки с деталями (по аналогии с составом/описанием) -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-6">
      <!-- Features -->
      <div v-if="service?.features?.length" class="col-span-3">
        <h2 class="mb-1 font-medium text-muted">
          Что входит в услугу
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            v-for="feature in service.features"
            :key="feature"
            class="text-base/5"
          >
            ✓ {{ feature }}
          </div>
        </div>
      </div>

      <!-- Problems (частые неисправности) -->
      <div v-if="service?.problems?.length" class="col-span-2">
        <h2 class="mb-1 font-medium text-muted">
          Частые неисправности
        </h2>
        <div class="py-3.5 px-4.5 bg-elevated/50 rounded-lg space-y-1">
          <div
            v-for="problem in service.problems"
            :key="problem"
            class="text-base/5"
          >
            🔧 {{ problem }}
          </div>
        </div>
      </div>

      <!-- Steps (этапы работы) -->
      <div v-if="service?.steps?.length" class="col-span-full">
        <h2 class="mb-2 font-medium text-muted">
          Как мы работаем
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(step, idx) in service.steps"
            :key="idx"
            class="flex gap-3 items-start"
          >
            <div class="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-sm font-bold">
              {{ idx + 1 }}
            </div>
            <div class="text-base/5">
              {{ step }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Специальный блок для кастомных аккумуляторов (по желанию) -->
    <div v-if="!service?.isLocalOnly" class="mt-8 mb-16 py-4 px-5 bg-secondary/10 rounded-xl border border-secondary/30">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 class="font-semibold">
            📦 Доставка в любой город России
          </h3>
          <p class="text-sm text-muted">
            СДЭК, Почта, Boxberry — отправляем готовый аккумулятор с инструкцией.
          </p>
        </div>
        <UButton
          variant="outline"
          color="secondary"
          size="md"
          @click="openLeadModal(service?.title || 'general')"
        >
          Заказать с доставкой
        </UButton>
      </div>
    </div>

    <ReviewsSection class="md:mt-2" />
    <FinalCTASection class="md:mt-2" />
  </div>
</template>

<script setup lang="ts">
import FinalCTASection from '~/components/sections/FinalCTASection.vue'
import ReviewsSection from '~/components/sections/ReviewsSection.vue'

const { openLeadModal } = useLeadModal()
const route = useRoute()
const serviceStore = useServiceStore()

await serviceStore.update()

const service = computed(() =>
  serviceStore.getServiceBySlug(String(route.params.slug)),
)

if (!service.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service not found',
  })
}

// Хлебные крошки (как в карточке товара)
const breadcrumbs = computed(() => [
  { label: 'Главная', icon: 'lucide:house', to: '/' },
  { label: 'Услуги', to: '/services' },
  { label: service.value?.title || '' },
])

// Форматирование цены (если приходит строка типа "от 1500 ₽", оставляем как есть)
function formatPrice(price?: string): string {
  if (!price) {
    return 'Цена не указана'
  }
  return price
}

useSeoMeta({
  title: `${service.value.title} | Ремонт электротранспорта`,
  description: service.value.description,
})
</script>

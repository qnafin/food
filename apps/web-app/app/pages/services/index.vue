<template>
  <CatalogBreadcrumb :items="breadcrumbs" />

  <h1 class="text-2xl md:text-3xl font-semibold">
    Все услуги
  </h1>
  <div class="text-base/5 text-gray-300 mt-2">
    Ремонт электросамокатов, скутеров, велосипедов. Кастомные аккумуляторы с доставкой по России. Полный перечень работ – от диагностики до сложного ремонта.
  </div>

  <div class="mt-8 max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
    <NuxtLink
      v-for="service in services"
      :key="service.id"
      :to="`/services/${service.slug}`"
      class="block"
    >
      <UCard class="h-full hover:scale-[1.02] transition-transform duration-200">
        <div class="text-lg font-semibold flex items-center gap-2">
          <span>{{ getIconForService(service) }}</span>
          <span>{{ service.title }}</span>
        </div>
        <p class="text-sm text-gray-400 mt-2 line-clamp-2">
          {{ service.subtitle || truncate(service.description, 80) }}
        </p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-orange-400 font-medium">{{ service.price }}</span>
          <UBadge
            v-if="service.isPopular"
            color="orange"
            size="sm"
          >
            Популярно
          </UBadge>
          <UBadge
            v-if="service?.isLocalOnly"
            color="neutral"
            variant="subtle"
          >
            📍в Магнитогорске
          </UBadge>
          <UBadge
            v-else-if="service?.slug === 'custom-battery'"
            color="green"
            variant="subtle"
          >
            🚚 Доставка по России
          </UBadge>
        </div>
      </UCard>
    </NuxtLink>
  </div>

  <!-- Состояние загрузки / пусто -->
  <div v-if="!services.length" class="text-center py-20">
    <p class="text-gray-400">
      Услуги загружаются...
    </p>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '../../stores/service' // путь под ваш проект

const serviceStore = useServiceStore()
await serviceStore.update()

const services = computed(() => serviceStore.services || [])

// Хлебные крошки
const breadcrumbs = computed(() => [
  { label: 'Главная', icon: 'lucide:house', to: '/' },
  { label: 'Услуги' },
])

// Подбор иконки по названию услуги
function getIconForService(service: any): string {
  const title = service.title.toLowerCase()
  if (title.includes('диагностик')) {
    return '🔍'
  }
  if (title.includes('аккумулятор') || title.includes('батаре')) {
    return '🔋'
  }
  if (title.includes('кастомн')) {
    return '⚡'
  }
  if (title.includes('контроллер') || title.includes('проводк')) {
    return '⚡'
  }
  if (title.includes('самокат')) {
    return '🛴'
  }
  if (title.includes('велосипед')) {
    return '🚲'
  }
  if (title.includes('скутер') || title.includes('мопед')) {
    return '🛵'
  }
  if (title.includes('тормоз')) {
    return '🛑'
  }
  if (title.includes('мотор-колес')) {
    return '⚙️'
  }
  if (title.includes('шиномонтаж')) {
    return '🛞'
  }
  if (title.includes('дисплей')) {
    return '📟'
  }
  if (title.includes('гидроизоляц')) {
    return '💧'
  }
  if (title.includes('сборк') || title.includes('настройк')) {
    return '🔧'
  }
  return '🔧'
}

function truncate(text: string, length: number): string {
  if (!text) {
    return ''
  }
  return text.length > length ? `${text.slice(0, length)}…` : text
}

useSeoMeta({
  title: 'Все услуги | Ремонт электротранспорта',
  description: 'Полный список услуг по ремонту электросамокатов, скутеров, велосипедов. Кастомные аккумуляторы, диагностика, контроллеры, мотор-колёса, тормоза. Доставка по России.',
})
</script>

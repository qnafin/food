<template>
  <section id="services" class="py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-highlighted">
            Услуги
          </h2>
          <p class="text-muted mt-1">
            Выберите интересующий вид ремонта
          </p>
        </div>
        <UButton
          to="/services"
          variant="outline"
          color="secondary"
          icon="lucide:arrow-right"
          trailing
          class="font-medium"
        >
          Все услуги
        </UButton>
      </div>

      <div class="grid grid-cols-1 gap-6" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))">
        <NuxtLink
          v-for="service in displayedServices"
          :key="service.id"
          :to="`/services/${service.slug}`"
          class="block hover:scale-[1.02] transition-transform duration-200"
        >
          <UCard class="h-full bg-elevated/30 border-gray-800">
            <div class="text-lg font-semibold text-highlighted mb-2 flex items-center gap-2">
              <span>{{ getIconForService(service) }}</span>
              <span>{{ service.title }}</span>
            </div>
            <p class="text-sm text-muted line-clamp-2">
              {{ service.subtitle || truncateDescription(service.description, 80) }}
            </p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-orange-400 font-medium">{{ service.price }}</span>
              <UBadge
                v-if="service.isLocalOnly"
                color="neutral"
                variant="subtle"
                size="sm"
                class="whitespace-nowrap"
              >
                📍 Магнитогорск
              </UBadge>
              <UBadge
                v-else-if="service.isLocalOnly === false"
                color="green"
                variant="subtle"
                size="sm"
              >
                🚚 По РФ
              </UBadge>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useServiceStore } from '../../stores/service'

const serviceStore = useServiceStore()
await serviceStore.update()

const services = computed(() => serviceStore.services || [])
const displayedServices = computed(() => services.value.slice(0, 6))

function getIconForService(service: any): string {
  const title = service.title.toLowerCase()
  if (title.includes('самокат')) {
    return '🛴'
  }
  if (title.includes('велосипед')) {
    return '🚲'
  }
  if (title.includes('аккумулятор') || title.includes('батаре')) {
    return '🔋'
  }
  if (title.includes('скутер') || title.includes('мопед')) {
    return '🛵'
  }
  if (title.includes('диагностик')) {
    return '🔍'
  }
  if (title.includes('контроллер') || title.includes('проводк')) {
    return '⚡'
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
  return '🔧'
}

function truncateDescription(text: string, length: number): string {
  if (!text) {
    return ''
  }
  return text.length > length ? `${text.slice(0, length)}…` : text
}
</script>

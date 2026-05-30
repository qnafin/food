<template>
  <NuxtLink
    :to="`/services/${service.slug}`"
    class="block hover:scale-[1.02] transition-transform duration-200"
  >
    <UCard class="h-full bg-elevated/30 border-gray-800">
      <div class="text-lg font-semibold text-highlighted mb-2 flex items-center gap-2">
        <span>{{ getIconForService(service) }}</span>
        <span>{{ service.title }}</span>
      </div>
      <p class="text-sm text-muted line-clamp-2">
        {{ service.subtitle || truncate(service.description, 80) }}
      </p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-orange-400 font-medium">{{ service.price }}</span>
        <UBadge
          v-if="service.isLocalOnly === true"
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
</template>

<script setup lang="ts">
import type { Service } from '@nextorders/food-schema'

defineProps<{
  service: Service
}>()

function getIconForService(service: Service): string {
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

function truncate(text: string, length: number): string {
  if (!text) {
    return ''
  }
  return text.length > length ? `${text.slice(0, length)}…` : text
}
</script>

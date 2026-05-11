<template>
  <section id="reviews" class="py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <!-- заголовок и кнопки (как раньше) -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-highlighted">
            Отзывы клиентов
          </h2>
          <p class="text-muted mt-2">
            Более {{ appConfig.reviewsCount }} реальных отзывов
          </p>
        </div>
        <div class="bg-elevated/50 border border-gray-800 rounded-xl px-5 py-3 text-sm text-muted">
          <div class="flex flex-wrap items-center gap-2">
            <span>⭐ {{ appConfig.reviewsCount }}+ отзывов</span>
            <span class="text-gray-600">|</span>
            <span>📦 Работаю по всей России</span>
            <span class="text-gray-600">|</span>
            <span>🏆 {{ appConfig.yandexRating }} на Яндекс Картах</span>
          </div>
        </div>
      </div>

      <!-- Сетка отзывов -->
      <div class="grid md:grid-cols-3 gap-6">
        <UCard
          v-for="review in reviews"
          :key="review.id"
          class="..."
        >
          <div class="aspect-video rounded-lg overflow-hidden mb-4 ...">
            <img
              v-if="review.imageUrl"
              :src="review.imageUrl"
              class="..."
            >
            <UIcon
              v-else
              name="lucide:message-square-quote"
              class="size-10"
            />
          </div>
          <div class="text-sm text-muted flex-1 italic">
            “{{ review.text }}”
          </div>
          <div class="mt-4 flex items-center justify-between">
            <div class="text-xs text-gray-500 flex items-center gap-1">
              <UIcon name="lucide:star" class="size-3 fill-orange-400 stroke-orange-400" />
              {{ review.source }}
            </div>
            <UBadge
              :color="review.source === 'Яндекс' ? 'green' : 'neutral'"
              variant="subtle"
              size="sm"
            >
              {{ review.source }}
            </UBadge>
          </div>
        </UCard>
      </div>

      <!-- кнопки перехода на Авито/Яндекс (как раньше) -->
      <div class="mt-12 text-center">
        <p class="text-muted mb-4">
          Посмотреть все отзывы можно на сайтах-отзовиках
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton :to="appConfig.avitoLink" target="_blank">
            Авито — все отзывы
          </UButton>
          <UButton :to="yandexMapsLink" target="_blank">
            Яндекс Карты — {{ Number(appConfig.yandexRating) }} звёзд
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  place?: 'main' | 'service'
  serviceId?: string
}>()

const appConfig = useAppConfig()
const yandexMapsLink = 'https://yandex.com/maps/-/CPWLBH7u'

const reviewStore = useReviewStore()
await reviewStore.fetchReviews({ place: props.place, serviceId: props.serviceId })
const reviews = computed(() => reviewStore.reviews)
</script>

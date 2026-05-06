<template>
  <section id="reviews" class="py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-highlighted">
            Отзывы клиентов
          </h2>
          <p class="text-muted mt-2">
            Более {{ appConfig.reviewsCount }} реальных отзывов на Авито и Яндекс
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

      <div class="grid md:grid-cols-3 gap-6">
        <UCard
          v-for="(item, idx) in reviews"
          :key="idx"
          class="flex flex-col h-full bg-elevated/30 border-gray-800"
        >
          <div class="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-800 flex items-center justify-center text-muted">
            <UIcon name="lucide:message-square-quote" class="size-10" />
          </div>

          <div class="text-sm text-muted flex-1 italic">
            “{{ item.text }}”
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div class="text-xs text-gray-500 flex items-center gap-1">
              <UIcon name="lucide:star" class="size-3 fill-orange-400 stroke-orange-400" />
              {{ item.source }}
            </div>
            <UBadge
              :color="item.source === 'Яндекс' ? 'green' : 'neutral'"
              variant="subtle"
              size="sm"
            >
              {{ item.source }}
            </UBadge>
          </div>
        </UCard>
      </div>

      <div class="mt-12 text-center">
        <p class="text-muted mb-4">
          Посмотреть все отзывы можно на сайтах-отзовиках
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            color="secondary"
            variant="solid"
            icon="lucide:external-link"
            :to="appConfig.avitoLink"
            target="_blank"
            class="font-medium"
          >
            Авито — все отзывы
          </UButton>
          <UButton
            color="secondary"
            variant="solid"
            icon="lucide:external-link"
            :to="yandexMapsLink"
            target="_blank"
            class="font-medium"
          >
            Яндекс Карты — {{ Number(appConfig.yandexRating) }} звёзд
          </UButton>
        </div>

        <div class="mt-6 text-xs text-muted">
          ✅ Проверен на двух крупнейших платформах — честные отзывы реальных клиентов
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

// Ссылка на Яндекс Карты (замените на свою, если нужно)
const yandexMapsLink = 'https://yandex.com/maps/-/CPWLBH7u'

const reviews = [
  {
    text: 'Спасибо! Аккумулятор отличный, мороза не боится. Для активного бурения льда идеален.',
    source: 'Авито',
  },
  {
    text: 'Аккумулятор для шуруповёрта ледобура. Продавец всё подробно объяснил, всегда на связи. Товар соответствует заявленному. Продавца рекомендую.',
    source: 'Авито',
  },
  {
    text: 'Обращался по самокату — починил за день. Быстро, качественно, с гарантией.',
    source: 'Яндекс',
  },
]
</script>

<template>
  <section id="reviews" class="py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-highlighted">
            Отзывы клиентов
          </h2>
          <p class="text-muted mt-2">
            Более 60 реальных отзывов с Авито
          </p>
        </div>

        <div class="bg-elevated/50 border border-gray-800 rounded-xl px-5 py-3 text-sm text-muted">
          <div class="flex items-center gap-2">
            <span>⭐ 60+ отзывов</span>
            <span class="text-gray-600">|</span>
            <span>📦 Работаю по всей России</span>
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
            <!-- Если есть реальное изображение, замените на <img :src="item.image" class="w-full h-full object-cover" /> -->
            <UIcon name="lucide:message-square-quote" class="size-10" />
          </div>

          <div class="text-sm text-muted flex-1 italic">
            “{{ item.text }}”
          </div>

          <div class="text-xs text-gray-500 mt-4 flex items-center gap-1">
            <UIcon name="lucide:star" class="size-3 fill-orange-400 stroke-orange-400" />
            {{ item.source }}
          </div>
        </UCard>
      </div>

      <div class="mt-12 text-center">
        <p class="text-muted mb-4">
          Посмотреть все отзывы можно на Авито
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            color="secondary"
            variant="solid"
            icon="lucide:external-link"
            :to="avitoReviewsLink"
            target="_blank"
            class="font-medium"
          >
            Смотреть все отзывы
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Ссылка на Авито (замените на свою)
const avitoReviewsLink = 'https://www.avito.ru/brands/f4b586a3ec508d953816e12c63935a74/all/predlozheniya_uslug'

// Массив отзывов (можно будет в будущем вынести в стор)
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
    source: 'Авито',
  },
]
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- BG -->
    <div class="absolute inset-0 bg-red-950" />

    <div class="relative max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-12 items-center">
      <!-- LEFT -->
      <div>
        <!-- BADGE -->
        <UBadge
          color="orange"
          variant="soft"
          class="mb-4"
        >
          Магнитогорск + отправка по России
        </UBadge>

        <!-- H1 -->
        <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-6">
          Ремонт электросамокатов <br>
          и аккумуляторов
        </h1>

        <!-- SUB -->
        <p class="text-gray-400 mb-8 text-lg">
          Частный мастер. Ремонт, переделка и сборка аккумуляторов (18650).
          Диагностика и точная стоимость по фото.
        </p>

        <!-- CTA -->
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton
            size="lg"
            color="orange"
            class="justify-center"
          >
            Написать в Telegram
          </UButton>

          <UButton
            size="lg"
            variant="outline"
            class="justify-center"
          >
            Отправить фото на оценку
          </UButton>
        </div>

        <!-- TRUST -->
        <div class="flex flex-wrap gap-6 mt-8 text-sm text-gray-400">
          <div>✔ Бесплатная диагностика</div>
          <div>✔ Гарантия до 6 месяцев</div>
          <div>✔ Ответ за 10–15 минут</div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="relative">
        <div class="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 aspect-video flex items-center justify-center text-gray-500">
          фото / видео ремонта
        </div>

        <!-- floating badge -->
        <div class="absolute -bottom-4 -left-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-sm">
          ⚡ Работаю лично / ⭐ Более 60 отзывов на Авито
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// пока без логики
</script>

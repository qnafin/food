<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0" />
    <div class="relative max-w-7xl mx-auto px-6 py-8 md:py-8 grid md:grid-cols-2 gap-12 items-center">
      <!-- левая колонка без изменений -->
      <div>
        <UBadge
          color="secondary"
          variant="soft"
          class="mb-4"
        >
          📍 Магнитогорск + отправка по России
        </UBadge>
        <h1 class="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight mb-6 text-highlighted ">
          Ремонт электросамокатов и аккумуляторов
        </h1>
        <p class="text-muted mb-8 text-lg">
          Частный мастер. Ремонт, переделка и сборка аккумуляторов (18650).
          Диагностика и точная стоимость по фото.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <ButtonVk size="lg" />
          <ButtonLead size="lg" lead-type="hero" />
        </div>

        <div class="flex flex-wrap gap-6 mt-8 text-sm text-muted">
          <div class="flex items-center gap-1">
            ✔ Бесплатная диагностика
          </div>
          <div class="flex items-center gap-1">
            ✔ Гарантия до 6 месяцев
          </div>
          <div class="flex items-center gap-1">
            ✔ Ответ за 10–15 минут
          </div>
        </div>
      </div>

      <!-- правая колонка (без изменений) -->
      <div class="relative">
        <div class="rounded-xl overflow-hidden bg-elevated/50 aspect-[3/4] flex items-center justify-center text-muted">
          <img
            :src="img"
            alt="Ремонт электросамокатов и аккумуляторов"
            class="w-full h-full object-cover"
            loading="lazy"
          >
        </div>
        <!-- остальной блок без изменений -->
        <div class="absolute -bottom-4 -left-4 bg-gray-100 rounded-xl px-4 py-2 text-sm text-muted flex items-center gap-2">
          <UIcon name="lucide:zap" class="size-4 text-orange-400" />
          <span>Работаю лично / ⭐ {{ appConfig.reviewsCount }}+ отзывов на Авито</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const img = 'https://sun9-56.userapi.com/s/v1/ig1/7bPxmJQvWWZtrHz3IHNG4mgLiRhF6tJ44KTXyI9r_P36DbAe8VSUJ4HpshkiU6ONUAZX3a2U.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x479,480x639,540x719,640x852,720x959&from=bu&cs=720x0'
</script>

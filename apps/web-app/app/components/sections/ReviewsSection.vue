<template>
  <section id="reviews" class="bg-red-950 py-8">
    <div class="max-w-7xl mx-auto px-6">
      <!-- HEADER -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold">
            Отзывы клиентов
          </h2>
          <p class="text-gray-400 mt-2">
            Более 60 реальных отзывов с Авито
          </p>
        </div>

        <!-- TRUST -->
        <div class="bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm">
          ⭐ 60+ отзывов <br>
          📦 Работаю по всей России
        </div>
      </div>

      <!-- GRID -->
      <div class="grid md:grid-cols-3 gap-6">
        <UCard
          v-for="(item, i) in reviews"
          :key="i"
          class="flex flex-col"
        >
          <!-- IMAGE -->
          <div class="aspect-[4/4] rounded-lg overflow-hidden mb-4 bg-gray-800 flex items-center justify-center text-gray-500">
            <!-- заменить на img -->
            {{ item.image }}
            <!--
            <img :src="item.image" class="w-full h-full object-cover" />
            -->
          </div>

          <!-- TEXT -->
          <div class="text-sm text-gray-300 flex-1">
            "{{ item.text }}"
          </div>

          <!-- SOURCE -->
          <div class="text-xs text-gray-500 mt-4">
            {{ item.source }}
          </div>
        </UCard>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center">
        <p class="text-gray-400 mb-4">
          Посмотреть все отзывы можно на Авито
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            color="orange"
            to="https://www.avito.ru/brands/f4b586a3ec508d953816e12c63935a74/all/predlozheniya_uslug"
            target="_blank"
          >
            Смотреть все отзывы
          </UButton>

          <UButton variant="outline">
            Написать
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    image: '1 → аккумулятор',
    text: `1 → аккумуляторСпасибо! Акум отличный, мороза не боится. Для активного бурения льда идеален.`,
    source: 'Авито',
  },
  {
    image: '1 → самокат',
    text: 'Аккумулятор для шуруповёрта ледобура. Сделка состоялась Продавец все подробно объяснил Был всегда на связи Товар соответствует заявленному Продавца рекомендую',
    source: 'Авито',
  },
  {
    image: '1 → общий',
    text: 'Обращался по самокату — починил за день',
    source: 'Авито',
  },
]
</script>

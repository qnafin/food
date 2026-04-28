<template>
  <section id="fero" class="bg-red-950 py-8">
    <div class="max-w-7xl mx-auto px-6">
      <!-- TITLE -->
      <h2 class="text-2xl md:text-3xl font-bold mb-10">
        Услуги
      </h2>

      <!-- GRID -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard class="hover:scale-[1.02] transition">
          <template #default>
            <div class="text-lg font-semibold mb-2">
              🛴 Самокаты
            </div>
            <p class="text-sm text-gray-400">
              Ремонт любой сложности: мотор-колёса, контроллеры, проводка
            </p>
            <div class="mt-4 text-orange-400 font-medium">
              от 500 ₽
            </div>
          </template>
        </UCard>

        <UCard class="hover:scale-[1.02] transition">
          <div class="text-lg font-semibold mb-2">
            🚲 Велосипеды
          </div>
          <p class="text-sm text-gray-400">
            Механика и электроника, дисплеи, тормоза
          </p>
          <div class="mt-4 text-orange-400 font-medium">
            от 500 ₽
          </div>
        </UCard>

        <UCard class="hover:scale-[1.02] transition">
          <div class="text-lg font-semibold mb-2">
            🔋 Аккумуляторы
          </div>
          <p class="text-sm text-gray-400">
            Ремонт, переделка, увеличение ёмкости (18650)
          </p>
          <div class="mt-4 text-orange-400 font-medium">
            гарантия до 6 мес
          </div>
        </UCard>

        <UCard class="hover:scale-[1.02] transition">
          <div class="text-lg font-semibold mb-2">
            🛵 Скутеры
          </div>
          <p class="text-sm text-gray-400">
            Полный ремонт и обслуживание
          </p>
          <div class="mt-4 text-orange-400 font-medium">
            от 1000 ₽
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup>
// пока без логики
</script>

<template>
  <section class="py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
      <!-- Левая информационная часть -->
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold text-highlighted mb-6">
          Ремонт и сборка аккумуляторов
        </h2>

        <p class="text-muted mb-6">
          Ремонтирую и собираю аккумуляторы для электросамокатов, велосипедов и инструмента.
          Работаю с элементами 18650, увеличиваю ёмкость и восстанавливаю АКБ.
        </p>

        <ul class="space-y-2 text-muted mb-8">
          <li class="flex items-center gap-2">
            ✔ Замена элементов 18650
          </li>
          <li class="flex items-center gap-2">
            ✔ Переделка Ni-Cd → Li-ion
          </li>
          <li class="flex items-center gap-2">
            ✔ Увеличение ёмкости
          </li>
          <li class="flex items-center gap-2">
            ✔ Точечная сварка (без перегрева)
          </li>
          <li class="flex items-center gap-2">
            ✔ Ремонт BMS
          </li>
        </ul>

        <div class="mb-8 p-4 rounded-xl bg-elevated/50 border border-gray-800">
          <div class="text-sm text-muted">
            Стоимость
          </div>
          <div class="text-xl font-semibold text-orange-400">
            от 1500 ₽
          </div>
          <div class="text-xs text-muted mt-1">
            зависит от состояния и элементов
          </div>
        </div>

        <div class="mb-8 p-4 rounded-xl bg-elevated/50 border border-gray-800">
          <div class="text-sm text-muted mb-2">
            Пример работы
          </div>
          <div class="text-sm text-muted">
            Было: аккумулятор не держал заряд (~2Ah)<br>
            Стало: увеличили до ~6Ah
          </div>
        </div>

        <div class="text-sm text-muted flex items-center gap-2">
          📦 Работаю по всей России • Гарантия до 6 месяцев
        </div>
      </div>

      <!-- Правая часть – форма оценки -->
      <div class="space-y-6">
        <div class="rounded-2xl overflow-hidden border border-gray-800 bg-elevated/50 aspect-video flex items-center justify-center text-muted">
          <UIcon name="lucide:battery-charging" class="size-12" />
        </div>
        <FormBatteryEstimate lead-type="battery_estimate" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

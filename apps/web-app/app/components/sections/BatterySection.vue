<template>
  <section class="bg-red-950 py-8">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
      <!-- LEFT -->
      <div>
        <!-- TITLE -->
        <h2 class="text-2xl md:text-3xl font-bold mb-6">
          Ремонт и сборка аккумуляторов
        </h2>

        <!-- TEXT -->
        <p class="text-gray-400 mb-6">
          Ремонтирую и собираю аккумуляторы для электросамокатов, велосипедов и инструмента.
          Работаю с элементами 18650, увеличиваю ёмкость и восстанавливаю АКБ.
        </p>

        <!-- FEATURES -->
        <ul class="space-y-3 text-gray-300 mb-8">
          <li>✔ Замена элементов 18650</li>
          <li>✔ Переделка Ni-Cd → Li-ion</li>
          <li>✔ Увеличение ёмкости</li>
          <li>✔ Точечная сварка (без перегрева)</li>
          <li>✔ Ремонт BMS</li>
        </ul>

        <!-- PRICE -->
        <div class="mb-8 p-4 rounded-xl bg-gray-950 border border-gray-800">
          <div class="text-sm text-gray-400">
            Стоимость
          </div>
          <div class="text-lg font-semibold text-orange-400">
            от 1500 ₽
          </div>
          <div class="text-xs text-gray-500 mt-1">
            зависит от состояния и элементов
          </div>
        </div>

        <!-- CASE -->
        <div class="mb-8 p-4 rounded-xl bg-gray-950 border border-gray-800">
          <div class="text-sm text-gray-400 mb-2">
            Пример работы
          </div>
          <div class="text-sm">
            Было: аккумулятор не держал заряд (~2Ah) <br>
            Стало: увеличили до ~6Ah
          </div>
        </div>

        <!-- TRUST -->
        <div class="text-sm text-gray-400">
          📦 Работаю по всей России • Гарантия до 6 месяцев
        </div>
      </div>

      <!-- RIGHT -->
      <div class="space-y-6">
        <!-- IMAGE -->
        <div class="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 aspect-video flex items-center justify-center text-gray-500">
          фото сборки АКБ
        </div>

        <!-- FORM -->
        <UCard>
          <template #header>
            <div class="font-semibold text-lg">
              Оценка аккумулятора
            </div>
          </template>

          <div class="space-y-4">
            <UInput
              v-model="form.device"
              placeholder="Модель устройства (например Kugoo M4)"
            />

            <UTextarea
              v-model="form.problem"
              placeholder="Опишите проблему"
            />

            <!-- upload (пока заглушка) -->
            <div class="text-sm text-gray-400">
              📷 Прикрепите фото аккумулятора
            </div>

            <UButton
              block
              size="lg"
              color="orange"
              @click="submit"
            >
              Отправить на оценку
            </UButton>

            <div class="text-xs text-gray-500 text-center">
              Отвечаю в течение 10–15 минут
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  device: '',
  problem: '',
})

function submit() {
  // console.log('FORM DATA:', form)

  // TODO:
  // отправка в Telegram / API / email
}
</script>

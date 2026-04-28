<template>
  <section class="bg-red-950 py-8 border-t border-gray-800">
    <div class="max-w-5xl mx-auto px-6 text-center">
      <!-- TITLE -->
      <h2 class="text-2xl md:text-3xl font-bold mb-6">
        Нужен ремонт или оценка?
      </h2>

      <!-- SUB -->
      <p class="text-gray-400 mb-8">
        Напишите или отправьте фото — скажу стоимость и сроки
      </p>

      <!-- CTA -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-10">
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
          Отправить фото
        </UButton>
      </div>

      <!-- CONTACTS -->
      <div class="grid sm:grid-cols-3 gap-6 text-sm text-gray-400 mb-10">
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div class="font-medium text-white mb-1">
            Telegram
          </div>
          <UButton to="https://t.me/username" target="_blank">
            @your_username
          </UButton>
        </div>

        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div class="font-medium text-white mb-1">
            Телефон
          </div>
          <div>+7 (XXX) XXX-XX-XX</div>
        </div>

        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div class="font-medium text-white mb-1">
            Город
          </div>
          <div>Магнитогорск</div>
        </div>
      </div>

      <!-- TRUST -->
      <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-6">
        <div>✔ Бесплатная диагностика</div>
        <div>✔ Гарантия до 6 месяцев</div>
        <div>✔ Более 60 отзывов</div>
      </div>

      <!-- AVITO LINK -->
      <div class="text-sm">
        <a
          href="https://www.avito.ru/brands/f4b586a3ec5ddd953816e12c63935a74/all/predlozheniya_uslug"
          target="_blank"
          class="text-orange-400 hover:underline"
        >
          Смотреть отзывы на Авито →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// сюда можно добавить реальные ссылки
</script>

<template>
  <section class=" py-12 border-t border-gray-800">
    <div class="max-w-5xl mx-auto px-6 text-center">
      <h2 class="text-2xl md:text-3xl font-semibold text-highlighted mb-4">
        Нужен ремонт или оценка?
      </h2>

      <p class="text-muted mb-8">
        Напишите или отправьте фото — скажу стоимость и сроки
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <ButtonVk size="lg" />
        <ButtonLead size="lg" lead-type="footer" />
      </div>

      <div class="grid sm:grid-cols-3 gap-6 text-sm text-muted mb-12">
        <div class="bg-elevated/50 border border-gray-800 rounded-xl p-4 text-center">
          <div class="font-medium text-white mb-1 flex items-center justify-center gap-2">
            <UIcon name="lucide:send" class="size-4" /> Telegram
          </div>
          <UButton
            :to="telegramLink"
            target="_blank"
            variant="link"
            color="secondary"
            class="text-sm"
          >
            @ваш_ник
          </UButton>
        </div>

        <div class="bg-elevated/50 border border-gray-800 rounded-xl p-4 text-center">
          <div class="font-medium text-white mb-1 flex items-center justify-center gap-2">
            <UIcon name="lucide:phone" class="size-4" /> Телефон
          </div>
          <UButton
            :to="`tel:${phoneNumber}`"
            variant="link"
            color="secondary"
            class="text-sm"
          >
            {{ formattedPhone }}
          </UButton>
        </div>

        <div class="bg-elevated/50 border border-gray-800 rounded-xl p-4 text-center">
          <div class="font-medium text-white mb-1 flex items-center justify-center gap-2">
            <UIcon name="lucide:map-pin" class="size-4" /> Город
          </div>
          <div>Магнитогорск</div>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted mb-6">
        <div class="flex items-center gap-1">
          ✔ Бесплатная диагностика
        </div>
        <div class="flex items-center gap-1">
          ✔ Гарантия до 6 месяцев
        </div>
        <div class="flex items-center gap-1">
          ✔ Более 60 отзывов
        </div>
      </div>

      <div class="text-sm">
        <UButton
          :to="avitoLink"
          target="_blank"
          variant="link"
          color="secondary"
          class="text-orange-400 hover:underline"
        >
          Смотреть отзывы на Авито →
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Контакты (замените на свои)
const telegramLink = 'https://t.me/ваш_ник'
const phoneNumber = '+79001234567'
const formattedPhone = '+7 (900) 123-45-67'
const avitoLink = 'https://www.avito.ru/brands/f4b586a3ec5ddd953816e12c63935a74/all/predlozheniya_uslug'
</script>

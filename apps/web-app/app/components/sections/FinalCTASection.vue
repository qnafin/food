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
          <div class="font-medium text-white-900 mb-1 flex items-center justify-center gap-2">
            <UIcon name="lucide:send" class="size-4" /> ВКонтакте
          </div>
          <UButton
            :to="appConfig.vkLink"
            target="_blank"
            variant="link"
            color="secondary"
            class="text-sm"
          >
            {{ appConfig.vkLinkText }}
          </UButton>
        </div>
        <div class="bg-elevated/50 border border-gray-800 rounded-xl p-4 text-center">
          <div class="font-medium text-white-900 mb-1 flex items-center justify-center gap-2">
            <UIcon name="lucide:phone" class="size-4" /> Телефон
          </div>
          <UButton
            :to="`tel:${appConfig.phoneNumber}`"
            variant="link"
            color="secondary"
            class="text-sm"
          >
            {{ formattedPhone }}
          </UButton>
        </div>

        <div class="bg-elevated/50 border border-gray-800 rounded-xl p-4 text-center">
          <div class="font-medium text-white-900 mb-1 flex items-center justify-center gap-2">
            <UIcon name="lucide:map-pin" class="size-4" /> Город
          </div>
          <div>{{ appConfig.localCity }}</div>
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
          ✔ Более {{ appConfig.reviewsCount }} отзывов
        </div>
      </div>
      <div v-if="appConfig.avitoLink" class="text-sm">
        <UButton
          :to="appConfig.avitoLink"
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
const appConfig = useAppConfig()

const phoneNumber = appConfig.phoneNumber ?? '+78000000000'
const formattedPhone = phoneNumber.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5')
</script>

<template>
  <div>
    <CatalogBreadcrumb :items="breadcrumbs" class="mb-4" />

    <div class="max-w-4xl mx-auto px-4 py-10">
      <h1 class="text-2xl md:text-3xl font-semibold text-highlighted mb-2">
        Реквизиты для оплаты
      </h1>
      <p class="text-muted mb-8">
        Выберите удобный способ оплаты. После оплаты не забудьте сообщить мастеру.
      </p>

      <!-- Блок для физических лиц -->
      <div class="bg-elevated/30  rounded-xl p-6 mb-8">
        <h2 class="text-xl font-semibold text-highlighted mb-4 flex items-center gap-2">
          <UIcon name="lucide:user" class="size-5" /> Физическим лицам
        </h2>
        <ul class="space-y-3 text-muted">
          <li class="flex items-start gap-2">
            <span class="text-orange-400">💳</span>
            <div>
              <span class="font-medium">Банковская карта (Мир, Visa, Mastercard):</span><br>
              <span class="text-sm text-secondary">{{ appConfig.bankCardNumber }} ({{ appConfig.fullCompanyName }})</span>
            </div>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-orange-400">📲</span>
            <div>
              <span class="font-medium">СБП (Система быстрых платежей):</span> по номеру телефона
              <a :href="`tel:${appConfig.phoneNumberRaw || appConfig.phoneNumber}`" class="text-orange-400 hover:underline">
                {{ appConfig.phoneNumber }} ({{ appConfig.bankSBPName }})
              </a>
            </div>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-orange-400">💵</span>
            <div>
              <span class="font-medium">Наличные при самовывозе</span> (только для самовывоза)
            </div>
          </li>
        </ul>
        <div class="mt-6 text-sm text-muted  p-4 rounded-lg">
          <UIcon name="lucide:message-circle" class="size-4 inline mr-2 text-orange-400" />
          После оплаты, пожалуйста,
          <a
            :href="appConfig.vkLink"
            target="_blank"
            rel="noopener noreferrer"
            class="text-orange-400 hover:underline"
          >
            сообщите мне в чат.
          </a>
          Если есть возможность, пришлите фото квитанции. Спасибо!
        </div>
        <p class="text-xs text-muted mt-4">
          * Реквизиты действительны только для заказов, подтверждённых мастером.
        </p>
      </div>

      <!-- Блок для юридических лиц -->
      <div class="bg-elevated/30  rounded-xl p-6">
        <h2 class="text-xl font-semibold text-highlighted mb-4 flex items-center gap-2">
          <UIcon name="lucide:building" class="size-5" /> Юридическим лицам и ИП
        </h2>
        <p class="text-muted mb-4 text-sm">
          Для выставления счёта или заключения договора используйте следующие реквизиты:
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm  rounded-lg p-4 border border-default">
          <div><span class="text-muted">Полное наименование:</span><br><span>{{ appConfig.legalEntity.name }}</span></div>
          <div><span class="text-muted">ИНН:</span><br>{{ appConfig.legalEntity.inn }}</div>
          <div><span class="text-muted">Банк:</span><br>{{ appConfig.legalEntity.bankName }}</div>
          <div><span class="text-muted">БИК:</span><br>{{ appConfig.legalEntity.bik }}</div>
          <div><span class="text-muted">Корр. счёт:</span><br>{{ appConfig.legalEntity.correspondentAccount }}</div>
          <div><span class="text-muted">Расчётный счёт:</span><br>{{ appConfig.legalEntity.settlementAccount }}</div>
        </div>
        <p class="text-muted text-sm mt-4">
          По запросу предоставлю договор, счёт, акт выполненных работ или накладную.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const breadcrumbs = computed(() => [
  { label: 'Главная', icon: 'lucide:house', to: '/' },
  { label: 'Реквизиты для оплаты' },
])
</script>

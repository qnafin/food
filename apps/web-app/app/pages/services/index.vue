<template>
  <CatalogBreadcrumb :items="breadcrumbs" />

  <h1 class="text-2xl md:text-3xl font-semibold">
    Все услуги
  </h1>
  <div class="text-base/5 text-gray-300 mt-2">
    Ремонт электросамокатов, скутеров, велосипедов. Кастомные аккумуляторы с доставкой по России. Полный перечень работ – от диагностики до сложного ремонта.
  </div>

  <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
    <ServiceCard
      v-for="service in services"
      :key="service.id"
      :service="service"
    />
  </div>

  <div v-if="!services.length" class="text-center py-20">
    <p class="text-gray-400">
      Услуги загружаются...
    </p>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '../../stores/service'

const serviceStore = useServiceStore()
await serviceStore.update()

const services = computed(() => serviceStore.services || [])

const breadcrumbs = computed(() => [
  { label: 'Главная', icon: 'lucide:house', to: '/' },
  { label: 'Услуги' },
])

useSeoMeta({
  title: 'Все услуги | Ремонт электротранспорта',
  description: 'Полный список услуг по ремонту электросамокатов, скутеров, велосипедов. Кастомные аккумуляторы, диагностика, контроллеры, мотор-колёса, тормоза. Доставка по России.',
})
</script>

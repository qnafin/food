<template>
  <section id="services" class="py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-highlighted">
            Услуги
          </h2>
          <p class="text-muted mt-1">
            Выберите интересующий вид ремонта
          </p>
        </div>
        <UButton
          to="/services"
          variant="outline"
          color="secondary"
          icon="lucide:arrow-right"
          trailing
          class="font-medium"
        >
          Все услуги
        </UButton>
      </div>

      <div class="grid gap-6" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))">
        <ServiceCard
          v-for="service in displayedServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useServiceStore } from '../../stores/service'

const serviceStore = useServiceStore()
await serviceStore.update()

const services = computed(() => serviceStore.services || [])
const displayedServices = computed(() => services.value.slice(0, 6))
</script>

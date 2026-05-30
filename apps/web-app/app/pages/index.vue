<template>
  <MaintenanceMessage v-if="channelStore.isOnMaintenance" />
  <HeroSection />
  <div class="md:mt-2" />
  <ServicesSection />
  <BatterySection class="md:mt-2" />
  <ReviewsSection class="md:mt-2" place="main" />
  <FinalCTASection class="md:mt-2" />

  <div class="md:mt-2" />

  <CategoryBlock
    v-for="(category, index) in menuStore.categories"
    :key="category.id"
    :category="category"
    :is-first="index === 0"
  />

  <h1 class="mt-18 mb-2 text-3xl md:text-4xl font-semibold">
    {{ optionsStore.getLocaleValue(channelStore.title) }}
  </h1>
  <div class="mb-8">
    {{ optionsStore.getLocaleValue(channelStore.description) }}
  </div>
</template>

<script setup lang="ts">
import BatterySection from '~/components/sections/BatterySection.vue'
import FinalCTASection from '~/components/sections/FinalCTASection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ReviewsSection from '~/components/sections/ReviewsSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'

const optionsStore = useOptionsStore()
const channelStore = useChannelStore()
const menuStore = useMenuStore()

// Получаем данные для SEO
const siteTitle = optionsStore.getLocaleValue(channelStore.title) // "Ремонт электротранспорта"
const siteDescription = optionsStore.getLocaleValue(channelStore.description)
const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''

// Применяем SEO (удаляем старый useHead)
useHomeSeo(siteTitle, siteDescription, siteUrl)
</script>

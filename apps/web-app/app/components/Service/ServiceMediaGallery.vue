<!-- components/service/ServiceMediaGallery.vue -->
<template>
  <div class="relative w-full aspect-square">
    <!-- Основное изображение (кликабельное для открытия галереи) -->
    <div class="relative w-full h-full cursor-pointer" @click="openGallery(currentIndex)">
      <ProductImage
        :images="service?.images ?? []"
        :lazy="false"
        size="md"
      />
      <slot name="badges" />
    </div>

    <!-- Миниатюры (если их больше одной) -->
    <div
      v-if="thumbnails.length > 1"
      class="flex flex-row gap-2 mt-2 overflow-x-auto pb-1"
    >
      <div
        v-for="(item, idx) in thumbnails"
        :key="idx"
        class="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
        @click.stop="openGallery(idx)"
      >
        <img
          v-if="item.type === 'image'"
          :src="item.thumbnail"
          class="w-full h-full object-cover"
          :alt="`Миниатюра ${idx + 1}`"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '@nextorders/food-schema'
import { Fancybox } from '@fancyapps/ui'
import { computed, onMounted, ref } from 'vue'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const props = defineProps<{
  service?: Service | null
}>()

// Определение поддержки WebP
const supportsWebP = ref(false)

onMounted(() => {
  const canvas = document.createElement('canvas')
  supportsWebP.value = canvas.toDataURL('image/webp').includes('image/webp')
})

// Формируем массив элементов галереи (только изображения)
const galleryItems = computed(() => {
  const images = props.service?.images ?? []
  if (!images.length) {
    return []
  }

  // Фильтрация по предпочтительному формату
  const preferredFormat = supportsWebP.value ? 'webp' : 'jpeg'
  let filtered = images.filter((img) => img.format === preferredFormat)
  if (!filtered.length) {
    filtered = images.filter((img) => img.format === 'webp' || img.format === 'jpeg')
  }

  // Убираем дубликаты по URL
  const unique = [...new Map(filtered.map((img) => [img.url, img])).values()]
  return unique.map((img) => ({ src: img.url, type: 'image' as const }))
})

// Миниатюры (используем те же изображения, можно улучшить выбор размера)
const thumbnails = computed(() => {
  const images = props.service?.images ?? []
  const preferredFormat = supportsWebP.value ? 'webp' : 'jpeg'
  let filtered = images.filter((img) => img.format === preferredFormat)
  if (!filtered.length) {
    filtered = images.filter((img) => img.format === 'webp' || img.format === 'jpeg')
  }
  const unique = [...new Map(filtered.map((img) => [img.url, img])).values()]
  return unique.map((img) => ({
    type: 'image' as const,
    url: img.url,
    thumbnail: img.url, // можно выбрать другой размер, если в схеме есть
  }))
})

const currentIndex = ref(0)

function openGallery(index: number = 0) {
  if (!galleryItems.value.length) {
    return
  }
  Fancybox.show(galleryItems.value, { startIndex: index })
}
</script>

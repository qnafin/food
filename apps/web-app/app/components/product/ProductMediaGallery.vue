<template>
  <div class="relative w-full aspect-square">
    <!-- Основной блок (кликабельный для открытия галереи) -->
    <div class="relative w-full h-full cursor-pointer" @click="openGallery(currentIndex)">
      <ProductImage
        :images="selectedVariant?.images ?? []"
        :lazy="false"
        size="md"
      />
      <ProductVideo
        v-if="selectedVariant?.video"
        :video="selectedVariant.video"
      />
      <!-- Бейджи (если переданы снаружи) -->
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
          :alt="`Thumbnail ${idx + 1}`"
        >
        <div
          v-else
          class="w-full h-full bg-muted flex items-center justify-center"
        >
          <UIcon name="i-lucide-play" class="size-6 text-primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductVariant } from '@nextorders/food-schema'
import { Fancybox } from '@fancyapps/ui'
import { computed, onMounted, ref } from 'vue'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const props = defineProps<{
  selectedVariant?: ProductVariant | null
}>()

// Определение поддержки WebP (один раз при монтировании)
const supportsWebP = ref(false)

onMounted(() => {
  const canvas = document.createElement('canvas')
  supportsWebP.value = canvas.toDataURL('image/webp').includes('image/webp')
})

// Формируем массив элементов галереи (изображения + видео в конце)
const galleryItems = computed(() => {
  const items: Array<{ src: string, type: 'image' | 'video', html?: string }> = []
  const imgs = props.selectedVariant?.images ?? []

  // Фильтрация по предпочтительному формату
  const preferredFormat = supportsWebP.value ? 'webp' : 'jpeg'
  let filtered = imgs.filter((img) => img.format === preferredFormat)
  if (!filtered.length) {
    filtered = imgs.filter((img) => img.format === 'webp' || img.format === 'jpeg')
  }

  // Убираем дубликаты по URL
  const unique = [...new Map(filtered.map((img) => [img.url, img])).values()]
  unique.forEach((img) => {
    items.push({ src: img.url, type: 'image' })
  })

  // Добавляем видео в конец, если есть
  const video = props.selectedVariant?.video
  if (video?.url) {
    items.push({
      src: video.url,
      type: 'video',
      html: `<video style="display:block; padding:0; margin:0;" controls>
               <source src="${video.url}" type="${video.type || 'video/mp4'}">
             </video>`,
    })
  }
  return items
})

// Миниатюры (используем те же изображения, что и в галерее, но можно будет брать специальные превью)
const thumbnails = computed(() => {
  const items: Array<{ type: 'image' | 'video', url: string, thumbnail: string }> = []
  const imgs = props.selectedVariant?.images ?? []
  const preferredFormat = supportsWebP.value ? 'webp' : 'jpeg'
  let filtered = imgs.filter((img) => img.format === preferredFormat)
  if (!filtered.length) {
    filtered = imgs.filter((img) => img.format === 'webp' || img.format === 'jpeg')
  }
  const unique = [...new Map(filtered.map((img) => [img.url, img])).values()]
  unique.forEach((img) => {
    items.push({
      type: 'image',
      url: img.url,
      thumbnail: img.url, // можно улучшить: выбрать изображение с размером 'xs' или 'sm'
    })
  })
  const video = props.selectedVariant?.video
  if (video?.url) {
    items.push({
      type: 'video',
      url: video.url,
      thumbnail: '',
    })
  }
  return items
})

// Текущий индекс для основного изображения (если нужно – можно хранить, но fancybox открывается с нуля)
const currentIndex = ref(0)

// Открытие галереи с опциональным индексом
function openGallery(index: number = 0) {
  if (!galleryItems.value.length) {
    return
  }
  Fancybox.show(galleryItems.value, { startIndex: index })
}
</script>

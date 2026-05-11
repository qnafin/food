import type { Review } from '@nextorders/food-schema'

export const useReviewStore = defineStore('review', () => {
  const reviews = ref<Review[]>([])
  const isLoading = ref(false)

  async function fetchReviews(params?: { place?: 'main' | 'service', serviceId?: string }) {
    isLoading.value = true
    try {
      const data = await $fetch<Review[]>('/api/reviews', { params })
      reviews.value = data
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      isLoading.value = false
    }
  }

  return { reviews, isLoading, fetchReviews }
})

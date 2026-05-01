import type { Service }
  from '@nextorders/food-schema'

export const useServiceStore = defineStore(
  'service',
  () => {
    const services = ref<Service[]>([])

    async function update() {
      try {
        const data = await $fetch<Service[]>(
          '/api/services',
        )

        if (!data) {
          return
        }

        services.value = data
      } catch {
        // API unavailable
      }
    }

    function getServiceBySlug(
      slug: string,
    ): Service | undefined {
      return services.value.find(
        (service) => service.slug === slug,
      )
    }

    function getPopularServices() {
      return services.value.filter(
        (service) => service.isPopular,
      )
    }

    return {
      services,

      update,

      getServiceBySlug,
      getPopularServices,
    }
  },
)

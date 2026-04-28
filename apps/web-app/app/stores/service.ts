import type {
  GatewayGetServicesResponse,
  Service,
} from '@nextorders/food-schema'

export const useServiceStore = defineStore(
  'service',
  () => {
    const services = ref<Service[]>([])

    async function update() {
      const response
        = await $fetch<GatewayGetServicesResponse>(
          '/api/storefront/gateway',
          {
            method: 'POST',

            body: {
              type: 'getServices',
            },

          },
        )

      if (!response.ok) {
        return
      }

      services.value = response.result
    }

    function getServiceBySlug(slug: string) {
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

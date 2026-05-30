import type {
  GatewayGetServicesResponse,
} from '@nextorders/food-schema'

const CACHE_MAX_AGE = 60

export default defineCachedEventHandler<
  Promise<GatewayGetServicesResponse['result']>
>(async () => {
  try {
    const services = await fetchApi({
      type: 'getServices',
    })

    if (!services.result) {
      throw createError({
        statusCode: 404,
        message: 'Not found',
      })
    }

    return services.result
  } catch (error) {
    throw errorResolver(error)
  }
}, {
  maxAge: CACHE_MAX_AGE,
  swr: true,
})

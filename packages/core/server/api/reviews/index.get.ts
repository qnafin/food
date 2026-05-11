export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const place = query.place as string | undefined
  const serviceId = query.serviceId as string | undefined

  const response = await fetchApi({
    type: 'getReviews',
    body: { place, serviceId },
  })

  if (!response.ok) {
    throw createError({ statusCode: response.statusCode || 500, message: 'Failed to fetch reviews' })
  }
  return response.result
})

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({ statusCode: 400, message: 'No data' })
    }
    let phone = ''
    let type = ''
    let message = ''
    let fileBase64: string | undefined
    let filename: string | undefined

    for (const part of formData) {
      if (part.name === 'phone') {
        phone = part.data.toString()
      }
      if (part.name === 'type') {
        type = part.data.toString()
      }
      if (part.name === 'message') {
        message = part.data.toString()
      }
      if (part.name === 'file' && part.filename && part.data) {
        fileBase64 = part.data.toString('base64')
        filename = part.filename
      }
    }

    if (!type || !message) {
      throw createError({ statusCode: 400, message: 'type and message required' })
    }

    const body: any = { type, message, fileBase64, filename }
    if (phone) {
      body.phone = phone
    }

    const response = await fetchApi({
      type: 'createLead',
      body,
    })

    if (!response.ok) {
      throw createError({ statusCode: 500, message: 'Lead creation failed' })
    }

    return response.result
  } catch (error) {
    throw errorResolver(error)
  }
})

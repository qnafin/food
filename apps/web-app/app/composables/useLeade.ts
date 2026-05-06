export function useLead() {
  const sendLead = async (type: string, message: string, phone?: string, file?: File) => {
    const formData = new FormData()
    formData.append('type', type)
    formData.append('message', message)
    if (phone) {
      formData.append('phone', phone)
    }
    if (file) {
      formData.append('file', file)
    }

    try {
      const result = await $fetch('/api/lead', {
        method: 'POST',
        body: formData,
      })
      return { success: true, data: result }
    } catch (error) {
      console.error('Lead error:', error)
      return { success: false, error }
    }
  }
  return { sendLead }
}

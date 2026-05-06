import type { Order } from '@nextorders/food-schema'
// apps/essence/server/utils/vk-messenger.ts
import { Buffer } from 'node:buffer'
import process from 'node:process'
import { useLogger } from '~/server/utils/logger'

const logger = useLogger('vk-messenger')

export function getVKConfig() {
  const accessToken = process.env.VK_ACCESS_TOKEN
  const userId = process.env.VK_USER_ID
  if (!accessToken || !userId) {
    throw new Error('VK credentials not configured')
  }
  return { accessToken, userId }
}

/**
 * Отправляет текстовое сообщение в VK (опционально с вложением)
 * @returns message_id от VK
 */
export async function sendVKMessage(text: string, attachment?: string): Promise<string> {
  const { accessToken, userId } = getVKConfig()
  const url = 'https://api.vk.com/method/messages.send'
  const params = new URLSearchParams({
    user_id: userId,
    message: text,
    random_id: String(Date.now()),
    access_token: accessToken,
    v: '5.131',
  })
  if (attachment) {
    params.append('attachment', attachment)
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })
  const data = await response.json()
  if (data.error) {
    throw new Error(`VK API error: ${JSON.stringify(data.error)}`)
  }
  return data.response // message_id
}

/**
 * Загружает фото (base64) в VK и возвращает attachment-строку для вставки в сообщение
 */
export async function uploadVKPhoto(photoBase64: string, filename: string): Promise<string | null> {
  const { accessToken, userId } = getVKConfig()
  try {
    // 1. Получаем URL для загрузки
    const uploadServerUrl = 'https://api.vk.com/method/photos.getMessagesUploadServer'
    const serverParams = new URLSearchParams({
      peer_id: userId,
      access_token: accessToken,
      v: '5.131',
    })
    const serverRes = await fetch(`${uploadServerUrl}?${serverParams}`)
    const serverData = await serverRes.json()
    if (serverData.error) {
      throw new Error(`Get upload server error: ${JSON.stringify(serverData.error)}`)
    }
    const uploadUrl = serverData.response.upload_url

    // 2. Преобразуем base64 → Buffer → Blob
    const buffer = Buffer.from(photoBase64, 'base64')
    const formData = new FormData()
    const blob = new Blob([buffer], { type: 'image/jpeg' }) // можно определить тип из filename, но упростим
    formData.append('photo', blob, filename)

    // 3. Загружаем
    const uploadRes = await fetch(uploadUrl, { method: 'POST', body: formData })
    const uploadResult = await uploadRes.json()
    if (!uploadResult.photo) {
      throw new Error(`Upload failed: no photo field, response: ${JSON.stringify(uploadResult)}`)
    }

    // 4. Сохраняем фото
    const saveUrl = 'https://api.vk.com/method/photos.saveMessagesPhoto'
    const saveParams = new URLSearchParams({
      photo: uploadResult.photo,
      server: uploadResult.server,
      hash: uploadResult.hash,
      access_token: accessToken,
      v: '5.131',
    })
    const saveRes = await fetch(`${saveUrl}?${saveParams}`)
    const saveData = await saveRes.json()
    if (saveData.error) {
      throw new Error(`Save photo error: ${JSON.stringify(saveData.error)}`)
    }

    const photo = saveData.response[0]
    return `photo${photo.owner_id}_${photo.id}`
  } catch (err) {
    logger.error('Photo upload error:', err)
    return null
  }
}

/**
 * Отправляет сообщение с фото (одним запросом, если удалось загрузить; если нет – только текст)
 */
export async function sendVKMessageWithPhoto(text: string, photoBase64: string, filename: string): Promise<string> {
  const attachment = await uploadVKPhoto(photoBase64, filename)
  if (attachment) {
    return sendVKMessage(text, attachment)
  } else {
    return sendVKMessage(`${text}\n\n⚠️ Фото не удалось загрузить.`)
  }
}

/**
 * Формирует подробное сообщение о заказе для отправки в VK
 */
export function formatOrderMessage(order: Order): string {
  const lines: string[] = []

  // Заголовок
  lines.push(`🛒 ЗАКАЗ #${order.id}`)
  lines.push(`📅 ${new Date(order.createdAt).toLocaleString('ru-RU')}`)
  lines.push('')

  // Клиент
  lines.push(`👤 Клиент: ${order.name}`)
  lines.push(`📞 Телефон: ${order.phone}`)
  if (order.note) {
    lines.push(`📝 Комментарий: ${order.note}`)
  }
  lines.push('')

  // Доставка / самовывоз
  if (order.deliveryMethod === 'deliveryByCourier') {
    lines.push(`🚚 Доставка по адресу:`)
    const addr = order.address as any
    if (addr?.street) {
      lines.push(`   Улица: ${addr.street}`)
    }
    if (addr?.flat) {
      lines.push(`   Квартира: ${addr.flat}`)
    }
    if (addr?.entrance) {
      lines.push(`   Подъезд: ${addr.entrance}`)
    }
    if (addr?.floor) {
      lines.push(`   Этаж: ${addr.floor}`)
    }
    if (addr?.intercom) {
      lines.push(`   Домофон: ${addr.intercom}`)
    }
    if (addr?.addressNote) {
      lines.push(`   Примечание: ${addr.addressNote}`)
    }
  } else {
    lines.push(`🏢 Самовывоз`)
    // можно добавить адрес склада, если есть поле address
  }
  lines.push('')

  // Оплата
  const paymentMethodText = order.paymentMethodId === 'cash' ? 'Наличные' : 'Картой онлайн'
  lines.push(`💳 Оплата: ${paymentMethodText}`)
  if (order.paymentMethodId === 'cash' && order.changeFrom) {
    lines.push(`💰 Сдача с: ${order.changeFrom} ₽`)
  }
  lines.push('')

  // Состав заказа
  if (order.items.length === 0) {
    lines.push(`📦 Состав заказа: (пусто)`)
  } else {
    lines.push(`📦 Состав заказа:`)
    for (const item of order.items) {
      const productTitle = item.productTitle
      const variantTitle = item.variantTitle
      const title = variantTitle ? `${productTitle} (${variantTitle})` : productTitle
      lines.push(`   • ${title} — ${item.quantity} × ${item.unitPrice} ₽ = ${item.totalPrice} ₽`)
    }
  }
  lines.push('')

  // Итог
  lines.push(`🔹 ИТОГО: ${order.totalPrice} ₽`)

  return lines.join('\n')
}

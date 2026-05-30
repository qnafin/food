// apps/essence/server/services/lead.ts
import type { GatewayCreateLeadResponse } from '@nextorders/food-schema'
import { db } from '~/server/db'
import { leads } from '~/server/db/schema'
import { useLogger } from '~/server/utils/logger'
import { sendVKMessage, sendVKMessageWithPhoto } from '~/server/utils/vk-messenger'

const logger = useLogger('lead-service')

async function saveLeadToDb(type: string, message: string, phone?: string) {
  try {
    const [lead] = await db.insert(leads).values({
      type,
      message,
      phone: phone ?? null,
      createdAt: new Date(),
    }).returning({ id: leads.id })
    if (!lead) {
      return null
    }
    logger.info(`Lead saved to DB, id: ${lead.id}`)
    return lead.id
  } catch (err) {
    logger.error('Failed to save lead to DB:', err)
    return null
  }
}

export async function handleCreateLead(
  payload: { type: string, message: string, phone?: string, fileBase64?: string, filename?: string },
): Promise<GatewayCreateLeadResponse> {
  const { type, message, phone, fileBase64, filename } = payload

  try {
    // 1. Сохраняем в БД
    const leadDbId = await saveLeadToDb(type, message, phone)
    if (!leadDbId) {
      logger.warn('Lead not saved to DB, but will try to send to VK')
    }

    // 2. Отправляем в VK
    const fullMessage = `🟢 Новая заявка (${type})\n\n${message}\n\n---\nОтправлено с сайта`
    let vkMessageId: string
    if (fileBase64 && filename) {
      vkMessageId = await sendVKMessageWithPhoto(fullMessage, fileBase64, filename)
    } else {
      vkMessageId = await sendVKMessage(fullMessage)
    }

    logger.info(`Lead sent to VK, DB id: ${leadDbId}, VK message ID: ${vkMessageId}`)

    return {
      ok: true,
      type: 'createLead',
      result: { success: true, leadId: leadDbId },
    }
  } catch (err) {
    const error = err as Error
    logger.error('Error creating lead:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to send lead',
    })
  }
}

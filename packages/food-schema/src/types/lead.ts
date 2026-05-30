import z from 'zod'

export const LeadSchema = z.object({
  type: z.string(), // например: 'battery_estimate', 'callback', 'common'
  message: z.string(), // всё, что ввёл пользователь (текст, модель, проблема…)
  // файл не входит в схему напрямую — он будет передаваться отдельно (multipart)
})

export type Lead = z.infer<typeof LeadSchema>

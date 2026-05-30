import z from 'zod'

export const ReviewSchema = z.object({
  id: z.string(),
  author: z.string().nullable().optional(),
  text: z.string(),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  source: z.string(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean(),
  showOnMain: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.string().datetime(),
})

export type Review = z.infer<typeof ReviewSchema>

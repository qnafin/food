import z from 'zod'

export const ServiceMediaSchema = z.object({
  id: z.string(),
  url: z.string(),
})

export const ServiceSchema = z.object({
  id: z.string(),

  slug: z.string(),

  category: z.string(),

  title: z.string(),
  subtitle: z.string(),
  description: z.string(),

  price: z.string(),

  features: z.string().array(),
  problems: z.string().array(),
  steps: z.string().array(),
  brands: z.string().array(),
  medias: ServiceMediaSchema.array(),
  isLocalOnly: z.boolean().optional(),
  isPopular: z.boolean().optional(),
})

export type Service = z.infer<typeof ServiceSchema>

import z from 'zod'

// Новая схема изображения (аналогично productVariants)
export const ServiceImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl', 'original']),
  format: z.enum(['original', 'jpeg', 'webp']),
})

export const ServiceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  problems: z.array(z.string()),
  steps: z.array(z.string()),
  brands: z.array(z.string()),
  images: z.array(ServiceImageSchema), // вместо medias
  isLocalOnly: z.boolean().optional(),
  isPopular: z.boolean().optional(),
})

export type Service = z.infer<typeof ServiceSchema>

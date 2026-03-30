import type {
  CompositionIngredient,
  CompositionProductItem,
  Product,
  ProductBadge,
  ProductComposition,
  ProductVariant,
  RecommendedProduct,
} from '@nextorders/food-schema'
import { createId } from '@paralleldrive/cuid2'
import { asc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '~/server/db/schema'
import { safeJsonParse } from '../utils/safeJsonParse'

const config = useRuntimeConfig()
const dbUrl = config.dbFileName

// Получение вариантов продукта
async function getProductVariants(productId: string): Promise<ProductVariant[]> {
  const db = drizzle(dbUrl, { schema })
  const variants = await db.select()
    .from(schema.productVariants)
    .where(eq(schema.productVariants.productId, productId))
    .orderBy(asc(schema.productVariants.sortOrder))

  return variants.map((v) => ({
    id: v.id,
    title: v.title ? [{ locale: 'ru', value: v.title }] : [],
    images: safeJsonParse(v.images, []),
    video: safeJsonParse(v.video, undefined),
    weightUnit: v.weightUnit as any,
    weightValue: v.weightValue ?? 0,
    price: v.price,
    originalPrice: v.originalPrice ?? undefined,
    sku: v.sku,
    nutritionFacts: safeJsonParse(v.nutritionFacts, null),
  }))
}

// Получение бейджей продукта
async function getProductBadges(productId: string): Promise<ProductBadge[]> {
  const db = drizzle(dbUrl, { schema })
  const relations = await db
    .select({
      badge: schema.badges,
      sortOrder: schema.productBadges.sortOrder,
    })
    .from(schema.productBadges)
    .where(eq(schema.productBadges.productId, productId))
    .innerJoin(schema.badges, eq(schema.productBadges.badgeId, schema.badges.id))
    .orderBy(asc(schema.productBadges.sortOrder))

  return relations.map((r) => ({
    id: r.badge.id,
    title: [{ locale: 'ru', value: r.badge.title }],
  }))
}

// Получение рекомендуемых товаров
async function getRecommendedProducts(productId: string): Promise<RecommendedProduct[]> {
  const db = drizzle(dbUrl, { schema })
  const recs = await db.select()
    .from(schema.recommendedProducts)
    .where(eq(schema.recommendedProducts.productId, productId))
    .orderBy(asc(schema.recommendedProducts.sortOrder))

  return recs.map((r) => ({
    id: r.id,
    productId: r.recommendedProductId,
    productVariantId: r.recommendedVariantId ?? '',
  }))
}

// Получение ингредиентов продукта
async function getIngredients(productId: string): Promise<CompositionIngredient[]> {
  const db = drizzle(dbUrl, { schema })
  const relations = await db
    .select({
      ingredient: schema.ingredients,
      sortOrder: schema.productIngredients.sortOrder,
    })
    .from(schema.productIngredients)
    .where(eq(schema.productIngredients.productId, productId))
    .innerJoin(schema.ingredients, eq(schema.productIngredients.ingredientId, schema.ingredients.id))
    .orderBy(asc(schema.productIngredients.sortOrder))

  return relations.map((r) => ({
    title: [{ locale: 'ru', value: r.ingredient.title }],
  }))
}

// Получение состава (продукты внутри продукта)
async function getProductComposition(productId: string): Promise<ProductComposition | null> {
  const db = drizzle(dbUrl, { schema })
  const compositionRows = await db
    .select()
    .from(schema.productComposition)
    .where(eq(schema.productComposition.parentProductId, productId))
    .orderBy(asc(schema.productComposition.sortOrder))

  if (compositionRows.length === 0) {
    return null
  }

  const products: CompositionProductItem[] = compositionRows.map((row) => ({
    id: createId(), // генерируем уникальный id для связи
    productId: row.childProductId,
    productVariantId: row.childVariantId ?? '',
  }))

  return { products }
}

// Получение полного продукта
export async function getProduct(productRow: any, includeRecommended: boolean = false): Promise<Product> {
  const [variants, recommended, badges, ingredients, composition] = await Promise.all([
    getProductVariants(productRow.id),
    includeRecommended ? getRecommendedProducts(productRow.id) : Promise.resolve([]),
    getProductBadges(productRow.id),
    getIngredients(productRow.id),
    getProductComposition(productRow.id),
  ])

  const product: Product = {
    id: productRow.id,
    slug: productRow.slug,
    title: productRow.title ? [{ locale: 'ru', value: productRow.title }] : [],
    description: productRow.description ? [{ locale: 'ru', value: productRow.description }] : [],
    isAvailableForPurchase: productRow.isAvailableForPurchase,
    isShownInCatalog: productRow.isShownInCatalog,
    variants,
  }

  if (recommended.length > 0) {
    product.recommendedProducts = recommended
  }
  if (badges.length > 0) {
    product.badges = badges
  }

  if (ingredients.length > 0 || composition) {
    const compositionObj: ProductComposition = {}
    if (ingredients.length > 0) {
      compositionObj.ingredients = ingredients
    }
    if (composition) {
      compositionObj.products = composition.products
    }
    product.composition = compositionObj
  }

  return product
}

// server/services/product.ts
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
import { db } from '~/server/db' // единый экземпляр для PostgreSQL
import * as schema from '~/server/db/schema'
import { safeJsonParse } from '../utils/safeJsonParse'

// Получение вариантов продукта (productId теперь number)
async function getProductVariants(productId: number): Promise<ProductVariant[]> {
  const variants = await db
    .select()
    .from(schema.productVariants)
    .where(eq(schema.productVariants.productId, productId))
    .orderBy(asc(schema.productVariants.sortOrder))

  return variants.map((v) => ({
    id: v.id.toString(), // на всякий случай преобразуем number → string (если API ожидает строку)
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
async function getProductBadges(productId: number): Promise<ProductBadge[]> {
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
    id: r.badge.id.toString(),
    title: [{ locale: 'ru', value: r.badge.title }],
  }))
}

// Получение рекомендуемых товаров
async function getRecommendedProducts(productId: number): Promise<RecommendedProduct[]> {
  const recs = await db
    .select()
    .from(schema.recommendedProducts)
    .where(eq(schema.recommendedProducts.productId, productId))
    .orderBy(asc(schema.recommendedProducts.sortOrder))

  return recs.map((r) => ({
    id: r.id.toString(),
    productId: r.recommendedProductId.toString(),
    productVariantId: r.recommendedVariantId?.toString() ?? '',
  }))
}

// Получение ингредиентов продукта
async function getIngredients(productId: number): Promise<CompositionIngredient[]> {
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
async function getProductComposition(productId: number): Promise<ProductComposition | null> {
  const compositionRows = await db
    .select()
    .from(schema.productComposition)
    .where(eq(schema.productComposition.parentProductId, productId))
    .orderBy(asc(schema.productComposition.sortOrder))

  if (compositionRows.length === 0) {
    return null
  }

  const products: CompositionProductItem[] = compositionRows.map((row) => ({
    id: createId(),
    productId: row.childProductId.toString(),
    productVariantId: row.childVariantId?.toString() ?? '',
  }))

  return { products }
}

// Получение полного продукта (productRow должен содержать числовой id)
export async function getProduct(productRow: any, includeRecommended: boolean = false): Promise<Product> {
  const productId = productRow.id // теперь number

  const [variants, recommended, badges, ingredients, composition] = await Promise.all([
    getProductVariants(productId),
    includeRecommended ? getRecommendedProducts(productId) : Promise.resolve([]),
    getProductBadges(productId),
    getIngredients(productId),
    getProductComposition(productId),
  ])

  const product: Product = {
    id: productId.toString(), // если API ожидает строку
    slug: productRow.slug,
    title: productRow.title ? [{ locale: 'ru', value: productRow.title }] : [],
    description: productRow.description ? [{ locale: 'ru', value: productRow.description }] : [],
    isAvailableForPurchase: productRow.isAvailableForPurchase,
    isShownInCatalog: productRow.isShownInCatalog,
    variants,
  }

  if (recommended.length) {
    product.recommendedProducts = recommended
  }
  if (badges.length) {
    product.badges = badges
  }

  if (ingredients.length || composition) {
    const compositionObj: ProductComposition = {}
    if (ingredients.length) {
      compositionObj.ingredients = ingredients
    }
    if (composition) {
      compositionObj.products = composition.products
    }
    product.composition = compositionObj
  }

  return product
}

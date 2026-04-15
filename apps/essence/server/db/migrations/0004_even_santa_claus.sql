CREATE TABLE "recommended_products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recommended_products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"productId" integer NOT NULL,
	"recommendedProductId" integer NOT NULL,
	"recommendedVariantId" integer,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "recommended_products" ADD CONSTRAINT "recommended_products_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommended_products" ADD CONSTRAINT "recommended_products_recommendedProductId_products_id_fk" FOREIGN KEY ("recommendedProductId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommended_products" ADD CONSTRAINT "recommended_products_recommendedVariantId_product_variants_id_fk" FOREIGN KEY ("recommendedVariantId") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;
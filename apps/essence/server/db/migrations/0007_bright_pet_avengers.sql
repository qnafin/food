CREATE TABLE "leads" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "leads_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" text NOT NULL,
	"message" text NOT NULL,
	"phone" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "productTitle" text NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "variantTitle" text NOT NULL;
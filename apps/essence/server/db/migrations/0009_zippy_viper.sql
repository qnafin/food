CREATE TABLE "reviews" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reviews_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"serviceId" integer,
	"author" text,
	"text" text NOT NULL,
	"rating" integer,
	"source" text NOT NULL,
	"imageUrl" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"showOnMain" boolean DEFAULT false NOT NULL,
	"showOnServicePage" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
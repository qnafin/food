CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"description" text NOT NULL,
	"price" text NOT NULL,
	"features" text NOT NULL,
	"problems" text NOT NULL,
	"steps" text NOT NULL,
	"brands" text NOT NULL,
	"images" text NOT NULL,
	"isLocalOnly" boolean DEFAULT false,
	"isPopular" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);

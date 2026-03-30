CREATE TABLE `badges` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_badges` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`badge_id` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`badge_id`) REFERENCES `badges`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `nutrition_facts`;--> statement-breakpoint
DROP TABLE `product_descriptions`;--> statement-breakpoint
DROP TABLE `product_titles`;--> statement-breakpoint
DROP TABLE `variant_images`;--> statement-breakpoint
DROP TABLE `variant_titles`;--> statement-breakpoint
ALTER TABLE `product_variants` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `product_variants` ADD `images` text;--> statement-breakpoint
ALTER TABLE `product_variants` ADD `video` text;--> statement-breakpoint
ALTER TABLE `product_variants` ADD `nutrition_facts` text;--> statement-breakpoint
ALTER TABLE `products` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `description` text;--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);
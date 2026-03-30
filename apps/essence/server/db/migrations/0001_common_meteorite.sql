CREATE TABLE `nutrition_facts` (
	`id` text PRIMARY KEY NOT NULL,
	`variant_id` text NOT NULL,
	`calories` real,
	`protein` real,
	`fat` real,
	`carbohydrate` real,
	FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nutrition_facts_variant_id_unique` ON `nutrition_facts` (`variant_id`);--> statement-breakpoint
CREATE TABLE `product_descriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`locale` text NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_titles` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`locale` text NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_variants` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`slug` text NOT NULL,
	`sku` text,
	`price` real NOT NULL,
	`original_price` real,
	`weight_unit` text,
	`weight_value` real,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`slug` text NOT NULL,
	`is_available_for_purchase` integer DEFAULT true NOT NULL,
	`is_shown_in_catalog` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `variant_images` (
	`id` text PRIMARY KEY NOT NULL,
	`variant_id` text NOT NULL,
	`url` text NOT NULL,
	`size` text,
	`format` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `variant_titles` (
	`id` text PRIMARY KEY NOT NULL,
	`variant_id` text NOT NULL,
	`locale` text NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON UPDATE no action ON DELETE no action
);

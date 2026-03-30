CREATE TABLE `recommended_products` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`recommended_product_id` text NOT NULL,
	`recommended_variant_id` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recommended_product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recommended_variant_id`) REFERENCES `product_variants`(`id`) ON UPDATE no action ON DELETE no action
);

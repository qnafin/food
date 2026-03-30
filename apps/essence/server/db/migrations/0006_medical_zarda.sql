CREATE TABLE `order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`product_id` text NOT NULL,
	`product_slug` text NOT NULL,
	`category_id` text NOT NULL,
	`category_slug` text NOT NULL,
	`variant_id` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_price` real NOT NULL,
	`total_price` real NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`ready_by` integer NOT NULL,
	`ready_type` text NOT NULL,
	`delivery_method` text NOT NULL,
	`address` text NOT NULL,
	`payment_method_id` text NOT NULL,
	`change_from` real,
	`total_price` real NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`note` text,
	`updated_at` integer NOT NULL
);

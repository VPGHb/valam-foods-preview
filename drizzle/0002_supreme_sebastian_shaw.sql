CREATE TABLE `admin_credentials` (
	`email` text PRIMARY KEY NOT NULL,
	`password_hash` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `admin_recovery_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`code_hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`used_at` integer
);
--> statement-breakpoint
CREATE INDEX `idx_admin_recovery_email_unused` ON `admin_recovery_codes` (`email`,`used_at`);
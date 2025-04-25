CREATE TABLE `link` (
	`id` serial NOT NULL,
	`title` varchar(255) NOT NULL,
	`customization` json NOT NULL,
	`url` varchar(255) NOT NULL,
	`link_style_id` int NOT NULL,
	`page_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT now(),
	`updated_at` datetime NOT NULL DEFAULT now(),
	CONSTRAINT `link_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `link_style` (
	`id` serial NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT now(),
	`updated_at` datetime NOT NULL DEFAULT now(),
	CONSTRAINT `link_style_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page` (
	`id` serial NOT NULL,
	`title` varchar(255) NOT NULL,
	`hostname` varchar(255) NOT NULL,
	`header` text NOT NULL,
	`footer` text NOT NULL,
	`customization` json NOT NULL,
	`page_style_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT now(),
	`updated_at` datetime NOT NULL DEFAULT now(),
	CONSTRAINT `page_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_style` (
	`id` serial NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT now(),
	`updated_at` datetime NOT NULL DEFAULT now(),
	CONSTRAINT `page_style_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`age` int,
	`username` varchar(32) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
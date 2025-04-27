ALTER TABLE `link_style` ADD `default_customization` json NOT NULL;--> statement-breakpoint
ALTER TABLE `page` ADD `hostname` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `page_style` ADD `default_customization` json NOT NULL;
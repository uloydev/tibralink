import { mysqlTable, serial, text, int, varchar, datetime, json } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm/sql';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const pageStyle = mysqlTable('page_style', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	createdAt: datetime('created_at').notNull().default(sql`now()`),
	updatedAt: datetime('updated_at').notNull().default(sql`now()`),
});

export const page = mysqlTable('page', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	header: text('header').notNull(),
	footer: text('footer').notNull(),
	customization: json('customization').notNull(),
	pageStyleId: int('page_style_id').notNull().references(() => pageStyle.id),
	createdAt: datetime('created_at').notNull().default(sql`now()`),
	updatedAt: datetime('updated_at').notNull().default(sql`now()`),
});

export const linkStyle = mysqlTable('link_style', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	createdAt: datetime('created_at').notNull().default(sql`now()`),
	updatedAt: datetime('updated_at').notNull().default(sql`now()`),
});

export const link = mysqlTable('link', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	customization: json('customization').notNull(),
	url: varchar('url', { length: 255 }).notNull(),
	linkStyleId: int('link_style_id').notNull().references(() => linkStyle.id),
	pageId: int('page_id').notNull().references(() => page.id),
	createdAt: datetime('created_at').notNull().default(sql`now()`),
	updatedAt: datetime('updated_at').notNull().default(sql`now()`),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Page = typeof page.$inferSelect;

export type Link = typeof link.$inferSelect;

export type PageStyle = typeof pageStyle.$inferSelect;

export type LinkStyle = typeof linkStyle.$inferSelect;

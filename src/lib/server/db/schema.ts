import { relations } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  text,
  int,
  varchar,
  datetime,
  json,
  boolean,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm/sql";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  age: int("age"),
  username: varchar("username", { length: 32 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id),
  expiresAt: datetime("expires_at").notNull(),
});

export const pageStyle = mysqlTable("page_style", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  defaultCustomization: json("default_customization").notNull(),
  createdAt: datetime("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const page = mysqlTable("page", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  header: text("header").notNull(),
  footer: text("footer").notNull(),
  customization: json("customization").notNull(),
  hostname: varchar("hostname", { length: 255 }).notNull(),
  pageStyleId: int("page_style_id")
    .notNull()
    .references(() => pageStyle.id),
  createdAt: datetime("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`now()`),
  isDisabled: boolean("is_disabled").notNull().default(false),
});

export const pageRelations = relations(page, ({ one, many }) => ({
  pageStyle: one(pageStyle, {
    fields: [page.pageStyleId],
    references: [pageStyle.id],
  }),
  links: many(link),
}));

export const linkStyle = mysqlTable("link_style", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  defaultCustomization: json("default_customization").notNull(),
  createdAt: datetime("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const link = mysqlTable("link", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  customization: json("customization").notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  linkStyleId: int("link_style_id")
    .notNull()
    .references(() => linkStyle.id),
  pageId: int("page_id")
    .notNull()
    .references(() => page.id),
  createdAt: datetime("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const linkRelations = relations(link, ({ one }) => ({
  page: one(page, {
    fields: [link.pageId],
    references: [page.id],
  }),
  linkStyle: one(linkStyle, {
    fields: [link.linkStyleId],
    references: [linkStyle.id],
  }),
}));

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Page = typeof page.$inferSelect;

export type Link = typeof link.$inferSelect;

export type PageStyle = typeof pageStyle.$inferSelect;

export type LinkStyle = typeof linkStyle.$inferSelect;

export interface PageWithRelations {
  page: Page | null;
  page_style: PageStyle | null;
}

export interface LinkWithRelations {
  link: Link;
  link_style: LinkStyle | null;
}

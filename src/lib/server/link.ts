import { getDB } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { raw } from "mysql2";

export async function getLinkById(
  id: number,
): Promise<table.LinkWithRelations> {
  const db = await getDB();
  const result = await db
    .select()
    .from(table.link)
    .where(eq(table.link.id, id))
    .leftJoin(table.linkStyle, eq(table.link.linkStyleId, table.linkStyle.id))
    .limit(1);
  if (result.length === 0) {
    throw new Error("Link not found");
  }
  return result[0] as table.LinkWithRelations;
}

export async function getAllLinks(): Promise<table.LinkWithRelations[]> {
  const db = await getDB();
  const result = await db
    .select()
    .from(table.link)
    .leftJoin(table.linkStyle, eq(table.link.linkStyleId, table.linkStyle.id));
  return result as table.LinkWithRelations[];
}

export async function getLinksByPageId(
  pageId: number,
): Promise<table.LinkWithRelations[]> {
  const db = await getDB()
  const result = await db
    .select()
    .from(table.link)
    .where(eq(table.link.pageId, pageId))
    .orderBy(table.link.sort_order)
    .leftJoin(table.linkStyle, eq(table.link.linkStyleId, table.linkStyle.id));
  return result as table.LinkWithRelations[];
}

export async function insertLink(link: table.Link): Promise<table.Link> {
  const db = await getDB();
  const [result] = await db.insert(table.link).values(link);

  link.id = result.insertId;

  return link;
}

export async function updateLink(link: table.Link): Promise<void> {
  const db = await getDB();
  await db
    .update(table.link)
    .set({
      url: link.url,
      title: link.title,
      customization: link.customization,
      linkStyleId: link.linkStyleId,
      updatedAt: new Date(),
    })
    .where(and(eq(table.link.id, link.id), eq(table.link.pageId, link.pageId)));
}

export async function deleteLink(id: number): Promise<void> {
  const db = await getDB();
  await db.delete(table.link).where(eq(table.link.id, id));
}

export async function getLinkStyleById(id: number): Promise<table.LinkStyle> {
  const db = await getDB();
  const result = await db.query.linkStyle.findFirst({
    where: eq(table.linkStyle.id, id),
  });

  if (!result) {
    throw new Error("Link style not found");
  }

  return result as table.LinkStyle;
}

export async function getAllLinkStyles(): Promise<table.LinkStyle[]> {
  const db = await getDB();
  const result = await db.query.linkStyle.findMany();
  return result as table.LinkStyle[];
}

export async function moveUpLink(
  linkId: number,
  pageId: number,
): Promise<void> {
  const db = await getDB();

  const link = await db.query.link.findFirst({
    where: eq(table.link.id, linkId),
  });
  if (!link) {
    throw new Error("Link not found");
  }

  const previousLink = await db.query.link.findFirst({
    where: and(
      eq(table.link.pageId, pageId),
      eq(table.link.sort_order, link.sort_order - 1),
    ),
  });

  if (!previousLink) {
    throw new Error("No previous link found to move up");
  }

  await db.update(table.link).set({ sort_order: previousLink.sort_order }).where(eq(table.link.id, link.id));
  await db.update(table.link).set({ sort_order: link.sort_order }).where(eq(table.link.id, previousLink.id));
}

export async function moveDownLink(
  linkId: number,
  pageId: number,
): Promise<void> {
  const db = await getDB();

  const link = await db.query.link.findFirst({
    where: eq(table.link.id, linkId),
  });
  if (!link) {
    throw new Error("Link not found");
  }

  const nextLink = await db.query.link.findFirst({
    where: and(
      eq(table.link.pageId, pageId),
      eq(table.link.sort_order, link.sort_order + 1),
    ),
  });

  if (!nextLink) {
    throw new Error("No next link found to move down");
  }

  await db.update(table.link).set({ sort_order: nextLink.sort_order }).where(eq(table.link.id, link.id));
  await db.update(table.link).set({ sort_order: link.sort_order }).where(eq(table.link.id, nextLink.id));
}

export async function getLastOrderNumber(
  pageId: number,
): Promise<number> {
  const db = await getDB();
  const result = await db
    .select({ maxOrder: sql<number>`MAX(${table.link.sort_order})` })
    .from(table.link)
    .where(eq(table.link.pageId, pageId))
    .limit(1);

  return result[0]?.maxOrder ?? 0;
}